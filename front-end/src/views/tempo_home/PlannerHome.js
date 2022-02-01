import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import sample_data from '../../variables/data/saved_data.json';
import "./ManagerHome.css";
import GanttDay from "views/gantt/day/GanttDay";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';


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
    
  } from "reactstrap";
import { DatasetController } from 'chart.js';


export default function PlannerHome() {
  //timelength : Time for schedule from start to the end

  const [date, setDate] = useState([{}]);
  //getDate, getMonth, getFullYear, getMinutes, getSeconds
  //getMonth(): month-1 /getFullYear(): 2021 /getYear():21
//end-time "2022-01-15"

//new Date() format: Fri Jan 28 2022 21:11:05 GMT+0800 (China Standard Time)
 //var date = new Date("10 21, 1983 01:07:01") 
 //"july 21, 1983 01:07:01"
//timestamp format YYYY-MM-DD HH:MM:SS

const dateformat = (date)=> { //only date object
  //yyyy-mm-dd 
  return date.getFullYear() + "-" + (("00"+(date.getMonth()+1)).slice(-2))+"-"+(("00"+date.getDate()).slice(-2))};

const dateformat2 = (date)=> { //only date object
    //yyyy-mm-dd HH:MM:SS
  return date.getFullYear() + "-" + (("00"+(date.getMonth()+1)).slice(-2))+"-"+(("00"+date.getDate()).slice(-2))
    +" "+(("00"+date.getHours()).slice(-2))+":"+(("00"+date.getMinutes()).slice(-2))+":"+(("00"+date.getSeconds()).slice(-2))};
const [modal, setModal] = useState(false);
const [loading, setLoading] = useState(false);
const [error, setError] = useState(null);
const [data, setData] = useState([{}]);


const [value, setValue] =useState("");

let domain = "http://127.0.0.1:5000";


const toggle = () => {
  setModal(!modal)
}


const getAllSchedules = () =>{
  setError(null);
  setData(null);
  console.log((dateformat(new Date())));
  setLoading(true);
  fetch(domain+"/getAllSchedules", {
      cache: 'no-cache',
      headers: new Headers({
          'Content-Type': 'application/json'
      }),
      method: 'GET',
      mode: 'cors'
    })
   .then(res=> {if(res.ok){ // true if res returned successful
       return res.json();}
  } )
   .then((data) => {
      console.log("data")
     if (data.code==1) {
     setData(data.data)
      console.log(data.message)
     }
     else {
         console.log(data.message)
     }
   }).catch(
       e=>{alert(e)} 
   )
       
   
  setLoading(false);
}




useEffect(()=>{
 getAllSchedules();
},[]);

      
  return (

    //전체값 12 
    //alert 
    //calendar 
    <div className="content">
      <div className="home-container">
    <Row>
    <Col>
          <Card className="calendar">
            <CardBody>
            <Col >
            <div className="numbers">
            <p className="card-category">Calendar <i className="nc-icon nc-calendar-60 text-warning"/> </p>
           </div>
           </Col>
         
          <Calendar
           onClickDay={
            (value,event) => {
              setValue(dateformat(value))
              setDate(sample_data.filter((f)=> {
                if (f.endtime.includes(dateformat(value))){
                  return f}
                }
              ));
              setModal(!modal);
            }
          }  />
      </CardBody>
      </Card>
          </Col>
          <div>
          {/*Modal*/}
        <Modal isOpen={modal} toggle={toggle} scrollable>
      
          <ModalHeader toggle={toggle}> Your Projects End at {value}</ModalHeader>
          <ModalBody>
          {
          (date.map(m=>(
            <ul style={{ listStyle: "none"}}>
              <li style={{fontSize:"15px" ,fontWeight:"bold"}}> 
                <span className="text-info">{m.project}</span> ends &#62;&#62;</li> 
                </ul>
          )
          )
          )
          }
            { console.log(date)}
            {date.length == 0 && <h6>None</h6>}
          </ModalBody>
          <ModalFooter>
          <Link to = '/admin/evaluation/schedule'>
            <Button color="info" onClick={toggle}>See more</Button>
            </Link>
            <Button onClick={toggle}>Cancle</Button>
          </ModalFooter>
        </Modal>
      </div>
        
  
        <Col>
        <Card className="form-history">
          <CardBody>
            <Row>
            <Col>
                <div className="numbers">
                <p className="card-category">Assigned history <i className="nc-icon nc-email-85 text-info" /></p>
                  <CardTitle tag="p"></CardTitle>
              </div>
              </Col>
              </Row>
              {sample_data.sort((a,b)=>{
                return Number(b.endtime.replace(/\-/g,''))-Number(a.endtime.replace(/\-/g,''))})
                        .slice(0,5).map((m)=>(
                            <ul className="list-element">
                            <li ><button type="button" class="link-btn"> Form: {m.project}</button></li>
                            <li >Assigned from <span className="name">{m.first_name}</span> {m.endtime} </li>
                            </ul> 
                        )
                        )
                      }
                         {sample_data.length == 0 && <h6>No Forms</h6>} 
                          
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
          <Card className="ongoing-project">
          <CardBody className="text-center">
            <Row>
              <Col>
                <div className="numbers">
                <p className="card-category">Ongoing Projects <i className="nc-icon nc-chart-bar-32 text-success" /> </p>
                  <CardTitle tag="p"></CardTitle>
                  
                </div>
              </Col>
              
            </Row>
          
        
            {sample_data.sort((a,b)=>{
                    return Number(b.endtime.replace(/\-/g,''))-Number(a.endtime.replace(/\-/g,''))})
                    .slice(0,5).map((m)=>(
                        <ul className="list-element">
                      <li ><Link to ="/admin/chart"><button type="button" className="link-btn">Project: {m.project}</button></Link></li>
                      <li > Started on: {m.endtime} Ends at: {m.endtime}</li>
                      </ul> 
                      )
                    )
                  }
                     {sample_data.length == 0 && <h6>No Projects</h6>}    
                  
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
          </div>


  );
}
