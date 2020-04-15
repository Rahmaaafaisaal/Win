// start of getting html tags to manage them //
const signBtn=document.getElementById('signInbtn');
const welcomeDiv=document.getElementById('welcomeDiv');
const registrationDiv=document.getElementById('registrationDiv');
const body=document.getElementsByTagName('body')
const HomePage=document.getElementById('HomePage');
const addMember=document.getElementById('addMember');
const name=document.forms['signUp'].userName
const phoneNumber=document.forms['signUp'].phoneNumber
const email=document.forms['signUp'].email
const age=document.forms['signUp'].age
const gender=document.forms['signUp'].gender
const role=document.forms['signUp'].role
const password=document.forms['signUp'].password
const repassword=document.forms['signUp'].repassword
const profilePic=document.forms['signUp'].ProfilePic
const loginDiv=document.getElementById('login')
const loginbtn=document.getElementById('loginbtn')
// End of getting tags //


//============= start of functions that make logic==========//
// go back to home on click on WIN in nabar //
function goToHome(){
    body[0].classList.add('bk')
    welcomeDiv.style.display="block"
    registrationDiv.style.display="none"
    loginDiv.style.display="none"
}

//change the apperance from home page to sign up div on click of sign Up button in nav bar //
function handleSignIn(){
    loginDiv.style.display="none"
    welcomeDiv.style.display="none"
    body[0].classList.remove('bk')
    registrationDiv.style.display="block"
}


// adding new member send data to backend to save it  on click of dubmit button in sign Up form //
function getFormValues(event){
   
    // prevent rerfesh of the page 
    event.preventDefault(); 


    let ableTosend=true;
    if(!name.value){
    
      ableTosend=false;
      document.getElementById("1").style.display="inline"
    }
    else{
       document.getElementById("1").style.display="none"
    }
    if(!phoneNumber.value){

        ableTosend=false;
        document.getElementById("2").style.display="inline"
    }
    else{
        document.getElementById("2").style.display="none"
    }
    if(!email.value){

        ableTosend=false;
        document.getElementById("3").style.display="inline"
    }
    else{
        document.getElementById("3").style.display="none"
    }
    if(!age.value){

        ableTosend=false;
        document.getElementById("4").style.display="inline"
    }
    else{
        document.getElementById("4").style.display="none"
     }

    if(!gender.value){

        ableTosend=false;
        document.getElementById("5").style.display="inline"
    }
    else{
        document.getElementById("5").style.display="none"
    }
    if(!password.value || password.value.length<8){

        ableTosend=false;
        document.getElementById("6").style.display="inline"
    }
    else{
        document.getElementById("6").style.display="none"
    }
    if(!repassword.value || password.value!=repassword.value){

        ableTosend=false;
        document.getElementById("7").style.display="inline"
    }
    else{

        document.getElementById("7").style.display="none"
    }
    if(ableTosend)
    {
        
        let pP= profilePic.files[0] ? profilePic.files[0].name : null
        let body={
            "name":name.value,
            "phoneNumber":phoneNumber.value,
            "email":email.value,
            "age":age.value,
            "gender":gender.value,
            "role":role.value,
            "password":password.value,
            "pP":pP 
        }
        console.log(body)
        sendDataToBackend(JSON.stringify(body),'home/signUp');
        if(profilePic.files[0]){
        let formData = new FormData()
        formData.append('img', profilePic.files[0])    
        sendDataToBackend(formData,'img/')
    }
    }
   
    
}

   
function sendDataToBackend(body,path)
{
    fetch('http://localhost:3000/'+path, {method: 'POST',body: body})
    .then(response =>{
        resetForm();
    })
    .catch(error => {console.error(error)})
}


function showLogindiv(){
    body[0].classList.remove('bk')
    welcomeDiv.style.display="none"
    registrationDiv.style.display="none"
    loginDiv.style.display="block"
}



function resetForm(){
    
name.value=''
phoneNumber.value=''
email.value=''
age.value=''
gender.value=''
password.value=''
repassword.value=''
role.value=''
profilePic.value=''
}





//============ End of logic functions ===============//


// assgin functions to tags that we get them in the top of the page //
signBtn.addEventListener('click',handleSignIn)
HomePage.addEventListener('click',goToHome)
addMember.addEventListener('click',getFormValues)
loginbtn.addEventListener('click',showLogindiv)