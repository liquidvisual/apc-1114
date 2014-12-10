/*
    MAIN SCRIPTS - Last updated: 00-00-00
*/
//-----------------------------------------------------------------
// Variables
//-----------------------------------------------------------------

var TOUCH_ENABLED = $(".touch").length;
var bxSliderHero;

//-----------------------------------------------------------------
// Document Ready
//-----------------------------------------------------------------

$(document).ready(function() {
    NProgress.start(); // Start preloader bar
    setupHero();
});

$(window).load(function() {
    NProgress.done();
});

//-----------------------------------------------------------------
// setupHero
//-----------------------------------------------------------------

function setupHero() {
    bxSliderHero = $('.js-carousel').bxSlider({
        auto: (TOUCH_ENABLED ? false : false),
        mode: 'horizontal',
        adaptiveHeight: true,
        responsive: true,
        touchEnabled: false,
        pause: 10000, // Slow timer
        slideMargin: 0,
        slideSelector: ".lv-hero",
        minSlides: 1,
        // controls: true,
        nextSelector: ".lv-hero-next",
        prevSelector: ".lv-hero-prev",
        nextText: "",
        prevText: "",
        infiniteLoop: true,
        touchEnabled: true,
        useCSS: true,
        pager: (TOUCH_ENABLED ? false : true),
        pagerSelector: '.lv-hero-carousel-bullets',
        onSliderLoad:  function(){  $('.lv-hero-caption').show().addClass('fadeInLeft');},
        onSlideBefore: function(){  $('.lv-hero-caption').hide().removeClass('fadeInLeft');},
        onSlideAfter:  function(){  $('.lv-hero-caption').show().addClass('fadeInLeft');}
    });
}

//-----------------------------------------------------------------
// Carousel
//-----------------------------------------------------------------

// $('#lv-hero-carousel').slick({
//     autoplay: false,
//     autoplaySpeed: 8000,
//     // dots: true,
//     infinite: true,
//     speed: 500,
//     // fade: true,
//     slide: '.lv-hero',
//     cssEase: 'linear',
//     responsive: [
//         {
//           breakpoint: 640,
//           settings: {
//             autoplay: false,
//             swipe: false
//           }
//         }
//       ]
// });

//-----------------------------------------------------------------
// Kickstart Foundation / Touch Conditionals
//-----------------------------------------------------------------

var touchEvent = TOUCH_ENABLED ? "touchstart" : "click";

//Trigger hamburger by touch on mobile - this eliminates glitch with FastClick.js
$(".header-mobile-menu").css({"visibility": "visible"}).bind(touchEvent, function() {
    $(".js-off-canvas-menu").trigger("open.mm");
});

if (TOUCH_ENABLED) {
    // Make Accordion jump to the top of the heading on mobile
    // http://foundation.zurb.com/forum/posts/1316-accordion-jump-to-top-when-active
    /*$(document).foundation('accordion', {
        callback: function (el){
            var containerPos = $(el).parent().offset().top;
            $('html, body').animate({ scrollTop: containerPos }, 300);
        }
    });*/
}
//-----------------------------------------------------------------
// <= IE8 Caution Message
//-----------------------------------------------------------------

//$('.lv-alert .close-btn').click(function(){$(this).parent().hide();});

//-----------------------------------------------------------------
// +++ HELPERS +++
//-----------------------------------------------------------------
//==================================================
// Developer: COMMAND+S for screen width
//==================================================

$(document).keypress(function(event) {
    if (event.which == 115 && (event.ctrlKey||event.metaKey)||(event.which == 19)) {
        event.preventDefault();
        alert("(w) "+$(window).width()+" (h) "+$(window).height());
        return false;
    }
    return true;
});
//==================================================
//
//==================================================