import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import '../../styles/inviteSec.css';
//emailJs


function inviteSec(){

return(
<>
<div className="invite">
    <div className="invite-container">
<h2>Invite users!</h2>
<div className="invitation-box">
        <div className="icon-container"><i class="bi bi-person-fill"/></div>
        <div className="email-container">
            <div className= "p-top">
    <p> Invitation email with link and QRcode </p>
    </div>
    <div className="email-address"> 
    <div className="mb-3">
    <input type="email" className="form-control" id="exampleFormControlInput1" placeholder="Type user's email address here"/>
</div>
</div>
    <div className="btn-container"><button type="button" className="btn btn-link">Send the invitation</button>
    </div>
    </div>
</div>
</div>
</div>
  </> 
);
}; 

export default inviteSec; 