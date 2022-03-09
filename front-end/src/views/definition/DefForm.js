import React from 'react';
import GanttDay from 'views/gantt/day/GanttDay';
import CodeEditor from './controls/CodeEditor';

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import {
    Card,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    CardGroup,
    Col,
  } from "reactstrap";

  import { domain } from "../../global"
  import { setTrueDate } from "../../gantt/helper"

const basic = `
decision_var start = 0;
decision_var end = 5
//task=[machine_id, duration]
job1=[[0, 3], [1, 2], [2, 2]]
job2=[[0, 2], [12, 1], [1, 4]]
job3=[[1, 4], [2, 3]]
jobs=[job1,job2,job3]

//optional
job_names=["job_1","job_2", "job_3"]
//optional
machine_names=["machine_0","machine_1", "machine_2", "machine_12"]

myformat=algorithm.standardize(jobs)

js_jobs=myformat.jobs
js_machines=myformat.machines

basic {
    //precedence
    for (job in js_jobs) {
        for (index in job) {
            if (index==count(job)-1) {
                break;
            }
            job[index+1].start>=job[index].end
        }
    }

    //no overlap
    for (machine in js_machines) {
        for (index in machine) {
            if (index==len(job)-1) {
                break;
            }
            mahine[index+].start>=machine[index].end
        }
    }
}
subject_to {
  2job1.start>5;
  job2.end>10;
}
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
return model.runDynamic(jobs,expected_duration)`

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
return model.runFlexible(jobs)`

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
return model.runMulti(jobs)
`
const noTemplate = ``

const jobType = [basic,dynamic,flexible,multi,noTemplate];

class DefForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal : false,
            modalImport: false,
            showGantt: false,
            selectedOption:"Basic Type",
            assignmentId:"",
            description:"",
            
            
            timelength:-1,
            uuid:"",
            result:"",
            
            result_gantt:"", // result for gantt chart 
            code: jobType[0],
            jobIndex: 0,
            
              response: {
                status: '0',
                message: '',
              },
              success:false,
              flag: 1,
              selectedFile: null
        };
        this.toggle = this.toggle.bind(this);
        this.toggleImport = this.toggleImport.bind(this);
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
    clickConfirm = ()=>{

        let index
        if(this.state.selectedOption=== "Basic Type")
            index = 0
        else if(this.state.selectedOption=== "Dynamic Type")
            index = 1
        else if(this.state.selectedOption=== "Flexible Type")
            index = 2
        else if(this.state.selectedOption=== "Multi-Resource Type")
            index = 3
        else if(this.state.selectedOption=== "No template")
            index = 4
            
        this.setState({
            modal: !this.state.modal,
            code: jobType[index]
        })
          
    }

    toggleImport(){
        this.setState({
            modalImport: !this.state.modalImport,
            
          });
    };

    toggle() {
        this.setState({
          modal: !this.state.modal,
          
        });
      };

    changeOption = changeEvent =>{    
            
          this.setState({
            selectedOption:changeEvent.target.value
        })        
    };

    changeAssignmentId = changeEvent =>{

        this.setState({
          assignmentId:changeEvent.target.value
      })
        console.log(this.state.assignmentId)
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
        fetch(domain+"/getuuid", {
            body: JSON.stringify(mydata),
            headers: new Headers({
                'Content-Type': 'application/json'
              }),
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            credentials: 'include',
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
                    console.log(data.data)
                    this.setState({uuid: data.data})
                    this.setState({result:"Schedule "+this.state.uuid+" is running."})
                    this.setState({flag: 1})
                    //this.sendUuid(data.data)
                }
                else {
                    alert(data.message)
                }
          
        } 
    ).catch(error => console.log(error))
    }
    
    sendUuid() {
        var mydata={
            uuid:this.state.uuid
        }
        console.log(mydata)
        fetch(domain+"/getres", {
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
                        timelength: data.data.timelength,
                        result_gantt: data.data.result,
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
    saveSchedule = () => {
        this.setState({
            showGantt: !this.state.showGantt
        })
        var mydata={
            //name:this.state.scheduleName,
            script:this.state.code,
            timelength: this.state.timelength,
            result:this.state.result,
            //0 for new, 1 for compelete, -1 for err
            status:this.state.user_json==null?-1:0,
            errlog:"",
            description:this.state.description,
            uuid:this.state.uuid,
            //uid TODO
            //uid:this.state.uid,
            aid: this.state.assignmentId
        }
        fetch(this.domain+'/saveSchedule',{
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
         .then(res =>res.json())
         .then((data) => {
           console.log(data)
         })
      }

      fileSelectedHandler = (event=>{
        console.log(event.target.files[0])
        if(event.target.files[0].type==="text/plain"){
            console.log("correct!")
        }
        else{
            console.log("wrong format!")
        }
        this.setState({
            selectedFile: event.target.files[0]
        })
      })

      fileUploadHandler = ()=>{
        this.setState({
            modalImport: !this.state.modalImport
        })
        const reader = new FileReader()
        reader.readAsText(this.state.selectedFile)
        reader.onload = ()=>{
            this.setState({code:reader.result})
        }
        reader.onerror = ()=>{
            console.log("file error",reader.error)
        }
        
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
                    onClick={this.toggleImport}
                    >
                    <i className="nc-icon nc-share-66"></i> Import Existing File
                </Button>
            </div>
            <Modal 
                isOpen={this.state.modalImport}
                className={this.props.className}
                style={{width: "120%"}}
            
            >
                <ModalHeader>Import Script</ModalHeader>
                <ModalBody>
                    <input type="file" onChange={this.fileSelectedHandler}/>
                    
                </ModalBody>
                <ModalFooter>
                    <Button className="cancel-btn" onClick={this.toggleImport}>Cancel</Button>{' '}
                    <Button color="secondary" onClick={this.fileUploadHandler}>Upload</Button>    
                </ModalFooter>
            </Modal>
            <Modal
                isOpen={this.state.modal}
                
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

                        {/* No template */}
                        <div className="form-check">
                            <label style={{marginLeft: "-3px"}}>
                                <input
                                    type="radio"
                                    name="react-tips"
                                    value="No template"
                                    
                                    checked={this.state.selectedOption === "No template"}
                                    onChange={this.changeOption}
                                    className="form-check-input"
                                />
                                No template
                            </label>
                          
                        </div>
                    </Form>
                </ModalBody>
                <ModalFooter>
                    <Button className="cancel-btn" onClick={this.toggle}>Cancel</Button>{' '}
                <Button color="secondary" onClick={this.clickConfirm}>Confirm</Button>
                    
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
                                            Assignment ID<div className="asterisk">*</div>
                                        </div>
                                        
                                    </Label>
                                    <Input
                                        name="schedulename"
                                        onChange={this.changeAssignmentId}
                                        placeholder="Please specify the Assignment ID"
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
                                {/* Card subtitle */}
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
                                        <GanttDay showBar={true} task={setTrueDate(this.state.result_gantt)}/>
                                    </ModalBody>
                                                    
                                    <ModalFooter>
                                        <Button className="cancel-btn" onClick={this.toggleGantt}>Cancel</Button>
                                        <Button color="secondary" onClick={this.saveSchedule}>Accept</Button>
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