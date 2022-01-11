import React, {useState} from 'react';
import {Link} from 'react-router-dom';
import './Topbar.css'
import logo7 from '../images/tempo_logo.PNG';





function Topbar(){

    // let [current, setCurrent] = useState(['topm-item1', 'topm-item2', 'topm-item3', 'topm-item4', 'topm-current']);
    // var newCurrent = [...current];
    // // let [counter, setCounter] = useState(0);
    // // let [click, setClick]=useState(false); 
    // // const handleClick= () => setClick(!click);
   

    

return(
    <>
    <div className="topbar">
        <div className="topbar-container">
        <Link to='/' className='logo'>
            <img src={logo7}/> 
            </Link>
            <div className='topm-container'> 
                <Link to ='/'className='topm-item'>
                    <div className='topm-letter'>
                    Main
                    </div>
                </Link>
                <Link to ='/list' className='topm-item' >
                    <div className='topm-letter' >
                    List
                    </div>
                </Link>
                <Link to='/manageMain' className='topm-item'>
                    <div className='topm-letter'
                    >
                    Management
                    </div>
                </Link>
                <Link to='/evaluation' className='topm-item'>
                    <div className='topm-letter'>
                Evaluation
                    </div>
                </Link>
                </div> 
                <Link to='/profile' className='profile'>
                    <i class='bi bi-person-circle'/>
                </Link>
                </div> 
                </div>

                </>);

};

export default Topbar;
