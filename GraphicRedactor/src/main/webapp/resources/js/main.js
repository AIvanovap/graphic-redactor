(function () {
    var canvas = this.canvas = new fabric.Canvas('canvas', {
            isDrawingMode: true
    });

    var canvas_el = document.getElementById('canvas');

    var drawingColorEl = document.getElementById('drawing-color'),
        clearEl = document.getElementById('clear-canvas');

    clearEl.onclick = function() { canvas.clear() };

    document.getElementById('drawing-mode-selector').onchange = function () {

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

    var  drawingModeEl = document.getElementById('cancel-drawing-mode');

    document.getElementById('cancel-drawing-mode').onclick = function() {
        canvas.isDrawingMode = !canvas.isDrawingMode;
        if (canvas.isDrawingMode) {
            drawingModeEl.innerHTML = 'Cancel drawing mode';
            drawingOptionsEl.style.display = '';
        }
        else {
            drawingModeEl.innerHTML = 'Enter drawing mode';
            drawingOptionsEl.style.display = 'none';
        }
    };

    $(document).ready(function () {

        /* Bring active object to the front of the canvas */
        canvas.on('mouse:down', function (e) {
            if (!(typeof (e.target) === 'undefined')) {
                canvas.bringToFront(e.target);
            }
        });

        /* Define drag and drop zones */
        var $drop = $('#canvas-drop-area'),
            $gallery = $('#image-list li');

        /* Define the draggable properties */
        $gallery.draggable({
            start: function () {
                $drop.css({
                    'display': 'block'
                })
            },
            stop: function () {
                $(this).find('img').css({
                    'opacity': 0.4
                });
                $drop.css({
                    'display': 'none'
                });
            },
            revert: true
        });

        /* Define the events for droppable properties */
        $drop.droppable({
            over: function (event, ui) {
                $(this).addClass('active');
            },
            drop: function (event, ui) {
                var image = event.originalEvent.target.src,
                    loc = windowToCanvas(canvas_el, event.clientX, event.clientY);

                img_to_canvas(image, loc.x, loc.y);
            },
            out: function (event, ui) {
                $(this).removeClass('active');
            },
            deactivate: function (event, ui) {
                $(this).removeClass('active');
            }
        });
    });

    var img_to_canvas = function(image, x, y) {
        var img = new Image();
        img.src = image;
        fabric.Image.fromURL(img.src, function (source) {
            img = source.set({
                left: x,
                top: y,
                angle: 0
            });
            canvas.add(img);
            canvas.renderAll();
        });
    }

    var windowToCanvas = function(canvas, x, y) {
        var bbox = canvas.getBoundingClientRect();
        return {
            x: x - bbox.left * (canvas.width / bbox.width),
            y: y - bbox.top * (canvas.height / bbox.height)
        };
    }

    var save_canvas = function() {
        window.location = canvas.toDataURL("image/png");
    }
})();