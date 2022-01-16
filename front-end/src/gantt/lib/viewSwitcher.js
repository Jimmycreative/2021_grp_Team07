import React, { useState } from "react";
import { Button } from 'reactstrap';
import "gantt-task-react/dist/index.css";
import { ViewMode } from "gantt-task-react";

function ViewSwitcher ({viewMode, isChecked}) {
  return (
    <div className="view-container">
      <Button
        className="view-btn"
        onClick={viewMode=ViewMode.QuarterDay}
      >
        Quarter of Day
      </Button>
      <button
        className="view-btn"
        onClick={viewMode=ViewMode.HalfDay}
      >
        Half of Day
      </button>
      <button className="view-btn" onClick={viewMode=ViewMode.Day}>
        Day
      </button>
      <button
        className="view-btn"
        onClick={viewMode=ViewMode.Week}
      >
        Week
      </button>
      <button
        className="view-btn"
        onClick={viewMode=ViewMode.Month}
      >
        Month
      </button>

      <div className="view-switch">
        <label className="view-switch-toggle">
          <input
            type="checkbox"
            defaultChecked={isChecked}
            onClick={isChecked=!isChecked}
          />
          <span className="view-slider" />
        </label>
        Show Task List
      </div>
    </div>
  );
}

export default ViewSwitcher;
