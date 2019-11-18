// NAMESPACE==============================================
const ladybug = {};
// =======================================================



// GLOBAL VARIABLES--------------------------------------------
let runTracker = 0;
let gameTracker = 0;
let winTracker = 0;
let queueTracker = 0;
let finalPositionTracker = 0;
let $leafPosition;
let $ladybugPosition;
let movementQueueArray = [];
const icons = {
    upButton: `<i class="fas fa-arrow-up"></i>`,
    downButton: `<i class="fas fa-arrow-down"></i>`,
    leftButton: `<i class="fas fa-arrow-left"></i>`,
    rightButton: `<i class="fas fa-arrow-right"></i>`
};
// ---------------------------------------------------------



// BUG AND LEAF --------------------------------------------
let ladybugTrackingArray = [91];
const ladybugDrawing = `<div class="bugBody">
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

ladybug.leafRandomize = () => {
    let leafPos = (Math.floor(Math.random() * 100) + 1);
    if (leafPos === 91) {
        ladybug.leafRandomize()
    } else {
        leafTrackingArray[0] = leafPos;
        $leafPosition = leafTrackingArray[0];
    };
};

ladybug.finalPositionCalc = () => {
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
ladybug.drawFunction = (imgPosition, imgType) => {
    $(`.item${imgPosition}`).append(imgType);
};

$ladybugPosition = ladybugTrackingArray[0];
$leafPosition = leafTrackingArray[0];
// ------------------------------------------------------



// GAME WIN AND RESET-----------------------------------------
ladybug.gameWinCheck = () => {
    if ($ladybugPosition === $leafPosition && finalPositionTracker === $leafPosition) {
        winTracker = 1;
        if (confirm("The ladybug has it made in the shade! \n\nDo you wish to play again?")) {
            ladybug.gameReset();
        } else {
            alert("Thanks for playing!");
        }
    };
};

ladybug.gameReset = () => {
    runTracker = 0;
    gameTracker = 0;
    winTracker = 0;
    ladybug.bugReset();
    ladybug.leafReset();
};

ladybug.bugReset = () => {
    $(`.item${ladybugTrackingArray[0]}`).html("");
    $(".movementQueue").empty();
    $(".movementQueue").append("<h4>queue:</h4>");
    movementQueueArray.length = 0;
    ladybugTrackingArray[0] = 91;
    $ladybugPosition = ladybugTrackingArray[0];
    ladybug.drawFunction($ladybugPosition, ladybugDrawing);
};

ladybug.leafReset = () => {
    ladybug.leafRandomize();
    ladybug.drawFunction($leafPosition, leafDrawing);
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
            finalPositionTracker = ladybug.finalPositionCalc();
            movementQueueArray.forEach(function(movement, index) {
                setTimeout(function() {
                    ladybug.buttonAction(movement);
                }, index * 1000);
            });
            movementQueueArray.length = 0;
            queueTracker = 1;
        };
    } else if (buttonType === "resetButton") {
        if (movementQueueArray[0] === undefined && runTracker === 0) {
            alert("The poor ladybug is confused, she needs to know where to go first! \n\nPlease give her some directions.");
        } else if (movementQueueArray.length !== 0 && runTracker === 1 && gameTracker === 1) {
            alert("I know she is ponderous and slow, but let her get where's going first or she'll get lost and confused!");
        } else if (movementQueueArray.length !== 0 && runTracker === 0) {
            ladybug.bugReset();
        } else {
            if (winTracker === 0) {
                ladybug.bugReset();
                runTracker = 0;
                gameTracker = 0;
                queueTracker = 0;
            } else {
                ladybug.gameReset();
            }
        };
    } else if (buttonType === "closeInstructions") {
        $(".instructionsWrapper").toggleClass("hidden");
    } else if (buttonType === "openInstructions") {
        $(".instructionsWrapper").toggleClass("hidden");
    } else {
        if (gameTracker === 1 && winTracker === 0) {
            alert("Ladybug is all out of moves. \n\nPlease hit reset button to play again.");
        } else if (queueTracker === 1) {
            alert("I know she is ponderous and slow, but let her get where's going first or she'll get lost and confused!");
        } else {
            movementQueueArray.push(buttonType);
            $(".movementQueue").append(`<p>${icons[buttonType]}</p>`)
            runTracker = 1;
            };
        };
    });

ladybug.buttonAction = (buttonType) => {
    if (buttonType === "upButton") {
        if ((ladybugTrackingArray[0] - 10) > 0) {
            const newPosition = $ladybugPosition - 10;
            $(".bugBody").remove();
            ladybugTrackingArray.splice(0, 1, newPosition);
            $ladybugPosition = ladybugTrackingArray[0];
            ladybug.gameWinCheck();
        };
    } else if (buttonType === "downButton") {
        if ((ladybugTrackingArray[0] + 10) <= 100) {
            const newPosition = $ladybugPosition + 10;
            $(".bugBody").remove();
            ladybugTrackingArray.splice(0, 1, newPosition);
            $ladybugPosition = ladybugTrackingArray[0];
            ladybug.gameWinCheck();
        };
    } else if (buttonType === "leftButton") {
        if ((ladybugTrackingArray[0] - 1) % 10 != 0) {
            const newPosition = $ladybugPosition - 1;
            $(".bugBody").remove();
            ladybugTrackingArray.splice(0, 1, newPosition);
            $ladybugPosition = ladybugTrackingArray[0];
            ladybug.gameWinCheck();
        };
    } else if (buttonType === "rightButton") {
        if ((ladybugTrackingArray[0] + 1) % 10 != 1) {
            const newPosition = $ladybugPosition + 1;
            $(".bugBody").remove();
            ladybugTrackingArray.splice(0, 1, newPosition);
            $ladybugPosition = ladybugTrackingArray[0];
            ladybug.gameWinCheck();
        };
    };
    if ($ladybugPosition !== $leafPosition) {
        ladybug.drawFunction($ladybugPosition, ladybugDrawing);
    };
};
// ------------------------------------------------------



// INIT===================================================
ladybug.init = () => {
    ladybug.leafRandomize();
    ladybug.drawFunction($ladybugPosition, ladybugDrawing);
    ladybug.drawFunction($leafPosition, leafDrawing);
};
// =======================================================



// DOCUMENT READY=========================================
$(function () {
    ladybug.init();
})
// =======================================================