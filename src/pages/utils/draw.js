export function drawLine(ctx){
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(0, 0, 150, 75);
}
export function drawImage(ctx){
    var image = document.getElementById("frame");
    //ctx.drawImage(image, 33, 71, 104, 124, 21, 20, 87, 104);
    ctx.drawImage(image, 70, 0);
}
