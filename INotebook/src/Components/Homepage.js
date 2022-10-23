import React from 'react';
import Notes from "./Notes"
function Homepage(props) {
  return (
    <div className='container my-3'>
      <Notes showAlert={props.showAlert}/>
    </div>
  )
}

export default Homepage