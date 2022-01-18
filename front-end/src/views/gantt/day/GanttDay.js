import React, { useState, useEffect } from "react";
import { ViewMode, Gantt } from "gantt-task-react";
import { getStartEndDateForProject, initTasks } from "../../../gantt/lib/helper";
import "gantt-task-react/dist/index.css";

class GanttDay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      view : ViewMode.Day,
      tasks: initTasks(),
      isChecked: false,
      columnWidth: 60,
      showBar: this.props.showBar
    };
  }
  

  setTasks = (myTask) => {
    console.log(myTask)
    this.setState({
      task:myTask
    })
  }
  onViewModeChange = (viewMode) => {
    var col=60
    if (viewMode === ViewMode.Month) {
      col = 300;
    } else if (viewMode === ViewMode.Week) {
      col = 250;
    }
    this.setState({
      view:viewMode,
      columnWidth:col
    })
  };
  onViewListChange = () => {
    var checked=this.state.isChecked;
    this.setState({
      isChecked:!checked
    })
  };

  handleTaskChange = (task) => {
    console.log("On date change Id:" + task.id);
    let newTasks = this.state.tasks.map(t => (t.id === task.id ? task : t));
    if (task.project) {
      const [start, end] = getStartEndDateForProject(newTasks, task.project);
      const project = newTasks[newTasks.findIndex(t => t.id === task.project)];
      if (
        project.start.getTime() !== start.getTime() ||
        project.end.getTime() !== end.getTime()
      ) {
        const changedProject = { ...project, start, end };
        newTasks = newTasks.map(t =>
          t.id === task.project ? changedProject : t
        );
      }
    }
    this.setTasks(newTasks);
  };
  
  handleTaskDelete = (task) => {
    const conf = window.confirm("Are you sure about " + task.name + " ?");
    if (conf) {
      this.setTasks(this.state.tasks.filter(t => t.id !== task.id));
    }
    return conf;
  };
  
  handleProgressChange = async (task) => {
    this.setTasks(this.state.tasks.map(t => (t.id === task.id ? task : t)));
    console.log("On progress change Id:" + task.id);
  };
  
  handleDblClick = (task) => {
    alert("On Double Click event Id:" + task.id);
  };
  
  handleSelect = (task, isSelected) => {
    console.log(task.name + " has " + (isSelected ? "selected" : "unselected"));
  };
  
  handleExpanderClick = (task) => {
    console.log("On expander click Id:" + task.id);
  };

  render() {
    return (
      <div>
        <div></div>
        <div className="view-container">
          {this.state.showBar &&
            <button className="view-btn" onClick={()=>this.onViewModeChange(ViewMode.Day)}>
              Day
            </button>
          }
          {this.state.showBar &&
            <button className="view-btn" onClick={()=>this.onViewModeChange(ViewMode.Week)}>
              Week
            </button>
          }
          {this.state.showBar &&
            <button className="view-btn" onClick={()=>this.onViewModeChange(ViewMode.Month)}>
              Month
            </button>
          }
          {this.state.showBar &&
            <div className="view-switch">
              <label className="view-switch-toggle">
                <input
                  type="checkbox"
                  defaultChecked={this.state.isChecked}
                  onClick={this.onViewListChange}
                />
                <span className="view-slider" />
                
              </label>
              Show Task List
            </div>
          }
          
      </div>
        <Gantt
          className="gantt-chart"
          tasks={this.state.tasks}
          viewMode={this.state.view}
          onDateChange={this.handleTaskChange}
          onDelete={this.handleTaskDelete}
          onProgressChange={this.handleProgressChange}
          onDoubleClick={this.handleDblClick}
          onSelect={this.handleSelect}
          onExpanderClick={this.handleExpanderClick}
          listCellWidth={this.state.isChecked ? "155px" : ""}
          columnWidth={this.state.columnWidth}
          //ganttHeight={500}
        />
      </div>
    );
  }
}
export default GanttDay;