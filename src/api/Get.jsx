import { config } from "./config"

export const GetApi = async(props) => { 
  
  return await fetch(
    config.url,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(props)
    })
    .then((response) => response.json())
    .catch((error) => console.log('error'+error))
  
}
  