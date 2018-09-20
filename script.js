
var config = {
    apiKey: "AIzaSyD_xN0wcqISsMTFFMMRvGq11rUewTYLP0I",
    authDomain: "iliektrains-2ac01.firebaseapp.com",
    databaseURL: "https://iliektrains-2ac01.firebaseio.com",
    projectId: "iliektrains-2ac01",
    storageBucket: "iliektrains-2ac01.appspot.com",
    messagingSenderId: "101829990585"
};

firebase.initializeApp(config);

var database = firebase.database();

// 2. Button for adding Employees
$("#add-train-btn").on("click", function(event) {
  event.preventDefault();

  var trainName = $("#train-name-input").val().trim();
  var trainDestination = $("#destination").val().trim();
  var trainTime = moment($("#first-train-time").val().trim(), "HH:mm").format("X");
  var trainFrequency = $("#frequency").val().trim();

  var newTrain = {
    name: trainName,
    destination: trainDestination,
    time: trainTime,
    frequency: trainFrequency,
  };

  // Uploads employee data to the database
  database.ref().push(newTrain);


  $("#train-name-input").val("");
  $("#destination").val("");
  $("#first-train-time").val("");
  $("#frequency").val("");
});

// 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
database.ref().on("child_added", function(trains) {
  console.log(trains.val());

  // Store everything into a variable.
  var trainName = trains.val().name;
  var trainDestination = trains.val().destination;
  var trainTime = trains.val().time;
  var trainFrequency = trains.val().frequency;

   var trainPretty = moment.unix(trainTime).format("HH:mm");

   
   var now = moment().format("X");
   // console.log(now)
   // console.log(nextArrival)
   // console.log(now)
   // console.log(moment(now, "X").isBefore(nextArrival, "X"))
   // while (moment(now, "X").isBefore(nextArrival, "X")) {
     //   moment(nextArrival, "X" ).add(trainFrequency, "m");
     //   console.log(nextArrival)
     // }
     
     // moment(nextArrival, "X").format("hh:mm A")
     
    var nextArrival = moment(trainPretty, "HH:mm").add(trainFrequency, "m").format("X");
    

    
    console.log(moment(now, "X").isAfter(moment(nextArrival, "X")))
    
    while (moment(now, "X").isAfter(moment(nextArrival, "X"))) {
      nextArrival = moment(nextArrival, "X").add(trainFrequency, "m").format("X")
    }
    
  var end = moment(nextArrival, "X");
  var start = moment(now, "X");

  var minutesAway = moment.duration(end.diff(start)).asMinutes();
    
    
  var intvalue = Math.floor(minutesAway);
      intvalue = Math.ceil(minutesAway);
      intvalue = Math.round(minutesAway);

    console.log(now)
    console.log(nextArrival)
    // minutesAway = moment(minutesAway, "X").format("mm")
    nextArrival = moment(nextArrival, "X").format("hh:mm A")
  // Create the new row
  var newRow = $("<tr>").append(
    $("<td>").text(trainName),
    $("<td>").text(trainDestination),
    $("<td>").text(trainFrequency),
    $("<td>").text(nextArrival),
    $("<td>").text(intvalue),
  );

  $("#train-table > tbody").append(newRow);
});
