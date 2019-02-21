import React from "react";
import { Link, Route } from "react-router-dom";
import * as BooksAPI from "./BooksAPI";

import BookShelf from "./components/BookShelf";
import Search from "./components/Search";

import "./App.css";

class BooksApp extends React.Component {
  state = {
    books: []
  };

  handleBookStateChange = (value, book) => {
    const { books } = this.state;

    const updatedBooks = books.map(element => {
      if (element.id === book.id) {
        return {
          ...element,
          shelf: value
        };
      }
      return element;
    });

    this.setState(
      {
        books: updatedBooks
      },
      () => {
        BooksAPI.update(book, value);
      }
    );
  };

  handleAddBook = (value, book) => {
    const newBook = {
      ...book,
      shelf: value
    };

    this.setState(
      prevState => ({
        books: [...prevState.books, newBook]
      }),
      () => {
        BooksAPI.update(book, value);
      }
    );
  };

  componentDidMount() {
    BooksAPI.getAll().then(data => {
      this.setState({
        books: data
      });
    });

    console.log("Estou aqui");
  }

  render() {
    return (
      <div className="app">
        <Route
          path={"/search"}
          render={() => (
            <Search
              books={this.state.books}
              handleBookStateChange={(value, book) =>
                this.handleAddBook(value, book)
              }
            />
          )}
        />
        <Route
          exact
          path={"/"}
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <BookShelf
                  handleBookStateChange={(value, book) =>
                    this.handleBookStateChange(value, book)
                  }
                  title="Currently Reading"
                  type={"currentlyReading"}
                  books={this.state.books}
                />
                <BookShelf
                  handleBookStateChange={(value, book) =>
                    this.handleBookStateChange(value, book)
                  }
                  title="Want to Read"
                  type={"wantToRead"}
                  books={this.state.books}
                />
                <BookShelf
                  handleBookStateChange={(value, book) =>
                    this.handleBookStateChange(value, book)
                  }
                  title="Read"
                  type={"read"}
                  books={this.state.books}
                />
              </div>
              <div className="open-search">
                <Link to={"/search"}>Add a book</Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
