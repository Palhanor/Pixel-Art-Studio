/*

Let user set the pixel size - control the pixelSize
Let user set the screen size
Crate an eraser tool and avoid eraser erases the grid (paint white and create stroke)
Create an color pallet
Make an beautiful UI
Remove the grid after the drawing has ends
Let user download or save the draw
There's a bug when onmouseup outside of canvas

*/

    var screen = document.querySelector("canvas");
    var context = screen.getContext("2d");
    var color = document.querySelector("#pencilColor");
    var pencil = document.querySelector("#pencil");
    var eraserTool = document.querySelector("#eraser");
    //var zoomTool = document.querySelector("#zoom");
    //var save = document.querySelector("#saveImage");
    var resizePixel = document.querySelector("#resizePixel");
    var submitPixelSize = document.querySelector("#submitPixelSize");

    var pencilIcon = document.querySelector(".fa-pencil-alt");
    pencilIcon.style.color = "red";
    var eraserIcon = document.querySelector(".fa-eraser");
    
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

    function clearGrid() {
        // Clear the trevious grid and screen
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
        eraserIcon.style.color = "black";
        pencilIcon.style.color = "red";
        pencilOn = !pencilOn;
        eraserOn = !eraserOn;
        
    }

    function eraserControl() {
        pencilIcon.style.color = "black";
        eraserIcon.style.color = "red";
        eraserOn = !eraserOn;
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