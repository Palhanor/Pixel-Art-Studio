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
    var color = document.querySelector("#pincelColor");
    var eraserTool = document.querySelector("#eraser");

    var pixelSize = 20;

    var xPosition;
    var yPosition;

    var officialPositionX;
    var officialPositionY;

    var officialPosition;

    var canPaint = false;

    var eraserOn = false;

    // Creates the grid system
    function generateGrid() {
        for(let x = 0; x < 500; x = x + pixelSize) {
            for (let y = 0; y < 500; y = y + pixelSize) {
                context.strokeStyle = "#ececec";
                context.strokeRect(x, y, pixelSize, pixelSize);
            }
        }
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
    function eraserControl() {
        eraserOn = !eraserOn;
        console.log(eraserOn);
    }

    // Deactivates the eraser to let the user draw again
    function returnsPainting() {
        if (eraserOn) {
            eraserOn = !eraserOn;
        }
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

    // Deactivates eraser and let the user paint again
    color.onfocus = returnsPainting;