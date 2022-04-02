import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { domain } from "../../../global"
import NotificationAlert from "react-notification-alert";
import {

    Button,
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    FormGroup,
    Form,
    Input,
    Row,
    Col,
  } from "reactstrap";
import "./invitation.css";
import addUser from 'assets/img/addUser.png';
import Check from 'assets/img/check.png';

// Uk.JgBsQn]bQp[2u
function Invatation() {

    const [token, setToken] = useState('');

    const [expiration, setExpiration] = useState(null);
    const [expirationDate, setExpirationDate] = useState('');

    const [uses, setUses] = useState(null);

    const [expirationError, setExpirationError] = useState('');
    const [usesError, setUsesError] = useState('');

    const [time, setTime] = useState('minutes');

    const [isConfirmed, setIsConfirmed] = useState(false);


    
    
   
    //link to backend

    const getToken = () => {
        let date = JSdatetimeToMySQLdatetime();
         var mydata = {
             expirationDate: date,
             rank: 0,
             uses: uses
         }
        console.log(mydata)
         fetch(domain +"/genToken", {

             body: JSON.stringify(mydata),
             cache: 'no-cache',

             headers: new Headers({
                'Content-Type': 'application/json'
              }),
              credentials: 'include',
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
         }).then(response => {
             if (response.ok) {
                 return response.json()
             }
         }
         ).then(
             data => {
                 //console.log("line 143", data)
                 if (data.code === 1) {
                     setToken(data.data);
                 }
                 else {
                    alert(data.message)
                 }
            }
         )
     };


    // show token form backend



    const handleSubmit = e => {
        e.preventDefault();

        let isValid = true;
        let fieldsList = ["dateexpire", "uses"];

        for (let field in fieldsList) {
            isValid = isField(fieldsList[field]) && isValid;
        }

        if (isValid) {
            setIsConfirmed(true);
            setUsesNull();
            getToken();

        } else {
            setIsConfirmed(false);
        }

        //return isConfirmed;
    };


    // validation
    const isField = (field) => {

        let isValid = false;

        switch (field) {
            case "dateexpire":
                isValid = expirationValidation();
                break;
            case "uses":
                isValid = usesValidation();
                break;
            default:
        }

        return isValid;
    }



    const expirationValidation = () => {

        if (document.getElementById("dateexpire").disabled) {
            setExpirationError('');
            return true;
        }

        if (isNaN(expiration)) {
            setExpirationError(<p className="text-danger">Please input a number</p>);
            return false;
        } else if (expiration < 0) {
            setExpirationError(<p className="text-danger">Please input a positive number</p>);
            return false;
        } else if (expiration == null) {
            setExpirationError(<p className="text-danger">Please input a number</p>);
            return false;
        } else if (expiration === 0) {
            setExpirationError(<p className="text-danger">Please input a number greater than 0</p>);
            return false;
        } else if (expiration >= 10000000000) {
            setExpirationError(<p className="text-danger">Please input a smaller number</p>);
            return false;
        }

        setExpirationError('');
        return true;
    }



    const usesValidation = () => {

        if (document.getElementById("usesCheckbox").checked) {
            setUsesError('');
            return true;
        }

        if (isNaN(uses)) {
            setUsesError(<p className="text-danger">Please input a number</p>);
            return false;
        } else if (uses < 0) {
            setUsesError(<p className="text-danger">Please input a positive number</p>);
            return false;
        } else if (uses % 1 !== 0) {
            setUsesError(<p className="text-danger">Please input a non decimal number</p>);
            return false;
        } else if (uses == null) {
            setUsesError(<p className="text-danger">Please input a number</p>);
            return false;
        } else if (uses === 0) {
            setUsesError(<p className="text-danger">Please input a number greater than 0</p>);
            return false;
        } else if (uses >= 10000000000) {
            setUsesError(<p className="text-danger">Please input a smaller number</p>);
            return false;
        }

        setUsesError('');
        return true;
    }




    // conversion
    const convertReceivedTimeToSconeds = (time) => {
        var seconds
        switch (time) {
            case "minutes":
                seconds = Math.floor(expiration * 60);
                break;
            case "hours":
                seconds = Math.floor(expiration * 60 * 60);
                break;
            case "days":
                seconds = Math.floor(expiration * 24 * 60 * 60);
                break;
            default:
        }

        
        return seconds;
    }



    const JSdatetimeToMySQLdatetime = () => {
        
        if (time === "Unlimited") {
            setExpiration('');
            setExpirationError('');
            setTime("Unlimited");
            document.getElementById("dateexpire").disabled = true;
        }
        else {
            document.getElementById("dateexpire").disabled = false;
        }

        
        // get current datetime in sconeds
        let currentTimeInSeconds = (new Date().getTime() / 1000) + (new Date().getTimezoneOffset() * -60);

        // get received time in sconeds
        let receivedTimeInSeconds = convertReceivedTimeToSconeds(time);

        if (receivedTimeInSeconds == null) {
            setExpirationDate(null);
            return;
        }

        // add it to current datetime
        let addedTime = (currentTimeInSeconds + receivedTimeInSeconds) * 1000;
        console.log(addedTime)

        // convert added datetime to MySQL datetime
        //setExpirationDate(new Date(addedTime).toISOString().slice(0, 19).replace('T', ' '));
        let date = new Date(addedTime).toISOString().slice(0, 19).replace('T', ' ');
        setExpirationDate(date)
        return date

    }


    const setUsesNull = () => {
        if (document.getElementById("uses").disabled) {
            setUses(null);
        }
    }



    const changeCheckBox = () => {

        if (document.getElementById("usesCheckbox").checked) {
            setUses('');
            setUsesError('');
            document.getElementById("uses").disabled = true;
        }
        else {
            document.getElementById("uses").disabled = false;
        }
    }

        //alert (pop up message)

        const notificationAlert = React.useRef();

        const notify = (place) => {
            var copyLink = document.getElementById("token");

            copyLink.select();
            copyLink.setSelectionRange(0, 99999);

            navigator.clipboard.writeText(copyLink.value);

            var type;
            var options = {};
                options = {
                place: place,
                message: (
                    <div>
                    <div>
                    Copied the link: {copyLink.value}
                    </div>
                    </div>
                ),
                type: type,
                icon: "nc-icon nc-bell-55",
                autoDismiss: 7,
                };
                notificationAlert.current.notificationAlert(options);
            };
  

    return (
        <div className="invite">
            <NotificationAlert ref={notificationAlert} />
            <br />
            <br />
            <br />
            <br />
            <br />
                    {/*second page */}
            {isConfirmed

                ?

                <div className="confirmed">

                <Card className='CardBox'>
                    
                       
                        
                    <Form onSubmit={handleSubmit}>
                   
                   
                    <img className='CheckImg' alt='CheckImg' align="left" src={Check} style={{width:"310", height:"360px" }}/> 
                    <Row  md="10">
                        <Col  className='TextBox' >
                        <CardHeader  className='fstTitle' tag="h5"> Issued token link </CardHeader> 
                        <Row md="3" className='sameBox'>
                         <Col md="6">
                                <Input
                                readOnly
                                type="text"
                                name="token"
                                id="token"
                                value={token}
                                className="token"
                            />
                        </Col>  
                        <Col md="4">
                          <Button
                          className='copyButton'
                            block
                            color="success"
                            onClick={() => {
                                notify("tc");
                                
                                }
                            }
                          >
                            Copy link
                          </Button>

                        </Col> 
                        <br />
                        <br />
                         <Col md="12" >
                        <div  className="blockquote blockquote-primary" >
                    {expirationDate == null ?
                        <div>token expiration time is Unlimited</div>
                        :
                        <div>token expiration time is <b>{expirationDate}</b></div>
                    }

                    {uses == null ?
                        <div>limit of token uses is Unlimited</div>
                        :
                        <div>limit of token uses is <b>{uses}</b></div>
                    }

                    
                    </div>
                    </Col>
                       </Row>
                    </Col>
                </Row>
            </Form>
        </Card>

                    
                   
                </div>
               
                :

                <div>
                   
                    <Card className='CardBox'>
                    
                       
                        
                     <Form onSubmit={handleSubmit}>
                    
                    
                     <img className='InvitationImg' alt='InvitationImg' align="left" src={addUser} style={{width:"310", height:"360px" }}/> 
                     <Row  md="10">
                         <Col  className='TextBox' >
                         <CardHeader  className='fstTitle' tag="h5"> Invite Users </CardHeader> 
                         <Row md="3" className='sameBox'>
                        <Input 
                            type="text"
                            placeholder="expiration"
                            name="dateexpire"
                            id="dateexpire"
                            value={expiration}
                            onChange={(e) => setExpiration(e.target.value)}
                            className="expiration"
                        />

                        <Input
                            type="select"
                            id="dateexpireSelect"
                            name="dateexpireSelect"
                            onChange={(e) => setTime(e.target.value) }
                            className="date"
                        >
                            <option
                                value="minutes"
                                name="minutes"
                            >
                                minutes
                            </option>

                            <option
                                value="hours"
                                name="hours"
                            >
                                hours
                            </option>

                            <option
                                value="days"
                                name="days"
                            >
                                days
                            </option>

                            <option
                                value="Unlimited"
                                name="Unlimited"
                            >
                                Unlimited
                            </option>
                        </Input>
                        </Row>


                         </Col>  {/* end this here */}
                     
                    
                    </Row>
                      

                        {<div className="Error">{expirationError}</div>}


                        <br />
                        <br />
                    <Row  md="4">
                        <Input
                                type="text"
                                placeholder="uses"
                                name="uses"
                                id="uses"
                                value={uses}
                                onChange={(e) => setUses(e.target.value)}
                                className="uses"
                            />
                            <FormGroup>
                            
                                <Input
                                    type="checkbox"
                                    id="usesCheckbox"
                                    name="usesCheckbox"
                                    value="usesCheckbox"
                                    onChange={() => { changeCheckBox(); }}
                                />
                            <label for="Unlimited">Unlimited</label>
                            </FormGroup>
                    </Row>
                      


                        {<div className="Error">{usesError}</div>}

                        <br />
                        <br />

                        <Button type="submit" color="primary" className="Confirm">Confirm</Button>

                    </Form>
                    </Card>
                    
                </div>
            }

        </div >
    )
}


export default Invatation;