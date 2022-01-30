import React, {useState, useEffect} from 'react';
import ManagerHome from './ManagerHome';
import PlannerHome from './PlannerHome';



export default function BothHome() {

    let [display,setDisplay] = useState('planner');

    if (display==='planner'){
  return <><PlannerHome/></>
    }else if(display==='manager'){
        return <><ManagerHome/></>
    }
    else{
        return <div>invalid input</div>
    }  


}
