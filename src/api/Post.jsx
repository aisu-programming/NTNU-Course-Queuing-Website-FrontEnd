import { config } from "./config";

export const PostApi = async(props) => { 

  return await fetch(
    config.url,{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(props)
    })
    .then(response => response.json()  )
    .catch(error => console.log(error) );    // .catch((error) => console.log(error))

}
