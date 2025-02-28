/*
Template: Nutritius - Nutrition & Health Services HTML Template
Author: peacefulqode.com
Version: 1.1
Design and Developed by: PeacefulQode
*/


/*================================================
[  Table of contents  ]
==================================================

==> Page Loader
==> Search Button
==> Accordion
==> Sidebar Toggle
==> Sticky Header
==> Owl Carousel
==> Progressbar
==> Back To Top
==> Isotope
==> counter
==> Video
==> BMI Calculator
==> Gallery

==================================================
[ End table content ]
================================================*/



(function (jQuery) {
   "use strict";
   jQuery(window).on('load', function (e) {


      /*==================================================
      [ Page Loader ]
      ==================================================*/
      jQuery("#pq-loading").fadeOut();
      jQuery("#pq-loading").delay(0).fadeOut("slow");

      var Scrollbar = window.Scrollbar;


      /*==================================================
      [ Search Button ]
      ==================================================*/
      jQuery('#pq-seacrh-btn').on('click', function () {
         jQuery('.pq-search-form').slideToggle();
         jQuery('.pq-search-form').toggleClass('pq-form-show');
         if (jQuery('.pq-search-form').hasClass("pq-form-show")) {
            jQuery(this).html('<i class="ti-close"></i>');
         } else {
            jQuery(this).html('<i class="ti-search"></i>');
         }
      });


      /*==================================================
      [ Accordion ]
      ==================================================*/
      jQuery('.pq-accordion-block .pq-accordion-box .pq-accordion-details').hide();
      jQuery('.pq-accordion-block .pq-accordion-box:first').addClass('pq-active').children().slideDown('slow');
      jQuery('.pq-accordion-block .pq-accordion-box').on("click", function () {
         if (jQuery(this).children('div.pq-accordion-details').is(':hidden')) {
            jQuery('.pq-accordion-block .pq-accordion-box').removeClass('pq-active').children('div.pq-accordion-details').slideUp('slow');
            jQuery(this).toggleClass('pq-active').children('div.pq-accordion-details').slideDown('slow');
         }
      });


      /*==================================================
      [ Sidebar Toggle ]
      ==================================================*/
      jQuery("#pq-toggle-btn").on('click', function () {
         jQuery('#pq-sidebar-menu-contain').toggleClass("active");
      });

      jQuery('.pq-toggle-btn').click(function () {
         jQuery('body').addClass('pq-siderbar-open');

      });

      jQuery('.pq-close').click(function () {
         jQuery('body').removeClass('pq-siderbar-open');
      });


      /*==================================================
      [ Sticky Header ]
      ==================================================*/
      var view_width = jQuery(window).width();
      if (!jQuery('header').hasClass('pq-header-default') && view_width >= 1023) {
         var height = jQuery('header').height();
         jQuery('.pq-breadcrumb').css('padding-top', height * 1.3);
      }
      if (jQuery('header').hasClass('pq-header-default')) {
         jQuery(window).scroll(function () {
            var scrollTop = jQuery(window).scrollTop();
            if (scrollTop > 300) {
               jQuery('.pq-bottom-header').addClass('pq-header-sticky animated fadeInDown animate__faster');
            } else {
               jQuery('.pq-bottom-header').removeClass('pq-header-sticky animated fadeInDown animate__faster');
            }
         });
      }
      if (jQuery('header').hasClass('pq-has-sticky')) {
         jQuery(window).scroll(function () {
            var scrollTop = jQuery(window).scrollTop();
            if (scrollTop > 300) {
               jQuery('header').addClass('pq-header-sticky animated fadeInDown animate__faster');
            } else {
               jQuery('header').removeClass('pq-header-sticky animated fadeInDown animate__faster');
            }
         });
      }


      /*==================================================
      [ Owl Carousel ]
      ==================================================*/
      jQuery('.owl-carousel').each(function () {
         var app_slider = jQuery(this);
         app_slider.owlCarousel({
            items: app_slider.data("desk_num"),
            loop: app_slider.data("loop"),
            margin: app_slider.data("margin"),
            nav: app_slider.data("nav"),
            dots: app_slider.data("dots"),
            autoplay: app_slider.data("autoplay"),
            autoplayTimeout: app_slider.data("autoplay-timeout"),
            navText: ["<i class='ion-ios-arrow-back'></i><span></span>", "<span></span><i class='ion-ios-arrow-forward'></i>"],
            responsiveClass: true,
            // center: true,
            responsive: {
               // breakpoint from 0 up
               0: {
                  items: app_slider.data("mob_sm"),
                  nav: false
               },
               // breakpoint from 480 up
               480: {
                  items: app_slider.data("mob_num"),
                  nav: false
               },
               // breakpoint from 786 up
               786: {
                  items: app_slider.data("tab_num")
               },
               // breakpoint from 1023 up
               1024: {
                  items: app_slider.data("lap_num")
               },
               1199: {
                  items: app_slider.data("desk_num")
               }
            }
         });
      });

      /*==================================================
      [ Progressbar ]
      ==================================================*/

      jQuery('.pq-progress-bar > span').each(function () {
         var app_slider = jQuery('.pq-progressbar-box-1');
         jQuery(this).progressBar({
            shadow: false,
            animation: true,
            height: app_slider.data('h'),
            percentage: false,
            border: false,
            animateTarget: true,
         });
      });

   });

   /*==================================================
   [ Back To Top ]
   ==================================================*/
   jQuery('#back-to-top').fadeOut();
   jQuery(window).on("scroll", function () {
      if (jQuery(this).scrollTop() > 250) {
         jQuery('#back-to-top').fadeIn(1400);
      } else {
         jQuery('#back-to-top').fadeOut(400);
      }
   });
   jQuery('#top').on('click', function () {
      jQuery('top').tooltip('hide');
      jQuery('body,html').animate({
         scrollTop: 0
      }, 800);
      return false;
   });


   /*==================================================
   [ Isotope ]
   ==================================================*/

   if ($('.pq-masonry,.pq-grid').length > 0) {
      // Do something if class exists



      jQuery('.pq-masonry').isotope({
         itemSelector: '.pq-masonry-item',
         masonry: {
            columnWidth: '.grid-sizer',
            gutter: 0

         }

      });

      jQuery('.pq-grid').isotope({
         itemSelector: '.pq-grid-item',
      });

      jQuery('.pq-filter-button-group').on('click', '.pq-filter-btn', function () {



         var filterValue = jQuery(this).attr('data-filter');
         jQuery('.pq-masonry').isotope({
            filter: filterValue
         });
         jQuery('.pq-grid').isotope({
            filter: filterValue
         });
         jQuery('.pq-filter-button-group .pq-filter-btn').removeClass('active');
         jQuery(this).addClass('active');


      });

      var initial_items = 5;
      var next_items = 3;

      if (jQuery('.pq-masonry').length > 0) {
         var initial_items = jQuery('.pq-masonry').data('initial_items');
         var next_items = jQuery('.pq-masonry').data('next_items');
      }

      if (jQuery('.pq-grid').length > 0) {
         var initial_items = jQuery('.pq-grid').data('initial_items');
         var next_items = jQuery('.pq-grid').data('next_items');
      }

   }


   /*==================================================
   [ counter ]
   ==================================================*/
   jQuery('.timer').countTo();


   /*==================================================
   Timeline
   ==================================================*/

   function Timeline() {
      jQuery(' .cntl').each(function () {
         jQuery(this).cntl({
            revealbefore: 300,
            anim_class: 'cntl-animate',
            onreveal: function (e) {
            }
         });
      });
   }

   if (jQuery(' .cntl').length > 0) {
      Timeline();
   }

   /*==================================================
    [ wow ]
   ==================================================*/

   new WOW().init();

   /*==================================================
   [ Video ]
   ==================================================*/
   $(document).ready(function () {
      $('.popup-youtube, .popup-vimeo, .popup-gmaps').magnificPopup({
         disableOn: 700,
         type: 'iframe',
         mainClass: 'mfp-fade',
         removalDelay: 160,
         preloader: false,
         fixedContentPos: false
      });
   });


   jQuery('#pq-result').hide();

   /* ====================================== */
   /* BMI Calculator
   /* ====================================== */
   // var pq_bmi_calculator = function() {


   jQuery('.pq-bmi-calc').on('change', function () {
      var main = jQuery(this).closest('.pq-bmi-cal');
      var val = jQuery('.pq-bmi-calc:checked', main).val();

      if (val == 'imperial') {
         jQuery('.pq-bmi-imperial', main).show();
         jQuery('.pq-bmi-metric', main).hide();
      } else {
         jQuery('.pq-bmi-imperial', main).hide();
         jQuery('.pq-bmi-metric', main).show();
      }
   });

   jQuery('.pq-bmi-imperial input.pq-input, .pq-bmi-metric input.pq-input').on('keyup', function () {
      var main = jQuery(this).closest('.pq-bmi-cal');
      var type = '';
      if (jQuery(this).closest('.pq-bmi-metric').length > 0) {
         type = 'metric';
         var result_div = jQuery('.pq-bmi-result-metric', main);
         var bmi_num_div = jQuery('.pq-bmi-result-metric-bmi > span', main);
         var height = jQuery('.pq-metric-cm', main).val() / 100; // convert to meter
         var weight = jQuery('.pq-metric-kg', main).val();
         var bmi = weight / Math.pow(height, 2);

      } else {
         type = 'imperial';
         var result_div = jQuery('.pq-bmi-result-imperial', main);
         var bmi_num_div = jQuery('.pq-bmi-result-imperial-bmi > span', main);
         var imperial_feet = jQuery('.pq-imperial-feet', main).val();
         var imperial_inch = jQuery('.pq-imperial-inch', main).val();
         var imperial_lbs = jQuery('.pq-imperial-lbs', main).val();
         var inch = parseFloat(imperial_feet * 12) + parseFloat(imperial_inch);
         var bmi = (imperial_lbs / Math.pow(inch, 2)) * 703;
      }

      var bmi_style = 'bg-success text-white';
      jQuery(bmi_num_div).html(Math.round(bmi * 100) / 100);

      if (bmi < 16) { // 1
         bmi_style = 'bg-danger text-white';
         jQuery('.pq-bmi-result-' + type + '-cat', main).hide();
         jQuery('.pq-bmi-result-' + type + '-cat-1', main).show();

      } else if (bmi < 17) { // 2
         bmi_style = 'bg-warning text-dark';
         jQuery('.pq-bmi-result-' + type + '-cat', main).hide();
         jQuery('.pq-bmi-result-' + type + '-cat-2', main).show();

      } else if (bmi < 18.5) { // 3
         bmi_style = 'bg-info text-white';
         jQuery('.pq-bmi-result-' + type + '-cat', main).hide();
         jQuery('.pq-bmi-result-' + type + '-cat-3', main).show();

      } else if (bmi < 25) { // 4
         bmi_style = 'bg-success text-white';
         jQuery('.pq-bmi-result-' + type + '-cat', main).hide();
         jQuery('.pq-bmi-result-' + type + '-cat-4', main).show();

      } else if (bmi < 30) { // 5
         bmi_style = 'bg-info text-white';
         jQuery('.pq-bmi-result-' + type + '-cat', main).hide();
         jQuery('.pq-bmi-result-' + type + '-cat-5', main).show();

      } else if (bmi < 35) { // 6
         bmi_style = 'bg-warning text-dark';
         jQuery('.pq-bmi-result-' + type + '-cat', main).hide();
         jQuery('.pq-bmi-result-' + type + '-cat-6', main).show();

      } else if (bmi < 40) { // 7
         bmi_style = 'bg-warning text-dark';
         jQuery('.pq-bmi-result-' + type + '-cat', main).hide();
         jQuery('.pq-bmi-result-' + type + '-cat-7', main).show();

      } else { // 8
         bmi_style = 'bg-danger text-white';
         jQuery('.pq-bmi-result-' + type + '-cat', main).hide();
         jQuery('.pq-bmi-result-' + type + '-cat-8', main).show();

      }

      if ((type == 'metric' && jQuery('.pq-metric-cm', main).val() != '' && jQuery('.pq-metric-kg', main).val() != '') || (type == 'imperial' && jQuery('.pq-imperial-feet', main).val() != '' && jQuery('.pq-imperial-inch', main).val() != '' && jQuery('.pq-imperial-lbs', main).val() != '')) {
         jQuery(result_div).removeClass('bg-success bg-danger bg-warning bg-info text-white text-dark pq-hide').addClass(bmi_style).show();
      } else {
         jQuery(result_div).hide();
      }

   });

   /*==================================================
   [ Gallery ]
   ==================================================*/

   jQuery('.gallery').each(function () { // the containers for all your galleries
      jQuery(this).magnificPopup({
         delegate: 'a', // the selector for gallery item
         type: 'image',
         gallery: {
            enabled: true
         }
      });
   });

   // };

})(jQuery);