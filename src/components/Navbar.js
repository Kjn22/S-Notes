import React from 'react'
import {Link,useLocation} from 'react-router-dom'
import {useHistory} from "react-router"
export default function Navbar(props) {
  let location=useLocation();
  let history=useHistory()
  const handleLogout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('user-name')
    localStorage.removeItem('user-email')
    props.showAlert("Logged Out Successfully","success")
    history.push("/login")
  }
  return (
    <>
    <nav className={`navbar navbar-expand-lg navbar-${props.mode} bg-${props.mode}`}>
  <div className="container-fluid">
    <Link className="navbar-brand" to="/">S-Notes</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/"?"active":""}`} aria-current="page" to="/">Home</Link>
        </li>
        <li className="nav-item">
          <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">About</Link>
        </li>
      </ul>
      <div className={`form-check form-switch text-${props.mode==='light'?'dark':'light'} mx-2`}>
      <input className="form-check-input" type="checkbox" role="switch" id="flexSwitchCheckDefault"onClick={props.toggleMode}/>
      <label className="form-check-label" htmlFor="flexSwitchCheckDefault">{props.dark}</label>
      </div>
      {!localStorage.getItem('token')?<form className="d-flex" role="search">
      <Link className="btn btn-primary mx-2" to="/signup" role="button">Signup</Link>
      <Link className="btn btn-primary mx-2" to="/login" role="button">Login</Link>
      </form>:<button onClick={handleLogout} className="btn btn-primary">Logout</button>}
    </div>
  </div>
</nav>
    </>
  )
}
