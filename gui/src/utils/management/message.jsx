import React from 'react';


function Message() {
    return (
        <>
         <h1 class = "text-center" style={{marginTop: "50px"}}>You can assgin schedules to planner!</h1>
       

        <div className ="container border" style={{marginTop: "50px", width:'50%'}} >

            <form className='row' style={{margin:"25px 85px 75px 100px"}}>
                <label>Title</label>
                <input type= 'text' name="title"/>

                <label>E-mail</label>
                <input type= 'text' name="email" className='form-control'/>

                <label>Message</label>
                <textarea name = 'message form' rows='6' className='form-control'/>
                <input type ='submit' value = 'Send' class="btn btn-outline-primary"
                style={{marginTop:'30px'}}/>

            </form>
        </div>

        </>

        
        
    )
}

export default Message
