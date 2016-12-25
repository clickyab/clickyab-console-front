
export function fullWidthModal(id, title) {
        $('#' + id).animatedModal();
        let modalId =  $('#'+id).attr('href');
        $(modalId).find('.modal-title h3').text(title);
}