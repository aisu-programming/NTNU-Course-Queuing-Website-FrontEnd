export const PatchApi = async(props , url) => { 
    return await fetch(url, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Access-Control-Allow-Credentials': true,
        },
        mode: 'cors',
        credentials: 'include',
        body:JSON.stringify(props)
      })
      .then(response => response.json()  )
      .catch(error => console.log(error) );    // .catch((error) => console.log(error))
  
  }
  