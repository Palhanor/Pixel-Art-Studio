/*

**************** DEVELOP **************
Bug - There's a bug when onmouseup outside of canvas
Feature - Let user set the screen size
Feature - Create an color pallet
Feature - Remove the grid after the drawing has ends
Feature - Let user download or save the draw (right button and save)
Design - Make an beautiful UI

*/

    var screen = document.querySelector("#screen");
    var context = screen.getContext("2d");
    var color = document.querySelector("#pencilColor");
    var pencil = document.querySelector("#pencil");
    var eraserTool = document.querySelector("#eraser");
    //var zoomTool = document.querySelector("#zoom");
    //var save = document.querySelector("#saveImage");
    var resizePixel = document.querySelector("#resizePixel");
    var submitPixelSize = document.querySelector("#submitPixelSize");

    var pencilIcon = document.querySelector(".fa-pencil-alt");
    pencilIcon.style.backgroundColor = "gray";
    var eraserIcon = document.querySelector(".fa-eraser");

    /* 
    Have to set a function creating a position to every empty pixel from x = 0 to x = 480 and y = 0 to y = 480
    arrPositionX and arrPositionY has to call the function each one
    And the arrPositionColor has to set "" value in each position
    So the paint() function has to change the value in the arrPositionsColor putting the color used by user in the position x and y captured by event
    This array will be used to render the image in a full white background, or in the move tool and so on...
    */
    // Controls the position and the color of each pixel
    var arrPositionsX = [];
    var arrPositionsY = [];
    var arrPositionsColor = [];
    
    var pixelSize = 20;
    // var gridSize = 20; - Change the grid and pixel size independently
    // var screenSize; - Change the size of canvas considering the pixelSize

    var xPosition;
    var yPosition;

    var officialPositionX;
    var officialPositionY;

    var officialPosition;

    var canPaint = false;

    var eraserOn = false;
    var pencilOn = true;

    // Creates the grid system
    function generateGrid() {
        context.strokeStyle = "#ececec";
        for(let x = 0; x < 500; x = x + pixelSize) {
            for (let y = 0; y < 500; y = y + pixelSize) {
                context.strokeRect(x, y, pixelSize, pixelSize);
            }
        }
    }

    // Clear the previous grid and screen
    function clearGrid() {
        context.fillStyle = "white";
        context.fillRect(0, 0, 500, 500);
    }

    // Creates the pixel
    function paint(e) {
        if (canPaint && !eraserOn) {
            xPosition = e.pageX - screen.offsetLeft;
            yPosition = e.pageY - screen.offsetTop;
            officialPositionX = correctPosition(xPosition);
            officialPositionY = correctPosition(yPosition);
            context.fillStyle = color.value;
            context.fillRect(officialPositionX, officialPositionY, pixelSize, pixelSize);
        } else if (canPaint && eraserOn) {
            xPosition = e.pageX - screen.offsetLeft;
            yPosition = e.pageY - screen.offsetTop;
            officialPositionX = correctPosition(xPosition);
            officialPositionY = correctPosition(yPosition);
            context.fillStyle = "white";
            context.fillRect(officialPositionX, officialPositionY, pixelSize, pixelSize);
            context.strokeStyle = "#ececec";
            context.strokeRect(officialPositionX, officialPositionY, pixelSize, pixelSize);
        }
    }

    // Adjusts the pixel position in screen
    function correctPosition(value) {
        officialPosition = value % pixelSize;
        if (officialPosition != 0) {
            while (officialPosition != 0) {
                value--;
                officialPosition = value % pixelSize;
            }
        }
        return value;
    }

    // Activates or deactivate the pencil
    function paintingControl() {
        canPaint = !canPaint;
    }

    // Activates or deactivate the eraser
    function pencilControl() {
        eraserIcon.style.backgroundColor = "white";
        pencilIcon.style.backgroundColor = "gray";
        pencilOn = true;
        eraserOn = false;
        
    }

    function eraserControl() {
        pencilIcon.style.backgroundColor = "white";
        eraserIcon.style.backgroundColor = "gray";
        eraserOn = true;
        pencilOn = false;
    }

    function saveImage() {
        // Create a function that allows user copu the image from canvas
    }

    function changePixelSize() {
        clearGrid();
        pixelSize = parseInt(resizePixel.value);
        generateGrid();
    }

    // Sets the grid system
    generateGrid();

    // Assures that the user is painting while the mouse is down
    screen.onmousedown = paintingControl;

    // Assures that the user isn't painting while the mouse is up
    screen.onmouseup = paintingControl;

    // Crates the painting path while mouse is on canvas
    screen.onmousemove = paint;

    // Controls the usage of eraser
    eraserTool.onclick = eraserControl;
    pencil.onclick = pencilControl;

    // Copy image from clipboard
    //save.onclick = saveImage;

    submitPixelSize.onclick = changePixelSize;