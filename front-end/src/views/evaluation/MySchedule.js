import React, { Component } from "react";
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import {
    Button,
    Pagination,
    PaginationItem,
    PaginationLink,
    Table,
  } from "reactstrap";
import GanttDay from "views/gantt/day/GanttDay";
import sample_data from '../../variables/data/saved_data.json';
import "./mySchedule.css"

class MySchedule extends Component {
    constructor(props) {
        super(props);
        this.dataSet = [...Array(Math.ceil(500 + Math.random() * 500))].map(
            (a, i) => "Record " + (i + 1)
          );
        this.pageSize = 10;
        this.pagesCount = Math.ceil(sample_data.length / this.pageSize);
        
    
        this.domain = `http://127.0.0.1:5000`;
        this.state = {
            currentPage: 0,
            searchSchedule:"",
            showGantt:false
        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
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
        //this.getAllSchedules()
    }

    setSearchSchedule(schedule) {
        this.setState({
            searchSchedule: schedule
          }); 
    }
    
      //invoke /getAllSchedules
      //planner 0, manager 1
      getAllSchedules () {
        // var mydata={
        //     uid:this.state.script,
        //     role: this.state.script
        // }
        fetch(this.domain+"/getAllSchedules", {
            cache: 'no-cache',
            headers: new Headers({
                'Content-Type': 'application/json'
            }),
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            // redirect: 'follow', // manual, *follow, error
            // referrer: 'no-referrer', // *client, no-referrer
          })
         .then(res =>res.json())
         .then((data) => {
           console.log(data)
         })
    }

    render() {
        const { currentPage } = this.state;
        return (
                <div>
                    <React.Fragment>
                        <h1 class = "text-center" style={{marginTop:100,marginBottom:40,width:"90%"}}>My Schedules</h1>
                        <input
                            type = "text"
                            placeholder='Search'
                            className='form-control'
                            style={{marginTop:60,marginBottom:40,marginLeft:40,width:"90%"}}
                            onChange={(e) => {
                                this.setSearchSchedule(e.target.value)
                        }}/>
                        
                        <Table>
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
                                {sample_data.filter((val)=>{
                                    if(this.state.searchSchedule === ""){
                                        return val;
                                    }
                                    else if(
                                        val.first_name.toLowerCase().includes(this.state.searchSchedule.toLowerCase())||
                                        val.project.toLowerCase().includes(this.state.searchSchedule.toLowerCase())
                                        )
                                        {
                                            console.log(val)
                                            return val;
                                        }
                                    }).slice(currentPage * this.pageSize, (currentPage + 1) * this.pageSize)
                                    .map((m)=>(
                                        <tr>
                                            <td>{m.first_name}</td>
                                            <td>{m.project}</td>
                                            <td>{m.status}</td>
                                            <td>{m.endtime}</td>
                                            <td>
                                                <Button
                                                    className="table-btn"
                                                    onClick={this.toggle}
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
                                                        <GanttDay showBar={true} />
                                                    </ModalBody>
                                                    
                                                    <ModalFooter>
                                                        <Button className="cancel-btn" onClick={this.toggle}>Cancel</Button>{' '}
                                                        <Button color="secondary" onClick={this.toggle}>Confirm</Button>
                                                    </ModalFooter>
                                                </Modal>
                                            </td>
                                        </tr>
                                    ))}
                            </tbody>
                        </Table>
                        <div className="pagination-wrapper">
                            <Pagination aria-label="Page navigation example">
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
                        </div>
                        
                    </React.Fragment>
                </div>
            );
    }
}


export default MySchedule;