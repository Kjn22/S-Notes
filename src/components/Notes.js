import React,{useContext,useEffect,useRef,useState} from 'react'
import {useHistory} from 'react-router'
import noteContext from '../context/notes/noteContext';
import Noteitem from './Noteitem';
import Addnote from './Addnote';
export default function Notes(props) {
    const context=useContext(noteContext);
  const {notes,getNote,editNote}=context;
  const [note, setNote] = useState({id:" ",etitle:"" ,edescription:"",etag:""})
  let history=useHistory();
  useEffect(() => {
    if(localStorage.getItem('token')){
      getNote()
    }
    else{
      history.push('/login')
    }
  }
  // eslint-disable-next-line
  , [])
  const updateNote=(currentnote)=>{
    ref.current.click()
    setNote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.description,etag:currentnote.tag})
  }
  const handleEdit=(e)=>{
    e.preventDefault()
    editNote(note.id,note.etitle,note.edescription,note.etag)
    refClose.current.click()
    props.showAlert("Updated Successfully","success")
  }
  const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
  }
  const ref = useRef(null)
  const refClose= useRef(null)
  return (
    <>
    <Addnote showAlert={props.showAlert} mode={props.mode}/>
    <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
  Launch demo modal
</button>
<div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel"  aria-hidden="true">
  <div className="modal-dialog">
    <div className="modal-content" style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black',border:props.mode==='light'?'2px solid black':'2px solid white'}}>
      <div className="modal-header">
        <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div className="modal-body">
      <form>
  <div className="mb-3">
    <label htmlFor="etitle" className="form-label">Title</label>
    <input type="text" className="form-control" id="etitle" name="etitle" value ={note.etitle} aria-describedby="emailHelp" onChange={onChange} minLength={3} required style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="edescription" className="form-label">Description</label>
    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} minLength={5} required style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="etag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}/>
  </div>
</form>
      </div>
      <div className="modal-footer">
        <button ref={refClose} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button disabled={note.etitle.length<3||note.edescription.length<5} type="button" className="btn btn-primary" onClick={handleEdit}>Update Note</button>
      </div>
    </div>
  </div>
</div>
    <div className="row my-2" style={{color:props.mode==='light'?'black':'white'}}>
         <h2>Your Notes</h2>
         <div className="container mx-1 fs-3">
         {notes.length===0&&"No notes to display"}
         </div>
    {notes.map((notes)=>{
       return <Noteitem key={notes._id} updateNote={updateNote} showAlert={props.showAlert} notes={notes} mode={props.mode}/>
    })}
    </div>
    </>
  )
}
