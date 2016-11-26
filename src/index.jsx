import React from 'react';
import {render} from "react-dom";
import Routes from "./app/routes";
import {store} from "./app/redux/store";
import {Provider} from "react-redux";
import ReduxToastr from 'react-redux-toastr'
render(
	<Provider store={store}>
			<div>
				<Routes/>
				<ReduxToastr
						closeButton={false}
						debug= {false}
						Icon={false}
						newestOnTop= {false}
					    progressBar= {false}
					    positionClass= "toast-top-right"
					    preventDuplicates= {false}
					    onclick= {null}
					    showDuration= "300"
					    hideDuration= "1000"
						timeOut= {5000}
						extendedTimeOut= "1000"
						showEasing= "swing"
					    hideEasing= "linear"
					    showMethod= "fadeIn"
					    hideMethod= "fadeOut"
					/>
				</div>
	</Provider>,
	document.querySelector('#clickyab_app')
);