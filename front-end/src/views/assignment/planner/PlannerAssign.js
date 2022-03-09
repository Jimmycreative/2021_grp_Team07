import Badge from '@mui/material/Badge'; 
import MailIcon from '@mui/icons-material/Mail';  
import React, {useEffect, useState} from 'react';
import * as ReactTable from 'react-table';
import {useTable} from "react-table";
import "./PlannerAssign.css";
import { domain } from "../../../global"
import {Button,Card,CardHeader,CardBody,CardTitle,Table,Row,Col,FormGroup,Form,Input,UncontrolledAlert} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {InputGroup,InputGroupAddon,InputGroupText} from "reactstrap";
import { Link, BrowserRouter as Router } from "react-router-dom";





export default function PlannerAssign() {
  const[searchManager,setSearchManager] = useState(""); {/* Searching function */}
  const [modal, setModal] = React.useState(false);      {/* popup */}
  const toggle = () => {
    setModal(!modal);
  }
  const toggle1 = (row) => {
    setModal(!modal);
    setThisTable(row)
  }

  const [thisTable, setThisTable]=useState([])
  const [thisManager, setThisManager]=useState("")
  const [thisDescription, setThisDescription]=useState("")
  const [viewForm, setViewForm] = React.useState(false);      {/* popup */}
  const toggleView = (row) => {
    console.log("line 27", row)
    setViewForm(!viewForm);
    setThisManager(row.manager)
    setThisDescription(row.description)
  }

  const toggleViewClose = () => {
    setViewForm(!viewForm);
  }
  
  let countmessages = 0;
    plannerdata && plannerdata.map((i) => {
      console.log("line 27", i)
        countmessages = countmessages + i.unfinished_assignment;
    });

    const [plannerdata,plannersetdata] = useState([]);
    const [plannerloading,plannersetloading] = useState(true);
    const [plannererror,plannerseterror] = useState(null);

    useEffect(()=> {
      getMyschedules()
    },[])
    
  const getMyschedules= () => {
    fetch(domain+"/getMySchedules")
     
      .then(response => {
        if(response.ok){
          return response.json()
        }
        throw response;
      })
      .then(data => {
        console.log(data)
        if (data.code==1) {
          plannersetdata(data.data);
        }
        
        
      })
      .catch(plannererror => {
        console.error("Error fetching data: ",plannererror);
        plannerseterror(plannererror)
      })
      .finally(()=>{
        plannersetloading(false);
      })
  }
  return (
    <>
    
    <Card className="card-plain">
      <CardHeader>
        <div className='MessageTitle'  ><h4>Messages</h4></div>
     <br/>
                    <InputGroup>  {/* Search Box */}
                      <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="nc-icon nc-single-02"></i> </InputGroupText>
                      </InputGroupAddon>
                      <input type = "text" placeholder='Please type Fullname' className='form-control' onChange={(e) => {setSearchManager(e.target.value) }}/>
                    </InputGroup>
      </CardHeader>
      
        <CardBody>
        <div className='contentbody'>


          {plannerdata && plannerdata.filter((val)=>{
            if(searchManager === ""){
              return val;

          } 
          else if(
              val.manager.toLowerCase().includes(searchManager.toLowerCase())
              
              
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
          src={require("assets/img/User.png").default} className='image2'></img>

          </div>
          </Col>
                    <Col md="7" xs="7">
                       {val.manager} <br />
                        <span className="text-muted">
                          <small>Manager</small>
                        </span>
                      </Col>

                      <Col className="text-right" md="3" xs="3">
                      
                        <Badge badgeContent={val.unfinished_assignment} color="success" >
                        <MailIcon color="action" onClick={()=>toggle1(val.assignment)} />
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
                        
                      

                      
                        <ModalHeader toggle={toggle}>
                              
                                <CardTitle tag="h5">Description </CardTitle>
                              
                            </ModalHeader>
                        <ModalBody>
                                
                                <Table>
                                <thead className="text-primary">
                                      <tr>
                                        <th>Title</th>
                                        <th>Date</th>
                                        <th>Description</th>
                                        
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {console.log(val.assignment)}
                                      {thisTable.map((m)=>(
                                        <tr>
                                          <td>{m.title}</td>
                                          <td> {new Date(m.start).toLocaleDateString()} </td>
                                          <td><Button onClick={()=>toggleView(m)} >View Description</Button></td>
                                          <Modal
                                            isOpen={viewForm}
                                            toggle={toggleView}
                                            backdrop={false}
                                            size="xl"
                                            centered
                                            scrollable
                                            className="popup">
                                            
                                            <ModalHeader toggle={toggleView}>
                                              <CardTitle tag="h7"> Assignment from {thisManager} </CardTitle>
                                            </ModalHeader>
                                            
                                            <ModalBody>
                                              {thisDescription}
                                            </ModalBody>
                                            <ModalFooter>
                                            <Button className="cancel-btn" onClick={toggleViewClose}>Cancel</Button>{' '}
                                              <Link to="/admin/definition">
                                                <Button>Go to Definition page</Button>   {/*click and go to definition page */}
                                              </Link>
                                            </ModalFooter>
                                          </Modal>
                                        </tr>
                                    ))}
                                      <tr>
                                        
                                        
                                        
                                      </tr>
                                      </tbody>
                                </Table>

                        </ModalBody>

                     
   
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
