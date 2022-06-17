import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'


function Admin() {

    const context = useContext(noteContext)
    const {allusers,setAllusers} = context
  return (
    <>
    {<h1>
      Welcome Admin
      {/* {console.log(allusers)} */}
    </h1>}
    <div className="container">
        {
            allusers.map((user,index) =>{
               return (
               <p key={index}>{user.email}</p>)
            })
        }
    </div>
    </>
  )
}

export default Admin
