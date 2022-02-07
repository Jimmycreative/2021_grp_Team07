import React,{useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import "./ManagerHome.css";
import GanttDay from "views/gantt/day/GanttDay";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import sample_data from './schedule_data.json';
import sample_form from './form_data.json';
import sample_data2 from '../../variables/data/saved_data.json';

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
    ButtonGroup
    
  } from "reactstrap";
import { DatasetController } from 'chart.js';


export default function PlannerHome() {


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
const [change, setChange] = useState(true); //calendar - schedule /form switch

const [startDate, setStartDate] = useState([{}]);
const [endDate, setEndDate] = useState([{}]);
const [formDate, setFormDate] = useState([{}]);

let domain = "http://127.0.0.1:5000";


const toggle = () => {
  setModal(!modal)
}

const formToSchedule = () =>{
  setChange(!change)
}

const getAllSchedules = () =>{
  setError(null);
  setData(null);
  console.log((dateformat2(new Date())));
  setLoading(true);
  fetch(domain+"/getAllSchedules", {
      cache: 'no-cache',
      headers: new Headers({
          'Content-Type': 'application/json'
          
      }),
      method: 'GET',
      mode: 'cors',
      redirect: 'follow',
      referrer: 'no-referrer', 
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

const [day, setDay] = useState(new Date()); //date 
const [rSelected, setrSelected] = useState({});
const onRadioBtnClick = (rSelected) => {
  setrSelected(rSelected);
}


// useEffect(()=>{
//  getAllSchedules();
// },[]);

const [useri, setUseri] = useState("Sandra"); //no need (just for testing) user

const getEndTime=(startDate, timeLength) =>{
  let endDate=new Date(startDate);
  endDate.setDate(endDate.getDate()+timeLength);
  return endDate;
}

//Date format 가능 

      
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
              setValue(dateformat(value)) //day in yyyy-mm-dd string
              setDay(value); //day in date object
              console.log(dateformat(value));
              setStartDate(sample_data.filter((f)=> {
                if (f.user==useri && dateformat(new Date(f.startdate)).includes(dateformat(value))){
                  return f}
                }
              ));
              setEndDate(sample_data.filter((f)=> {
                if (f.user==useri && dateformat(getEndTime(f.startdate,f.timelength)).includes(dateformat(value))){
                  return f}
                }
              ));
              setFormDate(sample_form.filter((f)=> {
                if (f.planner==useri && dateformat(new Date(f.date)).includes(dateformat(value))){
                  return f}
                }));
              setModal(!modal);
            }
          }  />
      </CardBody>
      </Card>
          </Col>

{/*Options: see only ongoing message/ start message / will end message/ both*/}
          <div>
          {/*Modal*/}
     {/*search with ctrl+f*/}
     {Number(value.replace(/\-/g,''))<=Number(dateformat(new Date()).replace(/\-/g,'')) ?
     <>{change ? <Modal isOpen={modal} toggle={toggle} scrollable size={Number(value.replace(/\-/g,''))>Number(dateformat(new Date()).replace(/\-/g,''))? "lg":"xl"}> <ModalHeader className="modal-header" toggle={toggle} close={<button className="close" onClick={toggle}><i className='nc-icon nc-simple-remove'/></button>}>
            {console.log(new Date())}
            {console.log(day)}
          <p className="card-category"> Responsible Projects {value} <i className="nc-icon nc-chart-bar-32 text-success" /></p></ModalHeader>
            <ModalBody className="modal-container">
              {/*console.log(startDate)*/}
              {/* if the date is not yet arrived, don't show startime card*/}
        {Number(value.replace(/\-/g,''))<=Number(dateformat(new Date()).replace(/\-/g,'')) &&
        
        <div className="modal-card">          
        <CardTitle className="card-title card-category"> Projects <span className="text-success">Started on: {value} <i className="nc-icon nc-button-play"/></span></CardTitle>
        
        {startDate.length == 0 && <p className="card-category">There is no Project</p>}  
        {startDate.sort((a,b)=>{
              return Number(getEndTime(b.startdate, b.timelength))-Number(getEndTime(a.startdate, a.timelength))})
              .map(m=>
        <Card>  
              <CardHeader>
              {Number(new Date())>Number(getEndTime(m.startdate, m.timelength)) ?
            <div className="finish-color card-category">Project: {m.name} (finished)</div> 
            :<div className="start-color card-category">Project: {m.name} (ongoing) </div>}
            </CardHeader> 
            <ul className="card-list text-justify">
            <li> <span className={Number(new Date())>Number(getEndTime(m.startdate, m.timelength))? "text-secondary" : "text-success"}><i className="nc-icon nc-button-play text-success"/> Project start date: </span><span>{dateformat2(new Date(m.startdate))}</span></li>
            <li> <span><i className="nc-icon nc-button-power text-danger"/> {Number(new Date())>Number(getEndTime(m.startdate, m.timelength)) ? <>End date</>: <>Expected end date</>}: </span> {dateformat2(getEndTime(m.startdate,m.timelength))}</li> 
            </ul>
            </Card>
            )
          }
          
          </div>
          }
          
          
              <div className="modal-card">
              
                  <CardTitle className="card-category"> Projects {Number(dateformat(new Date()).replace(/\-/g,''))>Number(value.replace(/\-/g,'')) ? <span className="text-secondary">Ended on: {value} <i className="nc-icon nc-button-power"/></span>:<span className="text-danger">Will end on: {value} <i className="nc-icon nc-button-power"/></span>}
                  </CardTitle>
                
              
                
              {endDate.length == 0 && <p className="card-category">There is no Project</p>} 
              
              {endDate.sort((a,b)=>{
                  return Number(new Date(b.startdate))-Number(new Date(a.startdate))}).map(m=>
            <Card>
                <CardHeader>{Number(new Date())>Number(getEndTime(m.startdate, m.timelength)) ? <div className="finish-color card-category">Project: {m.name} (finished) </div>:<div className="end-color card-category">Project: {m.name} (ongoing)</div>}</CardHeader>
                <ul className="card-list text-justify">
                <li> <span><i className="nc-icon nc-button-play text-success"/> Project start date:</span> {dateformat2(new Date(m.startdate))}</li>
                <li> <i className="nc-icon nc-button-power text-danger"/> {Number(new Date())>Number(getEndTime(m.startdate, m.timelength)) ? <span className="text-secondary">End date</span>: <span className="text-danger">Expected end date</span>}: <span>{dateformat2(getEndTime(m.startdate,m.timelength))}</span></li> 
                </ul>
                </Card>
                )
              }
          </div>
          
    

            </ModalBody>
          
            <ModalFooter>
            <p className="card-category">Switch to:</p>
            <Button color="primary" onClick={formToSchedule}>Assignment</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
            
            </Modal>

            : <Modal isOpen={modal} toggle={toggle} scrollable size="lg">
            <ModalHeader toggle={toggle} close={<button className="close" onClick={toggle}><i className='nc-icon nc-simple-remove'/></button>}> 
            <p className="card-category">Recieved Assignment {value} <i className="nc-icon nc-chat-33 text-info" /></p></ModalHeader>
            <ModalBody className="modal-container">
              <div className="modal-card">
              <CardTitle className="card-title card-category"> Assignment <span className="text-info">recieved on {value}</span>  <i className="nc-icon nc-email-85 text-info"/></CardTitle>
            {/*console.log(formDate)*/}
            {formDate.length == 0 && <p className="card-category">There is no Assignment message</p>} 
            {formDate.map(m=>
                <Card>
                <CardHeader><div className="form-color card-category">Assignment: {m.title} </div></CardHeader>
                <ul className="card-list text-justify">
                <li> <span><i className="nc-icon nc-circle-10 text-primary"/> From Manager: </span>{m.manager}</li> 
                <li> <span className="text-info"><i className="nc-icon nc-email-85 text-info"/> Assigned date:</span> <span>{m.date}</span></li>
                </ul>
                </Card>
                )
              }
              </div>
            </ModalBody>
            <ModalFooter>
            <p className="card-category">Switch to:</p>
              <Button color="primary" onClick={formToSchedule}>Schedule</Button>{' '}
              <Button color="secondary" onClick={toggle}>Cancel</Button>
            </ModalFooter>
            </Modal>
            }
            </>
      : <><Modal isOpen={modal} toggle={toggle} scrollable size="lg"> <ModalHeader className="modal-header" toggle={toggle} close={<button className="close" onClick={toggle}><i className='nc-icon nc-simple-remove'/></button>}>
     {console.log(new Date())}
     {console.log(day)}
   <p className="card-category"> Projects {value} <i className="nc-icon nc-chart-bar-32 text-success" /></p></ModalHeader>
     <ModalBody className="modal-container">
     <div className="modal-card">
            
            <CardTitle className="card-category"> Projects that {Number(dateformat(new Date()).replace(/\-/g,''))>Number(value.replace(/\-/g,'')) ? <span className="text-secondary">Ended on: {value} <i className="nc-icon nc-button-power"/></span>:<span className="text-danger">Will end on: {value} <i className="nc-icon nc-button-power"/></span>}
            </CardTitle>
          
         
          
        {endDate.length == 0 && <p className="card-category">There is no Project</p>} 
        
        {endDate.sort((a,b)=>{
            return Number(new Date(b.startdate))-Number(new Date(a.startdate))}).map(m=>
      <Card>
          <CardHeader>{Number(new Date())>Number(getEndTime(m.startdate, m.timelength)) ? <div className="finish-color card-category">Project: {m.name} (finished) </div>:<div className="end-color card-category">Project: {m.name} (ongoing)</div>}</CardHeader>
          <ul className="card-list text-justify">
          <li> <span><i className="nc-icon nc-circle-10 text-primary"/> Responsible planner:</span> {m.user}</li> 
          <li> <span><i className="nc-icon nc-button-play text-success"/> Project start date:</span> {dateformat2(new Date(m.startdate))}</li>
          <li> <i className="nc-icon nc-button-power text-danger"/> {Number(new Date())>Number(getEndTime(m.startdate, m.timelength)) ? <span className="text-secondary">End date</span>: <span className="text-danger">Expected end date</span>}: <span>{dateformat2(getEndTime(m.startdate,m.timelength))}</span></li> 
          </ul>
          </Card>
          )
          
        }
    </div>
    </ModalBody>
    <ModalFooter>
            <Button color="secondary" onClick={toggle}>Cancel</Button>
          </ModalFooter>
          </Modal>
       
</>}
        
        </div>
          
        
  
        <Col>
        <Card className="form-history">
          <CardBody>
            <Row>
            <Col>
                <div className="numbers">
                <p className="card-category">Assignment history <i className="nc-icon nc-email-85 text-info" /></p>
                  <CardTitle tag="p"></CardTitle>
              </div>
              </Col>
              </Row>
              {sample_data2.sort((a,b)=>{
                return Number(b.endtime.replace(/\-/g,''))-Number(a.endtime.replace(/\-/g,''))})
                        .slice(0,5).map((m)=>(
                            <ul className="list-element">
                            <li ><button type="button" class="link-btn"> Assignment: {m.project}</button></li>
                            <li >Assigned from <span className="name">{m.first_name}</span> {m.endtime} </li>
                            </ul> 
                        )
                        )
                      }
                         {sample_data.length == 0 && <h6>No Assignments</h6>} 
                          
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
          
        
            {sample_data2.sort((a,b)=>{
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
