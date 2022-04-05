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
import { DataArray } from '@mui/icons-material';

const basic = `
decision_var start = 0
decision_var end = 5
//task=[machine_id, duration]
job1=[[0, 3], [1, 2], [2, 2]]
job2=[[0, 2], [2, 1], [1, 4]]
job3=[[1, 4], [2, 3]]
jobs=[job1,job2,job3]

//optional
job_names=["job_aaa","job_bbb", "job_ccc"]
//optional
machine_names=["machine_0","machine_1", "machine_2"]

myformat=algorithm.standardize(jobs)
js_jobs=myformat.jobs
js_machines=myformat.machines

basic {
    //precedence constraint
    for (job in js_jobs) {
        for (index in range(0, (count(job)-2))) {
            print(index)
            job[index+1].start>=job[index].end
        }
    }

    //no overlap constraint
    for (machine in js_machines) {
        for (index in range(0, (count(machine)-2))) {
            mahine[index+1].start>=machine[index].end
        }
    }
    
}
subject_to {
  2*js_jobs[0][0].start<=5;
  1*js_jobs[0][1].end>10;
}
//remember to return
return model.runModel(type=1, originalData=myformat)`

const dynamic = `//task=[machine_id, duration]
decision_var start = 0
decision_var end = 5
decision_var priority = [1,5,3]

job1=[[0, 3], [1, 2], [2, 2]]
job2=[[0, 2], [4, 1], [1, 4]]
job3=[[1, 4], [2, 3]]
jobs=[job1,job2,job3]

//optional
job_names=["job_1","job_2", "job_3"]
//optional
machine_names=["machine_0","machine_1", "machine_2", "machine_3"]

myformat=algorithm.standardize(jobs)
js_jobs=myformat.jobs
js_machines=myformat.machines

basic {
    //precedence constraint
    for (job in js_jobs) {
        for (index in range(0, (count(job)-2))) {
            print(index)
            job[index+1].start>=job[index].end
        }
    }

    //no overlap constraint
    for (machine in js_machines) {
        for (index in range(0, (count(machine)-2))) {
            mahine[index+1].start>=machine[index].end
        }
    }
    //priority constraint
    for(machine in js_machines) {
        for (index in range(0, (count(machine.tasks)-2))) {
            machine.tasks[index+1].priority<=machine.tasks[index].priority
        }
    }

}

subject_to {
    2*js_jobs[0][0].start<=5;
    1*js_jobs[0][1].end>10;
  }

//remember to return
return model.runModel(type=2, originalData=myformat)`

const flexible = `//task=[machine_id, duration]
//if one task has multiple machine choices, it can be defined as below
job1=[[0, 3], [[2, 4], [4, 2]], [2, 4]]
job2=[[4, 1],[[2, 1],[3, 12]]]
job3=[[0, 4], [2, 3]]
jobs=[job1,job2,job3]

//optional
job_names=["job_aaa","job_bbb", "job_ccc"]
//optional
machine_names=["machine_0","machine_2", "machine_3", "machine_4"]

//remember to return
return model.runModel(type=3,originalData=null)`

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
return model.runModel(type=4,originalData=null)`

const noTemplate = ""
const jobType = [basic,dynamic,flexible,multi,noTemplate];

class DefForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal : false,
            modalImport: false,
            showGantt: false,
            selectedOption:"Basic Type",
            selectedOption1:"Basic Type",
            assignmentId:"",
            description:"",
            
            
            timelength:-1,
            uuid:"",
            result:"",
            
            result_gantt:"", // result for gantt chart 
            originalRes:"",
            code: jobType[0],
            jobIndex: 0,
            
              response: {
                status: '0',
                message: '',
              },
              success:false,
              flag: 1,
              selectedFile: null,
              selectedData:null,
              selectedIndex: 0,
              dataModal: false,
              dataTypeModal: false,
              dataCode: jobType[0],
              dataIndex:0
        };
        this.toggle = this.toggle.bind(this);
        this.toggleImport = this.toggleImport.bind(this);
        this.toggleImportData=this.toggleImportData.bind(this);
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
    

    dataUploadHandler = ()=>{
        this.setState({
            dataModal: !this.state.dataModal
        })
        const reader1 = new FileReader()
        reader1.readAsText(this.state.selectedData)
        reader1.onload = ()=>{
            
            this.setState({
                dataCode:reader1.result,
                code: reader1.result
            })
            this.handleDataRun()
        }
        console.log("line 513", this.state.dataCode)
        console.log(this.state.dataCode)
        reader1.onerror = ()=>{
            console.log("file error",reader1.error)
        }
        
        
      }

    toggleImport(){
        this.setState({
            modalImport: !this.state.modalImport,
            
          });
    };
    toggleImportData(){
        this.setState({
            dataModal: !this.state.dataModal,
          });
          console.log("line 264",this.state.dataModal)
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

    changeOption1 = changeEvent =>{    
        
        this.setState({
          selectedOption1:changeEvent.target.value
      })
      console.log(this.state.selectedOption1)
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
        console.log("line 316",this.state.code);
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
                    if (data.code==20) {
                        this.setState({result:data.data})
                        this.setState({uuid:""})
                        this.setState({flag: 1})
                    }
                    else {
                        alert(data.message)
                    }
                    
                }
          
        } 
    ).catch(error => console.log(error))
    }

    handleDataRun = ()=> {
        
        //event.preventDefault();
        var mydata={
            scriptData:this.state.dataCode,
            typeIndex: this.state.selectedIndex

        }
        console.log("line 372",mydata)
        fetch(domain+"/inputData", {
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
                 console.log("line 392", data)
                 if(data.code===1){
                    console.log(data.data)
                    this.setState({uuid: data.data})
                    this.setState({result:"Schedule "+this.state.uuid+" is running."})
                    this.setState({flag: 1})
                    //this.sendUuid(data.data)
                }
                else if (data.code==20) {
                    console.log(data.data)
                    this.setState({result: data.data})
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
        console.log("420",mydata)
        fetch(domain+"/getres", {
            body: JSON.stringify(mydata),
            cache: 'no-cache',
            headers: new Headers({
                'Content-Type': 'application/json'
              }),
            credentials: 'include',
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
                if(data.code===1){
                    console.log("line 440",data.data.result)
                    console.log(this.state.showGantt)
                    
                    this.setState(()=>{ return{
                        result: data.data.mid_msg,
                        timelength: data.data.time_length,
                        result_gantt: JSON.parse(JSON.stringify(data.data.result)),
                        originalRes: JSON.parse(JSON.stringify(data.data.result)),
                        showGantt: true,
                        flag: 0

                    }} ,() => {
                        console.log()
                      }
                    );
                }
                
                else if (data.code==-1) {
                    this.setState({uuid: ""})
                    this.setState({flag: 0})
                    this.setState({code: ""})
                    alert(data.message)
                }
                console.log(this.state.timelength)
            })
        .catch(error => console.log(error))
    }

    

    
      updateSolution(event) {
        // event.preventDefault();
        //console.log(this.state.task);
        const field = event.target.name;
        const { task } = this.state;
        task[field] = event.target.value;
        return this.setState({ task });
      }
    
      
      
    
    //invoke /getuuid and /getres (轮询)
    runModel() {}

    //invoke /saveSchedule
    saveSchedule = () => {
        console.log("line 487", this.state.originalRes)
        
        this.setState({
            showGantt: !this.state.showGantt
        })
        console.log("line 464", this.state.timelength)
        var mydata={
            //name:this.state.scheduleName,
            script:this.state.code,
            timelength: this.state.timelength,

            result:this.state.originalRes,

            //0 for new, 1 for compelete, -1 for err
            status:this.state.result_gantt==null?-1:1,
            errlog:"",
            description:this.state.description,
            uuid:this.state.uuid,
            //uid TODO
            //uid:this.state.uid,
            aid: this.state.assignmentId
        }
        console.log(mydata)
        fetch(domain+'/saveSchedule',{
            body: JSON.stringify(mydata),
            cache: 'no-cache',
            headers: new Headers({
                'Content-Type': 'application/json'
              }),
            credentials: 'include',
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            mode: 'cors', // no-cors, cors, *same-origin
            redirect: 'follow', // manual, *follow, error
            referrer: 'no-referrer', // *client, no-referrer
        })
         .then(res =>res.json())
         .then((data) => {
           console.log(data)
           alert(data.message)
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

      dataSelectedHandler = (event=>{
        console.log(event.target.files[0])
        if(event.target.files[0].type==="text/plain"){
            console.log("correct!")
        }
        else{
            console.log("wrong format!")
        }
        this.setState({
            selectedData: event.target.files[0]
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
                    <i className="nc-icon nc-share-66"></i> Import Script
                </Button>
                <Button
                    className="import-button"
                    round
                    onClick={this.toggleImportData}
                    >
                    <i className="nc-icon nc-share-66"></i> Import Data
                </Button>
            </div>

            <Modal 
                isOpen={this.state.dataModal}
                className={this.props.className}
                style={{width: "120%"}}
            
            >
                <ModalHeader>Import Data</ModalHeader>
                <ModalBody>
                    <input type="file" onChange={this.dataSelectedHandler}/>
                    
                </ModalBody>
                <ModalFooter>
                    <Button className="cancel-btn" onClick={this.toggleImportData}>Cancel</Button>{' '}
                    <Button color="secondary" onClick={this.dataUploadHandler}>Upload</Button>    
                </ModalFooter>
            </Modal>
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