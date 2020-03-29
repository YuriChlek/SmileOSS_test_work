define([
        'jquery',
        'AutoSound_Theme/js/readmore',
    ],
    function ($) {
        'use strict';
        return function () {
            $('.article.additional').readmore({
                speed: 450,
                maxHeight: 345,
                heightMargin: 16,
                moreLink: '<a class="read-more" href="#">Показать все характеристики</a>',
                lessLink: '<a class="close" href="#">Cкрыть</a>',
            });
            $('.article.description').readmore({
                speed: 350,
                maxHeight: 151,
                heightMargin: 16,
                moreLink: '<a class="read-more" href="#">Подробнее</a>',
                lessLink: '<a class="close" href="#">Cкрыть</a>',
            })
        }
    });
