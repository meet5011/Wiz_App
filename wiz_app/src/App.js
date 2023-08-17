import logo from './logo.svg';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import './App.css';
import MyRoute from './routes/route';

function App() {
  return (
    <div className="App">
   <MyRoute />
    </div>
  );
}

export default App;
