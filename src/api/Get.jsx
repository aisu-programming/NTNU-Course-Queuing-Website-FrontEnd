export const GetApi = async(props , url) => { 
  
  return await fetch(
    url,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(props)
    })
    .then((response) => response.json())
    .catch((error) => console.log('error'+error))
  
}
  