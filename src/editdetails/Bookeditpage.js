import * as React from 'react';
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import { API_URL, Buttonbar } from '../App';

export function Bookeditpage() {

  const [books, setBooks] = useState([]);

  const getBooks = () => {
    fetch(`${API_URL}/book`, { method: "GET" })
      .then((data) => data.json())
      .then((mvs) => setBooks(mvs));
  };

  useEffect(getBooks, []);


  const deleteMovie = (_id) => {
    fetch(`${API_URL}/book/${_id}`, { method: "DELETE" })
      .then(() => getBooks());
  };

  const history = useHistory();

  return (
    <div>
      <Buttonbar />
      <section className='section-margin'>
        {books.map(({ image, bookname, author, id, _id }) => (<Listbookeditpage
          key={_id}
          id={_id}
          image={image}
          bookname={bookname}
          author={author}

          deleteButton={<Button aria-label="delete" color="error"
            onClick={() => deleteMovie(_id)}>
            <DeleteIcon />Delete
          </Button>}
          editButton={<Button
            aria-label="edit" color="success"
            onClick={() => history.push("/updatebook/edit/" + _id)}>
            <EditIcon />Edit
          </Button>} />))}
      </section>
    </div>
  );
}
function Listbookeditpage({ image, bookname, author, editButton, deleteButton }) {
  return (
    <div className="container">
      <div className="full-det">
        <img className='book-img' src={image} alt={bookname} />
        <div className='name-padding'>
          <p className='book-name'>{bookname}</p>
          <p className='author-name'>by {author}</p>
        </div>
        <div className='rating-more'>
          <div>
            {editButton}
          </div>
          <div>
            {/* {deleteButton} */}
          </div>
        </div>
      </div>
    </div>
  );
}
