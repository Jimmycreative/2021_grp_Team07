import React from 'react';
import "./ManagerHome.css";
import {Link} from 'react-router-dom';
import sample_data from '../../variables/data/saved_data';

import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from "reactstrap";

//오늘 날짜-> 날짜 저장-> 날짜!!!!!!!!
export default function Home2() {
  return (
    <>
      <div className="content">
        
        <Row>
        <Col>
            <Card className="Recieved Form History">
              <CardBody>
                <Row>
                  <Col >
                    <div className="numbers">
                      <p className="card-category">Assigned forms</p>
                      <CardTitle tag="p"></CardTitle>
                  </div>
                  </Col>
                  </Row>
                  {sample_data.sort((a,b)=>{
                        return Number(b.endtime.replace(/\-/g,''))-Number(a.endtime.replace(/\-/g,''))})
                        .slice(0,5).map((m)=>(
                          <ul className="list-element">
                          <li ><button type="button" class="link-btn"> Project: {m.project}</button></li>
                          <li >Assigned from <span className="name">{m.first_name}</span> {m.endtime} </li>
                          </ul> 
                        )
                        )
                      }
               
              </CardBody> 
              <CardFooter>
              <Link to = '/admin/assignment/schedule_p'>
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
              <CardBody>
                <Row>
                  <Col>
                    <div className="numbers">
                      <p className="card-category text-center">My Ongoing projects</p>
                      <CardTitle tag="p"></CardTitle>
                      
                    </div>
                  </Col>
                </Row>
                
              
            
                {sample_data.sort((a,b)=>{
                        return Number(b.endtime.replace(/\-/g,''))-Number(a.endtime.replace(/\-/g,''))})
                        .slice(0,5).map((m)=>(
                          <ul className="list-element">
                          <li ><button type="button" class="link-btn"> Project: {m.project}</button></li>
                          <li > last modified on: {m.endtime}</li>
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
   
    </>

  );
}
