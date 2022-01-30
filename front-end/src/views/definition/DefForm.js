import React from 'react';
import GanttDay from 'views/gantt/day/GanttDay';
import CodeEditor from './controls/CodeEditor';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import { FormControl } from 'react-bootstrap';
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    CardGroup,
    Col,
  } from "reactstrap";



const basic = `//task=[machine_id, duration]
job1=[[0, 3], [1, 2], [2, 2]]
job2=[[0, 2], [12, 1], [1, 4]]
job3=[[1, 4], [2, 3]]
jobs=[job1,job2,job3]

//optional
job_names=["job_1","job_2", "job_3"]
//optional
machine_names=["machine_0","machine_1", "machine_2"]

//remember to return
return model.runBasic(jobs)`

const dynamic = `//task=[machine_id, duration]
job1=[[0, 3], [1, 2], [2, 2]]
job2=[[0, 2], [12, 1], [1, 4]]
job3=[[1, 4], [2, 3]]
jobs=[job1,job2,job3]

//priorities will be set in ascending order of expected duration
expected_duration=[15,15,10]

//optional
job_names=["job_1","job_2", "job_3"]
//optional
machine_names=["machine_0","machine_1", "machine_2", "machine_12"]

//remember to return
model.runDynamic(jobs,expected_duration)`

const flexible = `//task=[machine_id, duration]
//if one task has multiple machine choices, it can be defined as below
job1=[[0, 3], [[2, 4], [4, 2]], [2, 4]]
job2=[[4, 1],[[2, 1],[3, 12]]]
job3=[[0, 4], [2, 3]]
jobs=[job1,job2,job3]

//optional
job_names=["job_1","job_2", "job_3"]
//optional
machine_names=["machine_0","machine_2", "machine_3", "machine_4"]

//remember to return
model.runFlexible(jobs)`

const multi = `//task=[machine_id, duration]
//if one task has multiple concurrent processes on different machines, it can be defined as below
job1=[[0, 3], [[1, 2], [10,1]], [[2, 2],[12, 10]]]
job2=[[0, 2], [2, 1], [1, 4]]
job3=[[1, 4], [2, 3]]
jobs=[job1,job2,job3]

//optional
job_names=["job_1","job_2", "job_3"]
//optional
machine_names=["machine_0","machine_1", "machine_2", "machine_10", "machine_12"]

//remember to return
model.runMulti(jobs)
`
const jobType = [basic,dynamic,flexible,multi];
class DefForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal : false,
            showGantt: false,
            selectedOption:"Basic Type",
            scheduleName:"New Schedule",
            description:"",
            script:"",
            user_json:{
                timelength:-1,
                result:{}
            },
            uuid:"",
            result:"",
            
              
            code: jobType[0],
            jobIndex: 0,
            
              response: {
                status: '0',
                message: '',
              },
              success:false,
              flag: 1
        };
        this.domain="http://127.0.0.1:5000"
        this.toggle = this.toggle.bind(this);
        
        this.updateSolution = this.updateSolution.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
    }
    componentDidMount() {

            this.dataPolling = setInterval(
                () => {
                    console.log(this.state.flag)
                  if(this.state.uuid!=="" && this.state.flag===1){
                      
                      this.sendUuid();
                  }
                  
                },
                3000);
        
        
      }
    
    componentWillUnmount() {
        clearInterval(this.dataPolling);
      }
    toggleGantt= () =>{
        console.log(this.state.showGantt)
        this.setState({
          showGantt: !this.state.showGantt
        });
      };
    toggle() {
        this.setState({
          modal: !this.state.modal,
          code: jobType[this.state.jobIndex]
        });
      };

    changeOption = changeEvent =>{    
          let index
          if(changeEvent.target.value=== "Basic Type")
            index = 0
          else if(changeEvent.target.value=== "Dynamic Type")
            index = 1
          else if(changeEvent.target.value=== "Flexible Type")
            index = 2
          else if(changeEvent.target.value=== "Multi-Resource Type")
            index = 3
          this.setState({
            jobIndex: index,
            selectedOption:changeEvent.target.value

        })
          
    };

    changeScheduleName = changeEvent =>{

        this.setState({
          scheduleName:changeEvent.target.value
      })
        console.log(this.state.scheduleName)
    };

    changeDescription = changeEvent =>{

        this.setState({
          description:changeEvent.target.value
        })
        console.log(this.state.description)
    };
    
    handleCodeChange(code) {
      
        
        this.setState({ code:code });
        console.log(this.state.code);
      }
    
      handleRun = event=> {
        event.preventDefault();
        var mydata={
            script:this.state.code
        }
        console.log(mydata)
        fetch(this.domain+"/getuuid", {
            body: JSON.stringify(mydata),
            cache: 'no-cache',
            headers: new Headers({
                'Content-Type': 'application/json'
              }),
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
          })
          .then(response => {
              
            if(response.ok) {
                return response.json();
            }
        }).then(
            data=>{
                console.log("line 142", data)
                if(data.code===1){
                    this.setState({uuid: data.data})
                    this.setState({result: "Schedule "+this.state.uuid+" is running!"})
                    //this.sendUuid(data.data)
                    //轮询呢
                }
          
        } 
    ).catch(error => console.log(error))
    }
    
    sendUuid() {
        var mydata={
            uuid:this.state.uuid
        }
        console.log(mydata)
        fetch(this.domain+"/getres", {
            body: JSON.stringify(mydata),
            cache: 'no-cache',
            headers: new Headers({
                'Content-Type': 'application/json'
              }),
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
          }).then(response=>{
              if(response.ok){
                  return response.json()
                }
            }).then(
            data=>{
                console.log("line 143", data)
                if(data.code===1){
                    console.log(data.data)
                    console.log(this.state.showGantt)
                    console.log(data.data.mid_msg)
                    this.setState({
                        result: data.data.mid_msg,
                        showGantt: true,
                        flag: 0

                    }
                    )
                }
            })
        .catch(error => console.log(error))
    }

    
      updateSolution(event) {
        // event.preventDefault();
        console.log(this.state.task);
        const field = event.target.name;
        const { task } = this.state;
        task[field] = event.target.value;
        return this.setState({ task });
      }
    
      
      
    
    //invoke /getuuid and /getres (轮询)
    runModel() {}

    //invoke /saveSchedule
    saveSchedule(){
        var mydata={
            name:this.state.scheduleName,
            script:this.state.script,
            timelength:this.state.user_json==null?-1:this.state.user_json.timelength,
            result:this.state.user_json==null?"":this.state.user_json.result,
            //0 for new, 1 for compelete, -1 for err
            status:this.state.user_json==null?-1:0,
            errlog:"",
            description:this.state.description,
            uuid:this.state.uuid,
            //uid TODO
            uid:this.state.uid
        }
        fetch('/saveSchedule',{
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
        
        return (
            <>
            <div className="btn-wrapper">
                <Button
                    className="def-button"
                    round
                    onClick={this.toggle}
                    >
                    <i className="nc-icon nc-align-center"></i> Choose Scheduling Type
                </Button>
                <Button
                    className="import-button"
                    round
                    
                    >
                    <i className="nc-icon nc-share-66"></i> Import Existing File
                </Button>
            </div>

            <Modal
                isOpen={this.state.modal}
                toggle={this.toggle}
                className={this.props.className}
                style={{width: "120%"}}
                >
                <ModalHeader toggle={this.toggle}>Type Choice</ModalHeader>
                <ModalBody>
                    <Form>
                        {/* Basic Type */}
                        <div className="form-check">
                            <label style={{marginLeft: "-15px"}}>
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="Basic Type"
                                    
                                    checked={this.state.selectedOption === "Basic Type"}
                                    onChange={this.changeOption}
                                    className="form-check-input"
                                />
                                Basic Type
                            </label>
                            
                        </div>

                        {/* Flexible Type */}
                        <div className="form-check">
                            <label style={{marginLeft: "-1px"}}>
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="Flexible Type"
                                    
                                    checked={this.state.selectedOption === "Flexible Type"}
                                    onChange={this.changeOption}
                                    className="form-check-input"
                                />
                                Flexible Type
                            </label>
                            
                        </div>

                        {/* Dynamic Type */}
                        <div className="form-check">
                            <label style={{marginLeft: "8px"}}>
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="Dynamic Type"
                                    
                                    checked={this.state.selectedOption === "Dynamic Type"}
                                    onChange={this.changeOption}
                                    className="form-check-input"
                                />
                                Dynamic Type
                            </label>
                            
                        </div>

                        {/* Multi-Resource Type */}
                        <div className="form-check">
                            <label style={{marginLeft: "50px"}}>
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="Multi-Resource Type"
                                    
                                    checked={this.state.selectedOption === "Multi-Resource Type"}
                                    onChange={this.changeOption}
                                    className="form-check-input"
                                />
                                Multi-Resource Type
                            </label>
                          
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button className="cancel-btn" onClick={this.toggle}>Cancel</Button>{' '}
                <Button color="secondary" onClick={this.toggle}>Confirm</Button>
                    
                </ModalFooter>
            </Modal>

            <div className="code-area">
                <CardGroup>
                    {/* code module */}
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">
                                Define Your JSSP
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                                >
                                Basic Info
                            </CardSubtitle>
                            <Form>
                                <FormGroup>
                                    <Label>
                                        <div className="required-field">
                                            Schedule Name<div className="asterisk">*</div>
                                        </div>
                                        
                                    </Label>
                                    <Input
                                        name="schedulename"
                                        onChange={this.changeScheduleName}
                                        placeholder="Name your schedule"
                                        //disabled
                                    />
                                </FormGroup>
                                <FormGroup>
                                    <Label>
                                        Description
                                    </Label>
                                    <Input
                                        name="description"
                                        onChange={this.changeDescription}
                                        placeholder="You can write down the description to the schedule"
                                        type="textarea"
                                    />
                                </FormGroup>
                            </Form>
                            {/* code module */}
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                                >
                                Code Area
                            </CardSubtitle>
                            <Form horizontal>
                                <FormGroup>
                                    
                                    <Button round className="plain-btn" onClick={this.handleRun}>
                                        Run
                                        <i className="nc-icon nc-button-play"></i>
                                    </Button>
                                    
                                </FormGroup>
                                <FormGroup >
                                    <Col sm={12}>
                                    <CodeEditor onChange={this.handleCodeChange} code={this.state.code} />
                                    </Col>
                                </FormGroup>
                                
                            
                                
                            </Form>
                    
                        </CardBody>
                    </Card>
                    
                    <Card>
                        <CardBody>
                            <CardTitle tag="h5">
                                Output
                            </CardTitle>
                            <CardSubtitle
                                className="mb-2 text-muted"
                                tag="h6"
                                >
                                Card subtitle
                            </CardSubtitle>
                            
                            
                                <FormGroup >
                                    
                                    {/* <FormControl
                                    readOnly
                                    type="text"
                                    style={{height:"200px",whiteSpace:"pre-line"}}
                                    placeholder={"jimmy <br> jjjj"}
                                    //onChange={this.handleChange}
                                    /> */}
                                    <span style={{height:"200px",whiteSpace:"pre-line",lineHeight:"22px"}}>
                                        {this.state.result}
                                    </span>
                                </FormGroup>
                            
                                
                                <Modal
                                    isOpen={this.state.showGantt}
                                    toggle={this.toggleGantt}
                                    backdrop={false}
                                    size="xl"
                                    centered
                                    scrollable
                                    className="my-modal"
                                    //style={{width: "120%"}}
                                >
                                    
                                    <ModalBody>
                                        <GanttDay showBar={true} />
                                    </ModalBody>
                                                    
                                    <ModalFooter>
                                        <Button className="cancel-btn" onClick={this.toggleGantt}>Cancel</Button>
                                        <Button color="secondary" onClick={this.toggleGantt}>Accept</Button>
                                    </ModalFooter>
                                </Modal>
                            
                            
                    
                        </CardBody>
                    </Card>
                </CardGroup>
            
            </div>
            
            </>
        )
    }
};

export default DefForm;