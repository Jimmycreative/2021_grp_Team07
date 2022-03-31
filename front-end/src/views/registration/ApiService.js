export default class APIService{

	// Insert an article
	
	static InsertData(body){
		return fetch("/login",{
      		'method':'POST',
              cache: "no-cache",
			  credentials: 'include',
              headers : { 
                'Content-Type': 'application/json'
                
               
      },
      body:JSON.stringify(body)
    })
	.then(response => {response.text()})
	.catch(error => console.log(error))
	}

}