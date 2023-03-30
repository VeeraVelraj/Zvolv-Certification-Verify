window.addEventListener("DOMContentLoaded", (event) => {
  var form = document.getElementById("certificate_id");
  form.onsubmit = function (event) {
    var formData = new FormData(form);
    url = JSON.stringify([
      {
        column: "Elements",
        operator: "JSON_CONTAINS",
        value: [
          {
            operator: "LIKE",
            value: "%" + event.target[0].value + "%",
            label: "Certificate ID",
            label_type: "EDIT_TEXT",
          },  
        ],
      },
      { operator: "=", value: 161238, column: "FormID" },
    ]);
    url = encodeURI(url);
    console.log(event.target[0].value);
    fetch(
      "https://app.zvolv.com/rest/v17/lite/submissions?filter="+url ,
      {
        method: "GET",
        headers: {
          Accept: "application/json",
          "Content-Type": " application/json",
          jwt: "eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJodHRwczpcL1wvYXBwLnp2b2x2LmNvbVwvcmVzdCIsImlhdCI6MTY3OTYzOTMwMSwibmJmIjoxNjc5NjM5MzAxLCJleHAiOjE2ODAyNDQxMDEsInVzZXJpZCI6MSwib3JnenZpY2VpZCI6MzAwMDI3OTA4NCwiZW1haWxpZCI6Inp2b2x2YWNhZGVteUBnbWFpbC5jb20ifQ.lGFaG0ghUUX97CrRyH9dR1OJyTPknuAM_LHYxOnGnvQ",
          businessDomain: "zvolvacademy",
          businessTagID: "98NCMBD2KBZ4R",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => {
        console.log(res.data.elements);
        functionDate(res.data.elements);
        console.log("test");
      })
      .catch((err) => console.log(err));

    //Dont submit the form.
    return false;
  };
  console.log("DOM fully loaded and parsed");
  
});

function functionDate(data) {
  var mainContainer = document.getElementById("results");
  mainContainer.innerHTML=("")
  if (data.length==0){
    mainContainer.innerHTML="No Results"
  }
  for (var i = 0; i < data.length; i++) {
    var div = document.createElement("div");
    var functionEmailObject = data[i].inputs.find(
      (input) => input.label == "Trainee Email"
    );
    var functionIssueDateObject = data[i].inputs.find(
      (input) => input.label == "Date"
    );
    var functionTraineeNameObject = data[i].inputs.find(
      (input) => input.label == "Trainee Name"
    );
    div.innerHTML = `<div class="container" id="results">
    <div class="table-wrapper">
    <table class="fl-table">
      <thead>
      <tr>
        <th>Email</th>
        <th>Name</th>
        <th>Issue Date</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>${functionEmailObject.value}</td>
        <td>${functionTraineeNameObject.value}</td>
        <td>${functionIssueDateObject.value}</td>
      </tr>                              
    <tbody>
    </table>
  </div>
    </div>`
    mainContainer.appendChild(div);
  }
}
