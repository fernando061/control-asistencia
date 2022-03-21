
const URL =process.env.REACT_APP_API

const registroIngreso = async(dni)=>{
    try{
        const respuesta = await fetch(`${URL}/Registro-Ingreso`,{
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dni)
          }).then(response => response.json())
          .then(response =>{
              return response
          })
          return respuesta
    } catch (error) {
    throw error
    }
}

const registroSalida = async(dni)=>{
    try{
        const respuesta = await fetch(`${URL}/Registro-Salida`,{
            method: 'PUT',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(dni)
          }).then(response => response.json())
          .then(response =>{
              return response
          })
          return respuesta
    } catch (error) {
    throw error
    }
}


const ReporteAsisencia = async (dni) =>{
    try{
        const respuesta = await   fetch(`${URL}/Reporte-Asistencia/${dni}`)
            .then(response => response.json())
            .then(response =>{
                return response
            })
            
            return respuesta
    }catch(error){
        throw error
    }
}


export{
    registroIngreso,
    registroSalida,
    ReporteAsisencia,
}