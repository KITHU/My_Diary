function signedIn(){
    var token = localStorage.getItem('token');
    if(token === null){
        window.location.replace("login.html");
    }
    getDiaries();
}

function getDiaries(){
    token = localStorage.getItem('token')
    
    currentoken = "Bearer " + token
    fetch('https://tranquil-spire-14325.herokuapp.com/mydiary/v1/diaryentry', {

        method: 'GET',
        
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization':currentoken
        }
    }).then(response => response.json())
    .then(data => {
        console.log(data)
        let diaries = data.diaries

        for(let counter = 0; counter< diaries.length; counter++){
            window.alert(diaries[counter]["content"]);
            window.alert(diaries[counter]["title"]);
            window.alert(diaries[counter]["date_written"]);
            window.alert(diaries[counter]["diary_id"]);

        }
        
        // if(data.user==="invalid login credetials"){
        //     window.alert("invalid email or password")
        // }if(data.access_token){
        //     localStorage.setItem('token',data.access_token );
        //     window.location.replace("index.html");
        // }
    }).catch((error) => {
        console.log("there was an error ")
    });

}

// add a diary to my api
function addDiary(){
    token = localStorage.getItem('token')

    let title = document.getElementById("topic").value;
    
    if(title.length <= 2){
        window.alert("title should be more than two characters");
        return;
    }
    let content = document.getElementById("subject").value;
    
    
    let data = {
        title:title,
        content:content
    }
    console.log(data)

    currentoken = "Bearer " + token
    fetch('https://tranquil-spire-14325.herokuapp.com/mydiary/v1/diaryentry', {

        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-Type': 'application/json;charset=UTF-8',
            'Authorization':currentoken
        }
    }).then(response => response.json())
    .then(data => {
        console.log(data)
         if(data.message==="content saved successfully"){
             window.alert("ENTRY POSTED SUCCESSFULLY");
             window.location.replace("index.html");
         }//if(data.access_token){
        //     localStorage.setItem('token',data.access_token );
        //     window.location.replace("index.html");
        // }"message": "content saved successfully"
    }).catch((error) => {
        console.log("there was an error ")
    });

}





// {
//     "user diaries": [
//       {
//         "diary_id": 1,
//         "date_written": "2018-07-27",
//         "title": "my first",
//         "content": "it feels awesome to be at andela kenya as up comming programmer"
//       },
//       {
//         "diary_id": 5,
//         "date_written": "2018-07-29",
//         "title": "string",
//         "content": "string"
//       }
//     ]
//   }
