import './App.css';
import Topbar from './components/Topbar'; 
import History_table from './components/page/History'; //history page 
import SavedSchedule_table from './components/page/Savedschedule';
import AssginForm from './components/page/Message';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


function App() {
  return (
    <>
     <Router>
        <Topbar />
        <Routes>
          <Route path='/history' element={ <History_table/>}/> 
          <Route path='/saved' element={ <SavedSchedule_table/>}/> 
          <Route path='/message' element={ <AssginForm/>}/> 
          
          
        </Routes>
      </Router>
    
    </>
  );
}

export default App;