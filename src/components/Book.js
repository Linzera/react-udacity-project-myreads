import React from "react"

export default class Book extends React.Component {


    render() {

        const { book, title, author, coverUrl, onPress, status } = this.props;

        return (
            <div className="book">
                <div className="book-top">
                    <div className="book-cover" style={{ width: 128, height: 193, backgroundImage: `url(${coverUrl})` }}></div>
                    <div className="book-shelf-changer">
                        <select value={status ? status : "move"} onChange={(event) => onPress(event.target.value, book)}>
                            <option value="move" disabled>Move to...</option>
                            <option value="currentlyReading">Currently Reading</option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            {status ? <option value="none">None</option> : null}
                        </select>
                    </div>
                </div>
                <div className="book-title">{title}</div>
                <div className="book-authors">{author}</div>
            </div>
        )
    }



}