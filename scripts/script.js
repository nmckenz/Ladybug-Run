// NAMESPACE==============================================
const caterpillar = {}
// =======================================================



// -------------------------------------------------------
// toggle class for drawing caterpillar

let caterpillarTrackingArray = ["91"];
const caterpillarDrawing = `<div class="body">
        <div class="eyes left"></div>
        <div class="eyes right"></div>
    
        <div class="spot spot1"></div>
        <div class="spot spot2"></div>
        <div class="spot spot3"></div>
        <div class="spot spot4"></div>
        <div class="spot spot5"></div>
        <div class="spot spot6"></div>
    </div>`

caterpillar.drawFunction = () => {
    // $(".item").removeClass("draw");

    // $(`.item${caterpillarTrackingArray[0]}`).toggleClass("draw");

    $(`.item${caterpillarTrackingArray[0]}`).append(caterpillarDrawing);

};

caterpillar.drawFunction();
// -------------------------------------------------------



// -----------------------------------------------------
// creating button functionality

$(".moveButton").mousedown(function () {
    const buttonType = $(this).attr("id");
    // caterpillar.buttonAction(buttonType);
    if (buttonType === "runButton") {
        movementQueueArray.forEach(function(movement, index) {
            setTimeout(function() {
                console.log(movement);
                caterpillar.buttonAction(movement);
            }, index * 1500);
        });
        movementQueueArray.length = 0;

    } else if (buttonType === "resetButton") {
        $(`.item${caterpillarTrackingArray[0]}`).html("");
        $(".movementQueue").empty();
        movementQueueArray.length = 0;
        caterpillarTrackingArray.length = 0;
        caterpillarTrackingArray.push(91);
        caterpillar.drawFunction();
    } else {
        console.log(movementQueueArray);
        movementQueueArray.push(buttonType);
        $(".movementQueue").append(`<p>${$(this).attr("id").replace("Button", "")}`);
    }
});


caterpillar.buttonAction = (buttonType) => {
    if (buttonType === "upButton") {
        if ((caterpillarTrackingArray[0] - 10) > 0) {
            const newPosition = caterpillarTrackingArray[0] - 10;
            $(`.item${caterpillarTrackingArray[0]}`).html("");
            caterpillarTrackingArray.splice(0, 1, newPosition);
        };
    } else if (buttonType === "downButton") {
        if ((caterpillarTrackingArray[0] + 10) <= 100) {
            const newPosition = caterpillarTrackingArray[0] + 10;
            $(`.item${caterpillarTrackingArray[0]}`).html("");
            caterpillarTrackingArray.splice(0, 1, newPosition);
        };
    } else if (buttonType === "leftButton") {
        if ((caterpillarTrackingArray[0] - 1) % 10 != 0) {
            const newPosition = caterpillarTrackingArray[0] - 1;
            $(`.item${caterpillarTrackingArray[0]}`).html("");
            caterpillarTrackingArray.splice(0, 1, newPosition);
        };
    } else if (buttonType === "rightButton") {
        if ((caterpillarTrackingArray[0] + 1) % 10 != 1) {
            const newPosition = caterpillarTrackingArray[0] + 1;
            $(`.item${caterpillarTrackingArray[0]}`).html("");
            caterpillarTrackingArray.splice(0, 1, newPosition);
        };
    }
    caterpillar.drawFunction();
};
// ------------------------------------------------------



// --------------------------------------------------------
// array for tracking movement selections
let movementQueueArray = [];
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