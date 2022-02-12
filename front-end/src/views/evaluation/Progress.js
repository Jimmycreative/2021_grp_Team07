import React, { useEffect, useState } from 'react';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { domain } from "../../global"


ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);


function Progress() {
  const [data, setData] = useState();
  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: 'Chart.js Bar Chart',
      },
    },
  };

const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'July', 'July', 'July'];

// const data = {
//     labels: labels,
//     datasets: [{
//       label: 'Progress for 10 recent schedules',
//       backgroundColor: '#33CCCC',
//       borderColor: 'rgb(255, 99, 132)',
//       data: [0.5, 0.6, 0.57, 0.2, 0.02, 0.33, 0.45, 0.1, 1, 0.99],
//     }]
//   };
  
  useEffect(() => {
    getAllSchedules()
  },[])

const getAllSchedules = () => {
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
       console.log(data)
       if (data.code==1) {
         getBarData(data.data.result)
       }
     })
     .catch(err =>{
       console.log("err",err)
      })
    }
    const getBarData= (res) => {
      var labels=[]
      var my_data=[]
      for (let i=0;i<res.length;i++) {
        labels.push(res[i].name)
        var start=new Date(res[i].startdate)
        var timelength=res[i].timelength
        var cur=new Date()
        var now=cur.getDate()-start.getDate()
        if (now>timelength) {
          my_data.push(1)
        }
        else {
          my_data.push(now/timelength)
        }
        
      }
      var bar_data={}
      bar_data = {
        labels: labels,
        datasets: [{
          label: 'Progress for 10 recent schedules',
          backgroundColor: '#33CCCC',
          borderColor: 'rgb(255, 99, 132)',
          data: my_data
        }]
      }
      setData(bar_data)
    }
  
    return (
        <>
        {console.log(data)}
        <div className="my-progress">
            <Bar options={options} data={data} />
        </div>
        
        </>
    )
}

export default Progress;