jFlick.__performance = 'no';

router.global.loading(function (req, top, bottom, next) {
    touch.on(top, 'swiperight', function (e) {
        if ($(e.target).hasClass('swipable') || $(e.target).parents('.swipable').length > 0)
            jFlick.Back();
    });
    next();
});

router.global.popping(function (req, top, bottom, next, final) {
    if (jFlick.__performance == 'slide') {
        if (top.find('.navigator').length == 0 && $('.navigator[data-parent="#' + top.attr('id') + '"]').length == 0 || bottom.find('.navigator').length == 0 && $('.navigator[data-parent="#' + bottom.attr('id') + '"]').length == 0) {
            top.css('transform', 'translateX(' + $(window).width() + 'px)');
            bottom.css('transform', 'none');
        } else {
            bottom.css('padding-top', $('.navigator[data-parent="#' + bottom.attr('id') + '"]').outerHeight());
            bottom.outerHeight($(window).height());
            top.css('padding-top', $('.navigator[data-parent="#' + top.attr('id') + '"]').outerHeight());
            top.outerHeight($(window).height());
            $('.navigator[data-parent="#' + bottom.attr('id') + '"]').css('position', 'fixed');
            $('.navigator[data-parent="#' + top.attr('id') + '"]').css('position', 'fixed');

            top.css('transform', 'translateX(' + $(window).width() + 'px)');
            bottom.css('transform', 'none');

            // 导航栏动画
            $('.navigator[data-parent="#' + top.attr('id') + '"]').addClass('alpha');
            $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.title').css('transform', 'translateX(' + $(window).width() / 4 + 'px)');
            $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.title').css('opacity', 0);
            $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.left').css('transform', 'translateX(' + $(window).width() / 4 + 'px)');
            $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.left').css('opacity', 0);
            $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.right').css('transform', 'translateX(' + $(window).width() / 4 + 'px)');
            $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.right').css('opacity', 0);

            $('.navigator[data-parent="#' + bottom.attr('id') + '"]').removeClass('alpha');
            $('.navigator[data-parent="#' + bottom.attr('id') + '"]').find('.title').css('transform', 'none');
            $('.navigator[data-parent="#' + bottom.attr('id') + '"]').find('.title').css('opacity', 1);
            $('.navigator[data-parent="#' + bottom.attr('id') + '"]').find('.left').css('transform', 'none');
            $('.navigator[data-parent="#' + bottom.attr('id') + '"]').find('.left').css('opacity', 1);
            $('.navigator[data-parent="#' + bottom.attr('id') + '"]').find('.right').css('transform', 'none');
            $('.navigator[data-parent="#' + bottom.attr('id') + '"]').find('.right').css('opacity', 1);
        }
    } else if (jFlick.__performance == 'bump') {
        $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.container-blurred').remove();
        $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.container-blurred-bg').remove();
        top.find('.navigator').css('position', 'static');
        $('.navigator[data-parent="#' + top.attr('id') + '"]').appendTo($('.navigator[data-parent="#' + top.attr('id') + '"]').attr('data-parent'));
        top.css('padding-top', 0);
        top.outerHeight($(window).height());
        top.css('transform', 'translateY(' + $(window).height() + 'px)');
    } else {
        next();
        if (final)
            final();
        return;
    }

    next();
    setTimeout(function () {
        if (final)
            final();
    }, 300);
});

router.global.popped(function (req, top, bottom, next) {
    $('.navigator[data-parent="#' + top.attr('id') + '"]').remove();
    if (jFlick.__topBlurTimer)
        clearInterval(jFlick.__topBlurTimer);
    top.remove();
    jFlick.__topBlurTimer = setInterval(function () {
        $('.navigator[data-parent="#' + bottom.attr('id') + '"] .container-blurred').scrollTop(bottom.scrollTop(), true);
        bottom.outerHeight($(window).height());
    }, 15);
    next();
});