
export function fullWidthModal(id, title) {
        $('#' + id).animatedModal({
                modalTarget:id+'-modal',
        });
        let modalId =  $('#'+id).attr('href');
        $(modalId).find('.modal-title h3').text(title);
}