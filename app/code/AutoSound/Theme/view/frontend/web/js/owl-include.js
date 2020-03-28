define([
        'jquery',
        'addOwlCarousel'
    ],
    function ($) {
        'use strict';

        return function (config, elem) {
            $(elem).owlCarousel({
                loop: true,
                margin: 0,
                nav: true,
                responsiveClass: true,
                responsive: {
                    0: {
                        items: 1,
                        nav: false
                    },
                    480: {
                        items: 2,
                        nav: false
                    },
                    768: {
                        items: 3,
                        nav: false
                    },
                    1024: {
                        items: 5,
                        nav: true,
                        loop: false
                    }
                }
            })
        }
    });
