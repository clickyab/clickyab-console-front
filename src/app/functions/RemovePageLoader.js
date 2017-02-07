import $ from "jquery";

export default function () {
    return function removePageLoader() {
        window.setTimeout(function () {
            $('.preloader-page').fadeOut();
        }, 1)
    }
}