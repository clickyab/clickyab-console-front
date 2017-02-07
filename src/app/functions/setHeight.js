import $ from "jquery";

export function setHeight() {
    let windowHeight = $(window).innerHeight();
    $('.page-content').css({
        'min-height': windowHeight + 'px'
    });
}