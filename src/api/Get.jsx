export const GetApi = async(props) => { 
  
    await fetch(
      'http://192.168.1.109:5000/auth/session',{
        method: 'GET',
        headers:{
          'Content-Type': 'application/json'
        },
        body:JSON.stringify(props)
      })
      .then((response) => console.log(response,))
      .catch((error) => console.log('error'+error))
  
}
  