const modalRoomDetailsBody=document.getElementById('modalRoomDetailsBody')


function showRoomDetials(card) {
    
    let roomDetails=''
    modalRoomDetailsBody.innerHTML=''
    roomDetails=`
    <div id="roomCarousel" class=" carousel slide" data-ride="carousel">
    <div class="carousel-inner">`


    card.images.forEach( (image, i)=>{
        
        roomDetails += '<div class="carousel-item cardImgDiv'
        if (i == 0 )
        {
            roomDetails += ' active'  
        }
        roomDetails +=`"><img class="d-block cardImg" src=${image} slide"></div>`
    })
    
    roomDetails += `</div><a class="carousel-control-prev" href="#roomCarousel" role="button" data-slide="prev">`
    roomDetails += '<span class="carousel-control-prev-icon" aria-hidden="true"></span><span class="sr-only">Previous</span></a>'
    roomDetails += `<a class="carousel-control-next" href="#roomCarousel" role="button" data-slide="next">`
    roomDetails += '<span class="carousel-control-next-icon" aria-hidden="true"></span><span class="sr-only">Next</span></a></div>'
    roomDetails += `<p></p>
    <p>Location : ${card.location} </p>
    <p>Price : from ${card.priceMin} to ${card.priceMax}</p>
    <p> Furniture status : ${card.furniture}</p>
    <p> preferd gender : ${card.gender}</p>
    <p> Avaliable From : ${card.Avaliable_From}</p>
    ` 
    modalRoomDetailsBody.innerHTML=roomDetails;
    $('#roomDetials').modal({
        show: true
    }); 
}


// avaible from / gender / status