import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {

  const host = "http://localhost:5000"

  const getallnotes = async () => {
    const res = await fetch(`${host}/api/note/fetchallnotes`,
      {
        method: "GET",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        }
      })
    const Json = await res.json();
    
    setNotes(Json.notes)

    return Json
  }



  let Initialnotes = []
  const [notes, setNotes] = useState(Initialnotes)

  const addnote = async (title, description, tag,show_Alert,setNote) => {

    //Api Call
    const res = await fetch(`${host}/api/note/Addanote`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag })

      })

    // if(res.)

    const notedetail = {
      title:"",
      description:"",
      tag:""
    }
    const json = await res.json()

    // console.log(json)

    if(json.status){
      show_Alert("Note Added Sucessfully", "info")
      getallnotes();
      setNote(notedetail)
    }
    else{
      show_Alert("Note tag should not contain numbers", "danger")

    }

  }



  const Deletenote = async (id,show_Alert) => {
    // TODO Api call
    // Api Call
    const res = await fetch(`${host}/api/note/Deletenote/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        }

      })
    const newnote = notes.filter((note) => { return note._id !== id })
    show_Alert("Note Deleted","success")
    // console.log(id)
    setNotes(newnote);
  }
  const Updatenote = async (id, title, description, tag,show_Alert) => {
    const res = await fetch(`${host}/api/note/Updatenote/${id}`,
      {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ title, description, tag })

      })

    let updatednotes = await getallnotes();

    setNotes(updatednotes.notes)

    show_Alert("Note Updated Successfully","success")

  }

  const [userdetail,setUserdetail] = useState([])

  const Getuser = async () => {
    const res = await fetch(`${host}/api/auth/getuser`,
    {
      method: "POST",
      headers: {
        "auth-token": localStorage.getItem("token")
      }
    })

    const json = await res.json()

    // console.log(json)
    
    setUserdetail({
      "Name":json.name1,
      "Email":json.email,
      "id":json._id
    })

    
  }

  // Get all comments of all users

  const [allcommets,setAllcomments] = useState([])

  const getallcommets = async () => {
    const res = await fetch(`${host}/api/comment/fetchallComments`,
      {
        method: "GET",
        headers: {
          "auth-token": localStorage.getItem("token")
        }
      })
    const Json = await res.json();

    setAllcomments(Json)
    // console.log(Json)

    return Json
  }


  const Addcomment = async (comment) =>{
    const res = await fetch(`${host}/api/comment/Addcomment`,
      {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "auth-token": localStorage.getItem("token")
        },
        body: JSON.stringify({ comment })
      })

    // const Json = await getallcommets();
    // setAllcomments(Json)
    
    // console.log(Json)
    
    getallcommets();
    
  }

  // deleting commemt

  const DeleteComment = async (id,show_Alert) => {
    // TODO Api call
    // Api Call
    const res = await fetch(`${host}/api/comment/DeleteComment/${id}`,
      {
        method: "DELETE",

      })
    const newallcommets = allcommets.filter((comm) => { return comm._id !== id })
    show_Alert("Comment Deleted","success")
    // console.log(id)
    // setNotes(newnote);

    setAllcomments(newallcommets);
    // console.log(newallcommets)
  }

  /// liking the comment..................

  const Like = async (id) =>{
    const res = await fetch(`${host}/api/comment/Like/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
      
      body: JSON.stringify({ "like":true,"dislike":false })
    })
    getallcommets();

  }
  /// Disliking the comment..................

  const Dislike = async (id) =>{
    const res = await fetch(`${host}/api/comment/DisLike/${id}`,
    {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token":localStorage.getItem("token")
      },
    
      body: JSON.stringify({ "like":false,"dislike":true })
    })
  getallcommets();

  // setAllcomments(Json)

  }

  const Reply = async (id,reply) =>{
    // const {reply} = reply
    const res = await fetch(`${host}/api/comment/Reply/${id}`,
    {
      method:"PUT",
      headers: {
        "Content-type": "application/json",
        "auth-token":localStorage.getItem("token")
      },

      body: JSON.stringify({ reply })
      
    })
    getallcommets();

    // const json = await res.json();
  }

  //// deleting users reply ...................

  const Delete_rep = async (reply,id,rep_id) =>{

    // console.log(id,reply)

    const res = await fetch(`${host}/api/comment/Del_rep/${id}`,
    {
      method:"PUT",
      headers: {
        "Content-type": "application/json",
      },

      body: JSON.stringify({ reply,rep_id })
      
    })
    getallcommets();

  }

  //// Get all users from collection. for admin..............
  const[allusers,setAllusers] = useState([])
  


  return (

    <NoteContext.Provider value={{Delete_rep,Reply,Dislike,Like,DeleteComment,Addcomment,allcommets,getallcommets, userdetail,notes, addnote, Deletenote, Updatenote, getallnotes,Getuser,setAllusers,allusers}}>
      {props.children}
    </NoteContext.Provider>

  )
}

export default NoteState