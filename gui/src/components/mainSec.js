import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../styles/mainSec.css';


function mainSec(){

return(
<>
<div className="main-container">
<p> Only <span> manager </span>can press<span> blue </span>button to see the 
saved Schedule </p>
<Link to='/manageSchedule' className="btn1">
Button
</Link>
</div>
  </> 
);
}; 

export default mainSec; 