
/* Dom Elements */
const roomLocInput     = document.getElementById('roomLoc_r');
const roomPriceInput   = document.getElementById('roomPrice_r');
const roomTypeInput    = document.getElementById('roomType_r');
const roomGenderInput  = document.getElementById('roomGender_r');
const errorMsgDiv      = document.getElementById('errorMsg');
const priceErrorMsg    = document.getElementById('roomPriceErrorMsg');
const addingNewBookBtn = document.getElementById('addingNewBookBtn');

roomPriceErrorMsg
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
addingNewBookBtn.addEventListener("click",() => {
    getTheRoomData()
})

/* Submit the Forum */
function getTheRoomData(){
    let roomLocIndex    = roomLocInput.value ;
    let roomTypeIndex   = roomTypeInput.value ;
    let roomGenderIndex = roomGenderInput.value ; 
    let roomPrice       = roomPriceInput.value ; 
    let errorFlag       = false;

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

    if ( !roomPrice )
    {
        priceErrorMsg.style.display = "inline-block";
        errorFlag = true ;
    }else{
        priceErrorMsg.style.display = "none";
    }

    if (errorFlag == true )
    {
        errorMsgDiv.style.display = "block";
    }else {
        errorMsgDiv.style.display = "none";
        sendDataToServer(locationOptions[roomLocIndex],roomPrice,typesOptions[roomTypeIndex],genderOption[roomGenderIndex])
    }
}

/* send the Data to the Server */
function sendDataToServer(location,price,type,gender)
{
    console.log(location +"," +price +","+ type+"," + gender)
    roomData={
        "location" : location,
        "price"    : price,
        "type"     : type,
        "gender"   : gender 
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

