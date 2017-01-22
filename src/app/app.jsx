import {store} from './redux/store';
import {Provider} from 'react-redux';
import React from 'react';
import {Footer} from './components/layouts/Footer';
import {Header} from './components/layouts/HeaderCTR';
import Sidebar from './components/layouts/Sidebar';
import {loading} from "./functions/loading";
import {setHeight} from "./functions/setHeight";

export default class App extends React.Component {
    componentDidMount() {
        document.body.addEventListener('panic', function (e) {
            console.log("heeeelllllooow")
        }, false);


        var defaultSettings = 'fa';
            $.fn.persiaNumber = function(settings) {
                if(typeof(settings) == 'string' && settings.length > 0)
                    defaultSettings = settings;
                var range = 1728;
                window.persiaNumberedDOM = this;
                convert(this, range);
                $(document).ajaxComplete(function(){
                    var thisObj = window.persiaNumberedDOM;
                    convert(thisObj, range);
                });
                function convert(obj, range){
                    obj.find("*").contents().each(function() {
                        console.log(obj);
                        if (this.nodeType === 3 && this.parentNode.localName != "style" && this.parentNode.localName != "script") {
                            this.nodeValue = this.nodeValue.replace(this.nodeValue.match(/[0-9]*\.[0-9]+/), function(txt){
                                return txt.replace(/\./,',');
                            });
                            this.nodeValue = this.nodeValue.replace(/\d/g, function(v) {
                                return String.fromCharCode(v.charCodeAt(0) + range);
                            });
                        }
                    });
                }
            };
                $('.price-table-pricing').persiaNumber();
        loading(false);
        setHeight();
        $(window).resize(function () {
            setHeight();
        })
    }

    render() {
        let {children, userType} = this.props;
        return (
            <Provider store={store}>
                <div className="page-header-fixed page-sidebar-closed-hide-logo page-content-white">
                    <div className="page-wrapper">
                        <Header/>
                        <div className="page-container">
                            {userType == "advertiser" ? <Sidebar/> : <Sidebar/>}
                            <div className="page-content-wrapper">
                                {children}
                            </div>
                        </div>
                        <Footer/>
                    </div>
                </div>
            </Provider>
        )
    }
}
