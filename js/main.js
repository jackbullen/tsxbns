// Import the createRow function from the createRow.js file
import { createRow } from "./createRow.js";


// Get a reference to the HTML table
const table = document.querySelector("#categories-table tbody");

// Populate the table from local storage
for (let i = 0; i < localStorage.length; i++) {
  console.log(i);
  const key = localStorage.key(i);
  const stockData = JSON.parse(localStorage.getItem(key));
  const row = createRow(stockData);
    // Add a delete button to the row
    const deleteButton = document.createElement("button");
    deleteButton.type = "delete"
    deleteButton.innerHTML = "Delete";
    deleteButton.addEventListener("click", function() {
      // Remove the stock from local storage
      localStorage.removeItem(key);
  
      // Remove the row from the table
      table.removeChild(row);
    });
    row.appendChild(deleteButton);
  
    // Append the row to the table
    table.appendChild(row);
  }

// Get references to the form, list, and detail views
const listView = document.getElementById("categories-table");
const detailView = document.querySelector("#detail-view");
const formView = document.getElementById("add-stock-form");

// Get references to the nav links
const listViewLink = document.querySelector("#list-view-link");
const detailViewLink = document.querySelector("#detail-view-link");

listViewLink.addEventListener("click", event => {
  // Prevent the default link behavior
  event.preventDefault();
  
  // Hide the other views and show the list view
  listView.style.visibility = "visible";
  formView.style.visibility = "visible";
  detailView.style.display = "hidden";
});

detailViewLink.addEventListener("click", event => {
  // Prevent the default link behavior
  event.preventDefault();
  
  // Hide the other views and show the detail view
  listView.style.visibility = "hidden";
  formView.style.visibility = "hidden";
  detailView.style.display = "visible";
});


// Get a reference to the theme toggle button
const toggleButton = document.getElementById("theme-toggle");

// Add a click event listener to the button
toggleButton.addEventListener("click", function() {
  // Toggle the "dark" class on the document body
  document.body.classList.toggle("dark");
});


// Get a reference to the form
const form = document.getElementById("add-stock-form");

// Add a submit event listener to the form
form.addEventListener("submit", event => {
  // Prevent the default form submission behavior
  event.preventDefault();

  // Get the value of the "name" input field
  const name = form.elements.name.value;

  // Construct the URL for the API request
  const URL = `https://query1.finance.yahoo.com/v7/finance/quote?symbols=${name}`;

  // Use the fetch() function to make the API request
  fetch(URL)
    .then(response => response.json()) // Parse the response as JSON
    .then(data => {
      
      // Get the stock data from the response
      const stockData = data.quoteResponse.result[0];

      // Save the stock data to local storage
      saveInput(stockData.symbol, JSON.stringify(stockData));

      // Create a new row for the table using the createRow function
      const row = createRow(stockData);
      // Add a delete button to the row
      const deleteButton = document.createElement("button");
      deleteButton.innerHTML = "Delete";
      deleteButton.addEventListener("click", function() {
        // Remove the stock from local storage
        localStorage.removeItem(stockData.symbol);

        // Remove the row from the table
        table.removeChild(row);
      });
      row.appendChild(deleteButton);
      // Append the new row to the table
      table.appendChild(row);

      form.reset();
    })
    .catch(error => {
      // Handle any errors here
      console.error(error);
    });
});

function saveInput(key, value) {
  localStorage.setItem(key, value);
}

function summarizeTransaction(stock, data, status, amount) {
  let transactionSummary = "";

  if (status === "BUY") {
    transactionSummary += `Bought ${amount} shares of ${stock} at $${data.price} per share for a total of $${amount * data.price}.`;
  } else if (status === "SELL") {
    transactionSummary += `Sold ${amount} shares of ${stock} at $${data.price} per share for a total of $${amount * data.price}.`;
  } else {
    // handle invalid status
    transactionSummary += "Invalid purchase status. Please enter either 'BUY' or 'SELL'.";
  }

  return transactionSummary;
}
