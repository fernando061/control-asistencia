import React from 'react'
import Radium from 'radium';
import user from '../Assets/silueta-de-multiples-usuarios.png'
import personal from '../Assets/trabajo-en-equipo.png'
import asistencia from '../Assets/puntualidad.png'
const NavLeft = () => {

  
    const styles ={
        navLeft:{
            height:"100vh",
            backgroundColor: "rgb(9 76 173)",
            // listStyleImage: 'url(../Assets/)';
            
            
        },

        bootom:{
            color:"white"
        },
        listUl:{
          width:'100%',
          listStyle: 'none',
          paddingInlineStart: '0',
        },
        li:{
          width:'100%',
          height:'55px',
          display: 'flex',
           alignItems: 'center',
           border:'1px solid black',
           justifyContent: 'around',
           cursor: 'pointer',
           ':hover':{
            backgroundColor: 'rgb(31 118 244)',
           },
           ':active':{
             backgroundColor: "rgb(9 76 173)",
           }
        }

    }

  return (
    <div className='d-flex text-center flex-column' style={[styles.navLeft,styles.bootom]}
    >
      <div className='p-3'>

        <h4>FACULTAD DE INGENIERÍA</h4><h4>ELECTRÓNICA Y ELÉCTRICA </h4>
        <h4>(FIEE)</h4>
      </div>

      <div className='mt-5'>
        <ul className='float-start'  style={styles.listUl}>
         <li className='mb-4 ps-3' key="1" style={styles.li} ><img width='35px' src={user}/>  <span className='ms-3'>Usuarios</span></li>
          <li className='mb-4 ps-3' key="2" style={styles.li}> <img width='35px' src={personal}/>   <span className='ms-3'>Reporte de asistencias</span></li>
          <li className='mb-4 ps-3' key="3" style={styles.li}><img width='35px' src={asistencia}/>   <span className='ms-3'>Personal</span></li>
          
        </ul>
      </div>



    </div>
  )
}

export default Radium(NavLeft)