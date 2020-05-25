const dashboardBtnCustomer = document.getElementById('dashboardBtnCustomer');
const requestsBtnCustomer = document.getElementById('requestsBtnCustomer');
const roomsDiv = document.getElementById('roomsDiv');
const requestsDiv = document.getElementById('requestsDiv');

/*  

functions that toggle the side content of the customer that shows all rooms 
or requests 

*/

function showRoomsDiv() {
    requestsDiv.hidden = true
    roomsDiv.hidden = false;

}

function showRequestsDiv() {
    roomsDiv.hidden = true;
    requestsDiv.hidden = false;
}

dashboardBtnCustomer.addEventListener('click', showRoomsDiv)
requestsBtnCustomer.addEventListener('click', showRequestsDiv)