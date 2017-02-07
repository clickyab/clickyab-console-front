import $ from "jquery";

export default function () {
    function removePageLoader() {
        window.setTimeout(function () {
            $('.preloader-page').fadeOut();
        }, 1)
    }
}