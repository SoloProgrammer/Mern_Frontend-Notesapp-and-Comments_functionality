import React, { useState } from 'react'
import { Link,useNavigate } from 'react-router-dom'

function Signup(props) {

    const [credentials, setCredentails] = useState({
        name1: "",
        email: "",
        password: "",
        cpassword: ""

    })
    let navigate = useNavigate();
    const host = "http://localhost:5000"
    const Onchange = (e) => {
        setCredentails({ ...credentials, [e.target.name]: e.target.value })
    }
    const Handlesubmit = async (e) => {
        e.preventDefault();

        const { name1, email, password, cpassword } = credentials

        if (password !== cpassword) {
           props.show_Alert("Password and confirm password must match..","danger")
        }

        else {

            const res = await fetch(`${host}/api/auth/createuser`,
                {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json"
                    },
                    body: JSON.stringify({ name1, email, password })

                })

            // console.log(res)
            const json = await res.json()
            console.log(json)

            if (json.success === true) {
                setCredentails({
                    name1: "",
                    email: "",
                    password: "",
                    cpassword: ""
                })
                // Redirect to login page
                props.show_Alert("yayy!,Account Created Successfully ,Now You Can Login..Here","success")
                navigate("/Login")
            }
            else {
                let errors = json.errors;
                
                errors && props.show_Alert(errors[0].msg,"danger")
                json.errormsg && props.show_Alert(json.errormsg,"info")
            }
        }


    }
    return (
        <>
            <div className="Box">
                <div className="Box_box">
                <h2 className='text-center'><img style={{width:"55px"}} className="mx-2" src="https://th.bing.com/th/id/OIP.j-HY8eeVUii9GKcuNSjGGAHaHa?pid=ImgDet&rs=1" alt="cloud.png"/> Welcome to inotebook <img style={{width:"55px"}} src="https://th.bing.com/th/id/OIP.j-HY8eeVUii9GKcuNSjGGAHaHa?pid=ImgDet&rs=1" className="mx-2" alt="cloud.png" /> </h2>
                    <h6 style={{color:"#12c512"}} className='text-center'>Storing Your Notes on cloud which is only asccessible to you</h6>

                    <p className='text-center'>Create an Account for free , OR</p>
                    <Link style={{ "display": "block" }} className='text-center signup_btn' to="/Login">Login</Link>
                    <form className='accout_form my-3' onSubmit={Handlesubmit}>
                        <div className="form-group">
                            <label className='my-2' htmlFor="exampleInputEmail1"><i className="fa-solid fa-user mx-1"></i>Full Name</label>
                            <input minLength={3} required value={credentials.name1} onChange={Onchange} autoComplete='false' type="text" className="form-control" id="name" name='name1' aria-describedby="emailHelp" placeholder="Enter name..." />
                        </div>
                        <div className="form-group">
                            <label className='my-2' htmlFor="exampleInputPassword1"><i className="fa-solid fa-envelope mx-1"></i>Email</label>
                            <input required value={credentials.email} onChange={Onchange} autoComplete='false' type="email" className="form-control" name='email' id="email" placeholder="Email..." />
                        </div>
                        <div className="form-group">
                            <label className='my-2' htmlFor="exampleInputPassword1"><i className="fa-solid fa-key mx-1"></i>Password</label>
                            <input  required value={credentials.password} onChange={Onchange} autoComplete='false' type="text" name='password' className="form-control" id="password" placeholder="Password..." />
                        </div>
                        <div className="form-group">
                            <label className='my-2' htmlFor="exampleInputPassword1"><i className="fa-solid fa-key mx-1"></i>Confirm Password</label>
                            <input value={credentials.cpassword} onChange={Onchange} required autoComplete='false' type="password" name='cpassword' className="form-control" id="cpassowrd" placeholder="Confirm Password..." />
                        </div>
                        <div className="login_btn">
                            <button type="submit" className="btn btn-primary my-3">Sign-Up</button>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Signup
