import React,{useState} from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Alert from "./components/Alert";
function App() {
  const [alert, setAlert] = useState("")
  const[mode,setMode]=useState('light')
  const[dark,setDark]=useState('Dark Mode')
  const showAlert=(message,type)=>{
    setAlert({
      msg:message,
      type:type
    })
    setTimeout(() => {
      setAlert(null);
    }, 1500);
}
const toggleMode=()=>{
  if(mode==='light'){
    setMode('dark')
    document.body.style.backgroundColor='black'
    showAlert("Dark Mode Enabled","success")
    setDark('Light Mode')
  }
  else if(mode==='dark'){
    setMode('light')
    document.body.style.backgroundColor='white'
    showAlert("Light Mode Enabled","success")
    setDark('Dark Mode')
  }
}
  return (
    <>
    <NoteState>
    <Router>
      <Navbar showAlert={showAlert} mode={mode} toggleMode={toggleMode} dark={dark}/>
      <Alert alert={alert}/>
      <div className="container">
      <Switch>
          <Route exact path="/">
            <Home showAlert={showAlert} mode={mode}/>
          </Route>
          <Route exact path="/about">
            <About mode={mode}/>
          </Route>
          <Route exact path="/login">
            <Login showAlert={showAlert} mode={mode}/>
          </Route>
          <Route exact path="/signup">
            <Signup showAlert={showAlert} mode={mode}/>
          </Route>
        </Switch>
        </div>
    </Router>
    </NoteState>
    </>
  );
}

export default App;
