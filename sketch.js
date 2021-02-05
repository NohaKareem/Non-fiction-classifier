// Copyright (c) 2019 ml5
//
// This software is released under the MIT License.
// https://opensource.org/licenses/MIT

/* ===
ml5 Example
Webcam Image Classification using a pre-trained customized model and p5.js
This example uses p5 preload function to create the classifier
=== */

// Classifier Variable
let classifier;
let predictionResults = [0];
// Model URL
let imageModelURL = '';
// let imageModelURL = 'https://teachablemachine.withgoogle.com/models/bXy2kDNi/'; //~

// Video
let video;
let flippedVideo;
// To store the classification
let label = "";

// Image
let userImage;
let readImg = false;

// bar chart
let data;

let ctx;// = document.getElementById('predictionsChart').getContext('2d');

let labelCon;

// sample bar chart https://code.tutsplus.com/tutorials/getting-started-with-chartjs-line-and-bar-charts--cms-28384
let chartLabels = ["Mercury", "Venus", "Earth", "Mars", "Jupiter", "Saturn", "Uranus", "Neptune"];

var densityData = {
  label: 'Prediction %',
  data: [5427, 5243, 5514, 3933, 1326, 687, 1271, 1638]
};

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  labelCon = document.querySelector('#label');
  ctx = document.getElementById('predictionsChart');//.getContext('2d');

  // let predictionsChart = new Chart(ctx, {
  //   type: 'horizontalBar',
  //   data: {
  //     labels: chartLabels,
  //     datasets: [densityData]
  //   }
  // });
}

function setup() {
  let p5Canvas = createCanvas(700, 500);
  p5Canvas.parent('canvasCon');

  // Create the video
  video = createCapture(VIDEO);
  video.size(700, 500);
  video.hide();

  flippedVideo = ml5.flipImage(video);

  // Start classifying
  classifyVideo();
}

function draw() {
  background(0);
  // Draw the video
  image(flippedVideo, 0, 0);

  labelCon.innerHTML = `Highest prediction: ${label}, at ${parseFloat(predictionResults[0].confidence).toFixed(2) * 100}%`;
  // barChart();
  // data.insertRows(0, [["Knight to King 3 (Nf3)", 12]])
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  classifier.classify(flippedVideo, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  label = results[0].label;
  predictionResults = results;

  clearChart();
  // chart.data.datasets[0].data[5] =;
  // chart.data.labels[0].data[5] = ;

  // Classify again!
  classifyVideo();
}

function clearChart() {
  function removeData(chart) {
    chart.data.labels.pop();
    chart.data.datasets.forEach((dataset) => {
      dataset.data.pop();
    });
    chart.update();
  }
}

