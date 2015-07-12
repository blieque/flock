var context, vpProps, redrawInterval;
var tau = 2 * Math.PI,
    font = 'clear sans,helvetica neue,sans-serif';

// should probably have it's own class file
vpProps = {
    ratio: 0.1,
    update: function() {

        if (window.innerWidth > window.innerHeight) {
            vpProps.unit = window.innerHeight * vpProps.ratio;
        } else {
            vpProps.unit = window.innerWidth * vpProps.ratio;
        }

        vpProps.width = window.innerWidth - (2 * vpProps.unit);
        vpProps.height = window.innerHeight - (2 * vpProps.unit);

    }
}
vpProps.update();

function initialiseGraphics() {

    window.addEventListener('resize', resize, false);
    window.addEventListener('mousemove', updateLocalPlayerPosition, false);

    context = el.canvas.getContext('2d');

    context.font = '2.4vh ' + font;
    context.textBaseline = 'middle';
    context.textAlign = 'center';

    resize();
    applyLocalPlayerName(1);

    // start redraw loop
    redrawInterval = setInterval(redraw, 1000 / 120); // 120 fps

}

function redraw() {

    context.clearRect(0, 0, window.innerWidth, window.innerHeight);

    // k for "key", k?
    for (var k in players) {

        // calculation

        // create pixel value from float value and viewport properties
        var pxPositionX = players[k].positionX * vpProps.width + vpProps.unit,
            pxPositionY = players[k].positionY * vpProps.height + vpProps.unit;

        // drawing

        // draw player circle
        context.fillStyle = players[k].colour;
        context.beginPath();
        context.arc(pxPositionX,
                    pxPositionY,
                    vpProps.unit,
                    0,
                    tau,
                    false);
        context.fill();

        // write player name
        context.fillStyle = '#fff';
        context.fillText(players[k].name,
                         pxPositionX,
                         pxPositionY);

    }

}

function resize() {

    vpProps.update();

    el.canvas.width = window.innerWidth;
    el.canvas.height = window.innerHeight;

    var pointSize = vpProps.unit / 4;
    context.font = pointSize + 'pt ' + font;

    // i have no idea why the following two are required
    context.textBaseline = 'middle';
    context.textAlign = 'center';

}

function updateLocalPlayerPosition(event) {

    if (event.clientX > vpProps.unit + vpProps.width) {
        lP.pxPositionX = vpProps.unit + vpProps.width;
    } else if (event.clientX < vpProps.unit) {
        lP.pxPositionX = vpProps.unit;
    } else {
        lP.pxPositionX = event.clientX;
    }

    if (event.clientY > vpProps.unit + vpProps.height) {
        lP.pxPositionY = vpProps.unit + vpProps.height;
    } else if (event.clientY < vpProps.unit) {
        lP.pxPositionY = vpProps.unit;
    } else {
        lP.pxPositionY = event.clientY;
    }

    // update float position from pixel position (yes, this is inefficient)
    lP.positionX = (lP.pxPositionX - vpProps.unit) / vpProps.width;
    lP.positionY = (lP.pxPositionY - vpProps.unit) / vpProps.height;

}
