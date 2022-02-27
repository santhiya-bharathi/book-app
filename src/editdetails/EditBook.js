import * as React from 'react';
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { API_URL, Buttonbar } from '../App';

export function EditBook() {

  const { id } = useParams();

  const [bookdet, setBookdet] = useState(null);
  useEffect(() => {
    fetch(`${API_URL}/book/${id}`, { method: "GET" })
      .then((data) => data.json())
      .then((mv) => setBookdet(mv));
  }, [id]);

  return bookdet ? <UpdateBook bookdet={bookdet} /> : "";
}
function UpdateBook({ bookdet }) {
  const history = useHistory();

  const formvalidationschema = yup.object({
    image: yup.string().required("why not fill this image?").min(4),
    bookname: yup.string().required("why not fill this bookname?").min(1),
    author: yup.string().required("why not fill this author?").min(2),
    originallanguage: yup.string().required("why not fill this language?").min(2),
    published: yup.string().required("why not fill this  published?").min(2),
    price: yup.string().required("why not fill this price?").min(2),
    genre: yup.string().required("why not fill this genre?").min(2),
    description: yup.string().required("why not fill this description?").min(2)
  });


  const { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: {
      image: bookdet.image, bookname: bookdet.bookname, author: bookdet.author, originallanguage: bookdet.originallanguage,
      published: bookdet.published,
      price: bookdet.price,
      genre: bookdet.genre,
      description: bookdet.description
    },

    validationSchema: formvalidationschema,

    onSubmit: (updatedBooks) => {
      console.log("onsubmit", updatedBooks);
      editBook(updatedBooks);
    }
  });

  const editBook = (updatedBooks) => {

    console.log(updatedBooks);

    fetch(`${API_URL}/book/${bookdet._id}`, {
      method: "PUT",
      body: JSON.stringify(updatedBooks),
      headers: { 'Content-Type': 'application/json' },
    }).then(() => history.push("/booklist"));
  };


  return (
    <div>
      <Buttonbar />
      <form onSubmit={handleSubmit} className="in-con">

        <TextField id="image"
          name="image"
          value={values.image}
          onChange={handleChange}
          onBlur={handleBlur}
          label="upload the book image"
          error={errors.image && touched.image}
          helperText={errors.image && touched.image && errors.image}
          variant="filled" />

        <TextField id="bookname"
          name="bookname"
          value={values.bookname}
          onChange={handleChange}
          onBlur={handleBlur}
          label="enter book name"
          error={errors.bookname && touched.bookname}
          helperText={errors.bookname && touched.bookname && errors.bookname}
          variant="filled" />


        <TextField id="author"
          name="author"
          value={values.author}
          onChange={handleChange}
          onBlur={handleBlur}
          label="enter book author"
          error={errors.author && touched.author}
          helperText={errors.author && touched.author && errors.author}
          variant="filled" />


        <TextField id="originallanguage"
          name="originallanguage"
          value={values.originallanguage}
          onChange={handleChange}
          onBlur={handleBlur} label="enter language"
          error={errors.originallanguage && touched.originallanguage}
          helperText={errors.originallanguage && touched.originallanguage && errors.originallanguage}
          variant="filled" />

        <TextField id="published"
          name="published"
          value={values.published}
          onChange={handleChange}
          onBlur={handleBlur} label="enter published date"
          error={errors.published && touched.published}
          helperText={errors.published && touched.published && errors.published}
          variant="filled" />

        <TextField id="price"
          name="price"
          value={values.price}
          onChange={handleChange}
          onBlur={handleBlur} label="enter the price"
          error={errors.price && touched.price}
          helperText={errors.price && touched.price && errors.price}
          variant="filled" />

        <TextField id="genre"
          name="genre"
          value={values.genre}
          onChange={handleChange}
          onBlur={handleBlur} label="enter the genre"
          error={errors.genre && touched.genre}
          helperText={errors.genre && touched.genre && errors.genre}
          variant="filled" />

        <TextField id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          onBlur={handleBlur} label="enter the description"
          error={errors.description && touched.description}
          helperText={errors.description && touched.description && errors.description}
          variant="filled" />

        <Button type="submit" variant="contained">Edit Book</Button>

      </form>

    </div>
  );
}
