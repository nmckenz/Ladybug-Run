// NAMESPACE==============================================
const caterpillar = {}
// =======================================================

let runTracker = 0;
let gameTracker = 0;
let winTracker = 0;
let finalPositionTracker = 0;
let $leafPosition;
let $caterpillarPosition;
// -------------------------------------------------------
// toggle class for drawing caterpillar and leaf

let caterpillarTrackingArray = [91];
const caterpillarDrawing = `<div class="body">
<div class="eyes left"></div>
<div class="eyes right"></div>

<div class="spot spot1"></div>
<div class="spot spot2"></div>
<div class="spot spot3"></div>
<div class="spot spot4"></div>
<div class="spot spot5"></div>
<div class="spot spot6"></div>
</div>`;

// const leafTrackingArray = [(Math.floor(Math.random() * 100) + 1).toString()];
let leafTrackingArray = [];
// console.log("leaf tracking", leafTrackingArray);


caterpillar.leafRandomize = () => {
    let leafPos = (Math.floor(Math.random() * 100) + 1);
    if (leafPos === 91) {
        caterpillar.leafRandomize()
    } else {
        // return leafPos.toString();
        // leafTrackingArray[0] = leafPos.toString();
        leafTrackingArray[0] = leafPos;
        $leafPosition = leafTrackingArray[0];


    }
};

// let x = caterpillar.leafRandomize();
// console.log("x", x)
// leafTrackingArray[0] = x;

caterpillar.leafRandomize();
// console.log("leaf tracking after func", leafTrackingArray);


const leafDrawing = `<img src="./assets/leaf.png" alt="shady spot for our scorched ladybug to rest" class="leafImage">`;

caterpillar.drawFunction = (imgPosition, imgType) => {
    // $(".item").removeClass("draw");
    
    // $(`.item${caterpillarTrackingArray[0]}`).toggleClass("draw");
    
    // $(`.item${caterpillarTrackingArray[0]}`).append(caterpillarDrawing);
    
    // imgPosition.append(imgType);
    // console.log("img pos", imgPosition);
    // console.log("img type", imgType);
    // $(`.item${imgPosition}`).append(imgType);

    if ($caterpillarPosition !== $leafPosition) {
        $(`.item${imgPosition}`).append(imgType);
    } else {
        $(`.item${imgPosition}`).html("");
        $(`.item${imgPosition}`).append(leafDrawing);
    };
    
};

$caterpillarPosition = caterpillarTrackingArray[0];
$leafPosition = leafTrackingArray[0];

// console.log($caterpillarPosition, $leafPosition)

caterpillar.drawFunction($caterpillarPosition, caterpillarDrawing);
caterpillar.drawFunction($leafPosition, leafDrawing);





// caterpillar.drawBug
// -------------------------------------------------------

caterpillar.gameReset = () => {
    // console.log("game reset func call");
    // $(`.item${caterpillarTrackingArray[0]}`).html("");
    // $(".movementQueue").empty();
    // movementQueueArray.length = 0;
    // // caterpillarTrackingArray.length = 0;
    // // caterpillarTrackingArray.push(91);
    // caterpillarTrackingArray[0] = 91;
    // $caterpillarPosition = caterpillarTrackingArray[0];
    // caterpillar.drawFunction($caterpillarPosition, caterpillarDrawing);
    // caterpillar.drawFunction($leafPosition, leafDrawing);
    runTracker = 0;
    gameTracker = 0;
    winTracker = 0;

    caterpillar.bugReset();
    caterpillar.leafReset();
};

caterpillar.bugReset = () => {
    // console.log("bug reset func call");
    $(`.item${caterpillarTrackingArray[0]}`).html("");
    $(".movementQueue").empty();
    movementQueueArray.length = 0;
    caterpillarTrackingArray[0] = 91;
    $caterpillarPosition = caterpillarTrackingArray[0];
    caterpillar.drawFunction($caterpillarPosition, caterpillarDrawing);
}

caterpillar.leafReset = () => {
    // console.log("leaf reset func call");
    caterpillar.leafRandomize();
    caterpillar.drawFunction($leafPosition, leafDrawing);
}

caterpillar.gameWinCheck = () => {
    if (finalPositionTracker === $leafPosition) {
        winTracker = 1;
        if (confirm("The ladybug has it made in the shade! Do you wish to play again?")) {
            // console.log("user plays again")
            // caterpillar.leafRandomize();
            // console.log("leaf pos after win", $leafPosition);
            caterpillar.gameReset();
        } else {
            // console.log("user done");
            alert("Thanks for playing!");
        }
    };
}


caterpillar.finalPositionCalc = () => {
    let finalPosition = 91;
    movementQueueArray.forEach(function (movement) {
        if (movement === "upButton" && finalPosition > 10) {
            finalPosition -= 10;
        } else if (movement === "downButton" && finalPosition <= 90) {
            finalPosition += 10;
        } else if (movement === "leftButton" && finalPosition % 10 != 1) {
            finalPosition -= 1;
        } else if (finalPosition % 10 != 0) {
            finalPosition += 1;
        };
    });
    return finalPosition;
};


// -----------------------------------------------------
// creating button functionality

$(".button").mousedown(function () {
    const buttonType = $(this).attr("id");
    // caterpillar.buttonAction(buttonType);
    if (buttonType === "runButton") {
        if (runTracker === 0) {
            alert("The poor ladybug is confused, she needs to know where to go first! Please give her some directions.");
        } else if (gameTracker === 1 && winTracker === 0) {
            alert("Ladybug is all out of moves. Please hit reset button to play again.");
        } else {
            gameTracker = 1;
            // console.log("game tracker", runTracker);
            finalPositionTracker = caterpillar.finalPositionCalc();
            console.log("final position track", finalPositionTracker);

            movementQueueArray.forEach(function(movement, index) {
                setTimeout(function() {
                    // console.log(movement);
                    caterpillar.buttonAction(movement);
                }, index * 1500);
            });
            movementQueueArray.length = 0;
            // console.log("queue array after run", movementQueueArray);

            // console.log("caterpillar pos after run", $caterpillarPosition);
        }

        // $(".gridButtons").toggleClass("hidden");

        // movementQueueArray.forEach(function (movement, index) {
        //     setTimeout(function () {
        //         console.log(movement);
        //         caterpillar.buttonAction(movement);
        //     }, index * 1500);
        // });
        // movementQueueArray.length = 0;
        // console.log("queue array after run", movementQueueArray);
        // console.log("caterpillar pos after run", $caterpillarPosition);
        // $(".gridButtons").toggleClass("inlineBlock");


    } else if (buttonType === "resetButton") {
        if (movementQueueArray[0] === undefined && runTracker === 0) {
            alert("The poor ladybug is confused, she needs to know where to go first! Please give her some directions.")
        } else if (movementQueueArray.length != 0) {
            alert("I know she is ponderous and slow, but let her get where's going first or she'll get lost and confused!")
        } else {
            // $(`.item${caterpillarTrackingArray[0]}`).html("");
            // $(".movementQueue").empty();
            // movementQueueArray.length = 0;
            // // caterpillarTrackingArray.length = 0;
            // // caterpillarTrackingArray.push(91);
            // caterpillarTrackingArray[0] = 91;
            // $caterpillarPosition = caterpillarTrackingArray[0];
            // caterpillar.drawFunction($caterpillarPosition, caterpillarDrawing);
            // runTracker = 0;

            // caterpillar.gameReset();

            if (winTracker === 0) {
                caterpillar.bugReset();
                runTracker = 0;
                gameTracker = 0;
            } else {
                caterpillar.gameReset();
            }

        }
    } else if (buttonType === "closeInstructions") {
        $(".gameInstructions").toggleClass("hidden");
    } else if (buttonType === "openInstructions") {
        $(".gameInstructions").toggleClass("hidden");
    } else {
        if (gameTracker === 1 && winTracker === 0) {
            alert("Ladybug is all out of moves. Please hit reset button to play again.");
        } else {
            // console.log(movementQueueArray);
            movementQueueArray.push(buttonType);
            // console.log(movementQueueArray);
            $(".movementQueue").append(`<p>${$(this).attr("id").replace("Button", "")}`);
            runTracker = 1;
            // console.log("run tracker", runTracker);
        }
    }
});


caterpillar.buttonAction = (buttonType) => {
    if (buttonType === "upButton") {
        if ((caterpillarTrackingArray[0] - 10) > 0) {
            // const newPosition = caterpillarTrackingArray[0] - 10;
            const newPosition = $caterpillarPosition - 10;
            // console.log("new position", newPosition);

            $(`.item${caterpillarTrackingArray[0]}`).html("");
            // $(`.item${$caterpillarPosition}`).html("");
            // console.log("up button calc", $caterpillarPosition);
            

            caterpillarTrackingArray.splice(0, 1, newPosition);
            // console.log("bug track after splice", caterpillarTrackingArray);

            $caterpillarPosition = caterpillarTrackingArray[0];

            // $caterpillarPosition = caterpillarTrackingArray.splice(0, 1, newPosition);
            // console.log("bug track after splice and redeclare", $caterpillarPosition);

            // runTracker = 1;
            // console.log("run tracker", runTracker);

            // if ($caterpillarPosition === $leafPosition) {
            //     // alert("The ladybug has it made in the shade!");
            //     if (confirm("The ladybug has it made in the shade!" Do you wish to play again?)) {
            //         caterpillar.gameReset();
            //     } else {
            //         alert("Thanks for playing!");
            //     }


            // }
            console.log("final position track before wincheck", finalPositionTracker);

            caterpillar.gameWinCheck();
        };
    } else if (buttonType === "downButton") {
        if ((caterpillarTrackingArray[0] + 10) <= 100) {
            // const newPosition = caterpillarTrackingArray[0] + 10;
            const newPosition = $caterpillarPosition + 10;

            $(`.item${caterpillarTrackingArray[0]}`).html("");

            caterpillarTrackingArray.splice(0, 1, newPosition);
            // $caterpillarPosition = caterpillarTrackingArray.splice(0, 1, newPosition);
            $caterpillarPosition = caterpillarTrackingArray[0];

            // runTracker = 1;
            // console.log("run tracker", runTracker);

            caterpillar.gameWinCheck();
        };
    } else if (buttonType === "leftButton") {
        if ((caterpillarTrackingArray[0] - 1) % 10 != 0) {
            // const newPosition = caterpillarTrackingArray[0] - 1;
            const newPosition = $caterpillarPosition - 1;

            $(`.item${caterpillarTrackingArray[0]}`).html("");

            caterpillarTrackingArray.splice(0, 1, newPosition);
            // $caterpillarPosition = caterpillarTrackingArray.splice(0, 1, newPosition);
            $caterpillarPosition = caterpillarTrackingArray[0];

            // runTracker = 1;
            // console.log("run tracker", runTracker);

            caterpillar.gameWinCheck();
        };
    } else if (buttonType === "rightButton") {
        if ((caterpillarTrackingArray[0] + 1) % 10 != 1) {
            // const newPosition = caterpillarTrackingArray[0] + 1;
            const newPosition = $caterpillarPosition + 1;


            $(`.item${caterpillarTrackingArray[0]}`).html("");

            caterpillarTrackingArray.splice(0, 1, newPosition);
            // $caterpillarPosition = caterpillarTrackingArray.splice(0, 1, newPosition);
            $caterpillarPosition = caterpillarTrackingArray[0];

            // runTracker = 1;
            // console.log("run tracker", runTracker);

            caterpillar.gameWinCheck();
        };
    }
    // console.log("bug track before new call", $caterpillarPosition)
    caterpillar.drawFunction($caterpillarPosition, caterpillarDrawing);
};
// ------------------------------------------------------



// --------------------------------------------------------
// array for tracking movement selections
let movementQueueArray = [];
// console.log("queue array init", movementQueueArray);
// -------------------------------------------------------



// INIT===================================================
caterpillar.init = () => {
    // console.log("hello world");
};
// =======================================================



// DOCUMENT READY=========================================
$(function () {
    caterpillar.init();
})
// =======================================================