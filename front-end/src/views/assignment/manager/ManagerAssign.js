<<<<<<< HEAD
import React from 'react';
import './ManagerAssign.css';
import Plannerdata from "./infoPlanner.json";
import {useState} from 'react';
import { event } from 'jquery';
import { Alert } from 'reactstrap';
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





function ManagerAssign() {
  const[searchPlanner,setSearchPlanner] = useState("");
  return (
    <>
   
    <div className='Assign'>
      <div className='SearchUser'> 
        <div className='SearchUserBox'> 
        <div className='titleSearchBox'> <i className="nc-icon nc-zoom-split" /> &nbsp; Search Username </div>
          </div>
          <input placeholder='Type planner name....' className='FuncSearch' onChange={(event) => {
            setSearchPlanner(event.target.value);}}>

            
          </input>
        
             {Plannerdata.filter((val)=>{
               if (searchPlanner == ""){
                 return val
               }
               else if (val.name.toLowerCase().includes(searchPlanner.toLowerCase())){
                 return val
               }
             }).map((val,key)=> {
            return(
              <div className='plannerName'>{val.username}</div>
            );
          })}

      </div>
      

      <div className="content">
    <Row>
    <Col md="10">
            <Card className="card-user">
              <CardHeader>
                <CardTitle tag="h5">Assgin Schedules </CardTitle>
              </CardHeader>
              <CardBody>
                <Form>
                  <Row>
                    
                    <Col className="pr-1" md="10">
                      <FormGroup>
                        <label>Title</label>
                        <Input
                          placeholder="Title..."
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    
                  
                  </Row>
                  <Row>
                    <Col className="pr-1" md="6">
                      <FormGroup>
                        <label>Username</label>
                        <Input
                          placeholder="Username..."
                          type="text"
                        />
                      </FormGroup>
                    </Col>
                    
                  </Row>
                  <Row>
                    
                    <Col md="10">

                      <FormGroup>
                        <label>Message</label>
                        <Input
                          type="textarea"
                          placeholder="Assign Schedules..."
                        />
                      </FormGroup>
                    </Col>
                  </Row>
                  <Row>
                    
                  <Button className='button' color="primary" round outline>
                  <i className="nc-icon nc-check-2"></i> Send
                  </Button>

                    
                  </Row>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
                      
                      
                    
   
      </div>
      

     
      </>
    );
  }
  
  export default ManagerAssign;
  
=======
import React from 'react';


function ManagerAssign() {
  return (
    <>
    <h1 style={{marginTop: "50px"}}>You can assgin schedules to planner!</h1>
    
    <div className ="container border" style={{marginTop: "50px", width:'50%'}} >
      <form className='row' style={{margin:"25px 85px 75px 100px"}}>
        <label>Title</label>
        <input type= 'text' name="title"/>
        
        <label>E-mail</label>
        <input type= 'text' name="email" className='form-control'/>
        
        <label>Message</label>
        <textarea name = 'message form' rows='6' className='form-control'/>
        <input
          type ='submit'
          value = 'Send'
          class="btn btn-outline-primary"
          style={{marginTop:'30px'}}/>
          
      </form>
    </div>
    </>
  );
}

export default ManagerAssign;
>>>>>>> 054d76b2b31493bfd2d90549da3861cd9ac59c89
