import React,{useContext,useEffect} from 'react'
import {useHistory} from 'react-router'
import noteContext from '../context/notes/noteContext'
export default function About(props) {
  const context=useContext(noteContext);
  const {notes}=context;
  let history=useHistory()
  useEffect(() => {
    if(!localStorage.getItem('token')){
      history.push('/login')
    }
  }
  // eslint-disable-next-line
  , [])
  return (
    <div>
      <div class="card container" style={{width: '18rem',marginTop:'50px',color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black',border:props.mode==='light'?'2px solid black':'2px solid white'}}>
  <i class="fa-solid fa-user d-flex justify-content-center mt-2 display-5"></i>
  <div class="card-body">
    <h5 class="card-title text-center">Welcome to S-notes</h5>
    <p class="fw-bolder card-text text-center">About You</p>
  </div>
  <ul class="list-group list-group-flush">
    <li class="list-group-item" style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}><p class="d-inline fw-semibold">Name:</p>&nbsp;&nbsp;{localStorage.getItem('user-name')}</li>
    <li class="list-group-item" style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}><p class="d-inline fw-semibold">Email:</p>&nbsp;&nbsp;{localStorage.getItem('user-email')}</li>
    <li class="list-group-item" style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}><p class="d-inline fw-semibold">Notes:</p>&nbsp;&nbsp;{notes.length}</li>
  </ul>
</div>
    </div>
  )
}
