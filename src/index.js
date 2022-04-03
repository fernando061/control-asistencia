import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { StyleRoot } from 'radium';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter,Routes,Route } from 'react-router-dom';
import ReporteAsistencia from './views/ReporteAsistencia';
import NotFound from './views/NotFound';
import Login from './views/Login';
ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
    <Routes>
    <Route path='/*' element={<NotFound/>}/>
       <Route path='/' element={ <Login/>}/>
      <Route path='/Asistencia' element={<App />}/>
      <Route path='/Reporte-Asistencia' element={<ReporteAsistencia />}/>
      
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
