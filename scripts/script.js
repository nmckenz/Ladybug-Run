// NAMESPACE==============================================
const ladybug = {};
// =======================================================



// GLOBAL VARIABLES--------------------------------------------
let runTracker = 0;
let gameTracker = 0;
let winTracker = 0;
let queueProgressTracker = 0;
let queueIndexTracker = 0;
let finalPositionTracker = 0;
let $leafPosition;
let $ladybugPosition;
let movementQueueArray = [];
let stickDrawing;
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
const leafDrawing = `<img src="./assets/leaf.png" alt="A shady spot for our scorched ladybug to rest" class="leafImage">`;

ladybug.leafRandomize = () => {
    let leafPos = (Math.floor(Math.random() * 100) + 1);
    if (leafPos === 91) {
        ladybug.leafRandomize();
    } else {
        leafTrackingArray[0] = leafPos;
        $leafPosition = leafTrackingArray[0];
    };
};

ladybug.finalPositionCalc = () => {
    let finalPosition = 91;
    movementQueueArray.forEach(function (movement) {
        if (movement === "upButton" && finalPosition > 10 && !(stickPositionArray.includes(finalPosition - 10))) {
            finalPosition -= 10;
        } else if (movement === "downButton" && finalPosition <= 90 && !(stickPositionArray.includes(finalPosition + 10))) {
            finalPosition += 10;
        } else if (movement === "leftButton" && finalPosition % 10 != 1 && !(stickPositionArray.includes(finalPosition - 1))) {
            finalPosition -= 1;
        } else if (movement === "rightButton" && finalPosition % 10 != 0 && !(stickPositionArray.includes(finalPosition + 1))) {
            finalPosition += 1;
        };
    });
    return finalPosition;
};

let stickPositionArray = [];

ladybug.stickRandomize = () => {
    const stickOrientationRandomize = ((Math.floor(Math.random() * 2)) === 1) ? "vertical" : "horizontal";

    if (stickOrientationRandomize === "vertical") {
        ladybug.stickPositionVertical = () => {
            const stickVertical = (Math.floor(Math.random() * 60)) + 1;
            if (stickVertical === 51) {
                return ladybug.stickPositionVertical();
            } else {
                return stickVertical;
            };
        };
        const stickPosition = ladybug.stickPositionVertical();
        for (let i = 0; i < 5; i++) {
            const stickSegment = stickPosition + (i * 10);
            if ($leafPosition === stickSegment) {
                ladybug.leafReset();
            };
            stickPositionArray.push(stickSegment);
        };
        stickDrawing = `<img src="./assets/branch.png" alt="Troublesome tree branch blocking our bug" class="treeBranch">`;
    } else if (stickOrientationRandomize === "horizontal"){
        ladybug.stickPositionHorizontal = () => {
            const stickHorizontal = (Math.floor(Math.random() * 100)) + 1;
            if (stickHorizontal === 91 || stickHorizontal % 10 > 6 || stickHorizontal % 10 === 0) {
                return ladybug.stickPositionHorizontal();
            } else {
                return stickHorizontal;
            };
        };
        const stickPosition = ladybug.stickPositionHorizontal();
        for (let i = 0; i < 5; i++) {
            const stickSegment = stickPosition + i;
            if ($leafPosition === stickSegment) {
                ladybug.leafReset();
            };
            stickPositionArray.push(stickSegment);
        }
        stickDrawing = `<img src="./assets/branch.png" alt="Troublesome tree branch blocking our bug" class="treeBranch treeBranchRotate">`;
    };
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
    queueProgressTracker = 0;
    queueIndexTracker = 0;
    ladybug.bugReset();
    ladybug.leafReset();
    ladybug.stickReset();
};

ladybug.bugReset = () => {
    $(`.item${ladybugTrackingArray[0]}`).html("");
    $(".movementQueue").empty();
    $(".movementQueue").append(`<h4>queue:</h4><div class="movesQueued"></div>`);
    movementQueueArray.length = 0;
    ladybugTrackingArray[0] = 91;
    $ladybugPosition = ladybugTrackingArray[0];
    ladybug.drawFunction($ladybugPosition, ladybugDrawing);
};

ladybug.leafReset = () => {
    $(`.item${$leafPosition}`).html("")
    ladybug.leafRandomize();
    ladybug.drawFunction($leafPosition, leafDrawing);
};

ladybug.stickReset = () => {
    $(`.item${stickPositionArray[0]}`).html("")
    stickPositionArray.length = 0;
    ladybug.stickRandomize();
    ladybug.drawFunction(stickPositionArray[0], stickDrawing)
}

ladybug.newGameCheck = () => {
    if (confirm("Are you sure you wish to start a new game?")) {
        ladybug.gameReset();
    } else {
        null;
    }
}
// ---------------------------------------------------------



// BUTTON FUNCTIONALITY-----------------------------------------
$(".button").click(function () {
    const buttonType = $(this).attr("id");
    if (buttonType === "runButton") {
        if (runTracker === 0) {
            alert("The poor ladybug is confused, she needs to know where to go first! \n\nPlease give her some directions.");
        } else if (gameTracker === 1 && winTracker === 0) {
            alert("RUNLadybug is all out of moves. \n\nPlease hit reset button to play again. \n\nIf the level is too challenging, try hitting the NEW GAME button instead.");
        } else {
            gameTracker = 1;
            finalPositionTracker = ladybug.finalPositionCalc();
            movementQueueArray.forEach(function(movement, index) {
                queueIndexTracker = movementQueueArray.length - 1;
                setTimeout(function() {
                    ladybug.buttonAction(movement);
                    if (queueIndexTracker === index) {
                        alert("OH NO! Poor little ladybug did what you said, but never found a shady spot to rest... \n\nPlease hit the RESET button to play again. \n\nIf the level is too challenging, try hitting the NEW GAME button instead.");
                    }
                }, index * 1000);
            });
            movementQueueArray.length = 0;
            queueProgressTracker = 1;
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
                queueProgressTracker = 0;
                queueIndexTracker = 0;
            } else {
                ladybug.gameReset();
            }
        };
    } else if (buttonType === "newGameButton") {
        ladybug.newGameCheck();
    } else if (buttonType === "closeInstructions") {
        $(".instructionsWrapper").toggleClass("hidden");
    } else if (buttonType === "openInstructions") {
        $(".instructionsWrapper").toggleClass("hidden");
    } else {
        if (gameTracker === 1 && winTracker === 0) {
            alert("OTHERLadybug is all out of moves. \n\nPlease hit RESET button to play again.\n\n If the level is too challenging, try hitting the NEW GAME button instead.");
        } else if (queueProgressTracker === 1) {
            alert("I know she is ponderous and slow, but let her get where's going first or she'll get lost and confused!");
        } else {
            movementQueueArray.push(buttonType);
            $(".movesQueued").append(`<p>${icons[buttonType]}</p>`)
            runTracker = 1;
            };
        };
    });

ladybug.buttonAction = (buttonType) => {
    if (buttonType === "upButton") {
        if ((ladybugTrackingArray[0] - 10) > 0 && !(stickPositionArray.includes(ladybugTrackingArray[0] - 10))) {
            const newPosition = $ladybugPosition - 10;
            $(".bugBody").remove();
            ladybugTrackingArray.splice(0, 1, newPosition);
            $ladybugPosition = ladybugTrackingArray[0];
            ladybug.gameWinCheck();
        };
    } else if (buttonType === "downButton") {
        if ((ladybugTrackingArray[0] + 10) <= 100 && !(stickPositionArray.includes(ladybugTrackingArray[0] + 10))) {
            const newPosition = $ladybugPosition + 10;
            $(".bugBody").remove();
            ladybugTrackingArray.splice(0, 1, newPosition);
            $ladybugPosition = ladybugTrackingArray[0];
            ladybug.gameWinCheck();
        };
    } else if (buttonType === "leftButton") {
        if (((ladybugTrackingArray[0] - 1) % 10 != 0) && !(stickPositionArray.includes(ladybugTrackingArray[0] - 1))) {
            const newPosition = $ladybugPosition - 1;
            $(".bugBody").remove();
            ladybugTrackingArray.splice(0, 1, newPosition);
            $ladybugPosition = ladybugTrackingArray[0];
            ladybug.gameWinCheck();
        };
    } else if (buttonType === "rightButton") {
        if (((ladybugTrackingArray[0] + 1) % 10 != 1) && !(stickPositionArray.includes(ladybugTrackingArray[0] + 1))) {
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
    ladybug.stickRandomize();
    ladybug.drawFunction($ladybugPosition, ladybugDrawing);
    ladybug.drawFunction($leafPosition, leafDrawing);
    ladybug.drawFunction(stickPositionArray[0], stickDrawing);
};
// =======================================================



// DOCUMENT READY=========================================
$(function () {
    ladybug.init();
})
// =======================================================