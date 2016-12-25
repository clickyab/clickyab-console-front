
export function fullWidthModal(id, title) {
    $('#' + id).on('click', function() {
        $('#' + id).animatedModal();
        let modalId =  $('#'+id).attr('href');
        $(modalId).find('.modal-title h3').text(title);
    })
}