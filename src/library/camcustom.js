var maparray = {};
function resizeboxes(classnamecam) {
    
    //console.log(jQuery("."+classnamecam+" .slick-active .close_pop_sbar").attr("modid"));
    //pause_function(jQuery("."+classnamecam+" .slick-active .close_pop_sbar").attr("modid"));

	if (jQuery("."+classnamecam).width() < 1420){
        jQuery("."+classnamecam).addClass("content_1499");
    } else {
        jQuery("."+classnamecam).removeClass("content_1499")
    }	    


    if (jQuery("."+classnamecam).width() < 1121){
        jQuery("."+classnamecam).addClass("content_1200");
    } else {
        jQuery("."+classnamecam).removeClass("content_1200")
    }


    if (jQuery("."+classnamecam).width() < 945){
        jQuery("."+classnamecam).addClass("content_1024");
    } else {
        jQuery("."+classnamecam).removeClass("content_1024")
    }

    
    if (jQuery("."+classnamecam).width() < 708) {
        jQuery("."+classnamecam).addClass("content_767");
    } else {
        jQuery("."+classnamecam).removeClass("content_767")
    }

    
    if (jQuery("."+classnamecam).width() < 491){
        jQuery("."+classnamecam).addClass("content_520");
    } else {
        jQuery("."+classnamecam).removeClass("content_520")
    }

    if (jQuery("."+classnamecam).width() < 341){
        jQuery("."+classnamecam).addClass("content_370");
    } else {
        jQuery("."+classnamecam).removeClass("content_370")
    }
};




/*jQuery(function(){
	jQuery(document).on("click", ".wtrcam_zoom", function(el){
		imgsrcc = jQuery(this).closest(".c-mobile-view__inner").find(".zoommyimg").attr("zoomimgsrc");
		divulge_model(imgsrcc);
	});
});*/


jQuery(document).ready(function(){


    jQuery('.slider-nav').on('afterChange', function(slick, currentSlide){
        if (jQuery(".wtrcam_main").width() > 491){
            mapelement = jQuery("#"+slick.target.id).parent().find(".slick-active").find(".cammapbox")
            createnewmap(mapelement);
        }
    });

    jQuery(document).on("click", ".wtrcam_map_zoom", function(){
        jQuery(this).parent().addClass("full_height_map");
        
        mapelement = jQuery(this).closest(".camslider").find(".cammapbox");
        createnewmap(mapelement);
    });

    jQuery(document).on("click", ".wtrcam_map_unzoom", function(){
        jQuery(this).parent().removeClass("full_height_map");
        mapelement = jQuery(this).closest(".camslider").find(".cammapbox");
        createnewmap(mapelement);
    });

    jQuery(".wtrcam_main").on("mouseenter", function() {
        if (jQuery(window).width() > 520) {
            jQuery(this).find(".camslider").addClass("show_bt_content");       
        }
    }).on("mouseleave", function() {
        if (jQuery(window).width() > 520) {
            if(!jQuery(this).closest(".wtrcam_main_pop").hasClass("open_pop"))
            {
                jQuery(this).find(".camslider").removeClass("show_bt_content");
            }
        }
    });

    
    jQuery(document).on("click", ".close_sbar", function(){
        jQuery(this).closest(".camslider").removeClass("sbar_open");
    });

    jQuery(document).on("click", ".close_cam_hourly_data", function(){
        jQuery(this).closest(".camslider").removeClass("bt_content_white");
    });


    jQuery(document).on("click", ".slider_content_temp", function(){

       if(!jQuery(this).closest(".wtrcam_main").hasClass('content_520'))
       {
            jQuery(this).closest(".c-mobile-view").find(".wtrcam_zoom").trigger("click"); 
       }
       /*else
       {
         jQuery(this).closest(".c-mobile-view").find(".wtrcam_zoom").trigger("click"); 
       }*/
        
    });

    /*jQuery(document).on("click", ".slider_content_place", function(){
       if(jQuery(this).closest(".wtrcam_main").hasClass('content_520'))
       {
            jQuery(this).parent().addClass("show_map_mobile");
            mapelement = jQuery(this).parent().find(".cammapbox_mobile");
            createnewmap(mapelement);
       }
        
    });
*/
    

    jQuery(document).on("click", ".close_hourlydata_mobile", function(){
        jQuery(this).parent().parent().removeClass("show_weather_mobile");
    });

    jQuery(document).on("click", ".close_map_mobile", function(){
        jQuery(this).parent().parent().removeClass("show_map_mobile");
    });

    jQuery(document).on("click", ".slider_content_date", function(){
        jQuery(this).closest(".c-mobile-view").find(".wtrcam_zoom").trigger("click"); 
    });
    
    /*Show the cam in zoom*/
    jQuery(document).on("click", ".wtrcam_zoom", function(){
        jQuery(this).closest(".wtrcam_main_pop").addClass("open_pop");

        jQuery(this).closest(".camslider").addClass("sbar_open");
        jQuery(this).closest(".camslider").addClass("bt_content_white");

        
        if (jQuery(window).width() > 520) {
            modid = jQuery(this).closest(".wtrcam_main").attr("modid");
            resizeboxes("wtrcam_main"+modid);
            //jQuery('.slider-for').slick('refresh');
        }

        /* Scroller JS */
        (function (root, factory) {
            if (typeof define === 'function' && define.amd) {
                define(['exports'], factory);
            } else if (typeof exports !== 'undefined') {
                factory(exports);
            } else {
                factory((root.dragscroll = {}));
            }
        }(this, function (exports) {
            var _window = window;
            var _document = document;
            var mousemove = 'mousemove';
            var mouseup = 'mouseup';
            var mousedown = 'mousedown';
            var EventListener = 'EventListener';
            var addEventListener = 'add'+EventListener;
            var removeEventListener = 'remove'+EventListener;
            var newScrollX, newScrollY;

            var dragged = [];
            var reset = function(i, el) {
                for (i = 0; i < dragged.length;) {
                    el = dragged[i++];
                    el = el.container || el;
                    el[removeEventListener](mousedown, el.md, 0);
                    _window[removeEventListener](mouseup, el.mu, 0);
                    _window[removeEventListener](mousemove, el.mm, 0);
                }

                // cloning into array since HTMLCollection is updated dynamically
                dragged = [].slice.call(_document.getElementsByClassName('dragscroll'));
                for (i = 0; i < dragged.length;) {
                    (function(el, lastClientX, lastClientY, pushed, scroller, cont){
                        (cont = el.container || el)[addEventListener](
                            mousedown,
                            cont.md = function(e) {
                                if (!el.hasAttribute('nochilddrag') ||
                                    _document.elementFromPoint(
                                        e.pageX, e.pageY
                                    ) == cont
                                ) {
                                    pushed = 1;
                                    lastClientX = e.clientX;
                                    lastClientY = e.clientY;

                                    e.preventDefault();
                                }
                            }, 0
                        );

                        _window[addEventListener](
                            mouseup, cont.mu = function() {pushed = 0;}, 0
                        );

                        _window[addEventListener](
                            mousemove,
                            cont.mm = function(e) {
                                if (pushed) {
                                    (scroller = el.scroller||el).scrollLeft -=
                                        newScrollX = (- lastClientX + (lastClientX=e.clientX));
                                    scroller.scrollTop -=
                                        newScrollY = (- lastClientY + (lastClientY=e.clientY));
                                    if (el == _document.body) {
                                        (scroller = _document.documentElement).scrollLeft -= newScrollX;
                                        scroller.scrollTop -= newScrollY;
                                    }
                                }
                            }, 0
                        );
                     })(dragged[i++]);
                }
            }

              
            if (_document.readyState == 'complete') {
                reset();
            } else {
                _window[addEventListener]('load', reset, 0);
            }

            exports.reset = reset;
        }));
        /*End Scroller JS*/

        /*Add Map*/
        if (jQuery(".wtrcam_main").width() > 491){
            mapelement = jQuery(this).closest(".camslider").find(".cammapbox");
            createnewmap(mapelement);    
        }
        /*End Map*/   

        jQuery(".slider-nav").slick("refresh");
        jQuery(".slider-for").slick("refresh");
    });

    /*Close the cam in zoom*/
    /*jQuery(document).on("click", ".close_pop, .wtrcam_main_pop_overlay", function(){*/
    jQuery(document).on("click", ".close_pop", function(){
        jQuery(this).parent(".wtrcam_main_pop").removeClass("open_pop");
        jQuery(this).parent().find(".camslider").removeClass("sbar_open");
        jQuery(this).parent().find(".camslider").removeClass("bt_content_white");

        modid = jQuery(this).parent().find(".wtrcam_main").attr("modid");
        jQuery(".slider-nav").slick("refresh");
        jQuery(".slider-for").slick("refresh");
        resizeboxes("wtrcam_main"+modid);
    });

    jQuery(document).on("click", ".close_pop_sbar", function(){
        
        jQuery(".wtrcam_main_pop").removeClass("open_pop"); 
        jQuery(".camslider").removeClass("sbar_open");
        jQuery(".camslider").removeClass("bt_content_white");

        modid = jQuery(this).attr("modid");

        jQuery(".slider-nav").slick("refresh");
        jQuery(".slider-for").slick("refresh");

        resizeboxes("wtrcam_main"+modid);
    });
});

function createnewmap(mapelement)
{
    //console.log("mapcalled");
    mapboxid = mapelement.attr('id');

    maplat = mapelement.attr('maplat');
    maplon = mapelement.attr('maplon');

    acclat = mapelement.attr('acclat');
    acclon = mapelement.attr('acclon');

    if(maparray[mapboxid] !== undefined)
    {
        maparray[mapboxid].remove();
        delete maparray[mapboxid];
    }


    if( maplat != "" && maplon != "" )
    {
        var LeafIcon = L.Icon.extend({
            options: {
                iconSize: [25, 36],
                iconAnchor: [12, 46],
                popupAnchor: [1, -34],
                shadowSize: [46, 36]
            }
        });


        var greenIcon = new LeafIcon({iconUrl: 'https://webcamwidget.fullmarketing.at/assets/img/AccMark.png'});
        var redIcon = new LeafIcon({iconUrl: 'https://webcamwidget.fullmarketing.at/assets/img/CamMark.png'});


        if(acclat != "" && acclon != "")
        {
            locations = [ ["Accommodation", acclat, acclon, greenIcon], ["Cam", maplat, maplon, redIcon] ];
        }
        else
        {
            locations = [ ["Accommodation", acclat, acclon, greenIcon] ];    
        }

        maparray[mapboxid] = L.map(mapboxid, { 
                                attributionControl:false, 
                                dragging: true, 
                                scrollWheelZoom: 'center' 
                            }).setView([maplat, maplon], 7, true);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        }).addTo(maparray[mapboxid]);

        if(acclat != "" && acclon != "")
        {
            mapLink = 
                '<a href="https://openstreetmap.org">OpenStreetMap</a>';
            L.tileLayer(
                'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
                attribution: 'Map data &copy; ' + mapLink,
                maxZoom: 18,
                }).addTo(maparray[mapboxid]);

            for (var i = 0; i < locations.length; i++) {
              marker = new L.marker([ locations[i][1], locations[i][2] ], {icon: locations[i][3] }).addTo(maparray[mapboxid]);
            }    
        }
        else
        {
            new L.marker([maplat, maplon], {icon: redIcon }).addTo(maparray[mapboxid]);    
        }
        

        

    }

}