var IDs = [];
var hitter_data = [];

// var granimInstance = new Granim({
//   element: '#first',
//   name: "first-gradient",
//   direction: 'left-right',
//   isPausedWhenNotInView: true,
//   elToSetClassOn: ".wrapper",
//   opacity: [1, .75, .65, .05],
//   image: {
//     source: "https://www.stickthisgraphics.com/images/15468895080041460853507.jpeg",
//     position: ["center", "center"],
//     stretchMode: ["stretch", "stretch"],
//     blendingMode: "overlay"
//   },
//   states : {
//       "default-state": {
//           gradients: [
//             ['#29323c', '#485563'],
//             ['#FF6B6B', '#556270'],
//             ['#80d3fe', '#7ea0c4'],
//             ['#f0ab51', '#eceba3']
//         ]
//       }
//   }
// });

var firstGranim = new Granim({
  element: "#first",
  name: "first-gradient",
  direction: "diagonal",
  position: ["center", "center"],
  opacity: [1, 1],
  image: {
    source: "https://i.pinimg.com/originals/83/10/ed/8310ed989af7431d7234bede1442cfae.jpg",
    stretchMode: ["stretch", "stretch"],
    blendingMode: "overlay"
  },
  states: {
    "default-state": {
      gradients: [["#8BC34A", "#FF9800"], ["#FF0000", "#000000"]]
    }
  }
});

fetch("/hitters").then(function (response) {
  console.log("Test");
  if (response.status !== 200) {
    console.log(
      "Looks like there was a problem. Status Code: " + response.status
    );
    return;
  }
  response.json().then(function (data) {
      hitter_data = data;
      var IDs = Object.values(data);
      for (i = 0; i < IDs.length; i++) {
        d3.select("#selDataset").append("option").text(IDs[i][0]);
        d3.select("#selDataset2").append("option").text(IDs[i][0]);
      }
      getSelectionHitters();
      getSelectionHitters2();
  });
  }).catch(function (error) {
	console.log(error);
}); 

//call getSelection at the beginning on an initial value

d3.selectAll("#selDataset").on("change", getSelectionHitters);
d3.selectAll("#selDataset2").on("change", getSelectionHitters2);
// var testSubject = d3.select("#selDataset").property("value");

// function which will take the value of the drop down, then create the
// metadata table.  It also calls the functions to create the bar graph, bubble and gauge charts.

function getSelectionHitters() {
  // need to fetch our csv data using flask here
  
    var playerSelectedName = (
      d3.select("#selDataset").property("value") 
    );

    //filter the dataset by the dropdown item
    var fantasyData = hitter_data.filter((m) => m[0] === playerSelectedName);
      console.log(fantasyData)
    // pull out the data from the dropdown item for the demographic information
    var avgData = fantasyData.map((m) => m[5]);
    var opsData = fantasyData.map((m) => m[6]);
    var rData = fantasyData.map((m) => m[7]);
    var rbiData = fantasyData.map((m) => m[8]);
    var hrData = fantasyData.map((m) => m[9]);
    var sbData = fantasyData.map((m) => m[10]);
    d3.select("#avgTable").text(`BA: ${avgData}`);
    d3.select("#opsTable").text(`OPS: ${opsData}`);
    d3.select("#rTable").text(`Runs: ${rData}`);
    d3.select("#rbiTable").text(`RBI: ${rbiData}`);
    d3.select("#hrTable").text(`HR: ${hrData}`);
    d3.select("#sbTable").text(`SB: ${sbData}`);

    OGraph(playerSelectedName);
    ZGraph(playerSelectedName);
    // gaugeChart(testSubject)
  };

  function getSelectionHitters2() {
    // need to fetch our csv data using flask here
    
      var playerSelectedName2 = (
        d3.select("#selDataset2").property("value") 
      );
  
      //filter the dataset by the dropdown item
      var fantasyData2 = hitter_data.filter((m) => m[0] === playerSelectedName2);
        console.log(fantasyData2)
      // pull out the data from the dropdown item for the demographic information
      var avgData = fantasyData2.map((m) => m[5]);
      var opsData = fantasyData2.map((m) => m[6]);
      var rData = fantasyData2.map((m) => m[7]);
      var rbiData = fantasyData2.map((m) => m[8]);
      var hrData = fantasyData2.map((m) => m[9]);
      var sbData = fantasyData2.map((m) => m[10]);
      d3.select("#avgTable2").text(`BA: ${avgData}`);
      d3.select("#opsTable2").text(`OPS: ${opsData}`);
      d3.select("#rTable2").text(`Runs: ${rData}`);
      d3.select("#rbiTable2").text(`RBI: ${rbiData}`);
      d3.select("#hrTable2").text(`HR: ${hrData}`);
      d3.select("#sbTable2").text(`SB: ${sbData}`);
  
      OGraph2(playerSelectedName2);
      ZGraph2(playerSelectedName2);
      // gaugeChart(testSubject)
    };


// function which creates teh bar graph and bubble charts.  bar graph is only the first 10 data points.
function OGraph(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let swingValues = hitter_data.filter((m) => m[0] === playerSelected);
    console.log(swingValues)
    let playerOSwingValues = swingValues.map((m) => m[1]);
    OSwingValues = [playerOSwingValues[0], .320]
    console.log(OSwingValues)

    // bar graph the results
    var trace1 = [
      {
        x: [playerSelected, "League Average"],
        y: OSwingValues,
        type: "bar",
        hoverinfo: 'none',
        marker:{
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ],
        },
        text: OSwingValues.map(String),
        textposition: 'auto',
      },
    ];
    var layout = {title: "O-Swing %", yaxis: {
                range: [0, 1]
                }}
    Plotly.newPlot("Obar", trace1, layout);

    let swingValues2 = hitter_data.filter((m) => m[0] === playerSelected);
    console.log(swingValues2)
    let playerOSwingValues2 = swingValues2.map((m) => m[2]);
    OSwingValues2 = [playerOSwingValues2[0], .630]
    console.log(OSwingValues2)

    // bar graph the results
    var trace2 = [
      {
        x: [playerSelected, "League Average"],
        y: OSwingValues2,
        type: "bar",
        marker:{
          color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
        },
        text: OSwingValues2.map(String),
        textposition: 'auto',
      },
    ];
    var layout2 = {title: "O-Contact %", yaxis: {range: [0, 1]}}
    Plotly.newPlot("Obar2", trace2, layout2);
  
};

// function which creates teh bar graph and bubble charts.  bar graph is only the first 10 data points.
function ZGraph(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let swingValues = hitter_data.filter((m) => m[0] === playerSelected);
    let playerZSwingValues = swingValues.map((m) => m[3]);
    ZSwingValues = [playerZSwingValues[0], .690]

    // bar graph the results
    var trace1 = [
      {
        x: [playerSelected, "League Average"],
        y: ZSwingValues,
        type: "bar",
        marker:{
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ]
        },
        text: ZSwingValues.map(String),
        textposition: 'auto',
      },
    ];
    var layout = {title: "Z-Swing %", yaxis: {range: [0, 1]}}
    Plotly.newPlot("Zbar", trace1, layout);

    let swingValues2 = hitter_data.filter((m) => m[0] === playerSelected);
    let playerZSwingValues2 = swingValues2.map((m) => m[4]);
    ZSwingValues2 = [playerZSwingValues2[0], .630]

    // bar graph the results
    var trace2 = [
      {
        x: [playerSelected, "League Average"],
        y: ZSwingValues2,
        type: "bar",
        marker:{
          color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
        },
        text: ZSwingValues2.map(String),
        textposition: 'auto',
      },
    ];
    var layout2 = {title: "Z-Contact %", yaxis: {range: [0, 1]}}
    Plotly.newPlot("Zbar2", trace2, layout2);
  
};

function OGraph2(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let swingValues = hitter_data.filter((m) => m[0] === playerSelected);
    console.log(swingValues)
    let playerOSwingValues = swingValues.map((m) => m[1]);
    OSwingValues = [playerOSwingValues[0], .320]
    console.log(OSwingValues)

    // bar graph the results
    var trace1 = [
      {
        x: [playerSelected, "League Average"],
        y: OSwingValues,
        type: "bar",
        marker:{
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ]
        },
        text: OSwingValues.map(String),
        textposition: 'auto',
      },
    ];
    var layout = {title: "O-Swing %", yaxis: {range: [0, 1]}}
    Plotly.newPlot("Obar3", trace1, layout);

    let swingValues2 = hitter_data.filter((m) => m[0] === playerSelected);
    console.log(swingValues2)
    let playerOSwingValues2 = swingValues2.map((m) => m[2]);
    OSwingValues2 = [playerOSwingValues2[0], .630]
    console.log(OSwingValues2)

    // bar graph the results
    var trace2 = [
      {
        x: [playerSelected, "League Average"],
        y: OSwingValues2,
        type: "bar",
        marker:{
          color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
        },
        text: OSwingValues2.map(String),
        textposition: 'auto',
      },
    ];
    var layout2 = {title: "O-Contact %", yaxis: {range: [0, 1]}}
    Plotly.newPlot("Obar4", trace2, layout2);
  
};

function ZGraph2(playerSelected) {
  console.log(playerSelected);

  // create an array of the values filtered by the drop-down selection

    let contactValues = hitter_data.filter((m) => m[0] === playerSelected);
    console.log(contactValues)
    let playerZContactValues = contactValues.map((m) => m[3]);
    ZContactValues = [playerZContactValues[0], .690]
    console.log(ZContactValues)

    // bar graph the results
    var trace1 = [
      {
        x: [playerSelected, "League Average"],
        y: ZContactValues,
        type: "bar",
        marker:{
          color: ['rgba(204,204,204,1)', 'rgba(222,45,38,0.8)' ]
        },
        text: ZContactValues.map(String),
        textposition: 'auto',
      },
    ];
    var layout = {title: "Z-Swing %", yaxis: {range: [0, 1]}}
    Plotly.newPlot("Zbar3", trace1, layout);

    let swingValues2 = hitter_data.filter((m) => m[0] === playerSelected);
    console.log(swingValues2)
    let playerZSwingValues2 = swingValues2.map((m) => m[4]);
    ZSwingValues2 = [playerZSwingValues2[0], .630]
    console.log(ZSwingValues2)

    // bar graph the results
    var trace2 = [
      {
        x: [playerSelected, "League Average"],
        y: ZSwingValues2,
        type: "bar",
        marker:{
          color: ['rgba(255,20,223,0.8)', 'rgba(0,114,214,1)']
        },
        text: ZSwingValues2.map(String),
        textposition: 'auto',
      },
    ];
    var layout2 = {title: "Z-Contact %", yaxis: {range: [0, 1]}}
    Plotly.newPlot("Zbar4", trace2, layout2);
  
};

