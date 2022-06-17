import React from 'react'


function Alert(props) {
  const capitalize = (word)=>{

    if(word === "danger"){
        word = "Alert"
    }
    if(word === "info"){
        word = "Note"
    }
    if(word === "warning"){
        word = "Done Updation"
    }

    let new_word = word.charAt(0).toUpperCase()  + word.slice(1);

    return new_word;
  }
  return (
    <div className='alert_h'>
   { props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalize(props.alert.type)}</strong>: {props.alert.msg}
    </div>}

    </div>
   
  )
}
export default Alert