import {store} from "./redux/store";
import {Provider} from "react-redux";
import React from "react";
import {Footer} from "./components/layouts/Footer";
import {Header} from "./components/layouts/HeaderCTR";
import {loading} from "./functions/loading";

export default class App extends React.Component {
	componentDidMount() {
		loading(false);
        $(".modal").on("shown.bs.modal", function()  {
            var urlReplace = "#" + $(this).attr('id');
            history.pushState(null, null, urlReplace);
        });


        $(window).on('popstate', function() {
            $(".modal").modal('hide');
        });
		$(document).on('click', '.dropdown-menu', function (e) {
			$(this).hasClass('keep_open') && e.stopPropagation();
		});

		$(window).resize(function () {
			setToWindowHeight($selector);
		});
		function setToWindowHeight(selector) {
			selector.css({'min-height': $(window).innerHeight()});
		}

		let $selector = $('.page-content');
		setToWindowHeight($selector);
	}

	render() {
		let {children} = this.props;
		return (
			<Provider store={store}>
				<div className="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
					<div className="page-wrapper">
						<Header/>
						{children}
						<Footer/>
					</div>
				</div>
			</Provider>
		)
	}
}
