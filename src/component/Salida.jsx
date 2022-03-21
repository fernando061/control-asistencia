import React, { useState } from 'react'
import { Button, FormControl, InputGroup } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { registroSalida } from '../service/asistencia';

const Salida = ({setVisibiliti, setRegistro}) => {
  const styles = {
    font: {
      fontFamily: "Gugi, cursive",
      color: "#fff",
    },
    fontInput: {
      fontFamily: "Gugi, cursive",
      color: "black",
    },
    fontBlue: {
      fontFamily: "Gugi, cursive",
      color: "#0d6efd",
    },
    regresar: {
      marginTop: "80px",
      marginRight: "-310px",
      fontFamily: "Gugi, cursive",
    }
  };




  const [error, setError] = useState({
    name:"",
  })

  const [registroDni, setRegistroDni] = useState({
    personalDni: "",
  })

const handleSubmit = async (e) =>{
  e.preventDefault();
  if(registroDni.personalDni === ""){
    setError({ name: "Es necesario su numero de DNI"})
  } else{
    setError({ name: ""})
    const {message,content} = await registroSalida(registroDni)
    if(message === 'Se registro su salida de la FIEE'){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: message,
        text: content.nombre + " "+ content.apPaterno,
        showConfirmButton: false,
        timer: 4500,
        width:400,
        heightAuto:false,
        customClass: styles.sweet
        

      })
    }else{
        Swal.fire({
          icon: 'info',
          title: 'Error',
          text: message,
          width: 400,
          
          
        })
    }
  }
}

const handleChange = (e) =>{
  const {name, value} = e.target;

  setRegistroDni({
    ...registroDni,
    [name]:value,
  });
  setError({ name: ""})
  
}





  return (
    <form onSubmit={(e) => {handleSubmit(e)}} className="mt-5 d-flex justify-content-center ">
      <div
        className="d-flex flex-column pt-5 align-items-center bg-light rounded shadow-lg"
        style={{ width: "500px", height: "300px" }}
      >
        <h3 style={styles.fontBlue}>Registro de salida de la FIEE</h3>
        <InputGroup className="mt-3" style={{ width: "399px" }}>
          <FormControl
            style={styles.fontInput}
            name="personalDni"
            value={registroDni.personalDni}
            placeholder="DIGITE SU DNI"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            onChange={handleChange}
            // value={'<e<'}
          />
          <Button
            className="bg-primary"
            style={styles.font}
            variant="outline-secondary"
            id="button-addon2"
            type="submit"
          >
            Registrar
          </Button>
        </InputGroup>
        <span className="text-danger float-start fs-6 mt-2">{error.name}</span>
        <Button variant="outline-info" className=" " style={styles.regresar}  
        onClick={() => {setVisibiliti("block"); setRegistro(1) }}>Regresar</Button>
      </div>
    </form>
  );
}

export default Salida