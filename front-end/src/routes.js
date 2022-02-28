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
// import MyGantt from 'views/gantt/GanttChart';
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
import BothHome from "views/tempo_home/BothHome";

import memoryUtils from "./views/registration/userInfo/memoryUtil"
import storageUtils from "./views/registration/userInfo/storageUtils"
import { jsonParse } from "./variables/util/util"

//const user = jsonParse(storageUtils.getUser())
const user = storageUtils.getUser()
memoryUtils.user = user
//0 for planner, 1 for manager
const isManager=user.role==0?false:true
console.log("line 50", user, isManager)

var routes = [
 
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "nc-icon nc-bank",
    component: Dashboard,
    layout: "/admin",
    toView:true,
    managerSee: true,
    plannerSee:true
  },
  {
    path: "/home",
    name: "Home",
    icon: "nc-icon nc-bank",
    layout: "/admin",
    component: BothHome,
    toView:true,
    managerSee: true,
    plannerSee:true
  },
  {
    path: "/usermanual",
    name: "User Manual",
    icon: "nc-icon nc-map-big",
    component: UserManual,
    layout: "/admin",
    toView:true,
    managerSee: true,
    plannerSee:true
  },
  {
    path: "/profile",
    name: "Profile",
    icon: "nc-icon nc-bank",
    component: Profile,
    layout: "/admin",
    toView:false,
    managerSee: true,
    plannerSee:true,
    isManager:false,
    isManager:isManager
  },
  {
    path: "/assignment",
    name: "Assignment",
    icon: "nc-icon nc-bullet-list-67",
    layout: "/admin",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    toView:true,
    managerSee: true,
    plannerSee:true,
    isManager:isManager,
    subNav: [
      {
        path: "/schedule_m",
        name: "New Schedule (M)",
        icon: "nc-icon nc-paper",
        component: ManagerAssign,
        layout: "/admin",
        isManager:true,
        toView:true,
        managerSee: true,
        plannerSee: false,
        isManager:isManager
      },
      {
        path: "/invitation",
        name: "Invitation",
        icon: "nc-icon nc-badge",
        component: Invitation,
        layout: "/admin",
        isManager:true,
        toView:true,
        managerSee: true,
        plannerSee: false,
        isManager:isManager
      },
      {
        path: "/schedule_p",
        name: "New Schedule (P)",
        icon: "nc-icon nc-paper",
        component: PlannerAssign,
        layout: "/admin",
        isPlanner:true,
        toView:true,
        managerSee: false,
        plannerSee:true,
        isManager:isManager
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
    toView:true,
    managerSee: false,
    plannerSee: true,
    isManager:isManager
  },
  {
    path: "/evaluation",
    name: "Evaluation",
    icon: "nc-icon nc-chart-bar-32",
    layout: "/admin",
    iconClosed: <RiIcons.RiArrowDownSFill />,
    iconOpened: <RiIcons.RiArrowUpSFill />,
    toView:true,
    managerSee: true,
    plannerSee:true,
    isManager:isManager,
    subNav: [
      {
        path: "/schedule",
        name: "My Schedule",
        icon: "nc-icon nc-tile-56",
        component: MySchedule,
        layout: "/admin",
        isManager:true,
        toView:true,
        managerSee: true,
        plannerSee:true,
        isManager:isManager
      },
      {
        path: "/progress",
        name: "Progress",
        icon: "nc-icon nc-align-left-2",
        component: Progress,
        layout: "/admin",
        isManager:true,
        toView:true,
        managerSee: true,
        plannerSee:true,
        isManager:isManager
      }
    ]
  },
  {
    path: "/icons",
    name: "Icons",
    icon: "nc-icon nc-diamond",
    component: Icons,
    layout: "/admin",
    toView:true,
    managerSee: true,
    plannerSee:true,
    isManager:isManager
  },
  {
    path: "/maps",
    name: "Maps",
    icon: "nc-icon nc-pin-3",
    component: Maps,
    layout: "/admin",
    toView:true,
    managerSee: true,
    plannerSee:true,
    isManager:isManager
  },
  {
    path: "/notifications",
    name: "Notifications",
    icon: "nc-icon nc-bell-55",
    component: Notifications,
    layout: "/admin",
    toView:true,
    managerSee: true,
    plannerSee:true,
    isManager:isManager
  },
  {
    path: "/user-page",
    name: "User Profile",
    icon: "nc-icon nc-single-02",
    component: UserPage,
    layout: "/admin",
    toView:true,
    managerSee: true,
    plannerSee:true,
    isManager:isManager
  },
  {
    path: "/tables",
    name: "Table List",
    icon: "nc-icon nc-tile-56",
    component: TableList,
    layout: "/admin",
    toView:true,
    managerSee: true,
    plannerSee:true,
    isManager:isManager
  },
  {
    path: "/typography",
    name: "Typography",
    icon: "nc-icon nc-caps-small",
    component: Typography,
    layout: "/admin",
    toView:true,
    managerSee: true,
    plannerSee:true,
    isManager:isManager
  },
  {
    //pro: true,
    path: "/upgrade",
    name: "Upgrade to PRO",
    icon: "nc-icon nc-spaceship",
    component: UpgradeToPro,
    layout: "/admin",
    toView:true,
    managerSee: true,
    plannerSee:true,
    isManager:isManager
  },
  
];
export default routes;
