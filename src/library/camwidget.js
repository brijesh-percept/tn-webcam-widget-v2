// Close popup if ESC key pressed.
document.onkeydown = function (evt) {
    evt = evt || window.event;
    var isEscape = false;
    if ("key" in evt) {
        isEscape = (evt.key === "Escape" || evt.key === "Esc");
    } else {
        isEscape = (evt.keyCode === 27);
    }
    if (isEscape) {
        var modal = document.getElementById("divulge-myModal");
        modal.style.display = "none";
    }
};

//Writing the model code.
document.write('<div onclick="divulge_close_model()" id="divulge-myModal" class="divulge-modal"><span class="divulge-close" onclick="divulge_close_model()">&times;</span><img class="divulge-modal-content" id="divulge-img01"><div id="caption"></div></div>');


//Play Pause the videos on image click
export function pause_function(parent)
{
    console.log(parent);
    document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.add("fa-play");
    document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.remove("fa-pause");

    document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.add("fa-play");
    document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.remove("fa-pause");

    window['divulge_timeout_' + parent] = 0;
    clearTimeout(window['divulge_settimeout_' + parent]);
}

export function play_pause_function(parent)
{
    //console.log(document.getElementById("play-pause-"+parent).getElementsByTagName("i")[0]);
    if (document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.contains("fa-play")) {
        
        document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.remove("fa-play");
        document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.add("fa-pause");

        document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.remove("fa-play");
        document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.add("fa-pause");
        
        fivulge_play_slider(parent);

    } else {

        document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.add("fa-play");
        document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.remove("fa-pause");

        document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.add("fa-play");
        document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.remove("fa-pause");


        window['divulge_timeout_' + parent] = 0;
        clearTimeout(window['divulge_settimeout_' + parent]);

    }
}

//Open enlarged image in popuo when image is clicked.
export function divulge_model(img) {
    var modal = document.getElementById("divulge-myModal");
    // Get the modal
    // Get the image and insert it inside the modal - use its "alt" text as a caption
    var modalImg = document.getElementById("divulge-img01");
    var captionText = document.getElementById("divulge-caption");
    modal.style.display = "block";
    modalImg.src = img;
}

export function zoomcamimg(el) {
    //thisimgg = el.parent().parent().parent().find('.zoommyimg').attr('zoomimgsrc');
    window.thisimgg = el.closest('.zoommyimg').attr('zoomimgsrc');
    //console.log(thisimgg);
    //divulge_model();
}

// When the user clicks on <span> (x), close the modal
export function divulge_close_model() {
    // Get the <span> element that closes the modal
    var span = document.getElementsByClassName("close")[0];
    var modal = document.getElementById("divulge-myModal");
    modal.style.display = "none";
}


//loading images from DB trough ajax call
export function divulge_load_images(set_day, parent, firstload, daychange = 0, play = 0, period_today = 0, lang = 'de') {
    var x1_val = 'divulge_cam_id-' + parent;
    var request = 'cam_' + parent;
    var img_id = 'img-' + parent;
    var img_holder = document.getElementsByClassName('divulge-loaded-images-' + parent);
    if (img_holder.length > 1) {
        for (var i = 0; i <= (img_holder.length - 1); i++) {
            img_holder[i].remove();
        }
    }

    var x1 = document.getElementById("divulge-parent-" + parent).parentNode.clientWidth;
    if (play == 0 || 1 == 1) {
        document.getElementById('divulge_loading_' + parent).style.display = "none";
    }
    request = new XMLHttpRequest();
    request.open(
        "get",
        'https://webcamwidget.fullmarketing.at/ajax-img-load.php?camid=' + document.getElementById(x1_val).value + '&day=' + set_day + '&parent=' + parent + '&firstload=' + firstload + '&imageSize=' + x1 + '&daychange=' + daychange + '&play=' + play + '&period_today=' + period_today + '&lang=' + lang
    );
    request.send();
    request.onload = function () {
        //console.log(request.responseText);
        if (request.responseText) {

            var obj = JSON.parse(request.responseText);
            document.getElementById("temp-img-" + parent).setAttribute('data-src', obj.src);
            if (obj.period_today) {
                document.getElementById("period-today-" + parent).value = obj.period_today;
                document.getElementById("c-mobile-view-" + parent).getElementsByClassName("show-week")[0].innerHTML = obj.period_today_show;
                document.getElementById("temp-img-" + parent).innerHTML = '<img onclick="divulge_model(' + obj.src + ')" onload="divulge_showSlides(\'' + parent + '\',1,\'' + obj.period_today + '\')" src="' + obj.src + '"/>';
            } else {
                document.getElementById("temp-img-" + parent).innerHTML = '<img onclick="divulge_model(' + obj.src + ')" onload="divulge_showSlides(\'' + parent + '\',1)" src="' + obj.src + '"/>';
            }


            //document.getElementsByClassName("divulge_slides_"+parent)[0].innerHTML += '<img class="divulge-loaded-images-'+parent+'" onload="divulge_showSlides(\''+parent+'\')" src="'+obj.src+'"/>';


            if (document.getElementById("divulge-date-" + parent).value != document.getElementById("divulge-today-" + parent).value) {
                document.getElementById("range-" + parent).max = 96;
                //document.getElementById("divulge-date-area-"+parent).innerHTML =document.getElementById("divulge-date-"+parent).value+' '+document.getElementById('rang-time-'+parent).value;
            } else {
                if (obj.case_today == 1) {
                    document.getElementById("range-" + parent).max = obj.time;
                    document.getElementById('rang-time-' + parent).value = obj.timeInner;
                    // document.getElementById("divulge-date-area-"+parent).innerHTML +=document.getElementById("divulge-date-"+parent).value+' '+obj.timeInner;
                } else {
                    // document.getElementById("divulge-date-area-"+parent).innerHTML =document.getElementById("divulge-date-"+parent).value+' '+document.getElementById('rang-time-'+parent).value;
                }
            }
            if (daychange == 1) {
                document.getElementById("range-" + parent).min = obj.time_start;
            }

            if (play == 1) {
                document.getElementById("range-" + parent).value = obj.time;
                document.getElementById('rang-time-' + parent).value = obj.timeInner;
            }

            var range = document.getElementById('range-' + parent);
            var rangeV = document.getElementById('rangeV-' + parent);
            var newValue = Number((range.value - range.min) * 100 / (range.max - range.min)),
                newPosition = 10 - (newValue * 0.2);
            //time=range.value;
            var time = (range.value - 1) * 15;
            if (time >= 60) {
                time = recur_time(time);
                if (time == 0) {
                    time = '00';
                }
            }
            if (range.value <= 48) {
                var day_night = 'am';
            } else {
                var day_night = 'pm';
            }
            
            if(time == "0")
            { time = "00"; }

            rangeV.innerHTML = '<span>' + divulge_hours(range.value) + ':' + time + ' ' + day_night + '</span>';
            rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;


        } else {
            alert('No Data Found For select period/ date');
            document.getElementById('c-mobile-view-' + parent).style.display = "none";
            document.getElementById('divulge_loading_' + parent).style.display = "none";

        }

    }
}

//this functions is handling the slide show.
export function divulge_showSlides(parent, temp_img_load = 0, period_today = 0) {
    var img_id = 'img-' + parent;
    var i;
    var img_holder = document.getElementsByClassName('divulge-loaded-images-' + parent);
    var divulge_arr_index = (img_holder.length) - 1;
    //img_holder[divulge_arr_index].classList.add('divulge-fade');
    document.getElementById('divulge_loading_' + parent).style.display = "none";
    var range = document.getElementById('range-' + parent);
    var rangeV = document.getElementById('rangeV-' + parent);
    var newValue = Number((range.value - range.min) * 100 / (range.max - range.min)),
        newPosition = 10 - (newValue * 0.2);
    //time=range.value;
    var time = (range.value - 1) * 15;
    if (time >= 60) {
        time = recur_time(time);
        if (time == 0) {
            time = '00';
        }
    }
    if (range.value <= 48) {
        var day_night = 'am';
    } else {
        var day_night = 'pm';
    }
    
    if (time == 0 || time == "0") {
        time = '00';
    }
    rangeV.innerHTML = '<span>' + divulge_hours(range.value) + ':' + time + ' ' + day_night + '</span>';
    rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;


    //window['divulge_timeout_'+parent]=setTimeout(divulge_slide_loaded, 1000,parent);
    if (temp_img_load == 1) {
        var src = document.getElementById("temp-img-" + parent).getAttribute("data-src");
        //document.getElementsByClassName("divulge_slides_"+parent)[0].innerHTML += '<img onclick="divulge_model(\''+src.replace("-910", "-1210").replace("-310","-1210").replace("-610","-1210")+'\')" class="divulge-loaded-images-'+parent+'" style="opacity:0;" src="'+src+'"/>';
        document.getElementsByClassName("divulge_slides_" + parent)[0].innerHTML += '<img zoomimgsrc="' + src + '" class="zoommyimg divulge-loaded-images-' + parent + '" style="opacity:0;" src="' + src + '"/>';
        var myopacity = 0;

        function MyFadeFunction() {
            if (myopacity < 1) {
                myopacity += .1;
                setTimeout(function () { MyFadeFunction() }, 50);
            } else {
                if (window['divulge_timeout_' + parent] == 1) {

                    //set delay here, for play pause button

                    var d = new Date().getTime();

                    if (d > window['divulge_timer_' + parent]) {
                        window['divulge_timer_' + parent] = d + 1000 * 2;
                        if (document.getElementById("period-" + parent).value != 'daily') {
                            divulge_load_images(document.getElementById("period-" + parent).value, parent, 2, 0, 1, period_today);
                        } else {
                            divulge_load_images(document.getElementById("divulge-date-" + parent).value, parent, document.getElementById('rang-time-' + parent).value, 0, 1);
                        }
                    } else {
                        window['divulge_settimeout_' + parent] = setTimeout(fivulge_play_slider, 1000, parent);
                    }
                }
            }
            if (typeof img_holder[1] !== 'undefined') {
                img_holder[1].style.opacity = myopacity;
            }
        }

        MyFadeFunction();


        /*document.getElementById("temp-img-"+parent).innerHTML='';
        document.getElementById("temp-img-"+parent).setAttribute('data-src',''); */
    }


}
export function fivulge_play_slider(parent) {
    //console.log(parent);
    document.getElementById("c-mobile-view-" + parent).getElementsByClassName("wtrcam_lv_dot")[0].classList.remove("wtrcam_lv_dot_red");
    document.getElementById("c-mobile-view-" + parent).getElementsByClassName("wtrcam_lv_dot")[0].classList.add("wtrcam_lv_dot_gray");

    //console.log(document.getElementById("period-" + parent).value);
    if (document.getElementById("period-" + parent).value != 'daily') {
        divulge_load_images(document.getElementById("period-" + parent).value, parent, 2, 0, 1, document.getElementById("period-today-" + parent).value);
    } else {
        divulge_load_images(document.getElementById("divulge-date-" + parent).value, parent, document.getElementById('rang-time-' + parent).value, 0, 1);
    }
    window['divulge_timeout_' + parent] = 1;

    var d = new Date().getTime() + 1000 * 2;

    window['divulge_timer_' + parent] = d;
    //console.log('fired secs: ' + window['divulge_timer_' + parent]);
    //play_time = setTimeout(fivulge_play_slider, 3000);
}

//doing stuff on play/pause button.
export function ajax_loaded(parent, lang) {



    document.getElementById("play-pause-" + parent).onclick = function () {
        //console.log(document.getElementById("play-pause-"+parent).getElementsByTagName("i")[0]);
        if (document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.contains("fa-play")) {
            
            document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.remove("fa-play");
            document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.add("fa-pause");

            document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.remove("fa-play");
            document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.add("fa-pause");
            
            fivulge_play_slider(parent);

        } else {

            document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.add("fa-play");
            document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.remove("fa-pause");

            document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.add("fa-play");
            document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.remove("fa-pause");


            window['divulge_timeout_' + parent] = 0;
            clearTimeout(window['divulge_settimeout_' + parent]);

        }
    }

    document.getElementById("play-pause-center-" + parent).onclick = function () {
        
        //console.log(document.getElementById("play-pause-"+parent).getElementsByTagName("i")[0]);
        if (document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.contains("fa-play")) {
            
            document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.remove("fa-play");
            document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.add("fa-pause");

            document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.remove("fa-play");
            document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.add("fa-pause");
            
            fivulge_play_slider(parent);
        } else {
            
            document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.add("fa-play");
            document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.remove("fa-pause");
            
            document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.add("fa-play");
            document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.remove("fa-pause");

            window['divulge_timeout_' + parent] = 0;
            clearTimeout(window['divulge_settimeout_' + parent]);
        }
    }


    document.getElementById("period-" + parent).onchange = function () {
        if (document.getElementById("period-" + parent).value != 'daily') {

            document.getElementById("wtrcam_sbar" + parent).getElementsByClassName('divulge-date-holder')[0].classList.add("disable-calendar");

            document.getElementById("c-mobile-view-" + parent).getElementsByClassName("range-wrap")[0].classList.add("hide-visibility");
            document.getElementById("c-mobile-view-" + parent).getElementsByClassName("show-week")[0].classList.remove("hide-visibility");

            document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.remove("fa-play");
            document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.add("fa-pause");

            document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.remove("fa-play");
            document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.add("fa-pause");

            window['divulge_timeout_' + parent] = 0;
            clearTimeout(window['divulge_settimeout_' + parent]);
            document.getElementById("period-today-" + parent).value = '';

            setTimeout(fivulge_play_slider, 2000, parent);

        } else {
            //document.getElementById("wtrcam_sbar" + parent).getElementsByClassName('divulge-date-holder')[0].style.display = 'inline-block';
            document.getElementById("wtrcam_sbar" + parent).getElementsByClassName('divulge-date-holder')[0].classList.remove("disable-calendar");
            divulge_load_images(document.getElementById("divulge-date-" + parent).value, parent, document.getElementById('rang-time-' + parent).value, 1);
            document.getElementById("c-mobile-view-" + parent).getElementsByClassName("range-wrap")[0].classList.remove("hide-visibility");
            document.getElementById("c-mobile-view-" + parent).getElementsByClassName("show-week")[0].classList.add("hide-visibility");
            
            document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.add("fa-play");
            document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.remove("fa-pause");
            
            document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.add("fa-play");
            document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.remove("fa-pause");

            window['divulge_timeout_' + parent] = 0;
            clearTimeout(window['divulge_settimeout_' + parent]);
        }

    }

    //change slider images based on user selected period.
    document.getElementById("divulge-date-" + parent).onchange = function () {
        var img_id = 'img-' + parent;
        //document.getElementById(img_id).classList.remove('divulge-fade');
        //document.getElementById('divulge_loading_'+parent).style.display = "none";

        if (document.getElementById("divulge-date-" + parent).value != document.getElementById("divulge-today-" + parent).value) {
            divulge_load_images(document.getElementById("divulge-date-" + parent).value, parent, document.getElementById('rang-time-' + parent).value, 1);
        } else {
            divulge_load_images(document.getElementById("divulge-date-" + parent).value, parent, 1);
        }
        document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.add("fa-play");
        document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.remove("fa-pause");

        document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.add("fa-play");
        document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.remove("fa-pause");


        window['divulge_timeout_' + parent] = 0;
        clearTimeout(window['divulge_settimeout_' + parent]);
    }

    document.getElementById("range-" + parent).onchange = function () {
        var img_id = 'img-' + parent;
        //document.getElementById(img_id).classList.remove('divulge-fade');
        //document.getElementById('divulge_loading_'+parent).style.display = "none";
        divulge_load_images(document.getElementById("divulge-date-" + parent).value, parent, document.getElementById('rang-time-' + parent).value);
        
        document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.add("fa-play");
        document.getElementById("play-pause-" + parent).getElementsByTagName("i")[0].classList.remove("fa-pause");

        document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.add("fa-play");
        document.getElementById("play-pause-center-" + parent).getElementsByTagName("i")[0].classList.remove("fa-pause");
        
        window['divulge_timeout_' + parent] = 0;
        clearTimeout(window['divulge_settimeout_' + parent]);
    }



    const
        range = document.getElementById('range-' + parent),
        rangeV = document.getElementById('rangeV-' + parent),
        setValue = () => {
            const
                newValue = Number((range.value - range.min) * 100 / (range.max - range.min)),
                newPosition = 10 - (newValue * 0.2);
            //time=range.value;
            var time = (range.value - 1) * 15;
            if (time >= 60) {
                time = recur_time(time);
                if (time == 0) {
                    time = '00';
                }
            }
            if (range.value <= 48) {
                var day_night = 'am';
            } else {
                var day_night = 'pm';
            }
            if (time == 0) {
                time = '00';
            }
           
            rangeV.innerHTML = '<span>' + divulge_hours(range.value) + ':' + time + ' ' + day_night + '</span>';
            document.getElementById('rang-time-' + parent).value = divulge_hours(range.value) + ':' + time + ' ' + day_night;
            rangeV.style.left = `calc(${newValue}% + (${newPosition}px))`;
        };

    document.addEventListener("DOMContentLoaded", setValue);
    range.addEventListener('input', setValue);


    divulge_slide_loaded(parent);

    document.getElementById('c-mobile-view-' + parent).style.width = document.getElementById("divulge-parent-" + parent).parentNode.clientWidth + 'px';

    document.getElementById('c-mobile-view-' + parent).getElementsByClassName('divulge-slider-area')[0].style.width = document.getElementById("divulge-parent-" + parent).parentNode.clientWidth + 'px';

    if (document.getElementById("divulge-parent-" + parent).parentNode.clientWidth < 300) {
        document.getElementById("c-mobile-view-" + parent).getElementsByClassName('c-switcher__button')[0].style.display = 'none';
    }




}
export function divulge_set_height(parent) {
    document.getElementById('c-mobile-view-' + parent).getElementsByClassName('divulge-slider-area')[0].style.height = document.getElementsByClassName('divulge-loaded-images-' + parent)[0].height + 'px';
}
export function divulge_slide_loaded(parent) {
    //show slide
    divulge_showSlides(parent, 0);
    window['divulge_slide_' + parent] = 0;


    //divulge_timeout=setTimeout(divulge_slide_loaded, 1000,parent);
}

export function divulge_img_loaded(divid) {
    var img_id = 'img-' + divid;
    var div_id = 'c-mobile-view-' + divid;
    document.getElementById(div_id).style.display = "block";
    //console.log(document.getElementsByClassName('divulge-loaded-images-'+divid)[0].naturalHeight);
    //console.log(document.getElementsByClassName('divulge-loaded-images-'+divid)[0].height);
    //document.getElementById('c-mobile-view-'+divid).getElementsByClassName('divulge-slider-area')[0].style.height = 300;
    document.getElementById('c-mobile-view-' + divid).getElementsByClassName('divulge-slider-area')[0].style.height = document.getElementsByClassName('divulge-loaded-images-' + divid)[0].height + 'px';
    document.head.insertAdjacentHTML("beforeend", '<style>.divulge_slides_' + divid + ' img{position: absolute;}</style>');
    setTimeout(divulge_set_height, 3000, divid);

}




export function recur_time(time) {
    var time = time - 60;
    if (time >= 60) {
        return recur_time(time);
    } else {
        return time;
    }
}
export function divulge_hours(numbers) {
    if (numbers == 1 || numbers == 2 || numbers == 3 || numbers == 4 || numbers == 49 || numbers == 50 || numbers == 51 || numbers == 52) {
        return 12;
    } else if (numbers == 5 || numbers == 6 || numbers == 7 || numbers == 8 || numbers == 53 || numbers == 54 || numbers == 55 || numbers == 56) {
        return 1;
    } else if (numbers == 9 || numbers == 10 || numbers == 11 || numbers == 12 || numbers == 57 || numbers == 58 || numbers == 59 || numbers == 60) {
        return 2;
    } else if (numbers == 13 || numbers == 14 || numbers == 15 || numbers == 16 || numbers == 61 || numbers == 62 || numbers == 63 || numbers == 64) {
        return 3;
    } else if (numbers == 17 || numbers == 18 || numbers == 19 || numbers == 20 || numbers == 65 || numbers == 66 || numbers == 67 || numbers == 68) {
        return 4;
    } else if (numbers == 21 || numbers == 22 || numbers == 23 || numbers == 24 || numbers == 69 || numbers == 70 || numbers == 71 || numbers == 72) {
        return 5;
    } else if (numbers == 25 || numbers == 26 || numbers == 27 || numbers == 28 || numbers == 73 || numbers == 74 || numbers == 75 || numbers == 76) {
        return 6;
    } else if (numbers == 29 || numbers == 30 || numbers == 31 || numbers == 32 || numbers == 77 || numbers == 78 || numbers == 79 || numbers == 80) {
        return 7;
    } else if (numbers == 33 || numbers == 34 || numbers == 35 || numbers == 36 || numbers == 81 || numbers == 82 || numbers == 83 || numbers == 84) {
        return 8;
    } else if (numbers == 37 || numbers == 38 || numbers == 39 || numbers == 40 || numbers == 85 || numbers == 86 || numbers == 87 || numbers == 88) {
        return 9;
    } else if (numbers == 41 || numbers == 42 || numbers == 43 || numbers == 44 || numbers == 89 || numbers == 90 || numbers == 91 || numbers == 92) {
        return 10;
    } else if (numbers == 45 || numbers == 46 || numbers == 47 || numbers == 48 || numbers == 93 || numbers == 94 || numbers == 95 || numbers == 96) {
        return 11;
    }
}
document.head.insertAdjacentHTML("beforeend", '<style>path{display: none;}</style>')