<<<<<<< HEAD
import React from 'react';
import "./PlannerAssign.css";
import "./GetMessage";
import GetMessage from './GetMessage';
import ViewMessage from './ViewMessage';
import { BrowserRouter as Router,Route, Switch, Link } from 'react-router-dom/cjs/react-router-dom.min';
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


export default function PlannerAssign() {

 
  return (
    <>
    <div className='PlannerAssginform'>
      <div className='FromManager'> 
        <div className='getMessageBox'> <i className="nc-icon nc-badge" /> &nbsp; Manager </div>
         <div><GetMessage/></div>

       </div>
      
     


      <div className='ViewMessage'> 
        <div className='ViewMessageBox'> <i className="nc-icon nc-email-85" />  &nbsp;  View </div>

        <div className="content"> 
        
        <ViewMessage/>
        
        
        </div>
        
        
       
    </div>
    </div>
    </>
  );
}
=======
import React from 'react';

function PlannerAssign() {
    return (
        <>
        PlannerAssign
        </>
    )
}

export default PlannerAssign;
>>>>>>> 054d76b2b31493bfd2d90549da3861cd9ac59c89
