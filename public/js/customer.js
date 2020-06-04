checkIfloggedIn()
async function getRoomsFromBackend(path) {
    
let rooms= await fetch('http://localhost:3000/' + path)
let data= await rooms.json();
return data

}


async function getRequetsFromBackend(path){

let requets= await fetch('http://localhost:3000/' + path)
let data= await requets.json();
return data
}


function getRequestedRooms(div) {
    getRoomsFromBackend('customer/rooms').then((data)=>{
        displayRequestedRooms(data,div)
    })
}


getRoomsFromBackend('customer/rooms').then((data)=>{
    console.log(data.data)
    displayRoom(data.data,roomsDiv,false)
})


getRequetsFromBackend('customer/requets').then(requests=>{
   
   
   
    drawAlert(requests,NotificationDiv)
})