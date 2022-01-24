
export const PostApi = async(props) => { 
  
  console.log('123');

  await fetch(
    'http://192.168.1.109:5000/auth/session',{
      method: 'POST',
      headers:{
        'Content-Type': 'application/json'
      },
      body:JSON.stringify(props)
    })
    // .then((response) => response )
    .finally((response) => response)

}
 