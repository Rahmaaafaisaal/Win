// start of getting html tags to manage them //
const signBtn = document.getElementById('signInbtn');
const welcomeDiv = document.getElementById('welcomeDiv');
const registrationDiv = document.getElementById('registrationDiv');
const body = document.getElementsByTagName('body')
const HomePage = document.getElementById('HomePage');
const addMember = document.getElementById('addMember');
const name = document.forms['signUp'].userName
const phoneNumber = document.forms['signUp'].phoneNumber
const email = document.forms['signUp'].email
const age = document.forms['signUp'].age
const gender = document.forms['signUp'].gender
const role = document.forms['signUp'].role
const job = document.forms['signUp'].job
const password = document.forms['signUp'].password
const repassword = document.forms['signUp'].repassword
const profilePic = document.forms['signUp'].ProfilePic

//login elements //

const loginDiv = document.getElementById('login')
const goToLogin = document.getElementById('goToLogin')
const loginBtn = document.getElementById('loginBtn')
const userNameLogin = document.getElementById('username')
const passwordLogin = document.getElementById('password')
const rememberMe = document.getElementById('rememberMe')
// End of getting tags //


// start of variables //
let slideIndex = 0; //indexSlideShow



//============= start of functions that make logic==========//
// go back to home on click on WIN in nabar //
function goToHome() {

    welcomeDiv.style.display = "block"
    registrationDiv.style.display = "none"
    loginDiv.style.display = "none"
}

//change the apperance from home page to sign up div on click of sign Up button in nav bar //
function handleSignIn() {
    loginDiv.style.display = "none"
    welcomeDiv.style.display = "none"

    registrationDiv.style.display = "block"
}


// function to hide all
function hideAll() {
    loginDiv.style.display = "none"
    welcomeDiv.style.display = "none"

    registrationDiv.style.display = "none"
}

// adding new member send data to backend to save it  on click of submit button in sign Up form //
function getFormValues(event) {

    // prevent rerfesh of the page 
    event.preventDefault();


    let ableTosend = true;
    if (!name.value) { // condition b true

        ableTosend = false;
        document.getElementById("1").style.display = "inline"
    }
    else {
        document.getElementById("1").style.display = "none"
    }
    if (!phoneNumber.value) {

        ableTosend = false;
        document.getElementById("2").style.display = "inline"
    }
    else {
        document.getElementById("2").style.display = "none"
    }
    if (!email.value) {

        ableTosend = false;
        document.getElementById("3").style.display = "inline"
    }
    else {
        document.getElementById("3").style.display = "none"
    }
    if (!age.value) {

        ableTosend = false;
        document.getElementById("4").style.display = "inline"
    } else if (! /\d/.test(age.value)) {
        ableTosend = false;
        document.getElementById("4").innerHTML = "please add your age in numbers "
        document.getElementById("4").style.display = "inline"
    }
    else {

        document.getElementById("4").style.display = "none"
    }

    if (!gender.value) {

        ableTosend = false;
        document.getElementById("5").style.display = "inline"
    }
    else {
        document.getElementById("5").style.display = "none"
    }
    if (!password.value || password.value.length < 8) {

        ableTosend = false;
        document.getElementById("6").style.display = "inline"
    }
    else {
        document.getElementById("6").style.display = "none"
    }
    if (!repassword.value || password.value != repassword.value) {

        ableTosend = false;
        document.getElementById("7").style.display = "inline"
    }
    else {

        document.getElementById("7").style.display = "none"
    }
    if (ableTosend) // law lesa b true 
    {

        let pP = profilePic.files[0] ? profilePic.files[0].name : 'Avatar'
        let body = {
            "userName": name.value,
            "phone": phoneNumber.value,
            "email": email.value,
            "age": age.value,
            "gender": gender.value,
            "user_role": role.value,
            "job": job.value,
            "password": password.value,
            "photoName": pP
        }
        console.log(body)
        sendDataToBackend(JSON.stringify(body), 'home/signUp').then(res => {
            if (res.status = 'success') {
                hideAll();
                document.getElementById('loading').style.display = 'block'
                setTimeout(function () {

                    document.getElementById('loading').style.display = 'none'
                    showLogindiv()

                }, 3000);

            }
        });
        resetForm();
        if (profilePic.files[0]) {
            let formData = new FormData()
            formData.append('img', profilePic.files[0])
            sendDataToBackend(formData, 'img/')
        }
    }


}


async function sendDataToBackend(body, path, cb) {
    let response = await fetch('http://localhost:3000/' + path, { method: 'POST', body: body })
        .then(res => {

            return res;
        })
        .catch(error => { console.error(error) })
    let data = await response.json()
    return data
}


function showLogindiv() {

    welcomeDiv.style.display = "none"
    registrationDiv.style.display = "none"
    loginDiv.style.display = "block"
}

function userLogin() {
    //remove error msg
    document.getElementById('errormsgloginUserName').style.display = "none"
    document.getElementById('errormsgloginPassword').style.display = "none"
    // prevent rerfesh of the page 
    event.preventDefault();
    if (userNameLogin.value == "") {
        document.getElementById('errormsgloginUserName').style.display = "inline"
    } else if (passwordLogin.value == "") {
        document.getElementById('errormsgloginPassword').style.display = "inline"

    }
    else {

        let body = {
            "userName": userNameLogin.value,
            "password": passwordLogin.value,
            "rememberMe": rememberMe.checked
        };
        let path = 'home/login';
        sendDataToBackend(JSON.stringify(body), path).then((res) => {
            document.getElementById('notFound').style.display = 'none'
            console.log(res)
            if (res.user.userRole == 'Buyer') {
                resetLoginForm();
                setLoggedInUser(res);
                location.replace("http://localhost:3000/customer.html")
               
            } else if (res.user.userRole == 'Seller') {
                setLoggedInUser(res);
                resetLoginForm();
                location.replace("http://localhost:3000/renter.html")
                
            } else {
                document.getElementById('notFound').style.display = 'block'
            }

        }).catch((err) => {
            console.log(err)
        });

    }

}

function resetLoginForm() {
    userNameLogin.value = ""
    passwordLogin.value = ""
    rememberMe.checked = false;
    document.getElementById('notFound').style.display = 'block'
}


function resetForm() {
    document.getElementById('role').value = 'Buyer'
    document.getElementById('job').value = 'Student'
    name.value = ''
    phoneNumber.value = ''
    email.value = ''
    age.value = ''
    password.value = ''
    repassword.value = ''
    profilePic.value = ''
    let genderBtn = document.getElementsByName("gender");
    for (let i = 0; i < genderBtn.length; i++)
        genderBtn[i].checked = false;
}

function showSlides() {

    let slides = document.getElementsByClassName("mySlides");
    let dots = document.getElementsByClassName("dot");

    for (let i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;

    if (slideIndex > slides.length) { slideIndex = 1 }

    for (let i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }

    slides[slideIndex - 1].style.display = "block";
    dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 3000); // Change image every 3 seconds
}






//============ End of logic functions ===============//


// assgin functions to tags that we get them in the top of the page //
signBtn.addEventListener('click', handleSignIn)
HomePage.addEventListener('click', goToHome)
addMember.addEventListener('click', getFormValues)
goToLogin.addEventListener('click', showLogindiv)
loginBtn.addEventListener('click', userLogin)
// End od assginement of EventListener to Tags //

// start of calling functions that automtic runs in page load /
showSlides();
// End of calling //



