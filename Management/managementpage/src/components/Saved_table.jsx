import Sample_Saved_Data from '../saved_data.json';
import { useState } from 'react';

const Saved_table = () => {
    const [SearchSchedule,SetSearchSchedule] =  useState("")
    return ( 
       
        <div className="container">
            <h1 class = "text-center" style={{marginTop:60,marginBottom:40,width:"90%"}}>View saved schedules</h1> 
            
            <input type = "text" placeholder='Search history' className='form-control' style={{marginTop:60,marginBottom:40,width:"90%"}}
            onChange={(e) => {
                SetSearchSchedule(e.target.value)
            }}/> 
            <table className = "table table-bordered" >
                <thead class = "table-info">
                    <tr>
                        <th>Name</th>
                        <th>Project</th>
                   </tr>
                </thead>
                <tbody>
                    {Sample_Saved_Data.filter((val)=>{
                        if(SearchSchedule === ""){
                            return val;

                        } 
                        else if(
                            val.first_name.toLowerCase().includes(SearchSchedule.toLowerCase())||
                            val.project.toLowerCase().includes(SearchSchedule.toLowerCase())
                            

                        )
                        {
                            return val;

                        } 
                    }).map((m)=>(
                        <tr>
                            <td>{m.first_name}</td>
                            <td>{m.project}</td>

                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    );

}
 
export default Saved_table ;