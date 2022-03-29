import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import "react-datepicker/dist/react-datepicker.css";
import {Button,Card,CardHeader,CardBody,CardTitle,Table,Row,Col,FormGroup,Form,Input} from "reactstrap";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import React, { useEffect } from "react";
import './ManagerAssign.css';
import { domain } from "../../../global"
import { useState } from 'react';
import {InputGroup,InputGroupAddon,InputGroupText} from "reactstrap"; {/* npm install --save react-tabs */}


function ManagerAssign() {


  
  const[searchPlanner,setSearchPlanner] = useState(""); {/* Searching function */}
  const [modal, setModal] = React.useState(false);      {/* popup */}
  const toggle = (row) => {
    console.log("line 23", row)
    setModal(!modal)
    setThisPlanner(row.planner)
    setThisDescription(row.description)
  }; 
  const toggle2 = (row) => {
    setModal(!modal)
    setThisPlanner(row.planner)
    setThisDescription(row.description)
  };                {/* popup */}
  const[searchMessage,setSearchMessage] = useState(""); {/* Searching function */}
  const [title, setTitle] = useState("")
  const [plannername, setPlannername] = useState("")


  const [description, setDescription] = useState("") 
  const [myHistory,setmyHistory] = useState([]);
  const [thisPlanner, setThisPlanner]=useState("")
  const [thisDescription, setThisDescription]=useState("")

    
const [tableData,setTableData] = useState(null);
const [loading,setloading] = useState(true);
const [error,seterror] = useState(null);
const [snddata,sndsetdata] = useState(null);
const [sndloading,sndsetloading] = useState(true);
const [snderror,sndseterror] = useState(null);


const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

useEffect(() => {
  
  getAllPlanners()
  getAssignedSchedules()
},[])

  const getAllPlanners = async ()=> {
     
     await sleep(1000);
     fetch(domain+"/getAllPlanners", {
       cache: 'no-cache',
       headers: new Headers({
           'Content-Type': 'application/json'
       }),
       method: 'GET', // *GET, POST, PUT, DELETE, etc.
       mode: 'cors'
     })
     .then(response => {
       console.log("jimmy")
       if(response.ok) {
         return response.json();
       }
     }).then((data)=>{
       console.log()
       if (data.code===1) {
         setTableData(data.result)
         console.log(tableData)
       }
      
     }
     )
   }

  const sendAssignment = ()=> {
    let mydata = {
      title: title,
      planner: plannername,
      description: description
    }
    console.log(mydata)
    fetch(domain + "/sendAssignment",{
      body: JSON.stringify(mydata),
      cache: 'no-cache',

      headers: new Headers({
          'Content-Type': 'application/json'
      }),
      method: 'POST', // *GET, POST, PUT, DELETE, etc.
      mode: 'cors', // no-cors, cors, *same-origin
      redirect: 'follow', // manual, *follow, error
      referrer: 'no-referrer', // *client, no-referrer
    })
  
    .then(response => {
      if(response.ok){
        return response.json()
      }
      else{
        console.log("Error fetching")
      }
    })
   
  }

const getAssignedSchedules = () => {
  fetch(domain+"/getAssignedSchedules", {
    cache: 'no-cache',
    headers: new Headers({
        'Content-Type': 'application/json'
    }),
    credentials:'include',
    method: 'GET', // *GET, POST, PUT, DELETE, etc.
    mode: 'cors',
  })
 .then(res =>res.json())
 .then((data) => {
   console.log("line 133", data)
   //return data
    if (data.code==1) {
      setmyHistory(data.data)
      console.log("line 135", myHistory)
    }
    else {
      alert(data.message)
    }
  })
  .catch(err =>{
    console.log("err",err)
  })
}

  const changeDescription = changeEvent =>{
    setDescription(changeEvent.target.value)
    console.log(description)
  }
 

    return (
    <>
     
     
   
    <Tabs>
     <TabList className='TwoTabs'>
        <Tab>Assign Schedules</Tab>
        <Tab>View Assignment History</Tab>
       
      </TabList>

      <TabPanel className='SearchingPlanner'>
      {/* when click this tab, it shows the searching box which is able to find planner and write the form */}

        <Col>
         
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
                      <th>Username</th>
                      <th>Name</th>
                      <th>Send</th>
                    </tr>
                  </thead>
                  <tbody>
                  {console.log(tableData)}

                  {tableData===null?<></>:tableData.filter((val)=>{
                        if(searchPlanner === ""){
                            return val;

                        } 
                        else if(
                            val.username.toLowerCase().includes(searchPlanner.toLowerCase()) ||
                            val.displayname.toLowerCase().includes(searchPlanner.toLowerCase())
                            
                        )
                        {
                            return val;

                        } 
                    }).map((val)=>(
                        <tr>
                            <td>{val.username}</td>
                            <td>{val.displayname}</td>
                            <td> <Button className="btn-icon"
                      color="success"
                      size="sm"
                      onClick={() => {setModal(!modal);setPlannername(val.username)}}
                      >  {/*pop up function */}
                    <i className="nc-email-85" /> </Button>

                    
                    
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
                      
                          <div >
                         <FormGroup>
                                  <label htmlFor="AssignTitle">Title</label>
                                  <Input
                                    placeholder="Title..."
                                    type="text"
                                    onChange={changeEvent=>setTitle(changeEvent.target.value)}
                                    id='AssignTitle'

                                    />


                          
                                </FormGroup>

                                <FormGroup>
                                  
                                  <label htmlFor="username" >Username</label>
                                  <Input
                                    placeholder={plannername}
                                    type="text"
                                    id='username'
                                    readOnly
                                    />

                                                            
                                </FormGroup>

                                <FormGroup >
                                  <label htmlFor="message">Schedule Description</label>
                                  
                                  <Input
                                    placeholder="Description.."
                                    type="textarea"
                                    onChange={changeDescription}
                                    id='message'
                                    />

                                 
                         
                                </FormGroup>
                                </div>
                       
                      </ModalBody>
                                                    
                       <ModalFooter>
                       <Button color="primary" type='submit' onClick={sendAssignment}  >Send</Button>                    
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
        </Col>
     
      
    </TabPanel>

    <TabPanel className='ViewMessages'> {/* when click this tab, 
                                          it shows table to search the messages that manager sent*/}
    
    
        <Col>
         
          <div className='View'>
            <Card className="card-plain">
              <CardHeader>
                <CardTitle tag="h4">Message History</CardTitle>
                <p className="card-category">
                  Search planner name 
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

               
                  {myHistory && myHistory.filter((val)=>{

                        if(searchMessage === ""){
                            return val;

                        } 
                        else if(
                            val.planner.toLowerCase().includes(searchMessage.toLowerCase())
                          
                            
                        )
                        {
                            return val;

                        }
                       
                    }).map((val)=>(
                        <tr>
                            <td>{val.planner}</td>
                            <td>{val.datecreated}</td>
                            <td> <Button 
                      color="success"
                      size="sm"
                      onClick={()=>toggle(val)}
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
                        <ModalHeader>
                              
                                <CardTitle tag="h5">Planner: {thisPlanner}</CardTitle>
                              
                            </ModalHeader>
                        <ModalBody>
                                

                                <FormGroup>
                                  <label>Description</label>
                                  
                                  <Input
                                    placeholder="Description..."
                                    type="textarea"
                                    readOnly
                                    value={thisDescription}
                                  />    {/* need to modify */}
                                </FormGroup>

                        </ModalBody>
                        <ModalFooter>
                       <Button color="primary" type='submit' onClick={()=>{setModal(!modal)}}  >Close</Button>                    
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
        </Col>
     

      </TabPanel>

    </Tabs>
    
    </>
  );
                    
}



export default ManagerAssign;

  
