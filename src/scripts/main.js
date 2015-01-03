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
    // setupWow();

    //==================================================
    // Masonry for Dropdowns
    //==================================================

    $('.topbar .dropdown > ul').masonry({
        itemSelector: '.topbar .dropdown > ul > li'
    });

});

//-----------------------------------------------------------------
// Window Loaded
//-----------------------------------------------------------------

$(window).load(function() {
    NProgress.done();
});

//-----------------------------------------------------------------
// Remove on Deploy
//-----------------------------------------------------------------

if ($("#enu").length) {
    $('link[href*="/css/apc"], link[href*="/assets/css/optimized-apc"]').remove();
} else {
    $('link[href*="/css/enu.css"], link[href*="/assets/css/optimized-enu"]').remove();
}

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
        useCSS: true,
        pager: (TOUCH_ENABLED ? false : true),
        pagerSelector: '.lv-hero-carousel-bullets',
        onSliderLoad:  function(){  $('.lv-hero-caption').show().addClass('fadeInLeft');},
        onSlideBefore: function(){  $('.lv-hero-caption').hide().removeClass('fadeInLeft');},
        onSlideAfter:  function(){  $('.lv-hero-caption').show().addClass('fadeInLeft');}
    });
}

//-----------------------------------------------------------------
// Setup Wow
//-----------------------------------------------------------------

// function setupWow() {
//     // If NOT mobile or touch device, enhance with transition effects

//         var wow = new WOW(
//           {
//             boxClass:     'wow',      // default
//             animateClass: 'animated', // default
//             offset:       0          // default
//           }
//         ).init();

// }

//-----------------------------------------------------------------
// Testimonial Slider
//-----------------------------------------------------------------

$('.testimonial-slider').slick({
  autoplay: true,
  centerMode: true,
  slidesToShow: 3,
  variableWidth: true,
  slide: '.testimonial-block',
  arrow: true,
  speed: 800,
  responsive: [
    {
      breakpoint: 768,
      settings: {
        arrows: false,
        variableWidth: true,
        centerMode: true,
        centerPadding: '40px',
        slidesToShow: 1,
        speed: 500,
      }
    },
    {
      breakpoint: 490,
      settings: {
        autoplay: false,
        arrows: false,
        centerMode: true,
        centerPadding: '0',
        slidesToShow: 1,
        speed: 500,
        variableWidth: false,
      }
    }
  ]
});

//-----------------------------------------------------------------
// Gallery Slider
//-----------------------------------------------------------------

$('.slider-for').slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    fade: true,
    asNavFor: '.slider-nav'
});
$('.slider-nav').slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    asNavFor: '.slider-for',
    dots: false,
    centerMode: false,
    focusOnSelect: true
});

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
// Off Canvas Menu
//-----------------------------------------------------------------

$(".js-off-canvas-menu-left").mmenu({ "offCanvas": { "position": "left" }});
$(".js-off-canvas-menu-right").mmenu({ "offCanvas": { "position": "right" }});

//-----------------------------------------------------------------
// Kickstart Foundation / Touch Conditionals
//-----------------------------------------------------------------

var touchEvent = TOUCH_ENABLED ? "touchstart" : "click";

//Trigger hamburger by touch on mobile - this eliminates glitch with FastClick.js
$(".header-mobile-menu").bind(touchEvent, function(e) {
    e.preventDefault();
    $(".js-off-canvas-menu-left").removeClass('hide').trigger("open.mm");
});

$(".language-selector .mobile-menu-trigger").bind(touchEvent, function(e) {
    e.preventDefault();
    $(".js-off-canvas-menu-right").removeClass('hide').trigger("open.mm");
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