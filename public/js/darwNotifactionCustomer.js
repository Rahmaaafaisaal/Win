function drawAlert(requets,requestsDiv) {
   
 let requestsHtml=`<section>
 <div class="container mt-5">
 <div class="row">
 
 `;
  requets.forEach(requets => {

    if(requets.request_status=='succes'){
       
        requestsHtml+=`<div class="col-sm-12">
            <div class="alert fade alert-simple alert-success alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show">
              <i class="start-icon far fa-check-circle faa-tada animated"></i>
              <strong class="font__weight-semibold">Well done!</strong> You request for <a onclick='showRoomDetials()' href="">Room</a> have been accepted.
            </div>
          </div>`
      
    }
    else  if(requets.request_status=='pending'){
        requestsHtml+=
            `  <div class="col-sm-12">
            <div class="alert fade alert-simple alert-warning alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
              <i class="start-icon fa fa-exclamation-triangle faa-flash animated"></i>
              <strong class="font__weight-semibold">Warning!</strong> Better check yourself , Renter for <a onclick='showRoomDetials()' href="">Room</a> didn't answer.
            </div>
          </div>`
        
    }
    else if(requets.request_status=='declined'){
        requestsHtml+=
            `  <div class="col-sm-12">
            <div class="alert fade alert-simple alert-danger alert-dismissible text-left font__family-montserrat font__size-16 font__weight-light brk-library-rendered rendered show" role="alert" data-brk-library="component__alert">
          
              <i class="start-icon far fa-times-circle faa-pulse animated"></i>
              <strong class="font__weight-semibold">Oh snap!</strong> your request for <a onclick='showRoomDetials()' href="">Room</a> have been refused.
            </div>
          </div>`
        
    }
 
    });
    requestsHtml+=`</section>
    </div>
    </div>
    
    `
    requestsDiv.innerHTML+=requestsHtml;
}