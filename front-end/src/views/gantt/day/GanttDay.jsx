import React, { Component } from 'react';
import AdSense from 'react-adsense';
import Gantt from './Gantt';

export default class Main extends Component {
  render() {
    return (
      <div>

        <AdSense.Google client='ca-pub-7292810486004926' slot='7806394673' />

        <Gantt />
      </div>
    );
  }
}
