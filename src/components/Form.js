import React, { useContext, useEffect, useState } from 'react'
import noteContext from '../context/notes/noteContext'

function Form(props) {

  const { submit_txt, show_Alert, curdFunc, notedetail, id } = props

  const context = useContext(noteContext)

  const { addnote, Updatenote } = context

  const [note, setNote] = useState(notedetail)


  useEffect(() => {

    // eslint-disable-next-line 
    setNote(notedetail)

  }, [id])

  let close_btn = document.getElementById('close_btn');
  const HandleSubmit = (e) => {
    e.preventDefault();
    if (curdFunc === "addnote") {
      addnote(note.title, note.description, note.tag,show_Alert,setNote)
    }
    else {
      close_btn.click();
      Updatenote(id, note.title, note.description, note.tag, props.show_Alert);

    }

  }

  const Onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value })
  }
  return (

    <form className='my-3' onSubmit={HandleSubmit}>
      <div className="form-group my-3">
        <label htmlFor="exampleInputEmail1 ">Note Title</label>
        <input value={note.title} required type="text" className="form-control" id="title1" name="title" onChange={Onchange} aria-describedby="emailHelp" placeholder="Title Here...." />
      </div>
      <div className="form-group my-3">
        <label htmlFor="exampleInputPassword1 ">Note Description</label>
        <input value={note.description} required type="text" className="form-control" id="description" name='description' onChange={Onchange} placeholder="Description Here...." />
      </div>
      <div className="form-group my-3">
        <label htmlFor="exampleInputPassword1 ">Note tag</label>
        <input value={note.tag} required type="text" className="form-control" id="tag1" name="tag" onChange={Onchange} placeholder="Tag Here...." />
      </div>

      <button disabled={note.title.length <= 3 || note.description.length < 5 ? true : false} type="submit" className="btn btn-primary" ><i className="fa-solid fa-note-sticky white"></i> {`${submit_txt}`}</button>
    </form>

  )
}

export default Form
