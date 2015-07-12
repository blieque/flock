function Player(params) {

    // construction

    this.name =
        typeof params.name !== 'undefined' ? params.name : '';
    // default new blobs to 'blieque turquoise'
    this.colour =
        typeof params.colour !== 'undefined' ? params.colour : '#69af98';
    // default new blobs to the centre of the screen
    this.positionX =
        typeof params.positionX !== 'undefined' ? params.positionX : 0.5;
    this.positionY =
        typeof params.positionY !== 'undefined' ? params.positionY : 0.5;

    // methods

    this.setName = function(name) {
        if (typeof name === 'string' &&
            name.length > 0) {
            this.name = name;
            return true;
        } else {
            return false;
        }
    }

}
