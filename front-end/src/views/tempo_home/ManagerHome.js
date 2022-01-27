import React,{useState} from 'react';
import {Link} from 'react-router-dom'
import sample_data from '../../variables/data/saved_data.json';
import "./ManagerHome.css";
import GanttDay from "views/gantt/day/GanttDay";



import {
    Card,
    CardHeader,
    CardBody,
    CardFooter,
    CardTitle,
    Row,
    Col,
  } from "reactstrap";
  

export default function ManagerHome() {

  const [display,setDisplay] = useState('');
  const [endDate, setendDate] = useState('');
  //getDate, getMonth, getFullYear
//end-time "2022-01-15"

 const dateformat = ()=> {
    //yyyy-mm-dd 
    var date = new Date();
    return date.getFullYear() + "-" + (("00"+(date.getMonth()+1).toString()).slice(-2))+"-"+(("00"+date.getDate()).slice(-2));
};

// console.log(
//   sample_data.sort((a,b)=>{
//   return Number(b.endtime.replace(/\-/g,''))-Number(a.endtime.replace(/\-/g,''))
//   }).slice(0,5).map(m=>m.endtime)
  
//   )
      
  return (

    //전체값 12 
    //alert 
    //calendar 
    <div className="content">
        
    <Row>
        <Col>
        <Card className="Form History">
          <CardBody>
            <Row>
              <Col >
                <div className="numbers">
                  <p className="card-category">Form History</p>
                  <CardTitle tag="p"></CardTitle>
              </div>
              </Col>
              </Row>
              {sample_data.sort((a,b)=>{
                        return Number(b.endtime.replace(/\-/g,''))-Number(a.endtime.replace(/\-/g,''))})
                        .slice(0,5).map((m)=>(
                          <ul className="list-element">
                          <li ><button type="button" class="link-btn"> Project: {m.project}</button></li>
                          <li >Assigned to <span className="name">{m.first_name}</span> {m.endtime} </li>
                          
                          </ul> 
                        )
                        )
                      }
            
         
          
          </CardBody> 
          <CardFooter>
          <Link to = '/admin/assignment/schedule_m'>
            <Row>
            <Col md="7"/> 
            <Col md="5">
          <button type="button" class="link-btn2">See more...</button>
          </Col>
          </Row>
          </Link>
          </CardFooter>    
          </Card>
          </Col>

          <Col>
          <Card className="recent-project">
          <CardBody className="text-center">
            <Row>
              <Col>
                <div className="numbers">
                  <p className="card-category">Ongoing projects</p>
                  <CardTitle tag="p"></CardTitle>
                  
                </div>
              </Col>
              
            </Row>
          
        
            {sample_data.sort((a,b)=>{
                    return Number(b.endtime.replace(/\-/g,''))-Number(a.endtime.replace(/\-/g,''))})
                    .slice(0,5).map((m)=>(
                      <ul className="list-element">
                      <li ><button type="button" className="link-btn">Project: {m.project}</button></li>
                      <li >scheduled by <span className="name">{m.first_name}</span> last modified on: {m.endtime} </li>
                      </ul> 
                    )
                    )
                  }
                  
                  
            <Row>
           
            

            </Row>
       
          </CardBody>     
          <CardFooter className="">
          <Link to = '/admin/evaluation/schedule'>
            <Row>
            <Col md="8"/> 
            <Col md="4" className="btn-col">
          <button type="button" className="link-btn2">See more...</button>
          </Col>
          </Row>
          </Link>
          </CardFooter>
          </Card>
          </Col>


          </Row>
          </div>


  );
}
