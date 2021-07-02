const url =
  "https://dev.onebanc.ai/assignment.asmx/GetTransactionHistory?userId=1&recipientId=2";

async function getapi(url) {
  const response = await fetch(url);

  var data = await response.json();

  let transaction = data.transactions;

  const sortedData = sortedTransactions(data);
  const groupedData = groupedTransactions(sortedData);
  displayBox(groupedData);
}

getapi(url);

function sortedTransactions(data) {
  const sortedTranscations = data.transactions.sort((a, b) => {
    let da = new Date(a.startDate),
      db = new Date(b.startDate);
    return da - db;
  });
  return sortedTranscations;
}

function groupedTransactions(sortedTransactions = []) {
  const getDate = (date) => {
    return date.split("T")[0];
  };

  const newData = {};

  sortedTransactions.forEach((el) => {
    const key = getDate(el.startDate);
    if (!newData[key]) {
      newData[key] = [];
      newData[key].push(el);
    } else {
      newData[key].push(el);
    }
  });
  return newData;
}

function displayBox(groupedData) {
  for (let dataKey in groupedData) {
    document.getElementById(
      "fetch_data"
    ).innerHTML += `<div class="wrap"><div class="card-date">
                <p>${new Date(dataKey).toDateString()}</p>
            </div></div>`;

    for (let i = 0; i < groupedData[dataKey].length; i++) {
      let type = groupedData[dataKey][i].type;
      let direction = groupedData[dataKey][i].direction;

      if (type === 1 && direction === 1) {
        document.getElementById(
          "fetch_data"
        ).innerHTML += `<div class="align-right"><div class="card">
                     <p class="ammount">
                      &#8377; ${
                        groupedData[dataKey][i].amount
                      }<p class='paid fa'>&#xf017 ${"You requested"}</p> </p>
                    <div class="transaction-data">
                    <p>Transaction ID</p>
                     <p>${groupedData[dataKey][i].id}</p>
                    </div>
                    </div>
                    </div>
                    <div class="date-time-right">
              <p>${new Date(
                groupedData[dataKey][i].startDate
              ).toDateString()}, ${new Date(
          groupedData[dataKey][i].startDate
        ).toLocaleTimeString()}</p>
            </div>`;
      }
      if (type === 1 && direction === 2) {
        document.getElementById(
          "fetch_data"
        ).innerHTML += `<div class="alignment-left"><div class="card">
              <p class="ammount">
               &#8377; ${groupedData[dataKey][i].amount}
               <p class='paid'><i class="fa fa-check" aria-hidden="true"></i> ${"You recieved"}</p>
             </p>
             <div class="transaction-data">
             <p>Transaction ID</p>
              <p>${groupedData[dataKey][i].id}</p>
             </div>
             </div>
             </div>
              <div class="date-time-left">
              <p>${new Date(
                groupedData[dataKey][i].startDate
              ).toDateString()}, ${new Date(
          groupedData[dataKey][i].startDate
        ).toLocaleTimeString()}</p>
            </div>`;
      }
      if (type === 2 && direction === 1) {
        document.getElementById(
          "fetch_data"
        ).innerHTML += `<div class="align-right"><div class="card">
              <p class="ammount">
               &#8377; ${groupedData[dataKey][i].amount}
               <p class='paid'> <i class="fa fa-check" aria-hidden="true"></i>
               ${"You paid"}</p>
             </p>
             <div class="transaction-data">
              <button class='Declines'>Cancel</button>
             </div>
             </div>
             </div>
             <div class="date-time-right">
             <p>${new Date(
               groupedData[dataKey][i].startDate
             ).toDateString()}, ${new Date(
          groupedData[dataKey][i].startDate
        ).toLocaleTimeString()}</p>
           </div>`;
      }
      if (type === 2 && direction === 2) {
        document.getElementById(
          "fetch_data"
        ).innerHTML += `<div class="align-left"><div class="card">
              <p class="ammount">
               &#8377; ${groupedData[dataKey][i].amount}
               <p class='paid fa'>&#xf017 ${"Request recieved"}</p>
             </p>
              <button class='paynow'>Pay</button>
              <button class='Declines'>Decline</button>
             </div>
             </div>
             <div class="date-time-left">
              <p>${new Date(
                groupedData[dataKey][i].startDate
              ).toDateString()}, ${new Date(
          groupedData[dataKey][i].startDate
        ).toLocaleTimeString()}</p>
            </div>`;
      }
    }
  }
}