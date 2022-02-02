import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';

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

    const domain = "http://127.0.0.1:5000"


    //link to backend

    const getToken = () => {
        
         var mydata = {
             expirationDate: expirationDate,
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

        return isConfirmed;
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
            setExpirationError('Please input a number');
            return false;
        } else if (expiration < 0) {
            setExpirationError('Please input a positive number');
            return false;
        } else if (expiration == null) {
            setExpirationError('Please input a number');
            return false;
        } else if (expiration === 0) {
            setExpirationError('Please input a number greater than 0');
            return false;
        } else if (expiration >= 10000000000) {
            setExpirationError('Please input a smaller number');
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
            setUsesError('Please input a number');
            return false;
        } else if (uses < 0) {
            setUsesError('Please input a positive number');
            return false;
        } else if (uses % 1 !== 0) {
            setUsesError('Please input a non decimal number');
            return false;
        } else if (uses == null) {
            setUsesError('Please input a number');
            return false;
        } else if (uses === 0) {
            setUsesError('Please input a number greater than 0');
            return false;
        } else if (uses >= 10000000000) {
            setUsesError('Please input a smaller number');
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



    const JSdatetimeToMySQLdatetime = (exp) => {
        setExpiration(exp)
        // get current datetime in sconeds
        let currentTimeInSeconds = (new Date().getTime() / 1000) + (new Date().getTimezoneOffset() * -60);

        // get received time in sconeds
        let receivedTimeInSeconds = convertReceivedTimeToSconeds(time);

        if (receivedTimeInSeconds == null) {
            setExpirationDate(null);
            console.log("w")
            return;
        }

        // add it to current datetime
        let addedTime = (currentTimeInSeconds + receivedTimeInSeconds) * 1000;

        // convert added datetime to MySQL datetime
        setExpirationDate(new Date(addedTime).toISOString().slice(0, 19).replace('T', ' '));
        console.log(expirationDate)

    }


    const setUsesNull = () => {
        if (document.getElementById("uses").disabled) {
            setUses(null);
        }
    }



    const changeSelectBox = () => {

        if (document.getElementById("dateexpireSelect").value === "Unlimited") {
            setExpiration('');
            setExpirationError('');
            setTime("Unlimited");
            document.getElementById("dateexpire").disabled = true;
        }
        else {
            document.getElementById("dateexpire").disabled = false;
        }

        if (document.getElementById("dateexpireSelect").value === "minutes")
            setTime("minutes");
        else if (document.getElementById("dateexpireSelect").value === "hours")
            setTime("hours");
        else if (document.getElementById("dateexpireSelect").value === "days")
            setTime("days");

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


    const copyTokenLink = () => {

        var copyLink = document.getElementById("token");

        copyLink.select();
        copyLink.setSelectionRange(0, 99999);

        navigator.clipboard.writeText(copyLink.value);

        alert("Copied the link: " + copyLink.value);
    }




    return (
        <div className="invite">

            <br />
            <br />
            <br />
            <br />
            <br />

            {isConfirmed

                ?

                <div style={{ textAlign: "center" }} className="confirmed">
                    <h3>Issued token link</h3>

                    <input
                        readOnly
                        type="text"
                        name="token"
                        id="token"
                        value={token}
                    />
                    <button type="button" onClick={() => { copyTokenLink(); }}>Copy link</button>

                    <br />
                    <br />

                    {expirationDate == null ?
                        <div>token expiration time is Unlimited</div>
                        :
                        <div>token expiration time is {expirationDate}</div>
                    }

                    {uses == null ?
                        <div>limit of token uses is Unlimited</div>
                        :
                        <div>limit of token uses is {uses}</div>
                    }

                    <div>time is in {time}</div>
                </div>

                :

                <div style={{ textAlign: "center" }}>

                    <form onSubmit={handleSubmit} >

                        <input
                            type="text"
                            placeholder="expiration"
                            name="dateexpire"
                            id="dateexpire"
                            value={expiration}
                            onChange={(e) => JSdatetimeToMySQLdatetime(e.target.value)}
                        />

                        <select
                            id="dateexpireSelect"
                            name="dateexpireSelect"
                            onChange={() => { changeSelectBox(); }}
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
                        </select>

                        {<div className="Error">{expirationError}</div>}


                        <br />
                        <br />

                        <input
                            type="text"
                            placeholder="uses"
                            name="uses"
                            id="uses"
                            value={uses}
                            onChange={(e) => setUses(e.target.value)}
                        />

                        <input
                            type="checkbox"
                            id="usesCheckbox"
                            name="usesCheckbox"
                            value="usesCheckbox"
                            onChange={() => { changeCheckBox(); }}
                        />
                        <label for="Unlimited">Unlimited</label>


                        {<div className="Error">{usesError}</div>}

                        <br />
                        <br />

                        <button type="submit" className="Confirm">Confirm</button>

                    </form>
                </div>
            }

        </div >
    )
}


export default Invatation;