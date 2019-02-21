import React from "react";
import Book from "./Book";

const BookShelf = props => {
  const onPress = (value, book) => {
    props.handleBookStateChange(value, book);
  };

  const { title, books, type } = props;

  return (
    <div className="bookshelf">
      <h2 className="bookshelf-title">{title}</h2>
      <div className="bookshelf-books">
        <ol className="books-grid">
          {books.map(book => {
            if (book.shelf === type) {
              return (
                <li key={book.id}>
                  <Book
                    book={book}
                    onPress={(value, self) => onPress(value, self)}
                    title={book.title}
                    author={book.authors}
                    coverUrl={
                      book.imageLinks ? book.imageLinks.smallThumbnail : ""
                    }
                    status={book.shelf}
                  />
                </li>
              );
            }

            return null;
          })}
        </ol>
      </div>
    </div>
  );
};

export default BookShelf;
