import React from "react"
import ValidationLog from "./components/registration/validationLog"
//import Main from "./Main"
import Main from "./components/main"
import './styles/App.css';
import Topbar from './components/topBar'; 
import HistoryTable from './components/management/history'; //history page 
import SavedScheduleTable from './components/management/savedSchedule';
import AssginForm from './components/management/message';
import Management from './components/management/management';
import Invitation from './components/registration/invitation';
import  {BrowserRouter as Router, Routes, Route,Switch,Redirect}  from "react-router-dom"

function App() {
  

  return (
    <Router>
      {/* <div className="App"> */}

      <Topbar />
        <Switch>
          <Route exact path="/" component={ValidationLog} />
          <Route exact path="/main" component={Main}></Route>
          {/* <Route path='/' component={<Main/>}/> */}
          <Route exact path='/history' component={HistoryTable} />
          <Route exact path='/saved' component={SavedScheduleTable}/> 
          <Route exact path='/message' component={AssginForm}/> 
      
          <Route exact path='/manageMain' component={Management}/>
          <Route exact path='/manageInvite' component={Invitation}/>
        </Switch>
          
      {/* </div> */}
    </Router>
  )
  
}
export default App
