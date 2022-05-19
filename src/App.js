import './App.css';
import Home from './screens/Home';
import Register from './screens/Register';
import Login from './screens/Login';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Alert from './component/Alert';
import Enterprise from './screens/Enterprise';
import PickUpPage from './component/PickUpPage';

function App() {
  return (
    <div className='app'>
        <BrowserRouter>
          <Routes>
            <Route exact path='/' element={<Login />} />
            <Route  path='/register' element={<Register />} />
            <Route path='/enterprise' element={<Enterprise />} />
            <Route path='/home' element={<Home />} />
            <Route path='/pickup' element={<PickUpPage />} />
          </Routes>
        </BrowserRouter>
        {/* <Alert/> */}
    </div>
  );
}

export default App;
