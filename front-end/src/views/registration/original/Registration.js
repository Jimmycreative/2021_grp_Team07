import { useState, useEffect } from 'react';

// Token validation

function Register() {

    const [username, setUsername] = useState('');
    const [displayname, setDisplayname] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [token, setToken] = useState('');

    const [usernameError, setUsernameError] = useState('');
    const [displaynameError, setDisplaynameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [password2Error, setPassword2Error] = useState('');
    const [tokenError, setTokenError] = useState('');

    const [isSubmitted, setIsSubmitted] = useState(false);



    const handleSubmit = e => {
        e.preventDefault();

        let isValid = true;
        let fieldsList = ["username", "displayname", "password", "password2"];

        for (let field in fieldsList) {

            isValid = isField(fieldsList[field]) && isValid;
        }

        if (isValid) {
            setIsSubmitted(true);
        } else {
            setIsSubmitted(false);
        }

        return isSubmitted;
    };


    const isField = (field) => {

        let isValid = false;

        switch (field) {
            case "username":
                isValid = usernameValidation();
                break;
            case "displayname":
                isValid = displaynameValidation();
                break;
            case "password":
                isValid = passwordValidation();
                break;
            case "password2":
                isValid = matchPassword();
                break;
            default:
        }

        return isValid;
    }



    const usernameValidation = () => {

        setUsername(username.toLowerCase());

        const usernameRegex = /^[A-Za-z][\w]{2,14}[A-Za-z0-9]$/;
        if (username.trim() === "") {
            setUsernameError('Username required');
            return false
        } else if (!usernameRegex.test(username)) {
            setUsernameError("Username must be 4-16 characters with no space and special character");
            return false
        }

        setUsernameError('');
        return true;
    }


    const displaynameValidation = () => {

        const replaceSpaces = displayname.replace(/\s+(?=\s)/g, '').trim();
        setDisplayname(replaceSpaces);

        if (displayname === "") {
            setDisplayname(username);
            return true;
        } else if (displayname.length > 64) {
            setDisplayname(displayname.substring(0, 64) && replaceSpaces);
        }

        setDisplaynameError('');
        return true;
    }


    const passwordValidation = () => {

        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,30}$/;
        if (password.trim() === "") {
            setPasswordError("Password required");
            return false;
        } else if (!passwordRegex.test(password)) {
            setPasswordError("Password needs to be 8-30 characters including at least 1 digit, 1 upper and 1 lowercase");
            return false;
        }

        setPasswordError("");
        return true;
    }

    const matchPassword = () => {

        if (password2.trim() === "") {
            setPassword2Error("Password required");
            return false;
        } else if (password !== password2) {
            setPassword2Error("Passwords do not match");
            return false
        }

        setPassword2Error("");
        return true;
    }




    return (
        <div className="main" >

            <br />
            <br />

            {isSubmitted

                ?

                <div style={{ textAlign: "center" }} className="complete">
                    <h1>Complete registration!</h1>
                    <div>Username is {username}</div>
                    <div>Displayname is {displayname}</div>

                </div>

                :

                <div style={{ textAlign: "center" }}>

                    <form onSubmit={handleSubmit} >

                        <input
                            type="text"
                            placeholder="Username"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />

                        {<div className="Error">{usernameError}</div>}


                        <br />
                        <br />

                        <input
                            type="text"
                            placeholder="Displayname"
                            name="displayname"
                            value={displayname}
                            onChange={(e) => setDisplayname(e.target.value)}
                        />

                        {<div className="Error">{displaynameError}</div>}

                        <br />
                        <br />

                        <input
                            type="password"
                            placeholder="Password"
                            name="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />

                        {<div className="Error">{passwordError}</div>}

                        <br />
                        <br />


                        <input
                            type="password"
                            placeholder="Confirm password"
                            name="password2"
                            value={password2}
                            onChange={(e) => setPassword2(e.target.value)}
                        />

                        {<div className="Error">{password2Error}</div>}

                        <br />
                        <br />

                        <input
                            type="text"
                            placeholder="Token"
                            name="token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                        />

                        <div className="Error">{tokenError}</div>

                        <br />
                        <br />

                        <button type="submit" >Register</button>

                    </form>
                </div>
            }
        </div>
    );
}



export default Register;