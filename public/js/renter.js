/*******************Dom Elements*******************/
const roomLocInput      = document.getElementById('roomLoc_r');
const roomPriceMinInput = document.getElementById('roomPriceMin_r');
const roomPriceMaxInput = document.getElementById('roomPriceMax_r');
const roomTypeInput     = document.getElementById('roomType_r');
const roomFurnInput     = document.getElementById('roomFurn_r');
const roomPhotoInput    = document.getElementById('roomPhoto_r');
const errorMsgDiv       = document.getElementById('errorMsg');
const priceErrorMsg     = document.getElementById('roomPriceErrorMsg');
const addingNewRoomBtn  = document.getElementById('addingNewRoomBtn');

const dashboardBtn      = document.getElementById('dashboardBtn');
const requestsBtn       = document.getElementById('requestsBtn');
const newRoomBtn        = document.getElementById('newRoomBtn');

const newRoomPage       = document.getElementById('newRoomDiv');
const roomCardsDiv      = document.getElementById("roomCardsDiv")
/*******************Global Variables*******************/
const locationOptions = ["October","Fifth settlement","First settlement","El-Sheikh Zayed"]
const furnOption      = ["Furnished","Unfurnished"]
const typesOptions    = ["Single","Double","Triple"]

/*******************Drop Down Menus Init*******************/
locationOptions.forEach( (elem,index) => {
    let optn   = document.createElement("OPTION");
    optn.text  = elem;
    optn.value = index;
    roomLocInput.options.add(optn); 
})

furnOption.forEach( (elem,index) => {
    let optn   = document.createElement("OPTION");
    optn.text  = elem;
    optn.value = index;
    roomFurnInput.options.add(optn); 
})

typesOptions.forEach( (elem,index) => {
    let optn   = document.createElement("OPTION");
    optn.text  = elem;
    optn.value = index;
    roomTypeInput.options.add(optn); 
})

/*******************Event listeners*******************/
addingNewRoomBtn.addEventListener("click",getTheRoomData)
dashboardBtn.addEventListener("click",openDashboardPage)
requestsBtn.addEventListener("click",openRequestsPage)
newRoomBtn.addEventListener("click",openNewRoomPage)


/********************Function*******************/

/* navigation Functions */
function openDashboardPage(){
    roomCardsDiv.style.display  = "block"
    newRoomPage.style.display   = "none"
    getRenterRooms(1)
}

function openRequestsPage(){
    roomCardsDiv.style.display = "none"
    newRoomPage.style.display  = "none"

}

function openNewRoomPage(){
   
    roomCardsDiv.style.display = "none";
    newRoomPage.style.display  = "block";
}

/* New Room Page Functions*/
function getTheRoomData(e){
    e.preventDefault()
    let roomLocIndex     = roomLocInput.value ;
    let roomTypeIndex    = roomTypeInput.value ;
    let roomFurnIndex    = roomFurnInput.value ; 
    let roomPriceMin     = roomPriceMinInput.value ; 
    let roomPriceMax     = roomPriceMaxInput.value ; 
    let errorFlag        = false;
    let roomPhotosNames  = []


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

    if (roomFurnIndex == -1 )
    {
        errorFlag = true ;
        roomFurnInput.style.borderColor = "red"
    } else{
        roomFurnInput.style.borderColor = "grey"
    }

    if ( roomPriceMin < 0 || roomPriceMax < 1  || roomPriceMin > roomPriceMax)
    {
        priceErrorMsg.style.display = "inline-block";
        errorFlag = true ;
    }else{
        priceErrorMsg.style.display = "none";
    }

    if ( !roomPriceMin )
    {
        roomPriceMinInput.style.borderColor = "red";
        errorFlag = true ;
    }else{
        roomPriceMinInput.style.borderColor = "grey";
    }

    if ( !roomPriceMax )
    {
        roomPriceMaxInput.style.borderColor = "red";
        errorFlag = true ;
    }else{
        roomPriceMaxInput.style.borderColor = "grey";
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
        sendDataToServer(locationOptions[roomLocIndex],roomPriceMin , roomPriceMax ,typesOptions[roomTypeIndex],furnOption[roomFurnIndex],roomPhotosNames,roomPhotoInput.files)
    }
    return false
}



/*upload image */
async function uploadImage(images){

    // image = roomPhotoInput.files[0] 
    if(images ){
        let formData = new FormData()
        Array.from(images).forEach( (elem )=>{
        formData.append('img', elem)    
        })
        let req = await fetch('http://localhost:3000/renter/img', {method: 'POST',body:formData })
        return req.text()
    }  
}


/* send the Data to the Server */
async function sendDataToServer(location,priceMin,priceMax,type,furniture,roomPhotosNames,roomPhotos)
{

    let imageRes = await uploadImage(roomPhotos) 
    console.log(imageRes)

    roomData={
        "location"   : location,
        "priceMin"   : priceMin,
        "priceMax"   : priceMax,
        "type"       : type,
        "furniture"  : furniture,
        "roomImages" : roomPhotosNames
    }

    fetch('http://localhost:3000/renter/room',
    {
       method:"POST",
       headers: {Accept: 'application/json'},
       body:JSON.stringify(roomData),
    })
    .then(function(res){ 
      return res.json();
    }).then ( res => {
    if (res.status == "error" )
    {
        console.log("there is an Error happened")
    }else{
        console.log("Room added Successfuly")
    }
    })
   

}

/********************Getting Renter Rooms*******************************/


function getRenterRooms(renterId)
{
    fetch(`http://localhost:3000/renter/rooms/${renterId}`,
    {
       method:"GET",
       headers: {Accept: 'application/json'}
    })
    .then(function(res){ 
      return res.json();
    }).then ( res => {
    if (res.status == "error" )
    {
        console.log("there is an Error happened")
    }else{
        displayRoom(res.data)
    }
    })
}


function displayRoom(rooms){
    let order = ['First','Second', 'Third','Forth','Fifth','Sixth','Seventh','Eighth','Ninth']
    let cards= ''
    roomCardsDiv.innerHTML = ''
    rooms.forEach( (room,index)=>{
        cards = '<div class="cardDiv card mb-3" style="width: 540px;"><div class="row no-gutters">'
        cards += `<div id="roomCarousel${index}" class="col-md-4 carousel slide" data-ride="carousel" data-interval="3000">`
        cards += '<div class="carousel-inner">'
        room.roomImages.forEach( (image, i)=>{
            
            cards += '<div class="carousel-item cardImgDiv'
            if (i == 0 )
            {
                cards += ' active'  
            }
            cards +=`"><img class="d-block cardImg" src=${image} alt="${order[i]} slide"></div>`
        })
        
        cards += `</div><a class="carousel-control-prev" href="#roomCarousel${index}" role="button" data-slide="prev">`
        cards += '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a>'
        cards += `<a class="carousel-control-next" href="#roomCarousel${index}" role="button" data-slide="next">`
        cards += '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>'
        cards += `<div class="col-md-8"><div class="card-body"><h5 class="card-title">Room #${room.roomId}</h5><p class="card-text">`
        cards += `<p>Location : ${room.location} </p><p>Price : from ${room.priceMin} to ${room.priceMax}</p><p> Furniture status : ${room.furniture}</p>`
        cards += '</p></div></div></div></div></div>'
        roomCardsDiv.innerHTML += cards
    })
    //make the images slider starts autoplay
    $(".carousel").carousel();
}


/*******************Entry Point************************* */
openDashboardPage()

