import React from 'react';
import GanttDay from 'views/gantt/day/GanttDay';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import { Form, FormGroup, Input, Label } from 'reactstrap';
import {
    Card,
    CardHeader,
    CardBody,
    CardTitle,
    CardSubtitle,
    CardText,
    CardGroup,
    Table,
    Row,
    Col,
  } from "reactstrap";

class DefForm extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modal : false,
            selectedOption:"Basic Type",
            scheduleName:"New Schedule",
            description:"",
            script:"",
            user_json:{
                timelength:-1,
                result:{}
            },
            uuid:""

        };
        this.toggle = this.toggle.bind(this);
    }

    toggle() {
        this.setState({
          modal: !this.state.modal
        });
      };

    changeOption = changeEvent =>{
          this.setState({
            selectedOption:changeEvent.target.value
        })
          console.log(this.state.selectedOption)
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
                            <label>
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
                            <Button className="radio-btn">See Details</Button>
                        </div>

                        {/* Flexible Type */}
                        <div className="form-check">
                            <label>
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
                            <Button className="radio-btn">See Details</Button>
                        </div>

                        {/* Dynamic Type */}
                        <div className="form-check">
                            <label>
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
                            <Button className="radio-btn">See Details</Button>
                        </div>

                        {/* Multi-Resource Type */}
                        <div className="form-check">
                            <label>
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
                            <Button className="radio-btn">See Details</Button>
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
                            <div>
                                <Button
                                    round
                                    className="plain-btn"
                                    onClick={this.runModel}
                                    >
                                    <i className="nc-icon nc-button-play"></i>
                                </Button>
                                <CardText>
                                    where the code goes
                                </CardText>
                                
                            </div>
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
                            <CardText>
                                where the output goes
                            </CardText>
                            <GanttDay showBar={false} />
                            <Button>
                                Accept
                            </Button>
                        </CardBody>
                    </Card>
                </CardGroup>
            
            </div>
            
            </>
        )
    }
};

export default DefForm;