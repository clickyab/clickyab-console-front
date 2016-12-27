import $ from 'jquery';

export function fullWidthModal(id, title, options = {}) {
        $('#' + id).animatedModal({
                modalTarget:id+'-modal',
            ...options
        });
        let modalId =  $('#'+id).attr('href');
        $(modalId).find('.modal-title h3').text(title);
}