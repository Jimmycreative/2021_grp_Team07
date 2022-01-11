import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './MainSec.css';


function MainSec(){

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

export default MainSec; 