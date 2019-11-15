// NAMESPACE==============================================
const caterpillar = {}
// =======================================================



// -------------------------------------------------------
// toggle class for drawing caterpillar

let caterpillarTrackingArray = ["91"];

caterpillar.drawFunction = () => {
    $(".item").removeClass("draw");
    $(`.item${caterpillarTrackingArray[0]}`).toggleClass("draw");
};

caterpillar.drawFunction();
// -------------------------------------------------------



// -----------------------------------------------------
// creating move button functionality

$(".moveButton").mousedown(function() {
    const buttonType = $(this).attr("id");
    caterpillar.buttonAction(buttonType);
});

caterpillar.buttonAction = (buttonType) => {
    if (buttonType === "upButton") {
        if ((caterpillarTrackingArray[0] - 10) > 0) {
            const newPosition = caterpillarTrackingArray[0] - 10;
            caterpillarTrackingArray.splice(0, 1, newPosition);
        };
    } else if (buttonType === "downButton") {
        if ((caterpillarTrackingArray[0] + 10) <= 100 ) {
            const newPosition = caterpillarTrackingArray[0] + 10;
            caterpillarTrackingArray.splice(0, 1, newPosition);
        };
    } else if (buttonType === "leftButton") {
        if ((caterpillarTrackingArray[0] - 1) % 10 != 0) {
            const newPosition = caterpillarTrackingArray[0] - 1;
            caterpillarTrackingArray.splice(0, 1, newPosition);
        };
    } else if (buttonType === "rightButton") {
        if ((caterpillarTrackingArray[0] + 1) % 10 != 1) {
            const newPosition = caterpillarTrackingArray[0] + 1;
            caterpillarTrackingArray.splice(0, 1, newPosition);
        };
    }
    caterpillar.drawFunction();
};
// ------------------------------------------------------



// --------------------------------------------------------
// array for tracking movement selections
let movementQueueArray = [];
movementQueueArray.push("hi");
console.log(movementQueueArray);




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