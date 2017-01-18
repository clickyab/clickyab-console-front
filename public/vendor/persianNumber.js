var defaultSettings = 'fa';
(function( $ ){

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
            obj.find("*").andSelf().contents().each(function() {
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
})(jQuery);
$(document).ready(function() {
    $('.persian-number').persiaNumber();
});