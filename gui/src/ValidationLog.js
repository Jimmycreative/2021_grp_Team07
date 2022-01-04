import React from "react"
import {Formik} from "formik"
import * as Yup from "yup"
import  {BrowserRouter as Router,Route,Switch,Redirect,useHistory}  from "react-router-dom"


const ValidationLog = () =>  {
    const history = useHistory();
    return (
    <Formik 
    
     initialValues = {{email: "", password: ""}}
     onSubmit = {(values,{ setSubmitting}) => {
         setTimeout(() => {
            history.push("/main")
            
         }, 500);
     }}
     
     validationSchema = {Yup.object().shape({
        email: Yup.string()
            .email()
            .required("Required"),
        password: Yup.string()
            .required("No password provided")
            .min(8,"Password has to be at least 8 characters.")
     })
            
    }
    
    >
        {props => {
            const {
                values,
                touched,
                errors,
                isSubmitting,
                handleChange,
                handleBlur,
                handleSubmit
            } = props

            
            
            
            return (
                    
                    <div>
                        

                        <form autoComplete = "off" onSubmit = {handleSubmit}>
                            <h2 style={{fontSize: 22}}>Login System</h2>
                            <label htmlFor="email">Email:</label>
                            <input type="text" value={values.email} name="email" onChange={handleChange} onBlur={handleBlur} placeholder="Enter your email" className={errors.email && touched.email && "error"}/>
                            {errors.email && touched.email && (<div className="input-feedback">{errors.email}</div>)}
                            <label htmlFor="email">Password:</label>
                            <input type="password" value={values.password} name="password" onChange={handleChange} onBlur={handleBlur} placeholder="Enter your password" className={errors.password && touched.password && "error"}/>
                            {errors.password && touched.password && (<div className="input-feedback">{errors.password}</div>)}
                            <button type="submit" disabled={isSubmitting}>Login</button>
                            
                        </form>

                    </div>
            )
        }}
    </Formik>)
} 


export default ValidationLog
