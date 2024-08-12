import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext';
export default function Noteitem(props) {
  const context=useContext(noteContext);
    const {notes,updateNote}=props
    const {deleteNote}=context
  return (
    <div className="col-md-3">
        <div className="card my-2" style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black',border:props.mode==='light'?'2px solid black':'2px solid white'}}>
  <div className="card-body">
    <h5 className="card-title">{notes.title}</h5>
    <p className="card-text">{notes.description}</p>
    <i className="fa-solid fa-trash mx-2" onClick={()=>{
      deleteNote(notes._id)
      props.showAlert("Deleted Successfully","success")
    }}></i>
    <i className="fa-solid fa-pen-to-square mx-2" onClick={()=>{
      updateNote(notes)
    }}></i>
  </div>
</div>
    </div>
  )
}
