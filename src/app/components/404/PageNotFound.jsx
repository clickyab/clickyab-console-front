import React from "react";
import {navigate} from "../../functions/navigate";

export default class PageNotFound extends React.Component {
	componentDidMount() {
		setTimeout(() => {
			navigate("/v1/advertiser")
		}, 3000);
		$('.page-404-full-page').css('height', $(window).height());
		$(window).resize(function () {
			$('.page-404-full-page').css('height', $(window).height());
		})
	}

	render() {
		return (
			<div className=" page-404-full-page">
				<div className="row">
					<div className="col-md-12 page-404">
						<div className="number font-red"> 404</div>
						<div className="details">
							<h3>Oops! You're lost.</h3>
							<p> We can not find the page you're looking for.
								<br/>
								<a href="index.html"> Return home </a> or try the search bar below. </p>
							<form action="#">
								<div className="input-group input-medium">
									<input type="text" className="form-control" placeholder="keyword..."/>
									<span className="input-group-btn">
                                <button type="submit" className="btn red">
                                    <i className="fa fa-search"/>
                                </button>
                            </span>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
