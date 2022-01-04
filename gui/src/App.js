import React from "react"
import ValidationLog from "./ValidationLog"
import Main from "./Main"
import  {BrowserRouter as Router,Route,Switch,Redirect}  from "react-router-dom"

function App() {
  

  return (
    <Router>
      <div className="App">

        <Switch>
          <Route exact path="/" component={ValidationLog}></Route>
          <Route path="/main" component={Main}></Route>
        </Switch>
          
      </div>
    </Router>
  )
  
}
export default App
