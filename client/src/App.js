import logo from './logo.svg';
import './App.css';
import {Routes, Route, Links} from 'react-router-dom'
import Form from './components/Form';
import Update from './components/Update';
import ShowOne from './components/ShowOne';

function App() {
  return (
    <div className="App">
      <h1>Products</h1>
      <hr/>
      <Routes>
        {/* show all and create */}
        <Route path='/' element ={<Form/>}/>

        {/* EDIT */}
        <Route path='/products/:id/edit' element={<Update/>}/>

        {/* READ ONE */}
        <Route path='/products/:id' element={<ShowOne/>}/>
        
      </Routes>
    </div>
  );
}

export default App;
