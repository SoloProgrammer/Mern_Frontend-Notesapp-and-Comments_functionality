import React, { useContext, useEffect, useState } from 'react'
import Noteitem from './Noteitem'
import noteContext from '../context/notes/noteContext'
import Form from './Form'



function Notes(props) {
    const context = useContext(noteContext)
    const {userdetail, notes, Deletenote, getallnotes, Getuser } = context

    useEffect(() => {
    
        getallnotes();
        Getuser();
        // eslint-disable-next-line
        
    }, [])
    
    
    const [notedetail, setNotedetail] = useState({
        title: "",
        description: "",
        tag: ""
    })

    const [id, setId] = useState(null)


    let popup = document.querySelector('.popup');
    let popup_box = document.querySelector('.popup_box');

    const popup_up_box = (note) => {

        popup.classList.add('show')
        setTimeout(() => {
            popup_box.classList.add('come')
        }, 200);

        setNotedetail({
            title: note.title,
            description: note.description,
            tag: note.tag
        })
        setId(note._id)
    }

    const close = () => {

        popup_box.classList.remove('come')
        popup.classList.remove('show')


    }
    const capitalizefirst = (word) =>{
        let newword = word.charAt(0).toUpperCase() + word.slice(1)
        return newword
    }
    return (
        <div>
            
            <div className="popup">
                <div className="popup_box">
                    <h3><span></span>Update Note Here<span><i onClick={() => { close() }} id="close_btn" className="fa-solid fa-xmark"></i></span></h3>
                    <Form show_Alert={props.show_Alert} id={id}  notedetail={notedetail} curdFunc={"updatenote"} submit_txt={"Update note"} />
                </div>
            </div>
            <div className="row">
                {notes.length > 0 && <h2>Your notes are here {capitalizefirst(userdetail.Name)}</h2>}
                <div className="container">
                {notes.length === 0  && <div className="alert alert-primary" role="alert">
                    Notes not found to Display,Plz add some
                    </div>}
                </div>
                {notes.map((note, index) => {
                    return (
                        <Noteitem show_Alert={props.show_Alert} key={index} note={note} Deletenote={Deletenote} popup_up_box={popup_up_box} />
                    )
                })}
            </div>
        </div>
    )
}

export default Notes
