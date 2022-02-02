import Badge from '@mui/material/Badge'; 
import MailIcon from '@mui/icons-material/Mail';  
import React, {useMemo, useState} from 'react';
import * as ReactTable from 'react-table';
import {useTable} from "react-table";
import "./PlannerAssign.css";
import Contact from "./contact.json";
import {Button,Card,CardHeader,CardBody,CardTitle,Table,Row,Col,FormGroup,Form,Input,UncontrolledAlert} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {InputGroup,InputGroupAddon,InputGroupText} from "reactstrap";
import { Link, BrowserRouter as Router } from "react-router-dom";





export default function PlannerAssign() {
  const[searchManager,setSearchManager] = useState(""); {/* Searching function */}
  const [modal, setModal] = React.useState(false);      {/* popup */}
  const toggle = () => setModal(!modal);                {/* popup */}

  const [viewForm, setViewForm] = React.useState(false);      {/* popup */}
  const toggleView = () => setViewForm(!viewForm);                {/* popup */}
  let countmessages = 0;
      Contact.map((i) => {
        countmessages = countmessages + i.countmessages;
    });
   
  
  return (
    <>
    
    <Card className="card-plain">
      <CardHeader>
        <div className='MessageTitle'  ><h4>Messages</h4></div>
        <UncontrolledAlert color="danger" fade={true} className='WarningBox'>
                          <div className='WarningUnread'>
                            <b>Unread Message - </b>
                            {countmessages} unread messages. Please check!
                            
                          </div>
       </UncontrolledAlert>
                    <InputGroup>  {/* Search Box */}
                      <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="nc-icon nc-single-02"></i> </InputGroupText>
                      </InputGroupAddon>
                      <input type = "text" placeholder='Please type Fullname' className='form-control' onChange={(e) => {setSearchManager(e.target.value) }}/>
                    </InputGroup>
      </CardHeader>
      
        <CardBody>
        <div className='contentbody'>


          {Contact.filter((val)=>{
            if(searchManager === ""){
              return val;

          } 
          else if(
              val.name.toLowerCase().includes(searchManager.toLowerCase())
              
              
          )
          {
              return val;

          } 
          }).map((val)=>(
        <ul className="list-unstyled team-members">
          <li>
          <Row>
          <Col md="2" xs="2"> 
          <div className= "img" >
          <img alt="..."
          src={require("assets/img/User.png").default} className='image'></img>

          </div>
          </Col>
                    <Col md="7" xs="7">
                       {val.name} <br />
                        <span className="text-muted">
                          <small>Manager</small>
                        </span>
                      </Col>

                      <Col className="text-right" md="3" xs="3">
                      
                        <Badge badgeContent={val.countmessages} color="success" >
                        <MailIcon color="action" onClick={toggle} />
                        </Badge>
                       

                      </Col>
          </Row>
                      <Modal
                      isOpen={modal}
                      toggle={toggle}
                      backdrop={false}
                      size="xl"
                      centered
                      scrollable
                      className="popup">
                        
                      

                      
                        <ModalHeader
                            toggle={toggle}>
                              
                                <CardTitle tag="h5">Message </CardTitle>
                              
                            </ModalHeader>
                        <ModalBody>
                                
                                <Table>
                                <thead className="text-primary">
                                      <tr>
                                        <th>Name</th>
                                        <th>Date</th>
                                        <th>Message</th>
                                        
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr>
                                        
                                        <td>{val.name}</td>
                                        <td> {val.date} </td>
                                        <td><Button onClick={toggleView} >View Message</Button></td>
                                        
                                      </tr>
                                      </tbody>
                                </Table>

                        </ModalBody>

                     
   
                    </Modal>
                   
                    <Modal
                    data={Contact}
                      isOpen={viewForm}
                      toggle={toggleView}
                      backdrop={false}
                      size="xl"
                      centered
                      scrollable
                      className="popup">
                        
                        {/*<TablePlanner/>*/}

                      
                        <ModalHeader
                            toggle={toggleView}>
                              
                                <CardTitle tag="h7"> Message from {val.name} </CardTitle>
                              
                            </ModalHeader>

                            <ModalBody>
                              {val.message}
                            </ModalBody>
                                <ModalFooter>
                              <Link to="/admin/definition">
                              <Button>Go to Definition page</Button>   {/*click and go to definition page */}
                            </Link> 
                            </ModalFooter> 
                            </Modal>

                </li>
              </ul>

          ))}
                      
      </div>
       </CardBody>
    </Card>
    </>
  );


}


                