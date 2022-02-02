import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "react-datepicker/dist/react-datepicker.css";
import {Button,Card,CardHeader,CardBody,CardTitle,Table,Row,Col,FormGroup,Form,Input} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useEffect } from "react";
import TextField from '@mui/material/TextField';
import './ManagerAssign.css';
import infoPlanner from "./infoPlanner.json";
import { useState } from 'react';
import {InputGroup,InputGroupAddon,InputGroupText} from "reactstrap"; {/* npm install --save react-tabs */}


function ManagerAssign() {

  const[searchPlanner,setSearchPlanner] = useState(""); {/* Searching function */}
  const [modal, setModal] = React.useState(false);      {/* popup */}
  const toggle = () => setModal(!modal);                {/* popup */}
  const[searchMessage,setSearchMessage] = useState(""); {/* Searching function */}
  

 {/*validation */}
  const [Title, setTitle] = useState("")
  const [Plannername, setPlannername] = useState("")
  const [Message, setMessage] = useState("")


          const onTitleHandler = (e) => {
            setTitle(e.currentTarget.value)
        }

        const onPlannerHandler = (e) => {
          setPlannername(e.currentTarget.value)
        }

        const onMessageHandler = (e) => {
          setMessage(e.currentTarget.value)
        }

        const TitleError = TitleEntered =>
                Title.length < 1 ? true : false;

       

        const MessageError = MessageEntered =>
                Message.length < 1 ? true : false;

         const onSubmitHandler = (e) => {
                  e.preventDefault();
                }

    return (
    <>
     
     
    <div className='ContentTabBox'>
    <Tabs>
     <TabList className='TwoTabs'>
        <Tab>Assign Schedules</Tab>
        <Tab>View Assignment History</Tab>
       
      </TabList>

      <TabPanel className='SearchingPlanner'>
      {/* when click this tab, it shows the searching box which is able to find planner and write the form */}

      <div className="ContentOfForm">
        <Row>
         
          <div className='AssignForm'>
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Assgin Schedule</CardTitle>
                <p className="card-category">
                  Search planner name and click the icon to send the message.
                </p>
                    <InputGroup>  {/* Search Box */}
                      <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="nc-icon nc-single-02"></i> </InputGroupText>
                      </InputGroupAddon>
                      <input type = "text" placeholder='Please type Fullname' className='form-control' onChange={(e) => {setSearchPlanner(e.target.value) }}/>
                    </InputGroup>

                    </CardHeader>

                          
              <CardBody>
                <Table responsive className='table' id='userList'>
                  <thead className="text-primary" >
                    <tr>
                      <th>Name</th>
                      <th>Username</th>
                      <th>Send</th>
                    </tr>
                  </thead>
                  <tbody>
                  
                  {infoPlanner.filter((val)=>{
                        if(searchPlanner === ""){
                            return val;

                        } 
                        else if(
                            val.name.toLowerCase().includes(searchPlanner.toLowerCase()) ||
                            val.username.toLowerCase().includes(searchPlanner.toLowerCase())
                            
                        )
                        {
                            return val;

                        } 
                    }).map((val)=>(
                        <tr>
                            <td>{val.name}</td>
                            <td>{val.username}</td>
                            <td> <Button className="btn-round btn-icon"
                      color="success"
                      size="sm"
                      onClick={toggle}
                      >  {/*pop up function */}
                    <i className="fa fa-envelope" /> </Button>

                    
                    
                     <Modal
                      isOpen={modal}
                      toggle={toggle}
                      backdrop={false}
                      size="md"
                      centered
                      scrollable
                      className="popupForm" >
                     <ModalHeader toggle={toggle}> <CardTitle tag="h8">Assgin Schedules </CardTitle> </ModalHeader>
                      <ModalBody>
                      
                          <div onSubmit={onSubmitHandler}>
                         <FormGroup>
                                  <label htmlFor="AssignTitle">Title</label>
                                  <TextField
                                   variant="filled"
                                    placeholder="Title..."
                                    type="text"
                                    className='mytext'
                                    id='AssignTitle'
                                    value={Title}
                                   onChange={onTitleHandler}
                                   error={TitleError('title')} 
                                   
                                   label="Title is required"
                                   color="success"
                                   focused 
                                    />

                          
                                </FormGroup>

                                <FormGroup>
                                  
                                  <label htmlFor="username" >Username</label>
                                  <TextField
                                   variant="filled"
                                    placeholder="username..."
                                    type="text"
                                    className='mytext'
                                    value={val.username}
                                    id='username'
                                    
                                    onChange={onPlannerHandler}
                                    label="Filled success"
                                    color="success"
                                    focused 
                                   
                                  />
                                  
                                                            
                                </FormGroup>

                                <FormGroup >
                                  <label htmlFor="message">Schedule Description</label>
                                  
<<<<<<< HEAD
                                  <TextField
                                   variant="filled"
                                    placeholder="Message..."
=======
                                  <Input
                                    placeholder="Description..."
>>>>>>> e30c04ecf7e7cdfffc1bea7b1eca82e342e774e5
                                    type="textarea"
                                    className='TextBox'
                                    id='message'
                                    value={Message}
                                    onChange={onMessageHandler}
                                    error={MessageError('message')} 
                                    label="Message is required"
                                    color="success"
                                    focused 
                                  />
                                 
                         
                                </FormGroup>
                                </div>
                       
                      </ModalBody>
                                                    
                       <ModalFooter>
                       <Button color="primary" type='submit' onClick={toggle} onSubmit={onSubmitHandler} >Send</Button>                    
                       </ModalFooter>
                       </Modal>
                   
                       </td>

                        </tr>
                      
                    ))}
                          
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            </div>
        </Row>
      </div>
   
      
    </TabPanel>

    <TabPanel className='ViewMessages'> {/* when click this tab, 
                                          it shows table to search the messages that manager sent*/}
    
    <div className="CheckMessage">
        <Row>
         
          <div className='View'>
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Message History</CardTitle>
                <p className="card-category">
                  Search planner name or date to review sent message.
                </p>
                    <InputGroup>  {/* Search Box */}
                      <InputGroupAddon addonType="prepend">
                      <InputGroupText><i className="nc-icon nc-single-02"></i> </InputGroupText>
                      </InputGroupAddon>
                      <input type = "text" placeholder='Please type plannername' className='form-control' onChange={(e) => {setSearchMessage(e.target.value) }}/>
                     
                    </InputGroup>
                    
   
                    </CardHeader>

                          
              <CardBody>
                <Table responsive>
                  <thead className="text-primary">
                    <tr>
                      <th>Name</th>
                      <th>Date</th>
                      <th>View</th>
                    </tr>
                  </thead>
                  <tbody>
                  {infoPlanner.filter((val)=>{
                        if(searchMessage === ""){
                            return val;

                        } 
                        else if(
                            val.name.toLowerCase().includes(searchMessage.toLowerCase())
                          
                            
                        )
                        {
                            return val;

                        }
                       
                    }).map((val)=>(
                        <tr>
                            <td>{val.name}</td>
                            <td>{val.date}</td>
                            <td> <Button 
                      color="success"
                      size="sm"
                      onClick={toggle}
                      >  {/*pop up function */}
                    {val.title} </Button>
                    <Modal
                      isOpen={modal}
                      toggle={toggle}
                      backdrop={false}
                      size="xl"
                      centered
                      scrollable
                      className="popupMessage">
                        <ModalHeader
                            toggle={toggle}>
                              
                                <CardTitle tag="h5">Planner: {val.name}</CardTitle>
                              
                            </ModalHeader>
                        <ModalBody>
                                

                                <FormGroup>
                                  <label>Description</label>
                                  
                                  <Input
                                    placeholder="Message..."
                                    type="textarea"
<<<<<<< HEAD
                                    value={val.message}
                                  />    {/* need to modify */}
=======
                                    value={val.description}
                                  />
>>>>>>> e30c04ecf7e7cdfffc1bea7b1eca82e342e774e5
                                </FormGroup>

                        </ModalBody>
                        
                    </Modal>
                   
                       </td>

                        </tr>

                    ))}
                   
                  </tbody>
                </Table>
              </CardBody>
            </Card>
            </div>
        </Row>
      </div>

      </TabPanel>

    </Tabs>
    </div>
    </>
  );
                    
}



export default ManagerAssign;

  
