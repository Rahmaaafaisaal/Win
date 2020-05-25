function displayRoom(rooms,div,isRenter){
    let order = ['First','Second', 'Third','Forth','Fifth','Sixth','Seventh','Eighth','Ninth']
    let cards= ''
    rooms.forEach( (room,index)=>{
        cards = '<div class="cardDiv card mb-3" style="width: 540px;"><div class="row no-gutters">'
        cards += `<div id="roomCarousel${index}" class="col-md-6 carousel slide" data-ride="carousel">`
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
        cards += '<div ><div class="card-body"><h5 class="card-title">Card title</h5><p class="card-text">'
        cards += room.text
        if(isRenter==false)
        {
            cards+='<button type="button" class="btn btn-success">Request</button>'
        }
        else{
            cards+='<button type="button" class="btn btn-dark">Edit</button>'
        }

        cards += '</p></div></div></div></div></div>'
        div.innerHTML += cards
    })
}

