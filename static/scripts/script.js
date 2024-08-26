 // Constant Variables
 blockElements = document.querySelectorAll(".block");
 const scoreDisplay = document.querySelector("#scoreDisplay");
 const wrongDisplay = document.querySelector("#wrongDisplay");
 const timerDisplay = document.querySelector("#timerDisplay");
 const accuracyDisplay = document.getElementById("accuracy");
 const timeBar = document.querySelector(".time-bar");
 let score = 0;
 let time = 15;
 let round = 1;
 let totalHits = 0;
 let correctClicks = 0;
 let missingClicks = 0;
 let result;
 let result_1;
 let delaySeconds = 2;


 // Object to store round-wise data
 const roundData = {
   1: { totalClicks: 0, correctClicks: 0, missingClicks: 0, accuracy: 0 },
   2: { totalClicks: 0, correctClicks: 0, missingClicks: 0, accuracy: 0 },
   3: { totalClicks: 0, correctClicks: 0, missingClicks: 0, accuracy: 0 },
   4: { totalClicks: 0, correctClicks: 0, missingClicks: 0, accuracy: 0 },
   5: { totalClicks: 0, correctClicks: 0, missingClicks: 0, accuracy: 0 },
   6: { totalClicks: 0, correctClicks: 0, missingClicks: 0, accuracy: 0 },
   7: { totalClicks: 0, correctClicks: 0, missingClicks: 0, accuracy: 0 },
   8: { totalClicks: 0, correctClicks: 0, missingClicks: 0, accuracy: 0 },
 };

 

 // Add event listener for mouse movement

 function showTargetCueImage() {
   // Display the target cue image
   const timeBar = document.querySelector(".time-bar");
   const timeBarContainer= document.querySelector(".time-bar-container");
   timeBar.style.display = "none";
   timerDisplay.style.display = "none";
   timeBarContainer.style.display = "none";
   

   if (round === 1) {
     for (let i = 0; i < 4; i++) {
       const blockID = `block-${i + 1}`;
       const blockToRemove = document.getElementById(blockID);
       if (blockToRemove) {
         blockToRemove.parentNode.removeChild(blockToRemove);
       }
     }
   }

   const targetCueImage = document.createElement("img");
   if (round == 1) {
     targetCueImage.src = "static/4.png"; // Replace 'target_cue_image_url.jpg' with your actual image URL
   }
   if (round == 3) {
     targetCueImage.src = "static/R3.1.png"; // Replace 'target_cue_image_url.jpg' with your actual image URL
   }
   if (round == 5) {
     targetCueImage.src = "static/R5.1.png"; // Replace 'target_cue_image_url.jpg' with your actual image URL
   }
   if (round == 7) {
     targetCueImage.src = "static/R7.1.png"; // Replace 'target_cue_image_url.jpg' with your actual image URL
   }

   targetCueImage.style.position = "fixed";
   targetCueImage.style.top = "70%";
   targetCueImage.style.left = "50%";
   targetCueImage.style.transform = "translate(-50%, -50%)";
   document.body.appendChild(targetCueImage);

   // Hide the target cue image after 10 seconds
   setTimeout(() => {
     document.body.removeChild(targetCueImage);
   }, 3000); // 3 seconds delay

   if (round === 1) {
     setTimeout(() => {
       for (let i = 0; i < 4; i++) {
         timeBar.style.display = "";
         timerDisplay.style.display = "";
         timeBarContainer.style.display = "";
         const blockID = `block-${i + 1}`;
         const newBlock = document.createElement("div");
         newBlock.classList.add("block");
         newBlock.id = blockID;
         document.querySelector(".blocks").appendChild(newBlock);
       }
     }, 3000); // 3 seconds delay
   }

   setTimeout(() => {
     console.log("delay");
   }, 3000); // 3 seconds delay
 }

 showTargetCueImage();

 function updateTimer() {
   time--;
   timerDisplay.textContent = `Timer: ${time} sec`;
   const timeBar = document.querySelector(".time-bar");
   const totalTime = 15; // Total time for each round
   const remainingTimePercentage = (time / totalTime) * 100;
   timeBar.style.width = `${remainingTimePercentage}%`;
   timerDisplay.style.display = "none";

   if (round === 2) {
     const bars = document.querySelectorAll(".round-time-bar");
     bars.forEach((bar) => {
       bar.classList.remove("round-time-bar");
       bar.offsetWidth;
       bar.classList.add("round-time-bar");
     });
   }

   if (time < 0) {
     //    clearInterval(timerInterval);
     time = 0;
     // Get references to the elements
     title = document.querySelector(".title");
     blocks = document.querySelector(".blocks");

     //    // Hide the title and blocks divs
     title.style.display = "none";
     blocks.style.display = "none";
     //    document.body.innerHTML = '<h1>' + 'Move to Next Round'+ '</h1>';
     nextRound();

     if (round === 9) {
       sendrounddata(roundData);
       setTimeout(() => {
   
       document.querySelector(".main").style.display = "none";


       // var myElement = document.getElementById("s1");

       // // Create a new `<br>` element
       // var lineBreak = document.createElement("br");
       // // Append the line break element to the target element
       // myElement.appendChild(lineBreak);
       // document.body.innerHTML = "<h1 id='s1' style='font-family: Arial, sans-serif; color: #4CAF50;'>"+result_1+"</h1>";
      //  document.body.innerHTML = "<h1 id='s2' style='font-family: Arial, sans-serif; color: #cc0000;'>" + 'Prediction Details :'+ ' <br> '+ ' <br> '+ "</h1>";
      var predictionDetails = "<h2 id='s2' style='font-family: Arial, sans-serif; color: #000; border: 2px solid black; padding: 50px;'>" +
      'Prediction Details' + '<br>' + '<br>' + 'Status: ' + result_1 + '<br>' + 'Probability: ' + result + "</h2>";
  
      document.body.innerHTML = predictionDetails;

   },1000)

       
     }
   }
 }

 // Hide the target cue image after 10 seconds
 setTimeout(() => {
   updateTimer();

   if (round === 1) {
     time = 15 + delaySeconds;
     const timerInterval = setInterval(updateTimer, 1000);
     updateTimer();
   }
 }, 3000); // 3 seconds delay

 function showTargetCue() {
   if (round === 1 || round === 3 || round === 5 || round === 7) {
     blockElements = document.querySelectorAll(".block");
     // Create a copy of the original blockElements array to avoid modification
     let availableBlocks = [...blockElements];

     // Function to get a random block (with reset logic) and its index
     function getRandomBlock() {
       if (availableBlocks.length === 0) {
         // Reset availableBlocks if all blocks have been targeted
         availableBlocks = [...blockElements];
       }

       const randomIndex = Math.floor(
         Math.random() * availableBlocks.length
       );
       const randomBlock = availableBlocks[randomIndex];
       availableBlocks.splice(randomIndex, 1); // Remove the selected block from availableBlocks
       return { index: randomIndex, block: randomBlock };
     }

     // Remove target and distractor classes from all blocks
     blockElements.forEach((block) => {
       block.classList.remove("target");
       for (let i = 1; i <= 3; i++) {
         block.classList.remove(`distractor${i}`);
       }
     });

     // Get a random block for the target
     const { index: targetIndex, block: targetBlock } = getRandomBlock();
     targetBlock.classList.add("target");

     if (round === 3) {
       targetBlock.style.backgroundImage = "url('static/R3.1.png')";
     }
     if (round === 5) {
       targetBlock.style.backgroundImage = "url('static/R5.1.png')";
     }
     if (round === 7) {
       targetBlock.style.backgroundImage = "url('static/R7.1.png')";
     }

     // Get random blocks for distractors
     const distractorBlocks = [];
     for (let i = 1; i <= 3; i++) {
       const { block: distractorBlock } = getRandomBlock();
       distractorBlock.classList.add(`distractor${i}`);
       distractorBlocks.push(distractorBlock);
     }

     if (round === 3) {
       distractorBlocks[0].style.backgroundImage =
         "url('static/R3.2.png')";
       distractorBlocks[1].style.backgroundImage =
         "url('static/R3.3.png')";
       distractorBlocks[2].style.backgroundImage =
         "url('static/R3.4.png')";
     }
     if (round === 5) {
       distractorBlocks[0].style.backgroundImage =
         "url('static/R5.2.png')";
       distractorBlocks[1].style.backgroundImage =
         "url('static/R5.3.png')";
       distractorBlocks[2].style.backgroundImage =
         "url('static/R5.4.png')";
     }
     if (round === 7) {
       distractorBlocks[0].style.backgroundImage =
         "url('static/R7.2.png')";
       distractorBlocks[1].style.backgroundImage =
         "url('static/R7.3.png')";
       distractorBlocks[2].style.backgroundImage =
         "url('static/R7.4.png')";
     }
   }

   if (round === 2 || round === 4 || round === 6 || round === 8) {
     blockElements = document.querySelectorAll(".block");
     let availableBlocks = [...blockElements];
     console.log(availableBlocks.classList);

     // Function to get a random block (with reset logic) and its index
     function getRandomBlock() {
       if (availableBlocks.length === 0) {
         // Reset availableBlocks if all blocks have been targeted
         availableBlocks = [...blockElements];
       }

       const randomIndex = Math.floor(
         Math.random() * availableBlocks.length
       );
       const randomBlock = availableBlocks[randomIndex];
       availableBlocks.splice(randomIndex, 1); // Remove the selected block from availableBlocks
       return { index: randomIndex, block: randomBlock };
     }

     // Remove target and distractor classes from all blocks
     blockElements.forEach((block) => {
       block.classList.remove("target");
       for (let i = 1; i <= 3; i++) {
         block.classList.remove(`distractor${i}`);
       }
     });

     // Get a random block for the target
  const targetBlocks = [];
  for (let i = 0; i < 2; i++) {
    const { index: targetIndex, block: targetBlock } = getRandomBlock();
    targetBlock.classList.add("target");
    targetBlocks.push(targetBlock);
  
     if (round === 4) {
       targetBlock.style.backgroundImage = "url('static/R3.1.png')";
     }
     if (round === 6) {
       targetBlock.style.backgroundImage = "url('static/R5.1.png')";
     }
     if (round === 8) {
       targetBlock.style.backgroundImage = "url('static/R7.1.png')";
     }
    }

     // Get random blocks for distractors
     const distractorBlocks = [];
       for (let i = 1; i <= 3; i++) {
         const { block: distractorBlock } = getRandomBlock();
         distractorBlock.classList.add(`distractor1`);  // 3 times disractor1
         distractorBlocks.push(distractorBlock);
       }
       for (let i = 1; i <= 2; i++) {
        const { block: distractorBlock } = getRandomBlock();
        distractorBlock.classList.add(`distractor2`);  // 2 times disractor2
        distractorBlocks.push(distractorBlock);
      }
      for (let i = 1; i <= 2; i++) {
        const { block: distractorBlock } = getRandomBlock();
        distractorBlock.classList.add(`distractor3`); // 2 times disractor3
        distractorBlocks.push(distractorBlock);
      }
     
     if (round === 4) {
       distractorBlocks[0].style.backgroundImage =
         "url('static/R3.2.png')";
       distractorBlocks[1].style.backgroundImage =
         "url('static/R3.3.png')";
       distractorBlocks[2].style.backgroundImage =
         "url('static/R3.4.png')";
       distractorBlocks[3].style.backgroundImage =
         "url('static/R3.2.png')";
       distractorBlocks[4].style.backgroundImage =
         "url('static/R3.3.png')";
       distractorBlocks[5].style.backgroundImage =
         "url('static/R3.4.png')";
       distractorBlocks[6].style.backgroundImage =
         "url('static/R3.2.png')";
     }
     if (round === 6) {
       distractorBlocks[0].style.backgroundImage =
         "url('static/R5.2.png')";
       distractorBlocks[1].style.backgroundImage =
         "url('static//R5.3.png')";
       distractorBlocks[2].style.backgroundImage =
         "url('static//R5.4.png')";
       distractorBlocks[3].style.backgroundImage =
         "url('static/R5.2.png')";
       distractorBlocks[4].style.backgroundImage =
         "url('static/R5.3.png')";
       distractorBlocks[5].style.backgroundImage =
         "url('static/R5.4.png')";
       distractorBlocks[6].style.backgroundImage =
         "url('static/R5.2.png')";

     }
     if (round === 8) {
       distractorBlocks[0].style.backgroundImage =
         "url('static/R7.2.png')";
       distractorBlocks[1].style.backgroundImage =
         "url('static/R7.3.png')";
       distractorBlocks[2].style.backgroundImage =
         "url('static/R7.4.png')";
       distractorBlocks[3].style.backgroundImage =
         "url('static/R7.2.png')";
       distractorBlocks[4].style.backgroundImage =
         "url('static/R7.3.png')";
       distractorBlocks[5].style.backgroundImage =
         "url('static/R7.4.png')";
       distractorBlocks[6].style.backgroundImage =
         "url('static/R7.2.png')";

     }
   }
 }

 function showAdditionalBlocks() {
   // Add 5 more blocks for the second round
   for (let i = 5; i < 10; i++) {
     const blockID = `block-${i + 1}`;
     const newBlock = document.createElement("div");
     newBlock.classList.add("block");
     newBlock.id = blockID;
     document.querySelector(".blocks").appendChild(newBlock);
   }
 }
 function removeAdditionalBlocks() {
   // Remove blocks with IDs from "block-6" to "block-10"
   for (let i = 5; i < 10; i++) {
     const blockID = `block-${i + 1}`;
     const blockToRemove = document.getElementById(blockID);
     if (blockToRemove) {
       blockToRemove.parentNode.removeChild(blockToRemove);
     }
   }
 }

 // // Adjusting conditions for the second round
 // if (this.round == 2) {
 //   showAdditionalBlocks();
 // }

 setTimeout(() => {
   updateTimer();
   setTimeout(showTargetCue);
 }, 3000); // 3 seconds delay

 document.querySelector(".blocks").addEventListener("click", (event) => {
   const clickedBlock = event.target;
   console.log(clickedBlock.classList);
   if (
     clickedBlock.classList.contains("block") &&
     clickedBlock.classList.contains("target")
   ) {
     score++;
     correctClicks++;
     scoreDisplay.textContent = `${score}`;
     clickedBlock.classList.remove("target");
     showTargetCue();
     document.getElementById("correctSound").play();
   } else if (
     clickedBlock.classList.contains("block") &&
     (clickedBlock.classList.contains("distractor3") ||
       clickedBlock.classList.contains("distractor2") ||
       clickedBlock.classList.contains("distractor1"))
   ) {
     // User clicked a non-target block, count as missing click
     missingClicks++;
     document.getElementById("wrongSound").play();
     showTargetCue();
     // Update round data for missing click
   }
   wrongDisplay.textContent = `${missingClicks}`;

   totalHits= correctClicks+missingClicks;
   // Update round data after each click
   roundData[round].missingClicks = missingClicks;
   roundData[round].totalClicks = totalHits;
   roundData[round].correctClicks = correctClicks;
   roundData[round].accuracy = parseFloat(
     (correctClicks / totalHits).toFixed(6)
   );
 });

 //     function calculateAccuracy() {
 //     if (totalHits === 0) {
 //       accuracyDisplay.textContent = '0%'; // Avoid division by zero
 //     } else {
 //       const accuracy = Math.floor((correctClicks / totalHits)) * 10;
 //     }
 // }

 function changeGridSize(rows, columns) {
   var blocksElement = document.querySelector(".blocks");
   blocksElement.style.gridTemplateColumns = `repeat(${columns}, 150px)`;
   blocksElement.style.gridTemplateRows = `repeat(${rows}, 150px)`;
 }

 
 function nextRound(){
     time = 15;
     title.style.display = "";
     blocks.style.display = "";

     totalHits = 0;
     correctClicks = 0;
     missingClicks = 0;
     scoreDisplay.textContent = `${correctClicks}`;
     wrongDisplay.textContent = `${missingClicks}`;
     // Reset variables and start a new round
     round++;
     // Adjusting conditions for the second round

     if (round === 3 || round === 5 || round === 7) {
       score = 0; // Reset score for the next round
       time = 15;
       for (let i = 0; i < 10; i++) {
         const blockID = `block-${i + 1}`;
         const blockToRemove = document.getElementById(blockID);
         if (blockToRemove) {
           blockToRemove.parentNode.removeChild(blockToRemove);
         }
       }

       showTargetCueImage();

       setTimeout(() => {
         for (let i = 0; i < 4; i++) {
           const timeBar = document.querySelector(".time-bar");
           const timeBarContainer= document.querySelector(".time-bar-container");
           timeBar.style.display = "";
           timerDisplay.style.display = "";
           timeBarContainer.style.display = "";
           const blockID = `block-${i + 1}`;
           const newBlock = document.createElement("div");
           newBlock.classList.add("block");
           newBlock.id = blockID;
           document.querySelector(".blocks").appendChild(newBlock);
         }
       }, 3000); // 3 seconds delay
     }
     if (round === 2 || round === 4 || round === 6 || round === 8) {
       score = 0; // Reset score for the next round
       time = 15+2;
       showAdditionalBlocks();
       changeGridSize(3, 3);

       updateTimer();
       showTargetCue();
       // document.getElementById("nextRoundButton").style.display = "none";
     } else {
       setTimeout(() => {
         removeAdditionalBlocks();
         changeGridSize(2, 2);
         var blocksElement = document.querySelector(".blocks");
         console.log(blocksElement);
         score = 0; // Reset score for the next round
         time = 15+2;
         // if(round === 5){
         //   time = 15+delaySeconds;
         // }

         updateTimer();
         showTargetCue();
       }, 3000); // 3 seconds delay
     }
     console.log(roundData);
     sendrounddata(roundData);

     // document.getElementById("nextRoundButton").style.display = "none";
   }

 function sendrounddata(roundData) {
   const jsonData = JSON.stringify(roundData);
   fetch("/your-backend-endpoint", {
     method: "POST",
     headers: {
       "Content-Type": "application/json",
     },
     body: jsonData,
   })
     .then((response) => response.json())
     .then((data) => {
       console.log(data.message);
       result = data.message;
       if(result>0.5){
           console.log('dyslexia')
           result_1 = 'Dyslexia Detected'
       }
       else{
           result_1 = 'Not Dyslexia';
           console.log('Dyslexia Not Detected')
       }
     })
     .catch((error) => {
       console.error("Error sending data:", error);
     });
 }