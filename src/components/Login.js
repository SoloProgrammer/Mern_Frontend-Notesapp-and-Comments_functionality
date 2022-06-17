import React, { useState,useContext } from 'react'
import { Link,useNavigate } from 'react-router-dom'
import noteContext from '../context/notes/noteContext';

function Login(props) {

    const context = useContext(noteContext)

    const {setAllusers} = context

    let navigate = useNavigate();
    const host = "http://localhost:5000"

    const [credentials, setCredentails] = useState({
        email: "",
        password: "",
    })
    const Onchange = (e) => {
        setCredentails({ ...credentials, [e.target.name]: e.target.value })
    }
    const Handlesubmit = async (e) => {
         
        e.preventDefault()

        const { email,password } = credentials
        const res = await fetch(`${host}/api/auth/authenticate_user`,
            {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify({ email,password })
            })
        
        const json = await res.json();

        // console.log(json)
            
        if(json.Admin){
            console.log(json.users)
            await setAllusers(json.users);   
            navigate("/Admin")
            localStorage.setItem('token',true)
        }
        else{

            if(json.success === true){
                props.show_Alert("Loggin Sucessfull,Add Notes now!!","success")
                navigate("/") //// async function in nature
                setCredentails({
                    email: "",
                    password: "",
                })

                // console.log(json)
                
                localStorage.setItem('token',json.authToken) 
                
            }
            else{
                props.show_Alert(json.errormsg,"danger");
            }

        }
    }

    return (
        <>
            <div className="Box">
                <div className="Box_box">
                    <h2 className='text-center'><img className="mx-2" style={{width:"55px"}} src="https://th.bing.com/th/id/OIP.j-HY8eeVUii9GKcuNSjGGAHaHa?pid=ImgDet&rs=1" alt="cloud.png"/> Welcome to inotebook <img className="mx-2" style={{width:"55px"}} src="https://th.bing.com/th/id/OIP.j-HY8eeVUii9GKcuNSjGGAHaHa?pid=ImgDet&rs=1" alt="cloud.png" /> </h2>
                    <h6 style={{color:"#12c512"}} className='text-center'>Storing Your Notes on cloud which is only asccessible to you.</h6>
                    <p className='text-center'>Login to access inotebook for free ,OR</p>
                    <Link style={{ "display": "block" }} className='text-center signup_btn' to="/Signup">Signup</Link>
                    <form className='accout_form my-3' onSubmit={Handlesubmit}>
                        <div className="form-group">
                            <label  className='my-2' htmlFor="email"><i className="fa-solid fa-envelope mx-1"></i>Email address</label>
                            <input required value={credentials.email} onChange={Onchange} autoComplete='false' type="email" className="form-control" name='email' id="email" aria-describedby="emailHelp" placeholder="Enter email" />
                            <small className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label className='my-2' htmlFor="password"><i className="fa-solid fa-key mx-1"></i>Password</label>
                            <input required value={credentials.password} onChange={Onchange} autoComplete='false' type="password" name='password' className="form-control" id="password" placeholder="Password" />
                        </div>
                        <div className="login_btn">
                            <button type="submit" className="btn btn-primary my-3">Login</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Login
