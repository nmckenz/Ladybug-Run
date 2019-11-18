// NAMESPACE==============================================
const caterpillar = {};
// =======================================================



// GLOBAL VARIABLES--------------------------------------------
let runTracker = 0;
let gameTracker = 0;
let winTracker = 0;
let queueTracker = 0;
let finalPositionTracker = 0;
let $leafPosition;
let $caterpillarPosition;
let movementQueueArray = [];
const icons = {
    upButton: `<i class="fas fa-arrow-up"></i>`,
    downButton: `<i class="fas fa-arrow-down"></i>`,
    leftButton: `<i class="fas fa-arrow-left"></i>`,
    rightButton: `<i class="fas fa-arrow-right"></i>`
};
// ---------------------------------------------------------



// BUG AND LEAF --------------------------------------------
let caterpillarTrackingArray = [91];
const caterpillarDrawing = `<div class="bugBody">
<div class="eyes left"></div>
<div class="eyes right"></div>
<div class="spot spot1"></div>
<div class="spot spot2"></div>
<div class="spot spot3"></div>
<div class="spot spot4"></div>
<div class="spot spot5"></div>
<div class="spot spot6"></div>
</div>`;

let leafTrackingArray = [];
const leafDrawing = `<img src="./assets/leaf.png" alt="shady spot for our scorched ladybug to rest" class="leafImage">`;

caterpillar.leafRandomize = () => {
    let leafPos = (Math.floor(Math.random() * 100) + 1);
    if (leafPos === 91) {
        caterpillar.leafRandomize()
    } else {
        leafTrackingArray[0] = leafPos;
        $leafPosition = leafTrackingArray[0];
    };
};

caterpillar.leafRandomize();

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
// ---------------------------------------------------------



// DRAWING----------------------------------------------------
caterpillar.drawFunction = (imgPosition, imgType) => {
    $(`.item${imgPosition}`).append(imgType);
};

$caterpillarPosition = caterpillarTrackingArray[0];
$leafPosition = leafTrackingArray[0];

caterpillar.drawFunction($caterpillarPosition, caterpillarDrawing);
caterpillar.drawFunction($leafPosition, leafDrawing);
// ------------------------------------------------------



// GAME WIN AND RESET-----------------------------------------
caterpillar.gameWinCheck = () => {
    if ($caterpillarPosition === $leafPosition && finalPositionTracker === $leafPosition) {
        winTracker = 1;
        if (confirm("The ladybug has it made in the shade! \n\nDo you wish to play again?")) {
            caterpillar.gameReset();
        } else {
            alert("Thanks for playing!");
        }
    };
};

caterpillar.gameReset = () => {
    runTracker = 0;
    gameTracker = 0;
    winTracker = 0;
    caterpillar.bugReset();
    caterpillar.leafReset();
};

caterpillar.bugReset = () => {
    $(`.item${caterpillarTrackingArray[0]}`).html("");
    $(".movementQueue").empty();
    $(".movementQueue").append("<h4>queue:</h4>");
    movementQueueArray.length = 0;
    caterpillarTrackingArray[0] = 91;
    $caterpillarPosition = caterpillarTrackingArray[0];
    caterpillar.drawFunction($caterpillarPosition, caterpillarDrawing);
};

caterpillar.leafReset = () => {
    caterpillar.leafRandomize();
    caterpillar.drawFunction($leafPosition, leafDrawing);
};
// ---------------------------------------------------------




// BUTTON FUNCTIONALITY-----------------------------------------
$(".button").mousedown(function () {
    const buttonType = $(this).attr("id");
    if (buttonType === "runButton") {
        if (runTracker === 0) {
            alert("The poor ladybug is confused, she needs to know where to go first! \n\nPlease give her some directions.");
        } else if (gameTracker === 1 && winTracker === 0) {
            alert("Ladybug is all out of moves. \n\nPlease hit reset button to play again.");
        } else {
            gameTracker = 1;
            finalPositionTracker = caterpillar.finalPositionCalc();
            movementQueueArray.forEach(function(movement, index) {
                setTimeout(function() {
                    caterpillar.buttonAction(movement);
                }, index * 1000);
            });
            movementQueueArray.length = 0;
            queueTracker = 1;
        };
    } else if (buttonType === "resetButton") {
        if (movementQueueArray[0] === undefined && runTracker === 0) {
            alert("The poor ladybug is confused, she needs to know where to go first! \n\nPlease give her some directions.")
        } else if (movementQueueArray.length !== 0 && runTracker === 1 && gameTracker === 1) {
            alert("I know she is ponderous and slow, but let her get where's going first or she'll get lost and confused!")
        } else if (movementQueueArray.length !== 0 && runTracker === 0) {
            caterpillar.bugReset();
        } else {
            if (winTracker === 0) {
                caterpillar.bugReset();
                runTracker = 0;
                gameTracker = 0;
                queueTracker = 0;
            } else {
                caterpillar.gameReset();
            }
        };
    } else if (buttonType === "closeInstructions") {
        $(".instructionsWrapper").toggleClass("hidden");
    } else if (buttonType === "openInstructions") {
        $(".instructionsWrapper").toggleClass("hidden");
    } else {
        if (gameTracker === 1 && winTracker === 0) {
            alert("Ladybug is all out of moves. \n\nPlease hit reset button to play again.");
        } else {
            movementQueueArray.push(buttonType);
            $(".movementQueue").append(`<p>${icons[buttonType]}</p>`)
            runTracker = 1;
            };
        };
    });

caterpillar.buttonAction = (buttonType) => {
    if (buttonType === "upButton") {
        if ((caterpillarTrackingArray[0] - 10) > 0) {
            const newPosition = $caterpillarPosition - 10;
            $(".bugBody").remove();
            caterpillarTrackingArray.splice(0, 1, newPosition);
            $caterpillarPosition = caterpillarTrackingArray[0];
            caterpillar.gameWinCheck();
        };
    } else if (buttonType === "downButton") {
        if ((caterpillarTrackingArray[0] + 10) <= 100) {
            const newPosition = $caterpillarPosition + 10;
            $(".bugBody").remove();
            caterpillarTrackingArray.splice(0, 1, newPosition);
            $caterpillarPosition = caterpillarTrackingArray[0];
            caterpillar.gameWinCheck();
        };
    } else if (buttonType === "leftButton") {
        if ((caterpillarTrackingArray[0] - 1) % 10 != 0) {
            const newPosition = $caterpillarPosition - 1;
            $(".bugBody").remove();
            caterpillarTrackingArray.splice(0, 1, newPosition);
            $caterpillarPosition = caterpillarTrackingArray[0];
            caterpillar.gameWinCheck();
        };
    } else if (buttonType === "rightButton") {
        if ((caterpillarTrackingArray[0] + 1) % 10 != 1) {
            const newPosition = $caterpillarPosition + 1;
            $(".bugBody").remove();
            caterpillarTrackingArray.splice(0, 1, newPosition);
            $caterpillarPosition = caterpillarTrackingArray[0];
            caterpillar.gameWinCheck();
        };
    };
    if ($caterpillarPosition !== $leafPosition) {
        caterpillar.drawFunction($caterpillarPosition, caterpillarDrawing);
    };
};
// ------------------------------------------------------



// INIT===================================================
caterpillar.init = () => {
};
// =======================================================



// DOCUMENT READY=========================================
$(function () {
    caterpillar.init();
})
// =======================================================