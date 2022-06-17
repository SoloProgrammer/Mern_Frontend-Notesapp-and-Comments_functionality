import React,{useContext} from 'react'
import noteContext from '../context/notes/noteContext'



function Noteitem(props) {

    
    const context = useContext(noteContext)
    
    const {userdetail} = context
    
    const {note,Deletenote,popup_up_box} = props
    
    // console.log(note.user)
    // console.log(userdetail.id)
    // console.log("..............",note)

    return (
        <>
            <div className='col-md-3 my-3'>
                <div className="card" >
                    <div className="card-body">
                        <div className="Dflex">
                            <h5 className="card-title"><sup><i className="fa-solid fa-quote-left"></i></sup> {note.title} </h5>
                            {note.user === userdetail.id ? <div className="icons">
                                <i onClick={() =>{Deletenote(note._id,props.show_Alert)}} className="fa-solid fa-trash-can"></i>
                                <i onClick={() =>{popup_up_box(note)}} className="fa-solid fa-pen-to-square"></i>
                            </div>:"view only"}
                        </div>
                        <p className="card-text my-2">{note.description}</p>
                       
                    </div>
                    <span className="tag">
                    <i className="fa-solid fa-tag"></i> {note.tag}
                    </span>
                </div>
            </div>

        </>
    )
}

export default Noteitem
