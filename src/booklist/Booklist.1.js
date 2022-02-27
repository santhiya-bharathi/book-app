import * as React from 'react';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import Rating from '@mui/material/Rating';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import { API_URL, Buttonbar } from '../App';

export function Booklist() {

  const [books, setBooks] = useState([]);

  const getBooks = () => {
    fetch(`${API_URL}/book`, { method: "GET" })
      .then((data) => data.json())
      .then((mvs) => setBooks(mvs));
  };
  useEffect(getBooks, []);

  return (
    <div>
      <Buttonbar />
      <section className='section-margin'>
        {books.map(({ image, bookname, author, id, _id }) => (<Bookslit
          key={_id}
          id={_id}
          image={image}
          bookname={bookname}
          author={author} />))}
      </section>
    </div>
  );
}
function Bookslit({ image, bookname, author, id }) {
  const [value, setValue] = React.useState(4);
  const history = useHistory();
  return (
    <div className="container">
      <div className="full-det">
        <img className='book-img' src={image} alt={bookname} />
        <div className='name-padding'>
          <p className='book-name'>{bookname}</p>
          <p className='author-name'>by {author}</p>
        </div>
        <div className='rating-more'>
          <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
              setValue(newValue);
            }} />
          <IconButton onClick={() => {
            console.log(id);
            history.push("/booklist/" + id);
          }} color="inherit" aria-label="more-info">
            <MoreVertIcon />
          </IconButton>


        </div>
      </div>
    </div>
  );
}
