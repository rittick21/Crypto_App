import React from 'react'
import "../styles/errorpage.scss"

const Errorpage = (props) => {
  return (
    <div className='errorpage'>
        <p>{props.message}</p>
        <i className="fa-solid fa-face-frown"></i>
    </div>
  )
}

export default Errorpage
