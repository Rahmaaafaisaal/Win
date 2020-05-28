function displayRoom(rooms,div,isRenter){
    let order = ['First','Second', 'Third','Forth','Fifth','Sixth','Seventh','Eighth','Ninth']
    let cards= ''
    rooms.forEach( (room,index)=>{
        cards = '<div class="cardDiv card mb-3" style="width: 540px;"><div class="row no-gutters">'
        cards += `<div id="roomCarousel${index}" class=" carousel slide" data-ride="carousel">`
        cards += '<div class="carousel-inner">'
        room.images.forEach( (image, i)=>{
            
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
        cards += `<div ><div class="card-body"><p class="card-text">`
        cards += `<p>Location : ${room.location} </p><p>Price : from ${room.priceMin} to ${room.priceMax}</p><p> Furniture status : ${room.furniture}</p>`
        cards+='<button type="button" class="btn btn-success">Request</button>'
        let modalRoom=JSON.stringify(room)
        cards += `</p></div></div><p style="font-size:10px; margin-left:37%" onclick='showRoomDetials(${modalRoom})'><a href="#">more ...</a></p></div></div></div>`
        div.innerHTML += cards
    })
}

function displayRequestedRooms(rooms,div){
    div.innerHTML=''
    rooms.forEach( (room)=>{
        cards = '<div class="cardDiv card mb-3" style="width: 540px;"><div class="row no-gutters">'
        cards += `<div ><div class="card-body"><p class="card-text">`
        cards += `<p>Location : ${room.location} </p><p>Price : from ${room.priceMin} to ${room.priceMax}</p><p> Furniture status : ${room.furniture}</p>`
        cards+='<button type="button" class="btn btn-danger">Decline</button>'
        cards += `</p></div></div></div></div></div>`
        div.innerHTML += cards
    })
}
