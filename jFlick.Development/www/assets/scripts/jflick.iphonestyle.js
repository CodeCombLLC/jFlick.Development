$(document).ready(function () {
    $(document).bind('touchstart', function (e) {
        var tr;
        if ($(e.target).is('tr') && $(e.target).attr('href')) {
            tr = $(e.target);
            tr.addClass('hover');
        }
        else if ($(e.target).parents('tr').attr('href')) {
            tr = $(e.target).parents('tr');
            tr.addClass('hover');
        }
        if (tr) {
            var prev = tr.prev();
            if (prev)
                prev.addClass('fix-prev-tr-hover');
            jFlick.__currentTr = { href: tr.attr('href'), performance: tr.attr('data-performance') };
            var fix = $('<div class="fix-tr-hover"></div>')
            fix.css('top', tr.offset().top);
            fix.height(tr.outerHeight() - parseFloat(tr.css('border-bottom-width').replace('px', '')));
            fix.appendTo(tr.parents('.container'));
        }
    });
    $(document).bind('touchmove', function (e) {
        var tr;
        if ($(e.target).is('tr') && $(e.target).attr('href')) {
            tr = $(e.target);
        }
        else if ($(e.target).parents('tr').attr('href')) {
            tr = $(e.target).parents('tr');
        }
        var tr2;
        if ($(e.targetTouches).is('tr') && $(e.targetTouches).attr('href')) {
            tr2 = $(e.targetTouches);
        }
        else if ($(e.targetTouches).parents('tr').attr('href')) {
            tr2 = $(e.targetTouches).parents('tr');
        }
        if (!tr || !tr2 || tr.attr('href') != tr2.attr('href')) {
            $('.fix-prev-tr-hover').removeClass('.fix-prev-tr-hover');
            $('.fix-tr-hover').remove();
            $('.hover').removeClass('hover');
            jFlick.__currentTr = null;
        }
    });
    $(document).bind('touchend', function (e) {
        if (!jFlick.__currentTr)
            return;
        var tr;
        if ($(e.targetTouches).is('tr') && $(e.targetTouches).attr('href')) {
            tr = $(e.targetTouches);
        }
        else if ($(e.targetTouches).parents('tr').attr('href')) {
            tr = $(e.targetTouches).parents('tr');
        }
        $('.fix-prev-tr-hover').removeClass('.fix-prev-tr-hover');
        $('.fix-tr-hover').remove();
        $('.hover').removeClass('hover');
        if (jFlick.__currentTr && jFlick.__currentTr.href) {
            var href = jFlick.__currentTr.href;
            var performance = jFlick.__currentTr.performance;
            jFlick.__currentTr = null;
            jFlick.RedirectTo(href, performance);
        }
    });
    $(window).resize(function () {
        var containers = $('.container');
        for (var i = 0; i < containers.length; i++) {
            var container = $(containers[i]);
            container.outerHeight($(window).height());
        }
    });
    touch.on('body', 'swiperight', function (e) {
        if ($(e.target).hasClass('swipable') || $(e.target).parents('.swipable').length > 0)
            jFlick.Back();
    });
});

jFlick.__performance = 'no';
jFlick.__currentBlurTimer = null;

router.global.popping(function (req, top, bottom, next, final) {
    bottom.css('display', 'inline');
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
        $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.top-blurred').remove();
        $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.top-blurred-bg').remove();
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
        $('.navigator[data-parent="#' + bottom.attr('id') + '"] .top-blurred').scrollTop(bottom.scrollTop(), true);
        bottom.outerHeight($(window).height());
    }, 15);
    next();
});

router.global.loading(function (req, top, bottom, next, final) {
    var performance = jFlick.__performance;
    if (performance == 'slide') {
        top.addClass('swipable');
        if (top.find('.navigator').length == 0 && $('.navigator[data-parent="#' + top.attr('id') + '"]').length == 0 || bottom.find('.navigator').length == 0 && $('.navigator[data-parent="#' + bottom.attr('id') + '"]').length == 0) {
            bottom.css('transform', 'translateX(' + -$(window).width() / 4 + 'px)');
            top.css('transform', 'translateX(' + $(window).width() + 'px)');
            next();
            top.appendTo('body');
            setTimeout(function () {
                top.css('transform', 'none');
            }, 50);
        } else {
            // 添加top顶部空隙
            bottom.css('padding-top', $('.navigator[data-parent="#' + bottom.attr('id') + '"]').outerHeight());
            bottom.outerHeight($(window).height());

            bottom.css('transform', 'translateX(' + -$(window).width() / 4 + 'px)');

            // 新视图预位
            top.find('.navigator').attr('data-parent', '#' + top.attr('id'));
            top.css('transform', 'translateX(' + $(window).width() + 'px)');
            top.find('.navigator').addClass('alpha');
            top.find('.navigator .title').css('transform', 'translateX(' + $(window).width() / 4 + 'px)');
            top.find('.navigator .title').css('opacity', 0);
            top.find('.navigator .left').css('transform', 'translateX(' + $(window).width() / 4 + 'px)');
            top.find('.navigator .left').css('opacity', 0);
            top.find('.navigator .right').css('transform', 'translateX(' + $(window).width() / 4 + 'px)');
            top.find('.navigator .right').css('opacity', 0);

            // 显示新视图
            next();
            top.appendTo('body');
            top.find('.navigator').appendTo('#jflick-navigators');
            top.css('padding-top', $('.navigator[data-parent="#' + bottom.attr('id') + '"]').outerHeight());
            top.outerHeight($(window).height());

            $('.navigator[data-parent="#' + bottom.attr('id') + '"]').addClass('alpha');
            $('.navigator[data-parent="#' + bottom.attr('id') + '"]').find('.title').css('transform', 'translateX(' + -$(window).width() + 'px)');
            $('.navigator[data-parent="#' + bottom.attr('id') + '"]').find('.title').css('opacity', 0);
            $('.navigator[data-parent="#' + bottom.attr('id') + '"]').find('.left').css('transform', 'translateX(' + -$(window).width() + 'px)');
            $('.navigator[data-parent="#' + bottom.attr('id') + '"]').find('.left').css('opacity', 0);
            $('.navigator[data-parent="#' + bottom.attr('id') + '"]').find('.right').css('transform', 'translateX(' + -$(window).width() + 'px)');
            $('.navigator[data-parent="#' + bottom.attr('id') + '"]').find('.right').css('opacity', 0);

            $('.navigator[data-parent="#' + top.attr('id') + '"]').removeClass('alpha');
            $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.title').css('transform', 'none');
            $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.title').css('opacity', 1);
            $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.left').css('transform', 'none');
            $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.left').css('opacity', 1);
            $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.right').css('transform', 'none');
            $('.navigator[data-parent="#' + top.attr('id') + '"]').find('.right').css('opacity', 1);

            setTimeout(function () {
                top.css('transform', 'none');
                top.find('.navigator').appendTo('#jflick-navigators');
            }, 50);
        }

        setTimeout(function () {
            bottom.hide();
            top.css('padding-top', $('.navigator[data-parent="#' + top.attr('id') + '"]').outerHeight());
            top.outerHeight($(window).height());
            final();
        }, 300);
    } else if (performance == 'bump') {
        // 新视图预位
        top.css('z-index', 501);
        top.css('transform', 'translateY(' + $(window).height() + 'px)');
        top.find('.navigator').css('position', 'static');
        top.css('padding-top', 0);

        // 显示新视图
        next();
        top.appendTo('body');
        top.outerHeight($(window).height());

        // 调整新视图位置
        setTimeout(function () {
            top.css('transform', 'translateY(0)');
        }, 50);

        setTimeout(function () {
            // 移动Navigators
            top.find('.navigator').css('position', 'fixed');
            top.css('z-index', 'auto');
            top.find('.navigator').attr('data-parent', '#' + top.attr('id'));
            top.find('.navigator').appendTo('#jflick-navigators');
            bottom.hide();
            top.css('padding-top', $('.navigator[data-parent="#' + top.attr('id') + '"]').outerHeight());
            top.outerHeight($(window).height());
            final();
        }, 300);
    } else {
        top.find('.navigator').attr('data-parent', '#' + top.attr('id'));
        next();
        top.appendTo('body');
        top.outerHeight($(window).height());
        top.find('.navigator').appendTo('#jflick-navigators');
        bottom.hide();
        final();
    }
});

router.global.loading(function (req, top, bottom, next) {
    jFlick.RegisterSwitchery(top);
    next();
});

router.global.loading(function (req, top, bottom, next) {
    // 注册标题栏毛玻璃特效
    var bg = $('<div class="container-blurred-bg"></div>');
    var header = top.find('.navigator');
    top.find('.navigator').append(bg);
    var duplicate = top.clone();
    duplicate.find('*').removeAttr('id');
    duplicate.find('.navigator').remove();
    duplicate.removeAttr('id');
    duplicate.removeAttr('data-url');
    duplicate.css('position', 'fixed');
    duplicate.addClass('container-blurred');
    duplicate.removeClass('container');
    header.append(duplicate);
    top.find('.navigator').append(bg);

    var translation;
    if (jFlick.__currentBlurTimer)
        clearInterval(jFlick.__currentBlurTimer);

    jFlick.__currentBlurTimer = setInterval(function () {
        duplicate.scrollTop(top.scrollTop(), true);
        duplicate.outerHeight(header.outerHeight());
        bg.outerHeight(header.outerHeight() + parseFloat(bg.css('border-bottom-width').replace('px', '')));
        top.outerHeight($(window).height());
    }, 15);

    next();
});