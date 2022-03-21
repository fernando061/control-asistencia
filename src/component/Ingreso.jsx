import { useState } from "react";
import { InputGroup, Button, Form } from "react-bootstrap";
import Swal from "sweetalert2";
import { registroIngreso } from "../service/asistencia";

const Ingreso = ( {setVisibiliti, setRegistro}) => {
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
    },
    sweet:{
      height:"100px"
    }
  };
  

  const [error, setError] = useState({
    name:"",
  })

  const [registroDni, setRegistroDni] = useState({
    personalDni: "",
  })
{/* <button style={[styles.button, styles.primary]}>Confirm</button> */}
const handleSubmit = async (e) =>{
  e.preventDefault();
  if(registroDni.personalDni === ""){
    setError({ name: "Es necesario su numero de DNI"})
  } else{
    setError({ name: ""})
    const rpta = await registroIngreso(registroDni)
    if(rpta.message==='Se registro su ingreso a la fiee'){
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: rpta.message,
        text: rpta.content.nombre + " "+ rpta.content.apPaterno,
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
        text: rpta.message,
        width: 400,
        
        
      })
    }
    console.log(rpta)
   
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
        <h3 style={styles.fontBlue}>Registro de ingreso a la FIEE</h3>
        <InputGroup className="mt-3" style={{ width: "399px" }}>
          <Form.Control
          type="text"
            style={styles.fontInput}
            name="personalDni"
            placeholder="DIGITE SU DNI"
            aria-label="Recipient's username"
            aria-describedby="basic-addon2"
            value={registroDni.personalDni}
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
};

export default Ingreso;
