import React from 'react';
import './ManagerAssign.css';
import Plannerdata from "./infoPlanner.json";
import {useState} from 'react';
import {
  Button,
  Card,
  CardHeader,
  CardBody,
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
  
