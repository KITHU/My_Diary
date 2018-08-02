function login(){
    let url = 'https://tranquil-spire-14325.herokuapp.com/mydiary/v1/auth/login';
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let data = {
        email:email,
        password:password
    }

    console.log(data)
       
    fetch(url, {
        
        method: 'POST', //post method"error": "invalid login credetials"
        body: JSON.stringify(data), // data can be `string` or {object}!
         
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => response.json())
    .then(data => {
        if(data.error==="invalid email andress"){
            window.alert("invalid email andress");
        }

        if(data.error ==="wrong password"){
            window.alert("wrong password");
        }

        if(data.error ==="invalid login credetials"){
            window.alert("wrong email and password")
        }
        if(data.access_token){
           // window.alert(data.access_token);
            localStorage.setItem('token',data.access_token );
            window.location.replace("index.html");
        }
    }).catch((error) => {
        console.log("there was an error ")
    });
}

function signup(){
    let url = 'https://tranquil-spire-14325.herokuapp.com/mydiary/v1/auth/signup';

    let username = document.getElementById("name").value;
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    
    let data = {
        username:username,
        email:email,
        password:password
    }

   

    fetch(url,{
        method: 'POST', //post method
            
        body: JSON.stringify(data), // data can be `string` or {object}!

        headers: {
                'Content-Type': 'application/json;charset=UTF-8'
            }
        }).then(response => response.json())
        
        .then(data => {
            if(data.error==="user already exist change credetials"){
                window.alert("user already exist change credentials")
            }
            
            if(data.error==="invalid username"){
                window.alert("invalid username");
            }

            if(data.error==="invalid email andress"){
                window.alert("invalid email andress");
            }

            if(data.error==="password is invalid and week"){
                window.alert("use letters and numbers for password");
            }



            if(data.message==="user created successfully"){
                window.location.replace("login.html");
            }
        }).catch((error) => {
            console.log("there was an error ")
        });
    }


function checkstatus(response){
    if(response.ok){
       return Response
    }

let error = new Error(response.statusText);
error.response = response;
return Promise.reject(error);
}