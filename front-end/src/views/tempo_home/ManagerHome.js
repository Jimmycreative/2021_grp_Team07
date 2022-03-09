import React,{useState, useEffect} from 'react';
import "./ManagerHome.css";
import HomeImg from 'assets/img/main.png';
import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Modal,
    Button,
    ButtonGroup
    
  } from "reactstrap";



export default function ManagerHome() {


return(
 
        <Card className='Background'>
         
         <CardTitle tag='h1' className='TitleofHome'>  Production Job Scheduling <br/> Software System </CardTitle> <br/>
         <p className='subtitle'> Maximise the efficiency of the key production resources and reduce the operational costs and lead time </p> <br/>
         <div>
         <h5 className='prosTitle'> <p className="text-success">User‑friendly interface</p> </h5>
         <p className='subpros' ><i className="nc-icon nc-check-2"/> &nbsp; straightforward visualisations of the scheduling solutions</p>
         <p className='subpros ' ><i className="nc-icon nc-check-2" /> &nbsp; modifications of the solution using drag‑and‑drop types of operations</p>
         <img className='HomeImg' alt='mainImg' align="right" src={HomeImg} style={{width:"400px", height:"250px"}}/> 
         
         </div>
        
        <br/>
        
        
        </Card>
  
  );
}
