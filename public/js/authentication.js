function setLoggedInUser(info){
    sessionStorage.setItem('loggedIn',"true")
    sessionStorage.setItem('info',JSON.stringify(info))
}
function checkIfloggedIn(){
    try{
    let  loggedIn= sessionStorage.getItem('loggedIn')
        if(loggedIn!='true')
        {
            location.replace("http://localhost:3000/win.html")
        }

    }catch(err){
        console.log(err)
    }

 
}
function getUser(){
let user=JSON.parse(sessionStorage.getItem('info'))
return user
}

