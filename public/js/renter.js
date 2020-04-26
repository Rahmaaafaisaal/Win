/* Dom Elements */
const roomLocInput     = document.getElementById('roomLoc_r');
const roomPriceInput   = document.getElementById('roomPrice_r');
const roomTypeInput    = document.getElementById('roomType_r');
const roomGenderInput  = document.getElementById('roomGender_r');
const roomPhotoInput   = document.getElementById('roomPhoto_r');
const errorMsgDiv      = document.getElementById('errorMsg');
const priceErrorMsg    = document.getElementById('roomPriceErrorMsg');
const addingNewBookBtn = document.getElementById('addingNewBookBtn');

const newRoomForm      = document.getElementById('newRoom-form');
function handleSubmit(e)
{
    console.log("prinnttt")
    e.preventDefault()
    return false
}

newRoomForm.addEventListener("submit", handleSubmit)

/* Global Variables */
const locationOptions = ["October","Fifth settlement","First settlement","El-Sheikh Zayed"]
const genderOption    = ["Male","Female"]
const typesOptions    = ["Single","Double","Triple"]

/* Drop Down Menus Init */
locationOptions.forEach( (elem,index) => {
    let optn = document.createElement("OPTION");
    optn.text = elem;
    optn.value = index;
    roomLocInput.options.add(optn); 
})

genderOption.forEach( (elem,index) => {
    let optn = document.createElement("OPTION");
    optn.text = elem;
    optn.value = index;
    roomGenderInput.options.add(optn); 
})

typesOptions.forEach( (elem,index) => {
    let optn = document.createElement("OPTION");
    optn.text = elem;
    optn.value = index;
    roomTypeInput.options.add(optn); 
})

/* Event listeners  */
addingNewBookBtn.addEventListener("click",getTheRoomData)

/* Submit the Forum */
function getTheRoomData(e){
    e.preventDefault()
    let roomLocIndex    = roomLocInput.value ;
    let roomTypeIndex   = roomTypeInput.value ;
    let roomGenderIndex = roomGenderInput.value ; 
    let roomPrice       = roomPriceInput.value ; 
    let errorFlag       = false;
    let roomPhotosNames = []


    /* Check the Input elements and handle erros */
    if (roomLocIndex == -1 )
    {
        errorFlag = true ;
        roomLocInput.style.borderColor = "red"
    }else{
        roomLocInput.style.borderColor = "grey"
    }

    if (roomTypeIndex == -1 )
    {
        errorFlag = true ;
        roomTypeInput.style.borderColor = "red"
    }else{
        roomTypeInput.style.borderColor = "grey"
    }

    if (roomGenderIndex == -1 )
    {
        errorFlag = true ;
        roomGenderInput.style.borderColor = "red"
    } else{
        roomGenderInput.style.borderColor = "grey"
    }

    if ( roomPrice < 1)
    {
        priceErrorMsg.style.display = "inline-block";
        errorFlag = true ;
    }else{
        priceErrorMsg.style.display = "none";
    }

    if ( !roomPrice )
    {
        roomPriceInput.style.borderColor = "red";
        errorFlag = true ;
    }else{
        roomPriceInput.style.borderColor = "grey";
    }

    if ( !roomPhotoInput.files[0] )
    {
        roomPhotoInput.style.color = "red";
        errorFlag = true ;
    }else{
        roomPhotoInput.style.color = "" ;
        Array.from(roomPhotoInput.files).forEach(elem=>
        {
            roomPhotosNames.push(elem.name)
        })
    }

    if (errorFlag == true )
    {
        errorMsgDiv.style.display = "block";
    }else {
        errorMsgDiv.style.display = "none";
        sendDataToServer(locationOptions[roomLocIndex],roomPrice,typesOptions[roomTypeIndex],genderOption[roomGenderIndex],roomPhotosNames,roomPhotoInput.files)
    }
    return false
}



/*upload image */
async function uploadImage(images){

    // image = roomPhotoInput.files[0] 
    if(images ){
        let formData = new FormData()
        Array.from(images).forEach( (elem,i )=>{
        formData.append('img', elem)    
        })
        // sendDataToBackend(formData,'img/')
        
        let req = await fetch('http://localhost:3000/renter/img', {method: 'POST',body:formData })
        return req.text()
    }  
}


/* send the Data to the Server */
async function sendDataToServer(location,price,type,gender,roomPhotosNames,roomPhotos)
{
    
    console.log(location +"," +price +","+ type+"," + gender)
    
    let imageRes = await uploadImage(roomPhotos) 
    console.log(imageRes)

    roomData={
        "location"   : location,
        "price"      : price,
        "type"       : type,
        "gender"     : gender,
        "roomImages" : roomPhotosNames
    }

    fetch('http://localhost:3000/renter/room',
    {
       method:"POST",
       headers: {Accept: 'text/plain'},
       body:JSON.stringify(roomData),
    })
    .then(function(res){ 
      return res.text();
    }).then ( data => {
    console.log(data);
    })
   

}

