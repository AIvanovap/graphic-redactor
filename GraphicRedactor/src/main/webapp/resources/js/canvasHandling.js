function draw() {
    var canvas = document.getElementById('canvas')
    canvas.width  = window.innerWidth* 0.8;
    canvas.height = window.innerHeight* 0.8;
}

function drawPanel(){
    var $ = function(id){return document.getElementById(id)};

    var canvas = this.canvas = new fabric.Canvas('canvas', {
        isDrawingMode: true
    });

    var drawingColorEl = $('drawing-color');

    $('drawing-mode-selector').onchange = function () {

        if (this.value === 'Small') {
            canvas.freeDrawingBrush.color = drawingColorEl.value;
            canvas.freeDrawingBrush.width = 5;
        }
        else if (this.value === 'Mid') {
            canvas.freeDrawingBrush.color = drawingColorEl.value;
            canvas.freeDrawingBrush.width = 20;
        }
        else if (this.value === 'Large') {
            canvas.freeDrawingBrush.color = drawingColorEl.value;
            canvas.freeDrawingBrush.width = 40;
        }
    }

    drawingColorEl.onchange = function() {
        canvas.freeDrawingBrush.color = this.value;
    };
}
