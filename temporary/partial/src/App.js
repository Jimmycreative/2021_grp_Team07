//bootstrap -v 5.1.3 (??)
//React router v6
import './App.css';
import Topbar from './components/Topbar';
import Main from './components/page/Main';
import Management from './components/page/Management';
import Invitation from './components/page/Invitation';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <>
     <Router>
        <Topbar />
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/manageMain' element={<Management/>}/>
          <Route path='/manageInvite' element={<Invitation/>}/>
        </Routes>
      </Router>
    
    </>
  );
}

export default App;
