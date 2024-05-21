import React from 'react';
import '../styles/card.css';

const Card = ({title, warning, body}) => {
  return (
    <div className='card-container'>
        <h1>{title}</h1>

        <div className='card-body'>
            {body}
        </div>
 
        <p className={warning === "" ? "inactive" : ""}>{warning}</p>
      
    </div>
  )
}

export default Card
