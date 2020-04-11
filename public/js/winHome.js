const signBtn=document.getElementById('signInbtn');
const welcomeDiv=document.getElementById('welcomeDiv');
const registrationDiv=document.getElementById('registrationDiv');
const body=document.getElementsByTagName('body')
const HomePage=document.getElementById('HomePage');
function handleSignIn(e)
{
    welcomeDiv.style.display="none"
    body[0].classList.remove('bk')
    registrationDiv.style.display="block"
    
}

function goToHome(){
    body[0].classList.add('bk')
    welcomeDiv.style.display="block"
    registrationDiv.style.display="none"
}


signBtn.addEventListener('click',handleSignIn)
HomePage.addEventListener('click',goToHome)