import React from 'react';
import '../styles/card.css';

const Card = ({title, warning, body}) => {
  return (
    <div className='card-container'>

      <div className='card-title'>
        <h1>{title}</h1>
        </div>

        <div className='card-body'>
            {body}
        </div> 
 
        <p className={warning === "" ? "inactive" : ""}>{warning}</p>

        <div className='footer'>
          <p>&copy; Developed by Anas Kharboutli</p>
        </div>
      
    </div>
  )
}

export default Card
