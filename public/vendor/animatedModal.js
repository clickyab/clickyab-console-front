/*=========================================
 * animatedModal.js: Version 1.0
 * author: João Pereira
 * website: http://www.joaopereira.pt
 * email: joaopereirawd@gmail.com
 * Licensed MIT 
=========================================*/

(function ($) {
 
    $.fn.animatedModal = function(options) {
        var modal = $(this);
        
        //Defaults
        var settings = $.extend({
            target: 'modal',
            modalTarget:'animatedModal', 
            position:'fixed', 
            width:'100%', 
            height:'100%', 
            top:'0px', 
            left:'0px', 
            zIndexIn: '9999',  
            zIndexOut: '-9999',  
            color: '#FFF',
            opacityIn:'1',  
            opacityOut:'0', 
            animatedIn:'zoomIn',
            animatedOut:'zoomOut',
            animationDuration:'.6s', 
            overflow:'auto', 
            // Callbacks
            beforeOpen: function() {},           
            afterOpen: function() {}, 
            beforeClose: function() {}, 
            afterClose: function() {}
 
            

        }, options);
        
        var closeBt = $('.close-'+settings.modalTarget);

        //console.log(closeBt)

        var href = $(settings.target),

            form = $(settings.target)
            // idConc = '#'+form.attr('id');
            //console.log(idConc);
            // Default Classes
            form.addClass('animated');
            form.addClass(settings.target+'-off');

        //Init styles
        var initStyles = {
            'position':settings.position,
            'width':settings.width,
            'height':settings.height,
            'top':settings.top,
            'left':settings.left,
            'background-color':settings.color,
            'overflow-y':settings.overflow,
            'z-index':settings.zIndexOut,
            'opacity':settings.opacityOut,
            '-webkit-animation-duration':settings.animationDuration
        };
        //Apply stles
        form.css(initStyles);

        modal.click(function(event) {

            event.preventDefault();
            $('body, html').css({'overflow':'hidden'});
            // console.log("id",idConc);
            console.log("href",href);


                if (form.hasClass(settings.modalTarget+'-off')) {
                    form.removeClass(settings.animatedOut);
                    form.removeClass(settings.modalTarget+'-off');
                    form.addClass(settings.modalTarget+'-on');
                } 

                 if (form.hasClass(settings.modalTarget+'-on')) {
                    settings.beforeOpen();
                    form.css({'opacity':settings.opacityIn,'z-index':settings.zIndexIn});
                    form.addClass(settings.animatedIn);
                    form.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterOpen);
                };
        });



        closeBt.click(function(event) {
            event.preventDefault();
            $('body, html').css({'overflow':'auto'});

            settings.beforeClose(); //beforeClose
            if (form.hasClass(settings.modalTarget+'-on')) {
                form.removeClass(settings.modalTarget+'-on');
                form.addClass(settings.modalTarget+'-off');
            } 

            if (form.hasClass(settings.modalTarget+'-off')) {
                form.removeClass(settings.animatedIn);
                form.addClass(settings.animatedOut);
                form.one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', afterClose);
            };

        });

        function afterClose () {       
            form.css({'z-index':settings.zIndexOut});
            settings.afterClose(); //afterClose
        }

        function afterOpen () {       
            settings.afterOpen(); //afterOpen
        }

    }; // End animatedModal.js

}($));



        