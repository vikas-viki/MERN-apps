import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import AboutUs from "./Components/AboutUs";
import Alert from "./Components/Alert";
import Homepage from "./Components/Homepage";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Signup from "./Components/Signup";
import NotesState from "./Contexts/notes/NoteState";
import UserState from "./Contexts/user/UserState";
import {useState} from "react"

function App() {

  const [alert, setAlert] = useState(null);  
  
  const showMsg = (message,type)=>{

    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null)
    }, 2000);

  }
  return (
    <UserState>
      <NotesState>
        <Router>
          <Navbar />
          <Alert alert={alert}/>
          <div className="container">
            <Routes>
              <Route exact path='/' element={<Homepage showAlert={showMsg}/>} />
              <Route exact path='/about' element={<AboutUs showAlert={showMsg}/>} />
              <Route exact path='/login' element={<Login showAlert={showMsg}/>} />
              <Route exact path='/signup' element={<Signup showAlert={showMsg}/>} />
            </Routes>
          </div>
        </Router>
      </NotesState>
      </UserState>
  );
}

export default App;
