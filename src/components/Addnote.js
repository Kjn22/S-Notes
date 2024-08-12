import React,{useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext';
export default function Addnote(props) {
    const context=useContext(noteContext);
  const {addNote}=context;
  const [note, setNote] = useState({title:"" ,description:"",tag:""})
  const handleAdd=(e)=>{
    e.preventDefault()
    addNote(note.title,note.description,note.tag)
    setNote({title:"" ,description:"",tag:""})
    props.showAlert("Note Added Successfully","success")
  }
  const onChange=(e)=>{
        setNote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div>
        <div className="container my-2" style={{color:props.mode==='light'?'black':'white'}}>
    <h1>Add A Note</h1>
    <form>
  <div className="mb-2">
    <label htmlFor="title" className="form-label">Title</label>
    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} minLength={3} required value={note.title} style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}/>
  </div>
  <div className="mb-2">
    <label htmlFor="description" className="form-label">Description</label>
    <input type="text" className="form-control" id="description" name="description" onChange={onChange} minLength={5} required value={note.description} style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}/>
  </div>
  <div className="mb-2">
    <label htmlFor="tag" className="form-label">Tag</label>
    <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} value={note.tag} style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}/>
  </div>
  <button disabled={note.title.length<3||note.description.length<5} type="submit" className="btn btn-primary" onClick={handleAdd}>Add Note</button>
</form>
    </div>
    </div>
  )
}
