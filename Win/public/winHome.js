const signBtn=document.getElementById('signInbtn');
const welcomeDiv=document.getElementById('welcomeDiv');
const registrationDiv=document.getElementById('registrationDiv');


function handleSignIn(e)
{
    welcomeDiv.style.display="none"
    registrationDiv.style.display="block"
    
}




signBtn.addEventListener('click',handleSignIn)