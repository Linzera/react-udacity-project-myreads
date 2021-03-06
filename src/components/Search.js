import React from "react";
import { Link } from "react-router-dom";
import { Debounce } from "react-throttle";
import * as BooksAPI from "../BooksAPI";
import Book from "./Book";

class Search extends React.Component {
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

  getBooks = () => {
    const { searchResult } = this.state;
    const { books } = this.props;

    return searchResult.reduce((accumulator, item) => {
      const isBookInShelf = books.find(book => book.id === item.id);
      if (isBookInShelf) item.shelf = book.shelf;

      return [...accumulator, item];
    }, []);
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
    const { search } = this.state;

    if (search.length === 0) {
      return <h2>Digite algo e pesquise seus livros!</h2>;
    }

    const result = this.getBooks();

    return result.map(book => (
      <li key={book.id + book.title}>
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
            <Debounce time="400" handler="onChange">
              <input
                onChange={e => this.handleSearch(e)}
                type="text"
                placeholder="Search by title or author"
              />
            </Debounce>
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">{this.renderBooks()}</ol>
        </div>
      </div>
    );
  }
}

export default Search;
