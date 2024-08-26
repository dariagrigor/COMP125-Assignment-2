"use strict";
/*    JavaScript 7th Edition
      Chapter 5
      Chapter Case

      Application to generate a slide show
      Author: 
      Date:   

      Filename: js05.js
*/

var favourites = [];

window.addEventListener("load", setupGallery);
window.addEventListener("load", createLightbox);

function createLightbox(){
   let lightbox = document.getElementById("lightbox");

   let title = document.createElement("h1");
   let counter = document.createElement("div");
   let prev = document.createElement("div");
   let next = document.createElement("div");
   let play = document.createElement("div");
   let images = document.createElement("div");

   let lightboxElements = {
      "lbTitle" : title,
      "lbCounter" : counter,
      "lbPrev" : prev,
      "lbNext" : next,
      "lbPlay" : play,
      "lbImages" : images
   }

   for(var key in lightboxElements){
      lightbox.appendChild(lightboxElements[key])
      lightboxElements[key].id = key;
   }

   for(let i=0; i<imgCount; i++){
      let img = document.createElement("img");
      img.src = imgFiles[i];
      img.alt = imgCaptions[i];
      img.onclick = createOverlay;
      images.appendChild(img);
   }

   title.textContent = lightboxTitle;

   let currentImg = 1;
   counter.textContent = `${currentImg} / ${imgCount}`;

   prev.innerHTML = "&#9664;"
   prev.onclick = showPrev;

   next.innerHTML = "&#9654;"
   next.onclick = showNext;

   play.innerHTML = "&#9199"
   let intervalId;
   play.onclick = function(){
      if(intervalId){
         window.clearInterval(intervalId);
         intervalId = undefined;
      } else{
         showNext()
         intervalId = setInterval(showNext, 1500);
      }
      
   }

   function showNext(){
      images.appendChild(images.firstElementChild);
      (currentImg < imgCount) ? currentImg++ : currentImg = 1;
      counter.textContent = `${currentImg} / ${imgCount}`;
   }

   function showPrev(){
      images.insertBefore(images.lastElementChild, images.firstElementChild);
      (currentImg > 0) ? currentImg-- : currentImg = imageCount;
      counter.textContent = `${currentImg} / ${imgCount}`;
   }

   function createOverlay(){
      let overlay = document.createElement("div");
      overlay.id = "lbOverlay";

      let figure = document.createElement("figure")
      overlay.appendChild(figure);

      let overlayImg = this.cloneNode("true");
      figure.appendChild(overlayImg);

      let figCaption = document.createElement("figcaption");
      figCaption.textContent = overlayImg.alt;
      figure.appendChild(figCaption);

      let closeButton = document.createElement("div");
      closeButton.id = "lbOverlayClose";
      closeButton.innerHTML = "&times";
      closeButton.onclick = function(){
         document.body.removeChild(overlay);
      }
      overlay.appendChild(closeButton);

      // Add a favourites button to the overlay
      let heart = document.createElement("div");
      heart.id = "heart";
      heart.innerHTML = "&hearts;";
      overlay.appendChild(heart);
       
      var imageClone = this.cloneNode(true);
      imageClone.style.width = "80px"; 
      imageClone.style.margin = "15px";
      imageClone.style.cursor = "pointer";

   
      heart.onclick = function addFav () {
      if (favourites.length<=4){
         favourites.push(imageClone);
         document.getElementById("fav").appendChild(imageClone);
         alert("Added to favourites!")
      }
      else {
         alert("Cannot add more than 5 images - please delete one or more favourite images before proceeding.")
      }

      }
      // Remove button
      imageClone.onclick = function removeFav () {
         let delButton = document.createElement("div")
         delButton.id = "delButton";
         delButton.innerHTML = "Delete from favourites"; 
         document.getElementById("fav").appendChild(delButton);
            delButton.onclick = function confirmDel () {
            document.getElementById("fav").removeChild(imageClone); 
            
            }
            favourites.pop();
            // document.body.removeChild(imageClone);    
         } 
      
      document.body.appendChild(overlay);
   }
}

function setupGallery() {
   let imageCount = imgFiles.length;
   let galleryBox = document.getElementById("gallery");
   let currentSlide = 1;
   let runShow = true;
   let showRunning;
   
   let galleryTitle = document.createElement("h1");
   galleryTitle.id = "galleryTitle";
   galleryTitle.textContent = slidesTitle;
   galleryBox.appendChild(galleryTitle);
   
   let slideCounter = document.createElement("div");
   slideCounter.id = "slideCounter";
   slideCounter.textContent = currentSlide + "/" + imageCount;
   galleryBox.appendChild(slideCounter);
   
   let leftBox = document.createElement("div");
   leftBox.id = "leftBox";
   leftBox.innerHTML = "&#9664;";
   leftBox.onclick = moveToLeft;   
   galleryBox.appendChild(leftBox);
   
   let rightBox = document.createElement("div");
   rightBox.id = "rightBox";
   rightBox.innerHTML = "&#9654;";  
   rightBox.onclick = moveToRight;   
   galleryBox.appendChild(rightBox);
   
   let playPause = document.createElement("div");
   playPause.id = "playPause";
   playPause.innerHTML = "&#9199;";
   playPause.onclick = startStopShow;
   galleryBox.appendChild(playPause);
   
   let slideBox = document.createElement("div");
   slideBox.id = "slideBox";
   galleryBox.appendChild(slideBox);
   
   
   for (let i = 0; i < imageCount; i++) {
      let image = document.createElement("img");
      image.src = imgFiles[i];
      image.alt = imgCaptions[i];
      image.onclick = createModal;
      slideBox.appendChild(image);
   }
   

   
   
   function moveToRight() {
      let firstImage = slideBox.firstElementChild.cloneNode("true");
      firstImage.onclick = createModal;
      slideBox.appendChild(firstImage);
      slideBox.removeChild(slideBox.firstElementChild);
      currentSlide++;
      if (currentSlide > imageCount) {
         currentSlide = 1;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;
   }
   
   function moveToLeft() {
      let lastImage = slideBox.lastElementChild.cloneNode("true");
      lastImage.onclick = createModal;
      slideBox.removeChild(slideBox.lastElementChild);
      slideBox.insertBefore(lastImage, slideBox.firstElementChild);
      currentSlide--;
      if (currentSlide === 0) {
         currentSlide = imageCount;
      }
      slideCounter.textContent = currentSlide + " / " + imageCount;      
   }  
   
   function startStopShow() {
      if (runShow) {
         showRunning = window.setInterval(moveToRight, 2000);
         runShow = false;
      } else {
         window.clearInterval(showRunning);
         runShow = true;
      }
   }
   
   function createModal() {
      let modalWindow = document.createElement("div");
      modalWindow.id = "activeModal";
      let figureBox = document.createElement("figure");
      modalWindow.appendChild(figureBox);
      
      let modalImage = this.cloneNode("true");
      figureBox.appendChild(modalImage);
      
      let figureCaption = document.createElement("figcaption");
      figureCaption.textContent = modalImage.alt;
      figureBox.appendChild(figureCaption);
      
      let closeBox = document.createElement("div");
      closeBox.id = "modalClose";
      closeBox.innerHTML = "&times;";
      closeBox.onclick = function() {
         document.body.removeChild(modalWindow);
      }
      
      modalWindow.appendChild(closeBox);
      
      document.body.appendChild(modalWindow);
   }
   
}