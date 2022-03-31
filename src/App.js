
import './App.css';
import * as React from 'react';
import {useEffect, useState} from "react";
import { Switch, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import MenuIcon from '@mui/icons-material/Menu';
import { EditBook } from './editdetails/EditBook';
import { AddBooks } from './addbook/AddBooks';
import { Bookeditpage } from './editdetails/Bookeditpage';
import { Booklist } from './booklist/Booklist.1';
import { BookDetails } from './booklist/BookDetails';


export const API_URL = "https://book-app-node.herokuapp.com";

function App(){

  const [books, setBooks] = useState([]);
  
  console.log(books);
  useEffect(()=>{
    fetch(`${API_URL}/book`, {method:"GET"})
    .then((data)=>data.json())
    .then((mvs)=>setBooks(mvs));
  }, []);
 
  return (

    <div className="App">   

      <Switch>
    

        <Route exact path="/">
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




export function Buttonbar(){
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
     <p varient="text" className='button' onClick={()=>history.push("/")}>Home</p>
      <p varient="text" className='button' onClick={()=>history.push("/booklist")}>Books</p>
      <p varient="text" className='button' onClick={()=>history.push("/addbooks")}>Addbooks</p>
      <p varient="text" className='button' onClick={()=>history.push("/updatebook")}>Editbook</p>
      </div>:""
      }

      <div className='button-flex-div'>
     <p varient="text" className='button' onClick={()=>history.push("/")}>Home</p>
      <p varient="text" className='button' onClick={()=>history.push("/booklist")}>Books</p>
      <p varient="text" className='button' onClick={()=>history.push("/addbooks")}>Addbooks</p>
      <p varient="text" className='button' onClick={()=>history.push("/updatebook")}>Editbook</p>
     
      </div>
    </div>
  );
}


