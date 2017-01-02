const $ = require('jquery');

export function loading(status) {
    console.log(status);
    if (status) {
        $('.preloader-page').fadeIn();

    } else {
        $('.preloader-page').fadeOut();
    }
}