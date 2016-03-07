'use strict'
/* Define jFlick */
var jFlick = {};
jFlick.__performance = null;
jFlick.ViewStack = [];
jFlick.Middlewares = [];
jFlick.__currentBlurTimer = null

/* Routing */
var router = {};
router.routingList = {};
router.get = function (path, func) {
    if (!router.routingList[path])
        router.routingList[path] = [];
    router.routingList[path].push(func);
};

/* Parameters analyzing */
jFlick.AnalyzingParams = function () {
    var req = {};
    req.query = jFlick.AnalyzingGetParams();
    req.form = jFlick.AnalyzingPostParams();
    return req;
};

jFlick.AnalyzingGetParams = function () {
    var params = {};
    var search = window.location.search;
    search = search.substring(1);
    var tmp = search.split('&');
    for (var i = 0; i < tmp.length; i++)
    {
        try {
            var tmp2 = tmp[i].split('=');
            params[decodeURIComponent(tmp2[0])] = decodeURIComponent(tmp2[1]);
        }
        catch (ex) { }
    }
    return params;
};

jFlick.AnalyzingPostParams = function () {
    var params = {};
    return params;
};

/* Startup */
jFlick.Startup = function () {
    $('body').append('<div id="jflick-navigators"></div>');
    touch.on('body', 'swiperight', function (e) {
        if ($(e.target).hasClass('swipable') || $(e.target).parents('.swipable').length > 0)
            jFlick.Back();
    });

    var tmp = document.location.toString();
    jFlick.webRootPath = tmp.substr(0, tmp.indexOf('/index.html'));

    var frm = document.createElement('iframe');
    frm.setAttribute('id', jFlick.GenerateRandomString());
    frm.setAttribute('class', 'jflick-pool');
    frm.src = jFlick.webRootPath + '/views/_viewStart.json.html';
    frm.onload = function () {
        try {
            var viewStart = JSON.parse($(frm).contents().find('body').html());
            frm.parentNode.removeChild(frm);
            jFlick.RedirectTo(jFlick.ParseUrl(viewStart.home), 'no');
            jFlick.__init = true;
        } catch (ex) {
        }
    };
    document.body.appendChild(frm);
};

/* Parse URL */
jFlick.ParseUrl = function (url) {
    if (url[0] == '~')
        url = jFlick.webRootPath + '/views' + url.substr(1, url.length - 1);
    else if (url[0] == '%')
        url = jFlick.webRootPath + '/controllers' + url.substr(1, url.length - 1);
    else if (url[0] == '@')
        url = jFlick.webRootPath + url.substr(1, url.length - 1);
    return url.toString();
}

/* Back */
jFlick.Back = function () {
    if (history.state == null)
        return;
    history.go(-1);
}

/* Pop view */
jFlick.PopView = function () {
    if ($('.container').length <= 1) return false;
    var current = $($('.container')[$('.container').length - 1]);
    var covered = $($('.container')[$('.container').length - 2]);
    covered.css('display', 'inline');
    if (jFlick.__performance == 'slide') {
        if (current.find('.navigator').length == 0 && $('.navigator[data-parent="#' + current.attr('id') + '"]').length == 0 || covered.find('.navigator').length == 0 && $('.navigator[data-parent="#' + covered.attr('id') + '"]').length == 0) {
            current.css('transform', 'translateX(' + $(window).width() + 'px)');
            covered.css('transform', 'none');
        } else {
            covered.css('padding-top', $('.navigator[data-parent="#' + covered.attr('id') + '"]').outerHeight());
            covered.outerHeight($(window).height());
            current.css('padding-top', $('.navigator[data-parent="#' + current.attr('id') + '"]').outerHeight());
            current.outerHeight($(window).height());
            $('.navigator[data-parent="#' + covered.attr('id') + '"]').css('position', 'fixed');
            $('.navigator[data-parent="#' + current.attr('id') + '"]').css('position', 'fixed');

            current.css('transform', 'translateX(' + $(window).width() + 'px)');
            covered.css('transform', 'none');

            // 导航栏动画
            $('.navigator[data-parent="#' + current.attr('id') + '"]').addClass('alpha');
            $('.navigator[data-parent="#' + current.attr('id') + '"]').find('.title').css('transform', 'translateX(' + $(window).width() / 4 + 'px)');
            $('.navigator[data-parent="#' + current.attr('id') + '"]').find('.title').css('opacity', 0);
            $('.navigator[data-parent="#' + current.attr('id') + '"]').find('.left').css('transform', 'translateX(' + $(window).width() / 4 + 'px)');
            $('.navigator[data-parent="#' + current.attr('id') + '"]').find('.left').css('opacity', 0);
            $('.navigator[data-parent="#' + current.attr('id') + '"]').find('.right').css('transform', 'translateX(' + $(window).width() / 4 + 'px)');
            $('.navigator[data-parent="#' + current.attr('id') + '"]').find('.right').css('opacity', 0);

            $('.navigator[data-parent="#' + covered.attr('id') + '"]').removeClass('alpha');
            $('.navigator[data-parent="#' + covered.attr('id') + '"]').find('.title').css('transform', 'none');
            $('.navigator[data-parent="#' + covered.attr('id') + '"]').find('.title').css('opacity', 1);
            $('.navigator[data-parent="#' + covered.attr('id') + '"]').find('.left').css('transform', 'none');
            $('.navigator[data-parent="#' + covered.attr('id') + '"]').find('.left').css('opacity', 1);
            $('.navigator[data-parent="#' + covered.attr('id') + '"]').find('.right').css('transform', 'none');
            $('.navigator[data-parent="#' + covered.attr('id') + '"]').find('.right').css('opacity', 1);
        }
    } else if (jFlick.__performance == 'bump') {
        $('.navigator[data-parent="#' + current.attr('id') + '"]').find('.container-blurred').remove();
        $('.navigator[data-parent="#' + current.attr('id') + '"]').find('.container-blurred-bg').remove();
        current.find('.navigator').css('position', 'static');
        $('.navigator[data-parent="#' + current.attr('id') + '"]').appendTo($('.navigator[data-parent="#' + current.attr('id') + '"]').attr('data-parent'));
        current.css('padding-top', 0);
        current.outerHeight($(window).height());
        current.css('transform', 'translateY(' + $(window).height() + 'px)');
    } else {
        $('.navigator[data-parent="#' + current.attr('id') + '"]').remove();
        if (jFlick.__currentBlurTimer)
            clearInterval(jFlick.__currentBlurTimer);
        current.remove();
        jFlick.__currentBlurTimer = setInterval(function () {
            $('.navigator[data-parent="#' + covered.attr('id') + '"] .container-blurred').scrollTop(covered.scrollTop(), true);
        }, 10);
    }

    setTimeout(function () {
        $('.navigator[data-parent="#' + current.attr('id') + '"]').remove();
        if (jFlick.__currentBlurTimer)
            clearInterval(jFlick.__currentBlurTimer);
        current.remove();
        jFlick.__currentBlurTimer = setInterval(function () {
            $('.navigator[data-parent="#' + covered.attr('id') + '"] .container-blurred').scrollTop(covered.scrollTop(), true);
        }, 10);
    }, 300);

    return true;
}

jFlick.Middlewares.push(function (req, res, next) {
    // 注册Switchery
    jFlick.RegisterSwitchery(res);
    next();
});

jFlick.Middlewares.push(function (req, res, next) {
    // 注册标题栏毛玻璃特效
    var bg = $('<div class="container-blurred-bg"></div>');
    var header = res.find('.navigator');
    res.find('.navigator').append(bg);
    var duplicate = res.clone();
    duplicate.find('.navigator').remove();
    duplicate.removeAttr('id');
    duplicate.removeAttr('data-url');
    duplicate.css('position', 'fixed');
    duplicate.addClass('container-blurred');
    duplicate.removeClass('container');
    header.append(duplicate);
    res.find('.navigator').append(bg);

    var translation;
    if (jFlick.__currentBlurTimer)
        clearInterval(jFlick.__currentBlurTimer);

    jFlick.__currentBlurTimer = setInterval(function () {
        duplicate.scrollTop(res.scrollTop(), true);
        duplicate.outerHeight(header.outerHeight());
        bg.outerHeight(header.outerHeight() + parseFloat(bg.css('border-bottom-width').replace('px', '')));
    }, 10);

    next();
});

/* Redirect to */
jFlick.RedirectTo = function (url, performance) {
    url = jFlick.ParseUrl(url);
    var frm = document.createElement('iframe');
    frm.setAttribute('id', jFlick.GenerateRandomString());
    frm.setAttribute('class', 'jflick-pool');
    frm.src = url;
    frm.onload = function () {
        if (!url) return;
        if (typeof (performance) == 'undefined')
            performance = 'slide';
        window.history.pushState({ url: url, performance: performance }, '', url);
        jFlick.__performance = history.state.performance;
        var tmp = $(frm).contents().find('.container')[0];
        var container = $(tmp);
        container.attr('id', jFlick.GenerateRandomString());
        container.outerHeight($(window).height());
        var covered = $($('.container')[$('.container').length - 1]);
        container.attr('data-url', url);

        // 运行中间件
        var mid = jFlick.BuildMiddlewaresChain(0, jFlick.AnalyzingParams(), container);
        if (mid)
            mid();
        if (performance == 'slide') {
            if (container.find('.navigator').length == 0 && $('.navigator[data-parent="#' + container.attr('id') + '"]').length == 0 || covered.find('.navigator').length == 0 && $('.navigator[data-parent="#' + covered.attr('id') + '"]').length == 0) {
                covered.css('transform', 'translateX(' + -$(window).width() / 4 + 'px)');
                container.css('transform', 'translateX(' + $(window).width()+ 'px)');
                container.appendTo('body');
                setTimeout(function () {
                    container.css('transform', 'none');
                }, 50);
            } else {
                container.addClass('swipable');

                // 添加container顶部空隙
                covered.css('padding-top', $('.navigator[data-parent="#' + covered.attr('id') + '"]').outerHeight());
                covered.outerHeight($(window).height());

                covered.css('transform', 'translateX(' + -$(window).width() / 4 + 'px)');

                // 新视图预位
                container.find('.navigator').attr('data-parent', '#' + container.attr('id'));
                container.css('transform', 'translateX(' + $(window).width() + 'px)');
                container.find('.navigator').addClass('alpha');
                container.find('.navigator .title').css('transform', 'translateX(' + $(window).width() / 4 + 'px)');
                container.find('.navigator .title').css('opacity', 0);
                container.find('.navigator .left').css('transform', 'translateX(' + $(window).width() / 4 + 'px)');
                container.find('.navigator .left').css('opacity', 0);
                container.find('.navigator .right').css('transform', 'translateX(' + $(window).width() / 4 + 'px)');
                container.find('.navigator .right').css('opacity', 0);
           
                // 显示新视图
                container.appendTo('body');
                container.find('.navigator').appendTo('#jflick-navigators');
                container.css('padding-top', $('.navigator[data-parent="#' + covered.attr('id') + '"]').outerHeight());
                container.outerHeight($(window).height());

                $('.navigator[data-parent="#' + covered.attr('id') + '"]').addClass('alpha');
                $('.navigator[data-parent="#' + covered.attr('id') + '"]').find('.title').css('transform', 'translateX(' + -$(window).width() + 'px)');
                $('.navigator[data-parent="#' + covered.attr('id') + '"]').find('.title').css('opacity', 0);
                $('.navigator[data-parent="#' + covered.attr('id') + '"]').find('.left').css('transform', 'translateX(' + -$(window).width() + 'px)');
                $('.navigator[data-parent="#' + covered.attr('id') + '"]').find('.left').css('opacity', 0);
                $('.navigator[data-parent="#' + covered.attr('id') + '"]').find('.right').css('transform', 'translateX(' + -$(window).width() + 'px)');
                $('.navigator[data-parent="#' + covered.attr('id') + '"]').find('.right').css('opacity', 0);
                
                $('.navigator[data-parent="#' + container.attr('id') + '"]').removeClass('alpha');
                $('.navigator[data-parent="#' + container.attr('id') + '"]').find('.title').css('transform', 'none');
                $('.navigator[data-parent="#' + container.attr('id') + '"]').find('.title').css('opacity', 1);
                $('.navigator[data-parent="#' + container.attr('id') + '"]').find('.left').css('transform', 'none');
                $('.navigator[data-parent="#' + container.attr('id') + '"]').find('.left').css('opacity', 1);
                $('.navigator[data-parent="#' + container.attr('id') + '"]').find('.right').css('transform', 'none');
                $('.navigator[data-parent="#' + container.attr('id') + '"]').find('.right').css('opacity', 1);

                setTimeout(function () {
                    container.css('transform', 'none');
                    container.find('.navigator').appendTo('#jflick-navigators');
                }, 50);
            }
        } else if (performance == 'bump') {
            // 新视图预位
            container.css('z-index', 501);
            container.css('transform', 'translateY(' + $(window).height() + 'px)');
            container.find('.navigator').css('position', 'static');
            container.css('padding-top', 0);
            container.outerHeight($(window).height());

            // 显示新视图
            container.appendTo('body');

            // 调整新视图位置
            setTimeout(function () {
                container.css('transform', 'translateY(0)');
            }, 50);

            setTimeout(function () {
                // 移动Navigators
                container.find('.navigator').css('position', 'fixed');
                container.css('z-index', 'auto');
                container.find('.navigator').attr('data-parent', '#' + container.attr('id'));
                container.find('.navigator').appendTo('#jflick-navigators');

                // 调整新视图位置
                container.css('padding-top', $('.navigator[data-parent="#' + container.attr('id') + '"]').find('.navigator').outerHeight());
                container.outerHeight($(window).height());
            }, 300);
        } else {
            container.find('.navigator').attr('data-parent', '#' + container.attr('id'));
            container.outerHeight($(window).height());
            container.appendTo('body');
            container.find('.navigator').appendTo('#jflick-navigators');
            covered.hide();
            var func = jFlick.BuildCallChain(jFlick.GetPath(document.location.toString()), 0, jFlick.AnalyzingParams(), container);
            func();
        }

        if (performance == 'bump' || performance == 'slide')
            setTimeout(function () {
                covered.hide();
                container.css('padding-top', $('.navigator[data-parent="#' + container.attr('id') + '"]').outerHeight());
                container.outerHeight($(window).height());
                var func = jFlick.BuildCallChain(jFlick.GetPath(document.location.toString()), 0, jFlick.AnalyzingParams(), container);
                if (func)
                    func();
            }, 300);
        else
            container.outerHeight($(window).height());
        frm.parentNode.removeChild(frm);
    };
    document.body.appendChild(frm);
}

jFlick.BuildCallChain = function (key, i, req, res) {
    if (!router.routingList[key] || !router.routingList[key][i])
        return function () { };
    return function () { 
        router.routingList[key][i](req, res, jFlick.BuildCallChain(key, i + 1, req, res));
    };
};

jFlick.BuildMiddlewaresChain = function (i, req, res) {
    if (!jFlick.Middlewares[i])
        return function () { };
    return function () {
        jFlick.Middlewares[i](req, res, jFlick.BuildMiddlewaresChain(i + 1, req, res));
    };
};

jFlick.GetPath = function (url) {
    url = url.substring(url.indexOf('/views') + 6);
    url = url.substring(0, url.lastIndexOf('.'));
    return url;
};

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
    $(document).unbind('click').on('click', function (e) {
        if ($(e.target).is('a') && $(e.target).attr('href').toString().indexOf('javascript') >= 0)
            return true;
        if ($(e.target).is('a') && $(e.target).attr('href')[0] != '#') {
            jFlick.RedirectTo($(e.target).attr('href'), $(e.target).attr('data-performance'));
            return false;
        }
    });
    window.onpopstate = function (e) {
        if (jFlick.__init) {
            jFlick.PopView();
            if (history.state)
                jFlick.__performance = history.state.performance;
            return false;
        }
    };
});

$(window).resize(function () {
    var containers = $('.container');
    for (var i = 0; i < containers.length; i++)
    {
        var container = $(containers[i]);
        container.outerHeight($(window).height());
    }
});

jFlick.RegisterSwitchery = function (container) {
    var elem = container.find('input[type="checkbox"]');
    for (var i = 0; i < elem.length; i++) {
        var init = new Switchery(elem[i]);
    }
};

jFlick.GenerateRandomString = function (len) {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
};