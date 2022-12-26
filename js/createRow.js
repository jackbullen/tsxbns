// createRow.js

// This function takes a stock data object and returns a new tr element with the relevant data added to it
export function createRow(stockData) {
    // Create a new row for the table
    const row = document.createElement("tr");
  
    // Add the stock name to the first column
    const nameCol = document.createElement("td");
    nameCol.textContent = stockData.displayName;
    row.appendChild(nameCol);
  
    // Add the stock data to the subsequent columns
    const dataCol1 = document.createElement("td");
    dataCol1.textContent = stockData.currency;
    row.appendChild(dataCol1);
  
    const dataCol2 = document.createElement("td");
    dataCol2.textContent = stockData.regularMarketPrice;
    row.appendChild(dataCol2);
  
    const dataCol3 = document.createElement("td");
    dataCol3.textContent = stockData.fiftyTwoWeekRange;
    row.appendChild(dataCol3);
  
    const dataCol4 = document.createElement("td");
    dataCol4.textContent = stockData.forwardPE;
    row.appendChild(dataCol4);
  
  
    const dataCol8 = document.createElement("td");
    dataCol8.textContent = stockData.trailingAnnualDividendRate;
    row.appendChild(dataCol8);
  
    const dataCol9 = document.createElement("td");
    dataCol9.textContent = stockData.trailingAnnualDividendYield;
    row.appendChild(dataCol9);
  
    const dataCol10 = document.createElement("td");
    dataCol10.textContent = stockData.averageAnalystRating;
    row.appendChild(dataCol10);
  
    // Return the new tr element
    return row;
  }
  