const canvas = document.getElementById("canvas");
const increaseBtn = document.getElementById("increase");
const decreaseBtn = document.getElementById("decrease");
const sizeEl = document.getElementById("size");
const clearEl = document.getElementById("clear");
const colorEl = document.getElementById("color");
const ctx = canvas.getContext("2d");

//Brush Size
let size = 20;
//Mouse pressed
let isPressed = false;
let color = "black";
//Starting Coordinates for Brush
let x = undefined;
let y = undefined;

//Setting Coordinates to draw after Clicking
canvas.addEventListener("mousedown", () =>{
    isPressed = true;
    x = e.offsetX;
    y = e.offsetY;
});

//Turning off draw function
canvas.addEventListener("mouseup", () =>{
    isPressed = false;
    x = undefined;
    y = undefined;
});

//Stops drawing when leaving the canvas
canvas.addEventListener("mouseout",()=>{
    isPressed = false;
    x = undefined;
    y = undefined; 
})

//Defines how lines are drawn when mouse is moved in canvas
canvas.addEventListener("mousemove", (e) => {
    if(isPressed){
        const x2 = e.offsetX;
        const y2 = e.offsetY;
            drawCircle(x2,y2);
            drawLine(x, y, x2, y2);
            x = x2;
            y = y2;
    }
});

//Increases Brush Size after Button Click
increaseBtn.addEventListener("click", () => {
    size +=5;

    if(size > 50){
        size = 50;
    }

    updateSizeOnScreen();
});

//Decreases Brush Size after Button Click
decreaseBtn.addEventListener("click", () => {
    size -=5;

    if(size < 5){
        size = 5;
    }

    updateSizeOnScreen();
});

//Updates Size Element Text in Html File
function updateSizeOnScreen(){
    sizeEl.innerText = size;
}

//Clears the Canvas after Button Click
clearEl.addEventListener("click", () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
})

//Changes the color value
colorEl.addEventListener("change", (e) => {
    color = e.target.value;
});

//Draws a Circle
function drawCircle(x,y){
    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fillStyle = color;
    ctx.fill();
}

//Draws a Line and connects the circles
function drawLine(x1,y1, x2, y2){
    ctx.beginPath();
    ctx.moveTo(x1,y1);
    ctx.lineTo(x2,y2);
    ctx.strokeStyle = color;
    ctx.lineWidth = 2*size;
    ctx.stroke();
}