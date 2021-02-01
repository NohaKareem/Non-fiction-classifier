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

// on image upload, image upload from previous project https://github.com/NohaKareem/css-filters/blob/master/js/main.js
// document.querySelector('input').addEventListener("change", () => {
//   console.log(this.files)
//   userImage = this.files[0];
//   // imgToClassify
//   if (userImage != undefined) {
//     var imgReader = new FileReader();
//     imgReader.addEventListener("load", () =>{
//       readImg = true; //~
//     });

//     imgReader.readAsDataURL(userImg);
//   }
// });

let labelCon; 

// Load the model first
function preload() {
  classifier = ml5.imageClassifier(imageModelURL + 'model.json');
  labelCon = document.querySelector('#label');
}

function setup() {
  // createCanvas(320, 260);
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

  //// Draw the label
  // fill(255);
  // textSize(16);
  // textAlign(CENTER);
  // text(label, width / 2, height - 4);
  
  // labelCon = document.querySelector('#label');
  labelCon.innerHTML = label;
}

// Get a prediction for the current video frame
function classifyVideo() {
  flippedVideo = ml5.flipImage(video)
  // let imgToClassify = readImg ? userImage : flippedVideo; 
  classifier.classify(flippedVideo, gotResult);
  // classifier.classify(imgToClassify, gotResult);
}

// When we get a result
function gotResult(error, results) {
  // If there is an error
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  // console.log(results);
  label = results[0].label;
  // Classifiy again!
  classifyVideo();
}