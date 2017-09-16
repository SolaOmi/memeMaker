function drawMeme(image, topLine, bottomLine) {
    var canvas = document.querySelector("canvas");
    var ctx = canvas.getContext("2d");

    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    ctx.font = "36pt Impact";
    ctx.textAlign = "center";
    ctx.fillStyle = "white";
    ctx.strokeStyle = "black";
    ctx.lineWidth = 3;

    if (topLine !== null) {
        ctx.fillText(topLine, canvas.width / 2, 40);
        ctx.strokeText(topLine, canvas.width / 2, 40);
    }

    if (bottomLine !== null) {
        ctx.fillText(bottomLine, canvas.width / 2, canvas.width - 40);
        ctx.strokeText(bottomLine, canvas.width / 2, canvas.width - 40);
    }
}

function textChangeListener(evt) {
    var id = evt.target.id;
    var text = evt.target.value;

    if (id === "topLineText") {
        window.topLineText = text;
    } else {
        window.bottomLineText = text;
    }

    drawMeme(window.imageSrc, window.topLineText, window.bottomLineText);
}

function handleFileSelect(evt) {
    var canvasWidth = 500;
    var canvasHeight = 500;
    var file = evt.target.files[0];

    var reader = new FileReader();
    reader.onload = function(fileObject) {
        var data = fileObject.target.result;
        var image = new Image();

        image.onload = function() {
            window.imageSrc = this;
            drawMeme(window.imageSrc, null, null);
        }

        image.src = data;
        console.log(fileObject.target.result);
    };
    reader.readAsDataURL(file)
}

// Binds button to file input.(default file button styling not very good)
document.querySelector("button").addEventListener("click", function() {
    document.getElementById("fileIn").click();
});

window.topLineText = "";
window.bottomLineText = "";
var inputTop = document.getElementById("topLineText");
var inputBottom = document.getElementById("bottomLineText");
inputTop.oninput = textChangeListener;
inputBottom.oninput = textChangeListener;
document.getElementById("fileIn").addEventListener("change", handleFileSelect);
