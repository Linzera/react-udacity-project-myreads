import React from "react";
import { Link } from "react-router-dom";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";
import { bool } from "prop-types";

export default class Search extends React.Component {
  state = {
    search: "",
    searchResult: [],
    books: this.props.books,
    error: {}
  };

  onPress = (value, book) => {
    this.setState(
      prevState => ({
        searchResult: prevState.searchResult.filter(item => item.id !== book.id)
      }),
      () => {
        this.props.handleBookStateChange(value, book);
      }
    );
  };

  handleSearch = e => {
    this.setState(
      {
        search: e.target.value
      },
      () => {
        BooksAPI.search(this.state.search)
          .then(data => {
            this.setState({
              searchResult: data.hasOwnProperty("error") ? [] : data
            });
          })
          .catch(err => {
            console.log(err);
            this.setState({ searchResult: [], error: err });
          });
      }
    );
  };

  renderBooks = () => {
    const { searchResult } = this.state;

    return searchResult.map(book => (
      <li key={book.id}>
        <Book
          book={book}
          onPress={(value, book) => this.onPress(value, book)}
          title={book.title}
          author={book.authors}
          coverUrl={book.imageLinks ? book.imageLinks.smallThumbnail : ""}
          status={book.shelf}
        />
      </li>
    ));
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link className="close-search" to={"/"}>
            Close
          </Link>
          <div className="search-books-input-wrapper">
            <input
              value={this.state.search}
              onChange={e => this.handleSearch(e)}
              type="text"
              placeholder="Search by title or author"
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{this.renderBooks()}</ol>
        </div>
      </div>
    );
  }
}
