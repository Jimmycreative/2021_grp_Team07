import Sample_DATA from '../data.json';
import { useState } from 'react';

const History_table = () => {
    const [searchhistory,setsearchhistory] =  useState("")

    return ( 
       
        <div className="container">
            <h1 class = "text-center" style={{marginTop:60,marginBottom:40,width:"90%"}}>View history of forms</h1> 
            
            <input type = "text" placeholder='Search history' className='form-control' style={{marginTop:60,marginBottom:40,width:"90%"}}
            onChange={(e) => {
                setsearchhistory(e.target.value)
            }}
            /> 
            <table className = "table table-bordered" >
                <thead class = "table-info">
                    <tr>
                        <th>Date</th>
                        <th>Project</th>
                   </tr>
                </thead>
                <tbody>
                    {Sample_DATA.filter((val)=>{
                        if(searchhistory === ""){
                            return val;

                        } 
                        else if(
                        
                            val.project.toLowerCase().includes(searchhistory.toLowerCase())
                            
                        )
                        {
                            return val;

                        } 
                    }).map((m)=>(
                        <tr>
                            <td>{m.date}</td>
                            <td>{m.project}</td>

                        </tr>

                    ))}
                </tbody>
            </table>
        </div>
    );

}
 
export default History_table ;