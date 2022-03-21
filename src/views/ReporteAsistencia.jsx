import { useEffect, useState } from "react"
import { Button, Form, Table } from 'react-bootstrap'
import NavLeft from '../component/NavLeft'
import { ReporteAsisencia } from "../service/asistencia"
import Radium from 'radium'
import excel from '../Assets/excel.png'
import ReactHtmlTableToExcel from "react-html-table-to-excel"
const ReporteAsistencia = () => {

  const styles ={
    form:{
      height:'100px'
    },
    botton:{
      width:'80px',
      height:'38px',
    },
    table:{
      width: '1000px'
    }

  }

  const [errorT, setErrorT] = useState({
    name:"",
  })
  const [dni, setDni] = useState({Dni:''})
  // const {data, error, loading} = useFetch(`${process.env.REACT_APP_API}/Reporte-Asistencia/${dni.Dni}`)
  const [data, setData] = useState([])

  const handleChange = (e) =>{
    const {name, value} = e.target;
  
    setDni({
      ...dni,
      [name]:value,
    });
    setErrorT({ name: ""})
    
  }

  const handleSubmit = async(e) => {
    e.preventDefault()

    if(dni.Dni===""){
      setErrorT({name: "Es necesario digitar un numero de DNI"})
    }else{
      const rpta = await ReporteAsisencia(dni.Dni)
      if(rpta.message==='No existe personal registrado con este numero de dni'){
setErrorT({name: "No existe personal registrado con este numero de DNI"})
      }
      else{
        setData(rpta)
      }
     
      
      
    }
    
  }
  

const horasTrabajadas = (fechaInicio, fechaFin) => {
  console.log(fechaInicio)
  // const _hIngreso = hIngreso.replace(' ','').replace('pm','').replace('am','')
// const _hSalida = hSalida.replace(' ','').replace('pm','').replace('am','')
  fechaInicio = new Date(fechaInicio)
  fechaFin = new Date(fechaFin)
  if (!(fechaInicio instanceof Date) || !(fechaFin instanceof Date)) {
      throw TypeError('Ambos argumentos deben ser objetos de tipo fecha (Date).');
  }

  let diferencia = (fechaFin.getTime() - fechaInicio.getTime());//ms

  
  let horas = Math.floor(diferencia/3600000) 
  let minutos = Math.floor(((diferencia/3600000)-horas)*60)
  let segundos = Math.round(((((diferencia/3600000)-horas)*60)-minutos)*60)
  console.log(Math.round(segundos))
  console.log(minutos)
  console.log(Math.floor(horas))
  const rpta = horas+":"+minutos+":"+segundos
  return rpta
}





  useEffect(() => {
    
    handleSubmit()
    

  }, [])



  return (
<div className='d-flex '>
    <NavLeft/>
    

    <div className='' style={{flexGrow:"2"}}>
      <div style={{height:"60px", backgroundColor:'#840909',borderRadius: '0 0 7px'}}></div>
      <h1 className='pe-4 text-end mt-3'>Asistencia del Personal</h1>
      <hr style={{margin:'0'}}></hr>


    <div className='container'>
    <Form  onSubmit={(e) => {handleSubmit(e)}} className='d-flex ms-3 mt-5' style={styles.form}>
    <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Control type="text d-flex flex-column" placeholder="DNI" style={{width:'273px'}}
      name="Dni"
     value={dni.Dni}
     onChange={handleChange}/>
  <span className="text-danger float-start fs-6 mt-2" style={{width:'273px'}}>{errorT.name}</span>
  </Form.Group>

  <Button className='ms-4' variant="primary" type="submit" style={styles.botton}>
    Buscar
  </Button>

    </Form>


<div>
<img   className="ms-3" width="35px"  src={excel}/>
<ReactHtmlTableToExcel
                    id="test-table-xls-button"
                    className="download-table-xls-button"
                    table="table-to-xls"
                    filename="tablexls"
                    sheet="tablexls"
                    buttonText="Download as XLS"
                  > </ReactHtmlTableToExcel>

<Table id='table-to-xls' className='ms-3' striped bordered hover size="sm mt-2" style={styles.table}>
  <thead>
    <tr>
      <th>DNI</th>
      <th>Nombre</th>
      <th>Apellido paterno</th>
      <th>Telefono</th>
      <th>Fecha</th>
      <th>Hora ingreso</th>
      <th>Hora salida</th>
      <th>Horas trabajadas</th>


    </tr>
  </thead>

  <tbody>
    {
      data.message === 'exitoso' ?  

      data.content.map((item,k)=>(

        <tr key={k}>
          <td >{item.id}</td>
          <td>{item.nombre}</td>
          <td>{item.ap_paterno}</td>
          <td>{item.telefono}</td>
          <td>{item.fecha}</td>
          <td>{item.hIngreso}</td>
          <td>{item.hSalida}</td>
        <td>{
        
        horasTrabajadas(item.fecha+" "+item.hIngreso,item.fecha+" "+item.hSalida)}</td>
        </tr>
      )) : ''
    

      
    }
    <tr>
      <td>Total</td>
     
    </tr>
    
    
  </tbody>

</Table>
</div>
    </div>
    </div>
    </div>
  )
}

export default Radium(ReporteAsistencia)