
import './App.css';
import Navbar from './components/Navbar';

import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './components/Home';
import About from './components/About';
import NoteState from './context/notes/NotesState';
import Login from './components/Login';
import Signup from './components/Signup';
import Alert from './components/Alert';
import {useState} from 'react';
import Comments from './components/Comments';


function App() {

  const [alert,setAlert] = useState(null)

  const show_Alert = (message,type) =>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 3000);
  }

  return (
    <>
    <NoteState>
      <BrowserRouter>
          <Navbar show_Alert={show_Alert}/>
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              
                {
                  
                    localStorage.getItem("token") ?<Route  exact path="/" element={<Home show_Alert={show_Alert}/>}/>
                    : <Route exact path="/" element={ <Login show_Alert={show_Alert} />}/>
                }
                {
                  
                    localStorage.getItem("token") ?<Route  exact path="/Blog" element={<Comments show_Alert={show_Alert}/>}/>
                    : <Route exact path="/Blog" element={ <Login show_Alert={show_Alert} />}/>
                }
              

              <Route exact path="/about" element={ <About/>}/>
              
              <Route exact path="/Login" element={ <Login show_Alert={show_Alert} />}/>

              <Route exact path="/Signup" element={ <Signup show_Alert={show_Alert}/>}/>
            
            </Routes>

          </div>
      </BrowserRouter>
    </NoteState>

  
    </>
  );
}

export default App;
