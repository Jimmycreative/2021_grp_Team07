import React from 'react';
import './ViewMessage.css';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Row,
    Col,
  } from "reactstrap";
  

export default function ViewMessage() {
    return (
        <Row>
        <Col md="11">
          <Card className="card-user">
            <CardHeader>
              <CardTitle className='viewtitle'> <i className="nc-icon nc-chat-33" />&nbsp;  Message from manager </CardTitle>
            </CardHeader>
            <CardBody>
            <div className='CheckMessage'>
          <div className='MFromManager'>
              <p>Viki entered the Executive Director role with a desire to continue making improvements to the Board’s
processes and technology that would further assist the Board as well as the profession it regulates.
Among her initial tasks as executive director, were to oversee customized changes to the Board’s
licensing software and website, financial software, new staff, office relocation, budgeting and
numerous policy and efficiency changes to the Boards program activities.</p>
              
          </div>
          
      </div>
            </CardBody>
            </Card>
            </Col>
            </Row>
    )


   
              
}
