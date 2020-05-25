async function getRoomsFromBackend(path) {
    
let rooms= await fetch('http://localhost:3000/' + path)
let data= await rooms.json();
return data

}




getRoomsFromBackend('customer/rooms').then((data)=>{
    displayRoom(data,roomsDiv)
})


