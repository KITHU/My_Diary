function signedIn(){
    var token = localStorage.getItem('token');
    if(token === null){
        window.location.replace("login.html");
    }
    getDiaries();
}

function logout(){
    localStorage.clear();
    window.location.reload(true);
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
        if(data.msg ==="Token has expired"){
            localStorage.clear()
            window.location.replace("index.html");
        }
        let diaries = data.diaries;
        let table = '';
        for(let counter = 0; counter< diaries.length; counter++){
            
            let content = diaries[counter]["content"];
            let title = diaries[counter]["title"];
            let ddate = diaries[counter]["date_written"];
            let id = diaries[counter]["diary_id"];

            // window.alert(diaries[counter]["title"]);
            // window.alert(diaries[counter]["date_written"]);
            // window.alert(diaries[counter]["diary_id"]);

            table += `<table><tr><td><a> ${title} </a></td><td>\
                        ${ddate} </td></tr><tr><td colspan="2">\
                        ${content} </td></tr></table>`;
        }

        document.getElementById("all_diaries").innerHTML = table;


        // <table>
        //             <tr>
        //                 <td><a>MY SECOND ENTRY</a></td>
        //                 <td>14/7/2018</td>
        //             </tr>
        //             <tr>
        //                 <td colspan="2">
        //                      I am working on my Diary ui late at night.
        //                         this will display all the data from the database
        //                      I am working on my Diary ui late at night.
        //                         this will display all the data from the database 
        //                     </td>
        //             </tr>
        //         </table>
        
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
    if(content.length <= 2){
        window.alert("content should be a sentence");
        return;
    }
    
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
        if(data.msg ==="Token has expired"){
            localStorage.clear()
            window.location.replace("index.html");
        }  

        if(data.message==="content saved successfully"){
             window.alert("ENTRY POSTED SUCCESSFULLY");
             window.location.replace("index.html");
        }

         if(data.error ==="content cannot be null"){
             window.alert("content cannot be empty!");
         }
         console.log(data)
         //if(data.access_token){
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
