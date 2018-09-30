function login(){
    var url = 'https://tranquil-spire-14325.herokuapp.com/mydiary/v1/auth/login';
    var email = document.getElementById("email").value;
    var password = document.getElementById("password").value;

    var data = {
        email:email,
        password:password
    }

    console.log(data)
       
    fetch(url, {

        method: 'POST', //post method
        body: JSON.stringify(data), // data can be `string` or {object}!
         
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => response.json())
    .then(json => console.log(json));      
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

    console.log(data)
       
    fetch(url, {

        method: 'POST', //post method
        body: JSON.stringify(data), // data can be `string` or {object}!
         
        headers: {
            'Content-Type': 'application/json;charset=UTF-8'
        }
    }).then(response => response.json())
    .then(data =>{
        if (data.message ==='"user created successfully"'){
            window.location.href="login.html";
        }else{
            console.log("failed")
        }
       
    }).catch(error => console.log(""));
}

function fetch(){
fetch('https://jsonplaceholder.typicode.com/users')
.then(response => response.json())
.then(data => {
    console.log(data);
})
.catch((error) => {
console.log("there was an error")
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