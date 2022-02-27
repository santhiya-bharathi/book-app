import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { API_URL, Buttonbar } from '../App';

export function BookDetails() {
  const { id } = useParams();

  console.log("the id is ", id);

  const [bookdet, setBookdet] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/book/${id}`, { method: "GET" })
      .then((data) => data.json())
      .then((mv) => setBookdet(mv));
  }, [id]);

  console.log(bookdet);
  return (
    <div>
      <Buttonbar />
      <div className='details-div'>
        <div className='div-details-flex'>
          <div>
            <img className='book-img' src={bookdet.image} alt={bookdet.bookname} />
          </div>
          <div className='details-name'>
            <p className='book-name-title'>{bookdet.bookname}</p>
            <p className='author-name'>by {bookdet.author}</p>
            <p className='author-name'>{bookdet.originallanguage}</p>
            <p className='author-name'><b>Published on:</b>{bookdet.published}</p>
            <p className='author-name'><b>Price: </b> ₹{bookdet.price}</p>
            <p className='author-name'><b>gerne: </b> {bookdet.genre}</p>
            <p className='author-name'><b>Description:</b>{bookdet.description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
