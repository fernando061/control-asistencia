import Radium from 'radium'
import { Form, Image } from 'react-bootstrap'
import facultadImg from '../Assets/nuevaFiee.jpg'
import insigniaFiee from '../Assets/INSIGNIA OFICIAL FIEE PNG.png'
const styles ={
  contenedor:  {
    backgroundImage: `url(${facultadImg})`,
    height:'100vh',
    backgroundSize: 'cover',
    // filter: 'blur(9px)'
  },
  blur:{
    backdropFilter: 'blur(10px)', 
    width:'100%',
    height:'100%',
  },
  form:{
    width:'500px',
    height:'400px',
   borderRadius: '7px',
    backgroundImage: 'linear-gradient(to right bottom, #3b447d, #464987, #534d90, #605199, #6d55a2)',
    boxShadow: '1px 0px 23px 5px rgba(0,0,0,0.7)',
  },
  divImg:{
    position:'absolute',
    marginTop: '-50px'
  }


}

const Login = () => {
  return (
    <div style={styles.contenedor}>
        <div className='d-flex flex-column justify-content-center align-items-center' style={styles.blur}>
          <Form className='d-flex flex-column  align-items-center ' style={styles.form}>
        <div className='' style={styles.divImg}> <Image roundedCircle={true} width='100px' height='100px'  src={insigniaFiee}  style={{backgroundColor:'white',boxShadow: '-1px -16px 12px 2px rgba(0,0,0,0.07)'}}/> </div>
            
            <h3 className='' style={{marginTop:'4rem',color:'white'}}>Iniciar Sesion</h3>
            <div>
            <input/>
            </div>
            <div>
            <input/>
            </div>
            
          </Form>
        </div>
      
      
      </div>
  )
}

export default Radium(Login)