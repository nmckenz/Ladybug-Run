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

// // Hello is alerted repeatedly after every 3 seconds
// let timerId = setInterval(() => alert('Hello'), 3000);

// // Clear intervals after 6 sec with the timer id 
// setTimeout(() => { clearInterval(timerId); alert('Bye'); }, 6000);

// json.objects.forEach(function (obj, index, collection) {
//     setTimeout(function () {
//         console.log('foobar');
//         self.insertDesignJsonObject(obj, index);
//     }, index * 5000);
// });



// -----------------------------------------------------
// creating button functionality

$(".moveButton").mousedown(function () {
    const buttonType = $(this).attr("id");
    // caterpillar.buttonAction(buttonType);
    if (buttonType === "runButton") {
        // caterpillar.drawFunction();
        // movementQueueArray.forEach(function(movement) {
        //     caterpillar.buttonAction(movement)
        // });
        movementQueueArray.forEach(function(movement, index) {
            setTimeout(function() {
                // caterpillar.buttonAction(movement);
                console.log(movement);
                caterpillar.buttonAction(movement);
            }, index * 2000);
            // clearInterval(intervalID);

        });

        // for ( let i = 0; i < movementQueueArray.length; i++) {
        //     // setInterval(function() {
        //     //     console.log(movementQueueArray[i]);
        //     // }, 1000);
        //     console.log("outside timout", movementQueueArray[i]);
        //     setTimeout(function() {
        //         console.log("inside timeout", movementQueueArray[i]);
        //     }, 5000);


        // };

        // for (let i = 0; i < movementQueueArray.length; i++) {
        //     // (function (i) {
        //     //     // setInterval(function () {
        //     //     //     // movementQueueArray[i] += 1;
        //     //     //     console.log(movementQueueArray[i]);
        //     //     // }, 3000)
                
        //     // })(i);
        //     console.log(movementQueueArray[i]);

        // };

        // var index = 0;
        // var interval = setInterval(function () {
        //     console.log(movementQueueArray[index++]);
        //     if (index == movementQueueArray.length) {
        //         clearInterval(interval);
        //     }
        // }, 2000);



        movementQueueArray.length = 0;

    } else if (buttonType === "resetButton") {
        movementQueueArray.length = 0;
        caterpillarTrackingArray.length = 0;
        caterpillarTrackingArray.push(91);
        caterpillar.drawFunction();
    } else {
        movementQueueArray.push(buttonType);
        console.log(movementQueueArray);
    }
});


caterpillar.buttonAction = (buttonType) => {
    if (buttonType === "upButton") {
        if ((caterpillarTrackingArray[0] - 10) > 0) {
            const newPosition = caterpillarTrackingArray[0] - 10;
            caterpillarTrackingArray.splice(0, 1, newPosition);
        };
    } else if (buttonType === "downButton") {
        if ((caterpillarTrackingArray[0] + 10) <= 100) {
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
// movementQueueArray.push("hi");
// console.log(movementQueueArray);





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