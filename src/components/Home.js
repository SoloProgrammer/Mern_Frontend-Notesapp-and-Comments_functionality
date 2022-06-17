import React from 'react'
import Addnote from './Addnote'
import Notes from './Notes'

function Home(props) {
  return (
    <>
      <Addnote  show_Alert={props.show_Alert}/>
      <Notes show_Alert={props.show_Alert}/>
    </>
  )
}

export default Home
