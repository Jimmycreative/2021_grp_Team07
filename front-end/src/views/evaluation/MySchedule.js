import React, { Component, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table,
  } from "reactstrap";
import ScheduleTable from "./ScheduleTable";
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
        
    
        this.domain = `http://127.0.0.1:8000`;
        this.state = {
            currentPage: 0,
            searchSchedule:""
        };
    }

    handleClick(e, index) {
        e.preventDefault();
        this.setState({
          currentPage: index
        });
        
    }

    setSearchSchedule(schedule) {
        this.setState({
            searchSchedule: schedule
          }); 
    }
    
      //invoke /getAllSchedules
      //planner 0, manager 1
      getAllSchedules () {
        var mydata={
            skip:this.state.pageSize*(this.state.page-1),
            uid:this.state.script,
            role: this.state.script
        }
        fetch('/getAllSchedules',{
          method:'POST',
          data:mydata,
          headers:{
            'Content-Type':'application/json;charset=UTF-8'
          },
          mode:'cors',
          cache:'default'
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
                                                <Button className="table-btn">Gantt Chart</Button>
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
                    {/* <ScheduleTable /> */}
                </div>
            );
    }
}


export default MySchedule;