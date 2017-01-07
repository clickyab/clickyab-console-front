const $ = require('jquery');

export function loading(status) {
	const loader = $('.preloader-page');
	status ? loader.fadeIn() : loader.fadeOut();
}