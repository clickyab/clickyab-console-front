export default function ReadUrl(input) {
    let file    = document.querySelector('input[type=file]').files[0];
        let reader = new FileReader();
        // reader.onload = function (e) {
        //     console.log("SDf");
        //     $('.preview-banner').append("<img src=" + e.target.result + "/>");
        // };
    console.log(file);

    reader.addEventListener("load", function (e) {

        // $('.preview-banner').append("<img src=" + reader.result + "/>");
    }, false);
    if (file) {

        reader.readAsDataURL(file);
    }
}