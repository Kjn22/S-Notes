import React,{useState} from 'react'
import {useHistory} from 'react-router'
export default function Signup(props) {
  const [credentials,setCredentials] = useState({name:"",email:"",password:"",cpassword:""})
    let history=useHistory()
    const handleSubmit=async (e)=>{
      const host="http://127.0.0.1:5000"
      e.preventDefault()
      if(credentials.password===credentials.cpassword){
        const response = await fetch(`${host}/api/auth/createuser`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name:credentials.name,email:credentials.email,password:credentials.password})
          });
          const json=await response.json();
          console.log(json)
          if(json.success){
            localStorage.setItem('token',json.authToken)
            localStorage.setItem('user-name',json.about.name)
            localStorage.setItem('user-email',json.about.email)
            props.showAlert("Account Created Successfully","success")
            history.push("/")
          }
          else{
            props.showAlert("Invalid Credentials","danger")
          }
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
      <h2>Sign Up to S-Notes</h2>
      <form onSubmit={handleSubmit}>
      <div className="mb-3">
    <label htmlFor="name" className="form-label">Name</label>
    <input type="text" className="form-control" minLength={3} required value={credentials.name} id="name" name="name" onChange={onChange} style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="email" className="form-label">Email address</label>
    <input type="email" className="form-control" value={credentials.email} id="email" name="email" aria-describedby="emailHelp" onChange={onChange} style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}/>
    <div id="emailHelp" className="form-text" style={{color:props.mode==='light'?'black':'white'}}>We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="password" className="form-label">Password</label>
    <input type="password" className="form-control" value={credentials.password} id="password" minLength={5} required name="password" onChange={onChange} style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}/>
  </div>
  <div className="mb-3">
    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
    <input type="password" className="form-control" value={credentials.cpassword} id="cpassword" name="cpassword" onChange={onChange} style={{color:props.mode==='light'?'black':'white',backgroundColor:props.mode==='light'?'white':'black'}}/>
  </div>
  <button type="submit" className="btn btn-primary">Submit</button>
</form>
    </div>
  )
}
