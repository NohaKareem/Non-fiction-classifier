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
let ctx;
let labelCon;
var chartInitData = {
  label: 'Prediction %',
  data: []
};
let predictionsChart;

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'js/model.json');
  labelCon = document.querySelector('#label');
  ctx = document.getElementById('predictionsChart');
  // predictionsChart = new Chart(ctx, {
  //   type: 'horizontalBar',
  //   data: {
  //     datasets: [chartInitData]
  //   }
  //   // options: {
  //   //   scales: {
  //   //     ticks: {
  //   //       min: 0
  //   //     }
  //   //   }
  //   // }
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

  // update html
  labelCon.innerHTML = `Highest prediction:<br> ${label}, at ${parseFloat(predictionResults[0].confidence).toFixed(2) * 100}%`;
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


  // sort by label
  predictionResults = results.sort((a, b) => a.label.localeCompare(b.label));

  // export labels and confidence values
  predictionLabels = results.map(p => p.label);
  predictionVals = results.map(p => parseFloat(p.confidence).toFixed(5));

  // update chart
  // predictionsChart.data.datasets = [predictionVals];
  // predictionsChart.data.labels = predictionLabels;
  // predictionsChart.update();

  // Classify again!
  classifyVideo();
}