import React,{useState} from 'react'
import { useHistory } from 'react-router'

export default function Login(props) {
    const [credentials,setCredentials] = useState({email:"",password:""})
    let history=useHistory()
    const handleSubmit=async (e)=>{
        const host="http://127.0.0.1:5000"
        e.preventDefault()
        const response = await fetch(`${host}/api/auth/login`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({email:credentials.email,password:credentials.password})
          });
          const json=await response.json();
          if(json.success){
            localStorage.setItem('token',json.authToken)
            localStorage.setItem('user-name',json.about.name)
            localStorage.setItem('user-email',json.about.email)
            props.showAlert("Logged In Successfully","success")
            history.push("/")
          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }
    }
    const onChange=(e)=>{
        setCredentials({...credentials,[e.target.name]:e.target.value})
    }
  return (
    <div className="my-3" style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}>
        <h2>Login to S-Notes</h2>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} id="password" name="password" onChange={onChange} style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
