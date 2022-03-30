import React,{useState, useEffect} from 'react'; 

import {
    Card,
    CardBody,
    Row,
    Col,
    Button
  } from "reactstrap";

// function exists(){
// if()
// }


function Profile() {
  const [data, setData] = useState([{}]);
  const [click,setClick] =useState(true);
  const handleClick = () => setClick(!click);
  const [userName,setUserName] =useState(''); 
  

  const [change, setChange] = useState(false);
  const handleChange = () => {
    setChange(true);
    setClick(!click);
  }

  //Window.localStorage.setItem('1',userName)
  //getItem, removeItem, windowStorage.clear(); 

  const usNameHandler = (e) =>{
    setUserName(e.target.value)
  }

  
  

  
    //temporary
    useEffect(()=>{
      fetch("https://jsonplaceholder.typicode.com/users/1")
      .then(
        res=>res.json()
      ).then(
        data=>{
          setData(data)
        }
      ).catch(err=>{
        console.log('Fetch Error',err);
      })
    },[]);




    return (
      <>
      <div className="content">
        <Row >
          <Col md="5">
            <Card className="card-user" style={{position: "relative", left:"15vw",top:"15%",width:"50vw",height:"100%"}} >
              <div className="image">
                <img
                  alt="..."
                  src={require("assets/img/damir-bosnjak.jpg").default}
                />
              </div>
              <p></p>
              <CardBody style={click ? {position: "relative", top:"15%"} : {position: "relative", top:"9.3%"}}>
                <div className="author">
                  <a href="#pablo" 
                  onClick={(e) => e.preventDefault()} style={{textDecoration:"none"}}>
                    <h4 className="title" ><span className="description" style={{fontSize:"1rem"}}>Name: </span>  {data.name} </h4> 
                     </a>
                   <h5 className="title" style={{color:"black"}}><span className="description" style={{fontSize:"1rem"}}>Role:</span> Planner </h5> 
                   {/* this will be changed to data.role or something */}
                 
                  {click && <><p style={{color:"gray",fontSize:"1.3rem"}}><span className="description" style={{fontSize:"1rem"}}>Username:</span> {change ? userName : data.username}
                  {/* <i className="nc-icon nc-settings-gear-65" style={{position:'relative', textDecoration:"none",left:"1%",top:"2%"}} onClick={handleClick}/> */}
                  </p>
                 </> }
                   
                {!click &&<>
                  <p className="description" style={{fontSize:"1rem"}}>Change username: <input type="text" className="changeUsername" placeholder={change ? userName : data.username} onChange={usNameHandler}/></p>
                  <Button  style={{backgroundColor:"rgb(82,203,206)" ,position:"relative"}} onClick={handleChange}>Change</Button>
                  <Button style={{backgroundColor:"rgb(164,108,87)",position:"relative"}} onClick={handleClick} >Cancel</Button>
                  </>}

                  <p style={{color:"gray",fontSize:"1.2rem"}}><span className="description" style={{fontSize:"1rem"}}>Displayname:</span> {data.username}</p>
                  
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  );

  }

 
  
    

export default Profile;