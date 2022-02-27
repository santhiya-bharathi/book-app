
import './App.css';
import * as React from 'react';
import {useEffect, useState} from "react";
import { Switch, Route, useParams } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import Rating from '@mui/material/Rating';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { useFormik } from 'formik';
import * as yup from 'yup';


const API_URL = "https://621885221a1ba20cbaa3262f.mockapi.io";

function App(){

  const [books, setBooks] = useState([]);
  
  console.log(books);
  useEffect(()=>{
    fetch(`${API_URL}/users`, {method:"GET"})
    .then((data)=>data.json())
    .then((mvs)=>setBooks(mvs));
  }, []);
 
  return (

    <div className="App">   

      <Switch>
    

        <Route exact path="/">
          <LoginPage />
        </Route>
        
          <Route path="/signup">
          <SignupPage />
        </Route>
          
      <Route path="/home">
          <Home />
        </Route>

       <Route path="/addbooks">
          <AddBooks />
        </Route>

        <Route path="/booklist/:id">
        <BookDetails />
        </Route>

        <Route path="/booklist">
          <Booklist />
        </Route>

        <Route path="/updatebook/edit/:id">
        <EditBook />
        </Route>

        <Route path="/updatebook">
          <Bookeditpage />
        </Route>

        <Route path="/signupfailed">
          <SignupFailed />
        </Route>

        <Route path="/loginfailed">
          <LoginFailed />
        </Route>

        

      </Switch>
   
    </div>

  );
}

export default App;


function Home(){
  return(
    <div>
      <Buttonbar />
     <div className='img-div-home'>
       <div className='text-div-home'>
       <p className='text-design'>A PLACE IS</p>
       <p className='text-design'>NOT A PLACE</p>
       <p className='text-design-store'>UNTIL IT HAS A BOOK STORE</p>
     </div>
     </div>
     <div>
       <p className='text-design-service'>SERVICE WE CAN PROVIDE</p>
       <p className='text-design-here'>Here is a customised world of books for you</p>
     </div>
     <Designbar />
    </div>
  );
}



function Designbar(){
  const history = useHistory();
  return(
    <section className='logo-section'>
      <div className='icon-logo-div' onClick={()=>history.push("/booklist")}>
        <img className='icon-logo' src='https://i.fbcd.co/products/resized/resized-750-500/ae2d64e634f5beaa6f0e867d529ece28f0504e9e24fc4d5e0d6fd21f0a05df7f.jpg' alt='books'/>
        <p>Books</p>
      </div>
      <div className='icon-logo-div' onClick={()=>history.push("/addbooks")}>
        <img className='icon-logo-a' src='https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgNuZsi_fFFdOXwXEWVCLQdf6zUTS1e4ML7-TybIi8Y6Qb5egg4uD_goq1N8cXZQfg02E&usqp=CAU' alt='design books'/>
        <p>Design Book</p>
      </div>
      <div className='icon-logo-div' onClick={()=>history.push("/updatebook")}>
        <img className='icon-logo-b' src='https://static.thenounproject.com/png/147590-200.png' alt='rework books'/>
        <p>Rework</p>
      </div>
    </section>
  );
}




function Buttonbar(){
  const history = useHistory();
  const [show,setShow] = useState(false);
  return(
    <div className='appbar-background'>
      <div>
        <h1 className='logo-text'>Book Space</h1>
      </div>
      <div className='menu-icon' onClick={()=>setShow(!show)}><MenuIcon /></div>
      {show?
      <div className='button-flex'>
     <p varient="text" className='button' onClick={()=>history.push("/home")}>Home</p>
      <p varient="text" className='button' onClick={()=>history.push("/booklist")}>Books</p>
      <p varient="text" className='button' onClick={()=>history.push("/addbooks")}>Addbooks</p>
      <p varient="text" className='button' onClick={()=>history.push("/updatebook")}>Editbook</p>
      </div>:""
      }

      <div className='button-flex-div'>
     <p varient="text" className='button' onClick={()=>history.push("/home")}>Home</p>
      <p varient="text" className='button' onClick={()=>history.push("/booklist")}>Books</p>
      <p varient="text" className='button' onClick={()=>history.push("/addbooks")}>Addbooks</p>
      <p varient="text" className='button' onClick={()=>history.push("/updatebook")}>Editbook</p>
      <p varient="text" color="inherit" onClick={()=>history.push("/login")}>Log in</p>
       <p varient="text" color="inherit" onClick={()=>history.push("/signup")}>Sign up</p>
      </div>
    </div>
  );
}

function BookDetails() {
  const {id} = useParams();
  
  console.log("the id is ", id);

const [bookdet, setBookdet] = useState({});

useEffect(()=>{
  fetch(`${API_URL}/users/${id}`, {method:"GET"})
  .then((data)=>data.json())
  .then((mv)=>setBookdet(mv));
}, [id]);

  console.log(bookdet);
  return(
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



function Booklist(){

  const [books, setBooks] = useState([]);
 
  const getBooks = () => {
    fetch(`${API_URL}/users`, {method:"GET"})
    .then((data)=>data.json())
    .then((mvs)=>setBooks(mvs));
  };
  useEffect(getBooks, []);

  return(
    <div>
<Buttonbar />
<section className='section-margin'>
{books.map(({image,bookname,author,id})=>(<Bookslit image={image}
 bookname={bookname}
  author={author}
   id={id}/>))}
</section>
    </div>
  );
}



function Bookslit({image,bookname,author,id}){
  const [value, setValue] = React.useState(4);
  const history = useHistory();
  return(
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
  }}
/>
<IconButton onClick={()=>{console.log(id);
  history.push("/booklist/"+id);
  }} color="inherit" aria-label="more-info">
  <MoreVertIcon />
</IconButton>


       </div>
      </div>
    </div>
  );
}


function Bookeditpage(){

  const [books, setBooks] = useState([]);

  const getBooks = () => {
    fetch(`${API_URL}/users`, {method:"GET"})
    .then((data)=>data.json())
    .then((mvs)=>setBooks(mvs));
  };
  
  useEffect(getBooks, []);


const deleteMovie = (id) =>{
  fetch(`${API_URL}/users/${id}`, {method:"DELETE"})
  .then(()=>getBooks());
};

  const history = useHistory();

  return(
    <div>
      <Buttonbar />
<section className='section-margin'>
{books.map(({image,bookname,author,id},index)=>(<Listbookeditpage image={image}
 bookname={bookname} 
 author={author} 
id={index}
deleteButton= {<Button aria-label="delete" color="error"
       onClick={()=> deleteMovie(id)}>
       <DeleteIcon />Delete
     </Button>}
       editButton= {<Button 
        aria-label="edit"  color="success"
       onClick={()=>history.push("/updatebook/edit/" + id)}>
       <EditIcon />Edit
     </Button>}
/>))}
</section>
    </div>
  );
}


function Listbookeditpage({image,bookname,author,editButton,deleteButton}){
  return(
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
     {deleteButton}
     </div>
     </div>
    </div>
  </div>
  );
}


function AddBooks(){

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

const {handleSubmit, values, handleChange, handleBlur, errors, touched} = useFormik({
  initialValues: {image: "", bookname:"", author:"", originallanguage:"", published:"", price:"", genre:"", description:""},

  validationSchema: formvalidationschema,

  onSubmit: (newBooks) => {
    console.log("onsubmit", newBooks);
    addBook(newBooks);
  }
});

const addBook =(newBooks)=>{

console.log(newBooks)
  fetch(`${API_URL}/users`, {
    method:"POST",
    body: JSON.stringify(newBooks),
    headers: {'Content-Type': 'application/json'},
}).then(()=>history.push("/booklist"));
  
};

  return(
<div>
<Buttonbar />
<form onSubmit={handleSubmit} className="in-con">

<TextField id="image" 
      name="image" 
      value = {values.image} 
      onChange={handleChange} 
      onBlur={handleBlur}
       label="upload the book image" 
       error={errors.image && touched.image}
       helperText={errors.image && touched.image && errors.image}
       variant="filled" />
       
     <TextField id="bookname" 
      name="bookname" 
      value = {values.bookname} 
      onChange={handleChange} 
      onBlur={handleBlur}
      label="enter book name"
      error={errors.bookname && touched.bookname}
      helperText={errors.bookname && touched.bookname && errors.bookname}
       variant="filled" />
      

      <TextField id="author" 
      name="author" 
      value = {values.author} 
      onChange={handleChange} 
      onBlur={handleBlur}  
      label="enter book author" 
      error={errors.author && touched.author}
       helperText={errors.author && touched.author && errors.author}
      variant="filled" />
      

      <TextField id="originallanguage" 
      name="originallanguage" 
      value = {values.originallanguage} 
      onChange={handleChange} 
      onBlur={handleBlur}  label="enter language" 
      error= {errors.originallanguage && touched.originallanguage}
      helperText= {errors.originallanguage && touched.originallanguage && errors.originallanguage}
      variant="filled" />
     
      <TextField id="published" 
      name="published" 
      value = {values.published} 
      onChange={handleChange} 
      onBlur={handleBlur}  label="enter published date"
      error=  {errors.published && touched.published}
      helperText= {errors.published && touched.published && errors.published}
      variant="filled" />

<TextField id="price" 
      name="price" 
      value = {values.price} 
      onChange={handleChange} 
      onBlur={handleBlur}  label="enter the price" 
      error= {errors.price && touched.price}
      helperText= {errors.price && touched.price && errors.price}
      variant="filled" />

<TextField id="genre" 
      name="genre" 
      value = {values.genre} 
      onChange={handleChange} 
      onBlur={handleBlur}  label="enter the genre" 
      error= {errors.genre && touched.genre}
      helperText= {errors.genre && touched.genre && errors.genre}
      variant="filled" />

<TextField id="description" 
      name="description" 
      value = {values.description} 
      onChange={handleChange} 
      onBlur={handleBlur}  label="enter the description" 
      error= {errors.description && touched.description}
      helperText= {errors.description && touched.description && errors.description}
      variant="filled" />
     
      <Button type="submit" variant="contained">Add Book</Button>
     
    </form>

    </div>
  );
} 

function EditBook(){
 
  const {id} = useParams();

const [bookdet, setBookdet] = useState(null);
useEffect(()=>{
  fetch(`${API_URL}/users/${id}`, {method:"GET"})
  .then((data)=>data.json())
  .then((mv)=>setBookdet(mv));
}, [id]);

  return bookdet? <UpdateBook bookdet={bookdet}/>:"";
}


function UpdateBook({bookdet}){
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
  

  const {handleSubmit, values, handleChange, handleBlur, errors, touched} = useFormik({
    initialValues: { image: bookdet.image, bookname:bookdet.bookname, author:bookdet.author, originallanguage:bookdet.originallanguage,
       published:bookdet.published,
       price:bookdet.price,
       genre:bookdet.genre,
       description:bookdet.description},

    validationSchema: formvalidationschema,
  
    onSubmit: (updatedBooks) => {
      console.log("onsubmit", updatedBooks);
      editBook(updatedBooks);
    }
  });

  const editBook =(updatedBooks)=>{
   
    console.log(updatedBooks);

  fetch(`${API_URL}/users/${bookdet.id}`, {
    method:"PUT",
    body: JSON.stringify(updatedBooks),
    headers: {'Content-Type': 'application/json'},
}).then(()=>history.push("/booklist"))
  };

  
  return(
    <div>
    <Buttonbar />
    <form onSubmit={handleSubmit} className="in-con">
    
    <TextField id="image" 
          name="image" 
          value = {values.image} 
          onChange={handleChange} 
          onBlur={handleBlur}
           label="upload the book image" 
           error={errors.image && touched.image}
           helperText={errors.image && touched.image && errors.image}
           variant="filled" />
           
         <TextField id="bookname" 
          name="bookname" 
          value = {values.bookname} 
          onChange={handleChange} 
          onBlur={handleBlur}
          label="enter book name"
          error={errors.bookname && touched.bookname}
          helperText={errors.bookname && touched.bookname && errors.bookname}
           variant="filled" />
          
    
          <TextField id="author" 
          name="author" 
          value = {values.author} 
          onChange={handleChange} 
          onBlur={handleBlur}  
          label="enter book author" 
          error={errors.author && touched.author}
           helperText={errors.author && touched.author && errors.author}
          variant="filled" />
          
    
          <TextField id="originallanguage" 
          name="originallanguage" 
          value = {values.originallanguage} 
          onChange={handleChange} 
          onBlur={handleBlur}  label="enter language" 
          error= {errors.originallanguage && touched.originallanguage}
          helperText= {errors.originallanguage && touched.originallanguage && errors.originallanguage}
          variant="filled" />
         
          <TextField id="published" 
          name="published" 
          value = {values.published} 
          onChange={handleChange} 
          onBlur={handleBlur}  label="enter published date"
          error=  {errors.published && touched.published}
          helperText= {errors.published && touched.published && errors.published}
          variant="filled" />
    
    <TextField id="price" 
          name="price" 
          value = {values.price} 
          onChange={handleChange} 
          onBlur={handleBlur}  label="enter the price" 
          error= {errors.price && touched.price}
          helperText= {errors.price && touched.price && errors.price}
          variant="filled" />
    
    <TextField id="genre" 
          name="genre" 
          value = {values.genre} 
          onChange={handleChange} 
          onBlur={handleBlur}  label="enter the genre" 
          error= {errors.genre && touched.genre}
          helperText= {errors.genre && touched.genre && errors.genre}
          variant="filled" />
    
    <TextField id="description" 
          name="description" 
          value = {values.description} 
          onChange={handleChange} 
          onBlur={handleBlur}  label="enter the description" 
          error= {errors.description && touched.description}
          helperText= {errors.description && touched.description && errors.description}
          variant="filled" />
         
          <Button type="submit" variant="contained">Edit Book</Button>
         
        </form>
    
        </div>
      );
}

function LoginPage() {
  const history = useHistory();
  const formvalidationschema = yup.object({
    email: yup.string().min(5, "need a bigger email").required(),
    password: yup.string().min(5).max(12).required(),
  });

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: formvalidationschema,

    onSubmit: (newlogin) => {
      console.log("onsubmit", newlogin);
      addData(newlogin);
    }
  });

  const addData = (newlogin) => {
    console.log(newlogin);
    fetch(`${API_URL}/login`, {
      method: "POST",
      body: JSON.stringify(newlogin),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      if (response.status === 401) {
        history.push("/loginfailed");
      } else {
        history.push("/homepage");
      }

    });

  };

  return (
    <section className='login-page-background'>
    <form className="login-page" onSubmit={handleSubmit}>

      <p className="login-head">Login</p>
      <p className="please">Please enter your e-mail id and Password</p>

      <TextField
      variant="outlined"
       id="email"
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
        type="email"
        error={errors.email && touched.email}
        helperText={errors.email && touched.email && errors.email}
        placeholder="Enter your Email" />


      <TextField 
      variant="outlined"
      id="password"
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
        type="password"
        autoComplete="current-password"
        error={errors.password && touched.password}
        helperText={errors.password && touched.password && errors.password}
        placeholder="Enter your Password" />

      <Button variant="contained" type="submit">log in</Button>
      <div className='signup-link'>
      <p  className="please">Don't have an account ?</p>
      <p onClick={()=>history.push("/signup")} className="signup-word">SIGN UP</p>
    </div>
      <div>
      <p className="please">Sample Credentials</p>
        <p>Email: test@gmail.com</p>
        <p>Password: password123@</p>
        
      </div>
    </form>
    </section>
  );
}

function LoginFailed() {
  return (
    <div>
      <img className="failed" src="https://icon-library.com/images/red-cross-icon-png/red-cross-icon-png-27.jpg" alt="Login failed" />
      <h2>Invalid Credentials</h2>
    </div>
  );
}


function SignupPage() {
  const history = useHistory();
  const formvalidationschema = yup.object({
    email: yup.string().min(5, "need a bigger email").required(),
    password: yup.string().min(5).max(12).required(),
  });

  const { handleSubmit, values, handleChange, handleBlur, errors, touched } = useFormik({
    initialValues: { email: "", password: "" },
    validationSchema: formvalidationschema,

    onSubmit: (newSignup) => {
      console.log("onsubmit", newSignup);
      addData(newSignup);
    }
  });
  const addData = (newSignup) => {
    console.log(newSignup);
    fetch(`${API_URL}/signup`, {
      method: "POST",
      body: JSON.stringify(newSignup),
      headers: { 'Content-Type': 'application/json' },
    }).then((response) => {
      if (response.status === 400) {
        history.push("/signupfailed");
      } else {
        history.push("/homepage");
      }
    });
  };
  return (
    <section className='login-page-background'>
    <form className="login-page" onSubmit={handleSubmit}>
      <div className="login-page">
        <p className="login-head">sign up</p>
        <p className="please">Please enter your e-mail id and Password</p>
        <TextField 
         variant="outlined"
        id="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          onBlur={handleBlur}
          type="email"
          error={errors.email && touched.email}
          helperText={errors.email && touched.email && errors.email}
          placeholder="Enter your Email" />

        <TextField
         variant="outlined"
        id="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          onBlur={handleBlur}
          type="password"
          autoComplete="current-password"
          error={errors.password && touched.password}
          helperText={errors.password && touched.password && errors.password}
          placeholder="Enter your Password" />
        <Button variant="contained" type="submit">sign up</Button>

        <div>
        <p className="please">Sample Credentials</p>
          <p>Email: test@gmail.com</p>
          <p>Password: password123@</p>
        </div>
      </div>
    </form>
    </section>
  );
}

function SignupFailed() {
  return (
    <div>
      <img className="failed" src="https://icon-library.com/images/red-cross-icon-png/red-cross-icon-png-27.jpg" alt="signup failed" />
      <h2>email already exists or password must be longer</h2>
    </div>
  );
}




// const booklist = [{
//   id: "100",
//   image:"https://images-na.ssl-images-amazon.com/images/I/81-QB7nDh4L.jpg",
//   bookname :"The Lean Startup",
//   author:"Eric Ries",
//   originallanguage: "English",
//   published: "2011",
//   price:"₹591",
//   genre: "Business, non-fiction, Entrepreneurship",
//   description: "How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses is a book by Eric Ries describing his proposed lean startup strategy for startup companies. Ries developed the idea for the lean startup from his experiences as a startup advisor, employee, and founder." 
// },
// {
//   id: "101",
//   image:"https://images-na.ssl-images-amazon.com/images/I/71m-MxdJ2WL.jpg",
//   bookname :"Zero to One",
//   author:"Blake Masters and Peter Thiel",
//   originallanguage: "English",
//   published: "16 September 2014",
//   price:"₹439",
//   genre: "Business, Politics & Government",
//   description: "Notes on Startups, or How to Build the Future is a 2014 book by the American entrepreneur and investor Peter Thiel co-written with Blake Masters. " 
// },
// {
//   id: "102",
//   image:"https://images-na.ssl-images-amazon.com/images/I/61IysQbfC8L.jpg",
//   bookname :"How to win friends and influence people. How to stop worrying and start living",
//   author:"Dale Carnegie",
//   originallanguage: "English",
//   published: "October 1936",
//   price:"₹480",
//   genre: "Self-help book",
//   description: "How to Win Friends and Influence People is a self-help book written by Dale Carnegie, published in 1936. Over 30 million copies have been sold worldwide, making it one of the best-selling books of all time. Carnegie had been conducting business education courses in New York since 1912." 
// },
// {
//   id: "103",
//   image:"https://images-na.ssl-images-amazon.com/images/I/81DGMjAzdhL.jpg",
//   bookname :"The $100 Startup",
//   author:"Chris Guillebeau",
//   originallanguage: "English",
//   published: "8 May 2012",
//   price:"₹420",
//   genre: "Self-help book",
//   description: "Here, Chris Guillebeau shows you how to lead a life of adventure, meaning and purposeand earn a good living. Still in his early thirties, Chris has traveled around the world and yet he's never held a real job or earned a regular paycheck." 
// },
// {
//   id: "104",
//   image:"https://m.media-amazon.com/images/I/41n59Q4-LoL.jpg",
//   bookname :"The Entrepreneur Mind: 100 Essential Beliefs, Characteristics, and Habits of Elite Entrepreneurs",
//   author:"Kevin Johnson",
//   originallanguage: "English",
//   published: "22 January 2013",
//   price:"₹580",
//   genre: "Self-help book",
//   description: "100 Essential Beliefs, Characteristics and Habits of Elite EntrepreneursWhat Every Successful Entrepreneur Knows But Won’t Tell YouAchieve unimaginable business success and financial wealth." 
// },
// {
//   id: "105",
//   image:"https://images-na.ssl-images-amazon.com/images/I/81QuDuf5p8L.jpg",
//   bookname :"Steve Jobs",
//   author:"Walter Isaacson",
//   originallanguage: "English",
//   published: "24 October 2011",
//   price:"₹560",
//   genre: "Biography",
//   description: "Steve Jobs is the authorized self-titled biography of American business magnate and Apple co-founder Steve Jobs. The book was written at the request of Jobs by Walter Isaacson, a former executive at CNN and TIME who has written best-selling biographies of Benjamin Franklin and Albert Einstein." 
// },
// {
//   id: "106",
//   image:"",
//   bookname :"Your Next Five Moves: Master the Art of Business Strategy",
//   author:"Greg Dinkin and Patrick Bet-David",
//   originallanguage: "English",
//   published: "18 August 2020",
//   price:"₹390",
//   genre: "Self-help book",
//   description: "From the creator of Valuetainment, the #1 YouTube channel for entrepreneurs, and “one of the most exciting thinkers” (Ray Dalio, author of Principles) in business today, comes a practical and effective." 
// },
// {
//   id: "107",
//   image:"https://images-na.ssl-images-amazon.com/images/I/71HF+8cwtaL.jpg",
//   bookname :"Lost and Founder: A Painfully Honest Field Guide to the Startup World",
//   author:"Rand Fishkin",
//   originallanguage: "English",
//   published: "26 February 2018",
//   price:"₹630",
//   genre: "Biography",
//   description: "Rand Fishkin, the founder and former CEO of Moz, reveals how traditional Silicon Valley wisdom leads far too many startups astray, with the transparency and humor that his hundreds of thousands of ..." 
// },
// {
//   id: "108",
//   image:"https://images-na.ssl-images-amazon.com/images/I/71vzpPj921L.jpg",
//   bookname :"The Tipping Point: How Little Things Can Make a Big Difference",
//   author:"Malcolm Gladwell",
//   originallanguage: "English",
//   published: "2000",
//   price:"₹450",
//   genre: "Non-fiction",
//   description: "The Tipping Point: How Little Things Can Make a Big Difference is the debut book by Malcolm Gladwell, first published by Little, Brown in 2000. Gladwell defines a tipping point as the moment of critical mass, the threshold, the boiling point." 
// }
// ]