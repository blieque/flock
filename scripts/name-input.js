var muted;

window.addEventListener('load', getName, false);

function getName() {

    // continue immediately if we have a name already
    if (typeof localStorage.flockName !== 'undefined') {
        initialise();
        return;
    }

    el.canvas.style.opacity = 0;
    el.div.style.display = 'block';
    el.div.style.opacity = 1;
    el.input.focus();

    document.addEventListener('keyup', nameInputKeyHandler);

}

function nameInputKeyHandler(e) {

    if (el.input.disabled) {
        e.preventDefault();
        return;
    }

	// KeyboardEvent.which is deprecated, but support for KeyboardEvent.key is
	// almost not a thing. Even Chrome doesn't support it yet (July 2015).
    if (e.which === 13) {

        var nameInput = el.input.value;
        // strip preceding/trailing whitespace
        nameInput = nameInput.replace(/(^[\s]*)|([\s]*$)/g, '');
        // truncate to 16 characters
        nameInput.substring(0, 16);

        // if the user enters no name, mock them
        if (nameInput.length === 0) {

            el.input.disabled = true;
            el.input.value = '';
            el.input.placeholder = ' are you deficient?';

            setTimeout(function() {
                el.input.placeholder = ' it isn\'t hard...';
            }, 900);

            setTimeout(function() {
                el.input.placeholder = ' enter a name';
                el.input.disabled = false;
            }, 1800);

        } else {

            localStorage.flockName = nameInput;

            document.removeEventListener('keyup', nameInputKeyHandler);
            initialise();

            el.canvas.style.opacity = 1;
            el.div.style.opacity = 0;
            el.div.style.display = 'none';

            setTimeout(function() {
                el.canvas.opacity = 1;
            }, 200);

        }

    }

}
