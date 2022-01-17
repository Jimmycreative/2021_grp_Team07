import React from "react"
import Login from "./Login"
import Main from "./Main"
import  {BrowserRouter as Router,Route,Switch}  from "react-router-dom"

function App() {
  
  return (
    <Router>
      <div className="App">

        <Switch>
          <Route exact path="/" component={Login}></Route>
          <Route path="/main" component={Main}></Route>
        </Switch>
          
      </div>
    </Router>
  )
  
}
export default App
