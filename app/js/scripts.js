$(function() {
    $('[data-stage]').on('mouseenter', function() {
       var id = $(this).attr('data-stage');
       $('[data-stage="'+id+'"]').addClass('is-active');
    });

    $('[data-stage]').on('mouseleave', function() {
       var id = $(this).attr('data-stage');
       $('[data-stage="'+id+'"]').removeClass('is-active');
    });

    $('.consist-head').on('click', function() {
        var t = $(this).parents('.consist');
        if ( !t.hasClass('is-active') ) {
            if ( $('.consist.is-active').length > 0 ) {
                $('.consist.is-active').removeClass('is-active');
            }
            t.addClass('is-active');
        } else {
            t.removeClass('is-active');
        }
    });

    $('.form-file__btn').on('click', function() {
       $(this).parent('.form-file').find('input[type="file"]').trigger('click');
    });

    $('.form-file__input').on('change', function() {
        var t = $(this);
        var p = $(this).parents('.form-file');
        var btn = p.find('.form-file__text');
        if ( t.val() === '' ) {
            btn.text(btn.attr('data-default'));
        } else {
            var filename = t.val().replace(/^.*\\/, '');
            btn.text(filename).show();
        }
    });

    $(document).on('click', function(e) {
        var consist = $('.consist');
        if ( !consist.is(e.target) && consist.has(e.target).length === 0 ) {
            consist.removeClass('is-active');
        }
    });

    var hitsSlider = $('.js-hits-slider');
    var hitsNavElem = $('.hits-nav');
    var hitsCount = hitsSlider.find('.hits-slider__col').length;

    hitsSlider.slick({
		slidesToShow: 6,
		slidesToScroll: 1,
		arrows: false,
        dots: false,
		cssEase: 'ease-in-out',
		speed: 300,
		adaptiveHeight: true,
        infinite: false,
        /*swipe: false,
        touchMove: false,*/
        responsive: [
            {
                breakpoint: 1770,
                settings: {
                    slidesToShow: 5,
                }
            }, {
                breakpoint: 1280,
                settings: {
                    slidesToShow: 4
                }
            }, {
                breakpoint: 992,
                settings: {
                    slidesToShow: 3
                }
            }, {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2
                }
            }, {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1
                }
            }
        ]
	});

    hitsSlider.on('afterChange', function(event, slick, currentSlide) {
        if ( hitsNavElem.hasClass('ui-slider') ) {
            hitsNavElem.slider('value', currentSlide);
        }
    });

    function hitsNav() {
        hitsNavElem.hide();

        if ( hitsNavElem.hasClass('ui-slider') ) {
            hitsNavElem.slider('destroy');
        }

        if ( Modernizr.mq('(min-width:1770px)') ) {
            hitsOnPage = 6;
        } else if ( Modernizr.mq('(max-width:1769px)') && Modernizr.mq('(min-width:1280px)') ) {
            hitsOnPage = 5;
        } else if ( Modernizr.mq('(max-width:1279px)') && Modernizr.mq('(min-width:992px)') ) {
            hitsOnPage = 4;
        } else if ( Modernizr.mq('(max-width:991px)') && Modernizr.mq('(min-width:768px)') ) {
            hitsOnPage = 3;
        } else if ( Modernizr.mq('(max-width:767px)') && Modernizr.mq('(min-width:576px)') ) {
            hitsOnPage = 2;
        } else if ( Modernizr.mq('(max-width:575px)') ) {
            hitsOnPage = 1;
        }

        if ( hitsCount-hitsOnPage > 0 ) {
            hitsNavElem.slider({
                min: 0,
                max: hitsCount - hitsOnPage,
                slide: _.debounce(function (event, ui) {
                    hitsSlider.slick('slickGoTo', ui.value);
                }, 50)/*,
                change: _.debounce(function (event, ui) {
                    hitsSlider.slick('slickGoTo', ui.value);
                }, 100)*/
            });

            hitsNavElem.find('.ui-slider-handle').append('<span class="hits-nav__icon"></span>');

            hitsNavElem.show();
        }
    }

	$('.faq-question').on('click', function() {
	    var t = $(this);
        var answer = t.parent().find('.faq-answer');
        if ( !t.hasClass('is-active') ) {
            answer.stop().slideDown(300);
        } else {
            answer.stop().slideUp(300);
        }
        t.toggleClass('is-active');
    });

    var prevArrow = '<span class="arrow-prev">' +
        '<svg width="14" height="23" viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M4.11082 11.3747L13.0694 2.41629C13.2212 2.26435 13.2972 2.0895 13.2972 1.89198C13.2972 1.69445 13.2213 1.5196 13.0694 1.36798L11.9295 0.228104C11.7775 0.0762475 11.6027 0 11.4057 0C11.2081 0 11.0333 0.0762475 10.8814 0.228104L0.25868 10.8503C0.106744 11.0022 0.0309753 11.1771 0.0309753 11.3746C0.0309753 11.5722 0.106744 11.747 0.25868 11.8989L10.8808 22.5211C11.033 22.6733 11.2079 22.7492 11.4054 22.7492C11.6027 22.7492 11.7775 22.6733 11.9294 22.5211L13.0693 21.382C13.2212 21.2301 13.2969 21.0552 13.2969 20.8575C13.2969 20.6601 13.2212 20.4853 13.0693 20.3334L4.11082 11.3747Z"/>' +
        '</svg>' +
    '</span>';
    var nextArrow = '<span class="arrow-next">' +
        '<svg width="14" height="23" viewBox="0 0 14 23" fill="none" xmlns="http://www.w3.org/2000/svg">' +
            '<path d="M9.88915 11.3747L0.930591 2.41629C0.778734 2.26435 0.702726 2.0895 0.702726 1.89198C0.702726 1.69445 0.778654 1.5196 0.930591 1.36798L2.07047 0.228104C2.22249 0.0762475 2.39726 0 2.5943 0C2.79191 0 2.96668 0.0762475 3.11862 0.228104L13.7413 10.8503C13.8932 11.0022 13.969 11.1771 13.969 11.3746C13.969 11.5722 13.8932 11.747 13.7413 11.8989L3.11917 22.5211C2.967 22.6733 2.79207 22.7492 2.59454 22.7492C2.39726 22.7492 2.22249 22.6733 2.07055 22.5211L0.930671 21.382C0.778814 21.2301 0.703046 21.0552 0.703046 20.8575C0.703046 20.6601 0.778734 20.4853 0.930671 20.3334L9.88915 11.3747Z"/>' +
        '</svg>' +
    '</span>';
    var cardSlider = $('.card-slider');

    cardSlider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        dots: false,
        cssEase: 'ease-in-out',
        speed: 300,
        adaptiveHeight: true
    });

    $('.card-preview__item').on('click', function() {
        var id = $(this).index();
        cardSlider.slick('slickGoTo', id);
    });

    cardSlider.on('afterChange', function(event, slick, currentSlide) {
        $('.card-preview__item').eq(currentSlide).addClass('is-active').siblings().removeClass('is-active');
    });

    $('.filter-range__slider').each(function() {
        var t = $(this);
        var min = parseInt(t.attr('data-start'));
        var max = parseInt(t.attr('data-end'));
        var step = parseInt(t.attr('data-step'));
        t.slider({
            min: min,
            max: max,
            step: step,
            values: [min, max],
            range: true
        })
    });

	svg4everybody();

    function processHouse(elem) {
        var core = elem.parents('.process-core');
        var img = elem.find('.process-house__pic');
        var w = parseInt(img.attr('width'));
        var h = parseInt(img.attr('height'));
        elem.css({
            'width': w+'px'
        });
        if ( Modernizr.mq('(min-width:1200px)') ) {
            elem.css({
                marginLeft: -w/2
            });
            core.css({
                'min-height': h+'px'
            })
        } else {
            elem.css({
                marginLeft: 'auto'
            });
            core.css({
                'min-height': 0
            })
        }
        if ( core.outerWidth() >= w ) {
            elem.css({
                'transform': 'none',
                '-webkit-transform': 'none',
                'margin-bottom': '0'
            });
        } else {
            var scale = core.outerWidth()/w;
            elem.css({
                'transform': 'scale('+scale+')',
                '-webkit-transform': 'scale('+scale+')',
                'margin-bottom': -(1-scale)*h+'px'
            });
        }
    }

    $('.process-nav__item, .process-house__icon').on('click', function() {
        var t = $(this);
        var id = t.attr('data-stage');
        var active = $('.process-nav__item.is-opened');
        var current = $('.process-nav__item[data-stage="'+id+'"]');

        if ( active.length > 0 ) {
            if ( current.attr('data-stage') === active.attr('data-stage') ) {
                current.removeClass('is-opened');
                id = 0;
            } else {
                $('.process-nav__item').removeClass('is-opened');
                current.addClass('is-opened');
            }
        } else {
            current.addClass('is-opened');
        }
        $('.process-house').hide().filter('[data="'+id+'"]').show();
        processHouse($('.process-house').filter('[data="'+id+'"]'));
    });

    function trackTableNav() {
        var t = $(document);
        var nav = $('.info-nav');
        var head = $('.info-head');
        var contNav = $('.info-cont');
        var container = $('.info-scroll');
        var table = $('.info-tab .table');
        var tableHead = $('.table__head');
        if ( t.scrollTop() > head.offset().top && t.scrollTop() < table.offset().top + table.outerHeight() - head.outerHeight() ) {
            contNav.css({
                width: container.outerWidth(),
                marginLeft: container.offset().left
            });
            contNav.addClass('is-fixed');
            nav.css({
                left: table.offset().left-container.offset().left
            });
        } else {
            contNav.removeClass('is-fixed');
            contNav.css({
                width: '100%',
                marginLeft: 0
            });
            nav.css({
                left: 0
            });
        }
        if ( Modernizr.mq('(max-width:991px)') ) {
            var diff = - ( table.outerWidth() - container.outerWidth() ) - (table.offset().left - container.offset().left) * 2;
            tableHead.css({
                marginLeft: diff
            });
        } else {
            tableHead.css({
                marginLeft: 0
            });
        }
    }

    $(document).on('scroll', function() {
        if ( $('.info-nav').length ) {
            trackTableNav();
        }
    });

    $('.info-scroll').on('scroll', function() {
        trackTableNav();
    });

    function startApp() {
        if ( $('.process-house').length ) {
            processHouse($('.process-house.is-opened'));
        }

        if ( $('.hits-nav').length ) {
            hitsNav();
        }

        if ( $('.info-nav').length ) {
            trackTableNav();
        }
    }

    startApp();

    var lastWidth = $(window).width();
    $(window).on('resize', _.debounce(function() {
        if ( $(window).width() != lastWidth ) {
            startApp();
            lastWidth = $(window).width();
        }
    }, 100));

	function closeAll() {
		if ( $('.header__login').hasClass('is-active') ) {
			closeUser();
		}
		if ( $('[data-target].is-opened').length ) {
			modalsClose();
		}
		if ( $('[data-order-id].is-opened').length ) {
			ordersClose();
		}
	}
		
	function modalOpen(t) {
		closeAll();
		var modal = $('[data-target="'+t+'"]');
		centerModal(modal);
		modal.addClass('is-opened');
		$('.fade-bg').addClass('is-opened');
	}
	
	function centerModal(t) {
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		var diff = 30;
		if ( h < $(window).scrollTop()+(diff*2) ) {
			h = $(window).scrollTop()+diff;
		}
		t.css({
			'top': h+'px'
		});
	}
	
	function modalsClose() {
		$('[data-target], .fade-bg').removeClass('is-opened');
	}
	
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		var id = $(this).attr('data-open');
		modalOpen(id);
		$(this).addClass('is-active');
	});
	
	$('.fade-bg, .modal__close').on('click', function(e) {
		e.preventDefault();
		modalsClose();
	});

    $('.nav-drop').addClass('is-loaded');
	function openNav() {
        $('.nav-drop').addClass('is-opened');
        $('.panel__menu').addClass('is-active');
	}

	function closeNav() {
        $('.nav-drop').removeClass('is-opened');
        $('.panel__menu').removeClass('is-active');
	}

	$('.panel__menu').on('click', function() {
		if ( !$(this).hasClass('is-active') ) {
			openNav();
		} else {
			closeNav();
		}
	});

	$('.nav-drop__close').on('click', function() {
	    closeNav();
	});

    $(document).on('click', function(e) {
        if ( !$(e.target).closest('.nav-drop').length && !$(e.target).closest('.panel__menu').length ) {
            closeNav();
        }
    });

	$('.nav-drop__link').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('is-active');
	});

	$('[data-target], .fade-bg').addClass('is-loaded');

    function centerModal(t) {
        var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;

            var diff = 15;

        if ( h < $(window).scrollTop()+(diff*2) ) {
            h = $(window).scrollTop()+diff;
        }
        t.css({
            'top': h+'px'
        });
    }

    $(document).on('click', '[data-open]', function(e) {
        e.preventDefault();
        $(this).addClass('is-active');
        var t = $('[data-target="'+$(this).attr('data-open')+'"]');
        t.siblings('[data-target]').removeClass('is-opened is-active');
        $('.fade-bg').addClass('is-opened');
        centerModal(t);
        t.addClass('is-opened');
    });

    $('[data-target] .modal__close, .fade-bg').on('click', function(e) {
        e.preventDefault();
        $('[data-target], .fade-bg').removeClass('is-opened');
        $('[data-open]').removeClass('is-active');
    });

    $('.card-nav__item').on('click', function() {
        var t = $(this);
        if ( !t.hasClass('is-active') ) {
            var id = $(this).attr('data');
            $('.card-tab').removeClass('is-opened').filter('[data="'+id+'"]').addClass('is-opened');
            t.addClass('is-active').siblings().removeClass('is-active');
        }
    });

    $('.info-nav__item').on('click', function() {
        var t = $(this);
        if ( !t.hasClass('is-active') ) {
            var id = $(this).attr('data');
            $('.info-tab').removeClass('is-opened').filter('[data="'+id+'"]').addClass('is-opened');
            t.addClass('is-active').siblings().removeClass('is-active');
        }
    });
});