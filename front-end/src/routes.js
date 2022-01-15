/*!

=========================================================
* Paper Dashboard React - v1.3.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)

* Licensed under MIT (https://github.com/creativetimofficial/paper-dashboard-react/blob/main/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

import * as RiIcons from 'react-icons/ri';

import Profile from "views/profile/Profile";
import Home from "views/Home";
import UserManual from "views/userManual/UserManual";
import Invitation from "views/assignment/manager/Invitation";
import ManagerAssign from "views/assignment/manager/ManagerAssign";
import PlannerAssign from "views/assignment/planner/PlannerAssign";
import DefForm from "views/definition/DefForm";
import MySchedule from "views/evaluation/MySchedule";
import Progress from "views/evaluation/Progress";

import Dashboard from "views/Dashboard.js";
import Notifications from "views/Notifications.js";
import Icons from "views/Icons.js";
import Typography from "views/Typography.js";
import TableList from "views/Tables.js";
import Maps from "views/Map.js";
import UserPage from "views/User.js";
import UpgradeToPro from "views/Upgrade.js";

var routes = [
 
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    toView:true
  },
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-bank",
    component: Home,
    layout: "/admin",
    toView:true
  },
  {
    path: "/usermanual",
    name: "User Manual",
    icon: "nc-icon nc-map-big",
    component: UserManual,
    layout: "/admin",
    toView:true
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-bank",
    component: Profile,
    layout: "/admin",
    toView:false
  },
  {
    path: "/assignment",
    name: "Assignment",
    icon: "nc-icon nc-bullet-list-67",
    layout: "/admin",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    toView:true,
    subNav: [
      {
        path: "/schedule_m",
        name: "New Schedule (M)",
        icon: "nc-icon nc-paper",
        component: ManagerAssign,
        layout: "/admin",
        isManager:true,
        toView:true
      },
      {
        path: "/invitation",
        name: "Invitation",
        icon: "nc-icon nc-badge",
        component: Invitation,
        layout: "/admin",
        isManager:true,
        toView:true
      },
      {
        path: "/schedule_p",
        name: "New Schedule (P)",
        icon: "nc-icon nc-paper",
        component: PlannerAssign,
        layout: "/admin",
        isPlanner:true,
        toView:true
      }
    ]
  },
  {
    path: "/definition",
    name: "Definition",
    icon: "nc-icon nc-ruler-pencil",
    component: DefForm,
    layout: "/admin",
    isPlanner:true,
    toView:true
  },
  {
    path: "/evaluation",
    name: "Evaluation",
    icon: "nc-icon nc-chart-bar-32",
    layout: "/admin",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    toView:true,
    subNav: [
      {
        path: "/schedule",
        name: "My Schedule",
        icon: "nc-icon nc-tile-56",
        component: MySchedule,
        layout: "/admin",
        isManager:true,
        toView:true
      },
      {
        path: "/progress",
        name: "Progress",
        icon: "nc-icon nc-align-left-2",
        component: Progress,
        layout: "/admin",
        isManager:true,
        toView:true
      }
    ]
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
    toView:true
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
    toView:true
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
    toView:true
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
    toView:true
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
    toView:true
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin",
    toView:true
  },
  {
    //pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-spaceship",
    component: UpgradeToPro,
    layout: "/admin",
    toView:true
  },
  
];
export default routes;
