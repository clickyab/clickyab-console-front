import $ from "jquery";

export function fullWidthModal(className, title, options = {}) {
	$('.' + className).animatedModal({
		modalTarget: className + '-modal',
		...options
	});
	let modalId = $('#' + className).attr('href');
	$(modalId).find('.modal-title h3').text(title);
}