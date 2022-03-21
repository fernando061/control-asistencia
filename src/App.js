import logo from './logo.svg';
import './App.css';
import { useState } from 'react';
import logoSanMarcos from './Assets/logo-unmsm-white-text-home.png'
import insignia from './Assets/INSIGNIA OFICIAL FIEE PNG.png'
import nuevaFiee from './Assets/nuevaFiee.jpg'
import { Button, Image, Navbar, } from 'react-bootstrap';
import Ingreso from './component/Ingreso';
import Salida from './component/Salida';

function App() {

  const [registro, setRegistro] = useState(1);
  const [visibiliti, setVisibiliti] = useState("block")
  // const
  const styles = {
font:{
  fontFamily: 'Gugi, cursive',
color:'#fff',
},
backImg:{
  backgroundImage: nuevaFiee,
  
},
groupButton:{
  display: visibiliti
}
  }
  return (
    <div className="App" style={styles.backImg}  >
      <Navbar bg="primary" variant="dark" className='d-flex justify-content-between'>
        <Image src={logoSanMarcos} width='280' />
        <Image src={insignia} width='120' />
    {/* <Container>
    <Navbar.Brand href="#home">Navbar</Navbar.Brand>
    <Nav className="me-auto">
      <Nav.Link href="#home">Home</Nav.Link>
      <Nav.Link href="#features">Features</Nav.Link>
      <Nav.Link href="#pricing">Pricing</Nav.Link>
    </Nav>
    </Container> */}
  </Navbar>
  <div className='mt-5' style={{height:'600px'}}>
      <div className='' style={{height:'300px'}}>
        <h1 className='mt-5' style={styles.font}>FACULTAD DE INGENIERÍA ELECTRÓNICA Y ELÉCTRICA (FIEE)</h1>
        <h3 className='mt-5' style={styles.font}>CONTROL DE ASISTENCIA - INGRESO</h3>

       
<div className='mt-5'style={styles.groupButton} >
  <Button variant='primary' className='me-3' style={{width:'98.85px',fontFamily: 'Gugi, cursive'}}
    onClick={() => {setRegistro(2); setVisibiliti("none")}}
  >Ingreso</Button>
  <Button variant='primary' className='ms-3' style={{width:'98.85px',fontFamily: 'Gugi, cursive'}}
  onClick={() => {setRegistro(3);setVisibiliti("none")} }
  >Salida</Button> 
</div>

     { registro === 2 ? <Ingreso setVisibiliti={setVisibiliti} setRegistro={setRegistro}/> : "" 
      
      
     }
     { registro === 3  ? <Salida setVisibiliti={setVisibiliti} setRegistro={setRegistro}/> : ""
     }


      </div>
     
      </div>
    </div>
  );
}

export default App;
