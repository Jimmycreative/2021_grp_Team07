
import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../../styles/manageMain.css';


function manageMain(){

return(
<>
<div className="manage-container">
<div className="letter-container"> If you want to see the history of forms, click this <span className="purple"> purple </span>button 
<Link to='/manageFormHistory' className="btn2">
Button
</Link>
</div>
<div className="letter-container"> 
If you want to invite users, click this <span className="yellow"> yellow </span>button 
<Link to='/manageInvite' className="btn3">
Button
</Link>
</div>
<div className="letter-container"> 
If you want to see saved schedule, click this <span className="orange"> orange </span>button
<Link to='/manageSchedule' className="btn4">
Button
</Link>
</div>
<div className="letter-container"> 
 If you want to write forms, click this <span className="green"> green </span>button 
<Link to='/manageForms' className="btn5">
Button
</Link>
</div>

</div>
  </> 
);
}; 

export default manageMain; 