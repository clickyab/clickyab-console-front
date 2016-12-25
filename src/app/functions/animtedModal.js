
export function fullWidthModal(id, title) {
    console.log('open modal');
    $('#' + id).animatedModal();
    let modalId =  $('#'+id).attr('href');
    console.log(modalId);
    $(modalId).find('.modal-title h3').text(title);
}