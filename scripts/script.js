// NAMESPACE==============================================
const caterpillar = {}
// =======================================================

// -------------------------------------------------------
// toggle class for drawing caterpillar

let caterpillarTrackingArray = ["15"];
// caterpillarTrackingArray = caterpilllarTrackingArray.push("item15");
console.log(caterpillarTrackingArray[0]);

caterpillar.drawFunction = () => {
    $(".item").removeClass("draw");
    $(`.item${caterpillarTrackingArray[0]}`).toggleClass("draw");

};

caterpillar.drawFunction();



// -----------------------------------------------------
// creating move button functionality


// $(".moveButton").mousedown(caterpillar.buttonHandler);

// caterpillar.buttonHandler = function() {
//     console.log("button handler");
//     const buttonType = $(this).attr("id");
//     console.log(buttonType);
// }

$(".moveButton").mousedown(function() {
    console.log("button handler");
    console.log($(this).attr("id"));
    const buttonType = $(this).attr("id");
    console.log("buttonType variable", buttonType);
    // caterpillar.(buttonType);
    caterpillar[buttonType]();
});

caterpillar.upButton = () => {
    const newPosition = caterpillarTrackingArray[0] - 10;
    if (newPosition > 0) {
        caterpillarTrackingArray.splice(0, 1, newPosition);
    };
    console.log("upbutton tracking array", caterpillarTrackingArray[0]);
    caterpillar.drawFunction();
};

// $("#upButton").mousedown(function() {
//     console.log("up button registered")
// })
// ------------------------------------------------------

// INIT===================================================
caterpillar.init = () => {
    console.log("hello world")
};
// =======================================================


// DOCUMENT READY=========================================
$(function () {
    caterpillar.init();
})
// =======================================================