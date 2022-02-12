export const GetApi = async( url) => { 
  
  return await fetch(
    url,{
      method: 'GET',
      headers:{
        'Content-Type': 'application/json'
      },
    })
    .then((response) => response.json())
    .catch((error) => console.log('error'+error))
  
}
  