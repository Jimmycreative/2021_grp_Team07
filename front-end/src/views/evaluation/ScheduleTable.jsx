import sample_data from '../../variables/data/saved_data.json';
import { useState } from 'react';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    Table,
    Row,
    Col,
    Button
  } from "reactstrap";

const ScheduleTable = () => {
    const [SearchSchedule,SetSearchSchedule] =  useState("")
    return ( 

        <div className="container">
            <h1 class = "text-center" style={{marginTop:100,marginBottom:40,width:"90%"}}>My Schedules</h1> 

            <input type = "text" placeholder='Search' className='form-control' style={{marginTop:60,marginBottom:40,width:"90%"}}
            onChange={(e) => {
                SetSearchSchedule(e.target.value)
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
                        if(SearchSchedule === ""){
                            return val;
                        }
                        else if(
                            val.first_name.toLowerCase().includes(SearchSchedule.toLowerCase())||
                            val.project.toLowerCase().includes(SearchSchedule.toLowerCase())
                        )
                        {
                            console.log(val)
                            return val;

                        } 
                    }).map((m)=>(
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
        </div>
    );

}

export default ScheduleTable; 