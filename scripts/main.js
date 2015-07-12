var el = {},
    players = {},
    lP, // short alias for players.localPlayer
    canApplyLocalPlayerName = [false, false]; // nasty but worky

window.addEventListener('load', identifyElements, false);
window.addEventListener('load', createLocalPlayer, false);

function initialise() {
    initialiseNetwork();
    initialiseGraphics();
}

function identifyElements() {

    el.canvas = document.getElementsByTagName('canvas')[0];
    el.div = document.getElementsByTagName('div')[0];
    el.input = document.getElementsByTagName('input')[0];

}

function createLocalPlayer() {

    players.localPlayer = lP = new Player({
        name: 'local' // temporary name
    });

    applyLocalPlayerName(0);

}

function applyLocalPlayerName(component) {

    canApplyLocalPlayerName[component] = true;

    if (canApplyLocalPlayerName[0] &&
        canApplyLocalPlayerName[1]) {
        lP.name = localStorage.flockName;
    }

}
