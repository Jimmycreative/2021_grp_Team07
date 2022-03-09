import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    Button,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
  } from "reactstrap";
//import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import NotificationAlert from "react-notification-alert";
import GanttDay from "views/gantt/day/GanttDay";
import sample_data from '../../variables/data/saved_data.json';
import "./mySchedule.css"
import { domain } from "../../global"

class MySchedule extends Component {
    constructor(props) {
        super(props);
        this.notificationAlert =React.createRef();
        this.dataSet = [...Array(Math.ceil(500 + Math.random() * 500))].map(
            (a, i) => "Record " + (i + 1)
          );
        this.pageSize = 5;
        this.pagesCount = Math.ceil(sample_data.length / this.pageSize);
        
        this.state = {
            currentPage: 0,
            searchSchedule:"",
            showGantt:false,
            tableData:[{}],
            dataErr:true,
            errMsg:"",
            alertVisible:true,
            curResult:{},
            curKey:""
        };

        this.options={
            place: 'tc',
            message: (
                <div>
                    <div>
                        {this.state.errMsg}
                    </div>
                </div>
            ),
            type: "info",
            icon: "nc-icon nc-bell-55",
            autoDismiss: 7
        }
        this.toggle = this.toggle.bind(this);
        this.toggleClose = this.toggleClose.bind(this);
    }
    
    toggle(row) {
        console.log("line 54", row)
        this.setState({
            showGantt: !this.state.showGantt,
            curResult: row.result,
            curKey:row.scheduleid
        });
      };

    toggleClose() {
        this.setState({
            showGantt: !this.state.showGantt
        }); 
      };

    handleClick(e, index) {
        e.preventDefault();
        this.setState({
          currentPage: index
        });
        
    }

    componentWillMount() {
        this.getAllSchedules()
    }

    setSearchSchedule(schedule) {
        this.setState({
            searchSchedule: schedule
          }); 
    }
    
    getScheduleTime(startDate, timeLength) {
        console.log(startDate)
        var date=new Date(startDate);
        date.setDate(date.getDate()+timeLength);
        var strDate = date.toLocaleDateString()
        console.log("line 95", strDate)
        return date
    }
    
      //invoke /getAllSchedules
      //planner 0, manager 1
      getAllSchedules () {
        fetch(domain+"/getAllSchedules", {
            cache: 'no-cache',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors'
          })
         .then(res =>res.json())
         .then((data) => {
           if (data.code==1) {
               for (var i=0;i<data.data.result.length;i++) {
                   console.log("line 113",data.data.result.length)
                   data.data.result[i].result=this.setTrueDate(data.data.result[i].result)
               }
               this.pagesCount=Math.ceil(data.data.result.length / this.pageSize);
               this.setState({
                   tableData:data.data.result
                })
                console.log("line 114",this.state.tableData)
                
           }
           
           else {
               console.log("linw 110")
               this.setState({
                   dataErr:true,
                   errMsg:data.message
               })
               this.refs.notify.notificationAlert(this.options);
           }
           
         })
    }
    
    setTrueDate(origin_tasks) {
        console.log("line 130", origin_tasks)
        const currentDate = new Date();
        var real_tasks=[]
        for (let i = 0; i < origin_tasks.length; i++) {
          const task = origin_tasks[i];
          var start=task.start+1
          var end=task.end+1
          var type=task.type
          task.start=new Date(currentDate.getFullYear(), currentDate.getMonth(), start)
          task.end=new Date(currentDate.getFullYear(), currentDate.getMonth(), end)
          if (type=='project') {
            task.styles={progressColor: '#FFCCCC',progressSelectedColor: '#FFCCCC'}
          }
          real_tasks.push(task)
        }
        return real_tasks
      }

    render() {
        const { currentPage } = this.state;
        return (
                <div className="ScheduleContent">
                    <NotificationAlert ref="notify" zIndex={9999} onClick={() => console.log("something is wrong")} />
                    <React.Fragment>
                        <h2 class = "text-center">My Schedules</h2>
                        <input
                            type = "text"
                            placeholder='Search'
                            className='form-control'
                            style={{marginTop:60,marginBottom:40,marginLeft:40,width:"90%"}}
                            onChange={(e) => {
                                this.setSearchSchedule(e.target.value)
                        }}/>
                        
                        <Table rowKey={'scheduleid'}>
                            <thead className="text-primary">
                                <tr>
                                    <th>Schedule</th>
                                    <th>Create Time</th>
                                    <th>Status</th>
                                    <th>End Time</th>
                                    <th>Gantt Chart</th>
                                </tr>
                            </thead>
                            
                            <tbody>
                                {this.state.tableData.filter((val)=>{
                                    if(this.state.searchSchedule === ""){
                                        return val;
                                    }
                                    else if(
                                        val.name.toLowerCase().includes(this.state.searchSchedule.toLowerCase())
                                        )
                                        {
                                            console.log(val)
                                            return val;
                                        }
                                    }).slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize)
                                    .map((m)=>(
                                        <tr>
                                            <td>{m.name}</td>
                                            <td>{new Date(m.startdate).toLocaleDateString()}</td>
                                            <td>{m.status}</td>
                                            <td>{
                                                    this.getScheduleTime(m.startdate,m.timelength).toLocaleDateString()
                                                }</td>
                                            <td>
                                                <Button
                                                    className="table-btn"
                                                    onClick={()=>this.toggle(m)}
                                                >
                                                    Gantt Chart
                                                </Button>
                                                {/* show Gantt Chart */}
                                                <Modal
                                                    isOpen={this.state.showGantt}
                                                    toggle={this.toggle}
                                                    backdrop={false}
                                                    size="xl"
                                                    centered
                                                    scrollable
                                                    className="my-modal"
                                                    //style={{width: "120%"}}
                                                >
                                                    <ModalHeader toggle={this.toggle}>Type Choice</ModalHeader>
                                                    <ModalBody>
                                                        <GanttDay showBar={true} task={this.state.curResult} />
                                                    </ModalBody>
                                                    
                                                    <ModalFooter>
                                                        <Button className="cancel-btn" onClick={this.toggleClose}>Cancel</Button>{' '}
                                                        <Button color="secondary" onClick={this.toggleClose}>Confirm</Button>
                                                    </ModalFooter>
                                                </Modal>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                        <div className="pagination-wrapper" >
                        <Pagination aria-label="Page navigation example">
                        {/* <Stack spacing={2}>
                            <Pagination count={this.pagesCount}> */}
                                <PaginationItem disabled={currentPage <= 0}>
                                    <PaginationLink
                                        onClick={e => this.handleClick(e, currentPage - 1)}
                                        previous
                                        href="#"
                                    />
                                </PaginationItem>
                                
                                {[...Array(this.pagesCount)].map((page, i) =>
                                    <PaginationItem active={i === currentPage} key={i}>
                                        <PaginationLink onClick={e => this.handleClick(e, i)} href="#">
                                            {i + 1}
                                        </PaginationLink>
                                    </PaginationItem>
                                )}
                                
                                <PaginationItem disabled={currentPage >= this.pagesCount - 1}>
                                    
                                    <PaginationLink
                                        onClick={e => this.handleClick(e, currentPage + 1)}
                                        next
                                        href="#"
                                        
                                    />
                                </PaginationItem>
                            </Pagination>
                            {/* </Stack> */}
                        </div>
                        
                    </React.Fragment>
                </div>
            );
    }
}


export default MySchedule;