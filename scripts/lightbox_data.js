"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Image List

      Filename:lightbox_data.js
*/

// Title of the slideshow
let lightboxTitle = "A gallery of our location";

// Names of the image files shown in the slideshow
let imgFiles = ["images/photo01.png", "images/photo02.png", "images/photo03.png", "images/photo04.png",
                "images/photo05.png", "images/photo06.png", "images/photo07.png", "images/photo08.png",
                "images/photo09.png", "images/photo10.png", "images/photo11.png", "images/photo12.png"]

// Captions associated with each image
let imgCaptions = new Array(12);
imgCaptions[0]="Our front porch";
imgCaptions[1]="A close up of the front porch"; 
imgCaptions[2]="A sky view of our location"; 
imgCaptions[3]="The lavender bedroom"; 
imgCaptions[4]="The lavender bedroom's fireplace";
imgCaptions[5]="The lavender bedroom's bed";
imgCaptions[6]="The lavender bedroom's window sill";
imgCaptions[7]="The galactic bedroom";
imgCaptions[8]="The galactic bedroom's bed";
imgCaptions[9]="The galactic bedroom's shelf";
imgCaptions[10]="The galactic bedroom's window area";
imgCaptions[11]="The basement...";

// Count of images in the slideshow
let imgCount = imgFiles.length;
