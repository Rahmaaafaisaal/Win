let dashboardBtnCustomer = document.getElementById('dashboardBtnCustomer');
let requestsBtnCustomer = document.getElementById('requestsBtnCustomer');
let notificationBtnCustomer = document.getElementById('notificationBtnCustomer');
let roomsDiv = document.getElementById('roomsDiv');
let NotificationDiv = document.getElementById('NotificationDiv');
let requestsDiv = document.getElementById('requestsDiv');
/*  

functions that toggle the side content of the customer that shows all rooms 
or requests 

*/

function showRoomsDiv() {
    NotificationDiv.hidden = true
    requestsDiv.hidden=true
    roomsDiv.hidden = false;

}



function showNotificationDiv() {
    roomsDiv.hidden = true;
    requestsDiv.hidden=true
    NotificationDiv.hidden = false;
}



function showRequestedRoomsDiv() {

    getRequestedRooms(requestsDiv);
    roomsDiv.hidden = true;
    NotificationDiv.hidden = true;
    requestsDiv.hidden=false
    
}

dashboardBtnCustomer.addEventListener('click', showRoomsDiv)
notificationBtnCustomer.addEventListener('click', showNotificationDiv)
requestsBtnCustomer.addEventListener('click',showRequestedRoomsDiv)