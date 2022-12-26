// Get references to the form, list, and detail views
const listView = document.getElementById("categories-table");
const detailView = document.querySelector("#detail-view");

// Get references to the nav links
const listViewLink = document.querySelector("#list-view-link");
const formViewLink = document.getElementById("add-stock-form");
const detailViewLink = document.querySelector("#detail-view-link");

// Add click event listeners to the nav links
listViewLink.addEventListener("click", event => {
// Prevent the default link behavior
event.preventDefault();

// Hide the other views and show the list view
listView.style.display = "block";
detailView.style.display = "none";
formViewLink.style.display = "block";
});

detailViewLink.addEventListener("click", event => {
// Prevent the default link behavior
event.preventDefault();

// Hide the other views and show the detail view
listView.style.display = "none";
detailView.style.display = "block";
formViewLink.style.display = "none";
});