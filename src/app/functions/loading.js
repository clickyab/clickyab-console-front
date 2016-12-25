const $ = require('jquery');

export function loading(status) {
    if (status) {
        $(".preloader-page").fadeIn();
    } else {
        $(".preloader-page").fadeOut();
    }
}