import React, { Component, useState } from "react";
import {
    Button,
    Card,
    CardBody,
    CardHeader,
    Col,
    Pagination,
    PaginationItem,
    PaginationLink,
    Row,
    Table,
  } from "reactstrap";
import ScheduleTable from "./ScheduleTable";
import sample_data from '../../variables/data/saved_data.json';

class MySchedule extends Component {
    constructor(props) {
        super(props);
    
        this.domain = `http://127.0.0.1:8000`;
        this.state = {
          isLoaded: false,
    
          items: sample_data, //Customer Debt Items,
          pageItems: [],
          page: 0,
          pageSize: 20
        };
    }
    //invoke /getAllSchedules
    //planner 0, manager 1
    getAllSchedules () {
        var mydata={
            skip:this.state.pageSize*(this.state.page-1),
            uid:this.state.script,
            role: this.state.script
        }
        fetch('/getAllSchedules',{
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
        // const { isLoaded, pageItems, items, page, pageSize } = this.state;
        // const pages = Math.ceil(items.length / page);
        // const paginationItems = Array(pages).fill('').map((i, index) => (
        //     <PaginationItem active={page === index}>
        //         <PaginationLink tag="button" onClick={() => this.setState({page: index })}>2</PaginationLink>
        //     </PaginationItem>
        //     ));
        return (
                <div>
                    <ScheduleTable />
                    <nav>
                        {/* <Pagination>
                            <PaginationItem onClick={() => this.setState(prev => ({page: prev.page -1}))}>
                                <PaginationLink>
                                    Back
                                </PaginationLink>
                            </PaginationItem>
                            
                            <PaginationItem onClick={() => this.setState(prev => ({page: prev.page + 1}))}>
                                <PaginationLink next tag="button">
                                    Next
                                </PaginationLink>
                            </PaginationItem>
                            <PaginationItem></PaginationItem>
                        </Pagination> */}
                    </nav>
                </div>
            );
    }
}


export default MySchedule;