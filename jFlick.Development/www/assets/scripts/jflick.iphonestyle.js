﻿// Switchery
!function () { function a(b) { var c = a.modules[b]; if (!c) throw new Error('failed to require "' + b + '"'); return "exports" in c || "function" != typeof c.definition || (c.client = c.component = !0, c.definition.call(this, c.exports = {}, c), delete c.definition), c.exports } a.loader = "component", a.helper = {}, a.helper.semVerSort = function (a, b) { var e, f, g, h, i, c = a.version.split("."), d = b.version.split("."); for (e = 0; e < c.length; ++e) { if (f = parseInt(c[e], 10), g = parseInt(d[e], 10), f !== g) return f > g ? 1 : -1; if (h = c[e].substr(("" + f).length), i = d[e].substr(("" + g).length), "" === h && "" !== i) return 1; if ("" !== h && "" === i) return -1; if ("" !== h && "" !== i) return h > i ? 1 : -1 } return 0 }, a.latest = function (b, c) { function d(a) { throw new Error('failed to find latest module of "' + a + '"') } var g, h, i, j, k, l, m, n, e = /(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/, f = /(.*)~(.*)/; for (f.test(b) || d(b), g = Object.keys(a.modules), h = [], i = [], j = 0; j < g.length; j++) k = g[j], new RegExp(b + "@").test(k) && (l = k.substr(b.length + 1), m = e.exec(k), null != m ? h.push({ version: l, name: k }) : i.push({ version: l, name: k })); return 0 === h.concat(i).length && d(b), h.length > 0 ? (n = h.sort(a.helper.semVerSort).pop().name, c === !0 ? n : a(n)) : (n = i.sort(function (a, b) { return a.name > b.name })[0].name, c === !0 ? n : a(n)) }, a.modules = {}, a.register = function (b, c) { a.modules[b] = { definition: c } }, a.define = function (b, c) { a.modules[b] = { exports: c } }, a.register("abpetkov~transitionize@0.0.3", function (a, b) { function c(a, b) { return this instanceof c ? (this.element = a, this.props = b || {}, this.init(), void 0) : new c(a, b) } b.exports = c, c.prototype.isSafari = function () { return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor) }, c.prototype.init = function () { var b, a = []; for (b in this.props) a.push(b + " " + this.props[b]); this.element.style.transition = a.join(", "), this.isSafari() && (this.element.style.webkitTransition = a.join(", ")) } }), a.register("ftlabs~fastclick@v0.6.11", function (a, b) { function c(a) { "use strict"; var b, d = this; if (this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = 10, this.layer = a, !a || !a.nodeType) throw new TypeError("Layer must be a document node"); this.onClick = function () { return c.prototype.onClick.apply(d, arguments) }, this.onMouse = function () { return c.prototype.onMouse.apply(d, arguments) }, this.onTouchStart = function () { return c.prototype.onTouchStart.apply(d, arguments) }, this.onTouchMove = function () { return c.prototype.onTouchMove.apply(d, arguments) }, this.onTouchEnd = function () { return c.prototype.onTouchEnd.apply(d, arguments) }, this.onTouchCancel = function () { return c.prototype.onTouchCancel.apply(d, arguments) }, c.notNeeded(a) || (this.deviceIsAndroid && (a.addEventListener("mouseover", this.onMouse, !0), a.addEventListener("mousedown", this.onMouse, !0), a.addEventListener("mouseup", this.onMouse, !0)), a.addEventListener("click", this.onClick, !0), a.addEventListener("touchstart", this.onTouchStart, !1), a.addEventListener("touchmove", this.onTouchMove, !1), a.addEventListener("touchend", this.onTouchEnd, !1), a.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (a.removeEventListener = function (b, c, d) { var e = Node.prototype.removeEventListener; "click" === b ? e.call(a, b, c.hijacked || c, d) : e.call(a, b, c, d) }, a.addEventListener = function (b, c, d) { var e = Node.prototype.addEventListener; "click" === b ? e.call(a, b, c.hijacked || (c.hijacked = function (a) { a.propagationStopped || c(a) }), d) : e.call(a, b, c, d) }), "function" == typeof a.onclick && (b = a.onclick, a.addEventListener("click", function (a) { b(a) }, !1), a.onclick = null)) } c.prototype.deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0, c.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent), c.prototype.deviceIsIOS4 = c.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent), c.prototype.deviceIsIOSWithBadTarget = c.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent), c.prototype.needsClick = function (a) { "use strict"; switch (a.nodeName.toLowerCase()) { case "button": case "select": case "textarea": if (a.disabled) return !0; break; case "input": if (this.deviceIsIOS && "file" === a.type || a.disabled) return !0; break; case "label": case "video": return !0 } return /\bneedsclick\b/.test(a.className) }, c.prototype.needsFocus = function (a) { "use strict"; switch (a.nodeName.toLowerCase()) { case "textarea": return !0; case "select": return !this.deviceIsAndroid; case "input": switch (a.type) { case "button": case "checkbox": case "file": case "image": case "radio": case "submit": return !1 } return !a.disabled && !a.readOnly; default: return /\bneedsfocus\b/.test(a.className) } }, c.prototype.sendClick = function (a, b) { "use strict"; var c, d; document.activeElement && document.activeElement !== a && document.activeElement.blur(), d = b.changedTouches[0], c = document.createEvent("MouseEvents"), c.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null), c.forwardedTouchEvent = !0, a.dispatchEvent(c) }, c.prototype.determineEventType = function (a) { "use strict"; return this.deviceIsAndroid && "select" === a.tagName.toLowerCase() ? "mousedown" : "click" }, c.prototype.focus = function (a) { "use strict"; var b; this.deviceIsIOS && a.setSelectionRange && 0 !== a.type.indexOf("date") && "time" !== a.type ? (b = a.value.length, a.setSelectionRange(b, b)) : a.focus() }, c.prototype.updateScrollParent = function (a) { "use strict"; var b, c; if (b = a.fastClickScrollParent, !b || !b.contains(a)) { c = a; do { if (c.scrollHeight > c.offsetHeight) { b = c, a.fastClickScrollParent = c; break } c = c.parentElement } while (c) } b && (b.fastClickLastScrollTop = b.scrollTop) }, c.prototype.getTargetElementFromEventTarget = function (a) { "use strict"; return a.nodeType === Node.TEXT_NODE ? a.parentNode : a }, c.prototype.onTouchStart = function (a) { "use strict"; var b, c, d; if (a.targetTouches.length > 1) return !0; if (b = this.getTargetElementFromEventTarget(a.target), c = a.targetTouches[0], this.deviceIsIOS) { if (d = window.getSelection(), d.rangeCount && !d.isCollapsed) return !0; if (!this.deviceIsIOS4) { if (c.identifier === this.lastTouchIdentifier) return a.preventDefault(), !1; this.lastTouchIdentifier = c.identifier, this.updateScrollParent(b) } } return this.trackingClick = !0, this.trackingClickStart = a.timeStamp, this.targetElement = b, this.touchStartX = c.pageX, this.touchStartY = c.pageY, a.timeStamp - this.lastClickTime < 200 && a.preventDefault(), !0 }, c.prototype.touchHasMoved = function (a) { "use strict"; var b = a.changedTouches[0], c = this.touchBoundary; return Math.abs(b.pageX - this.touchStartX) > c || Math.abs(b.pageY - this.touchStartY) > c ? !0 : !1 }, c.prototype.onTouchMove = function (a) { "use strict"; return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0 }, c.prototype.findControl = function (a) { "use strict"; return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea") }, c.prototype.onTouchEnd = function (a) { "use strict"; var b, c, d, e, f, g = this.targetElement; if (!this.trackingClick) return !0; if (a.timeStamp - this.lastClickTime < 200) return this.cancelNextClick = !0, !0; if (this.cancelNextClick = !1, this.lastClickTime = a.timeStamp, c = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, this.deviceIsIOSWithBadTarget && (f = a.changedTouches[0], g = document.elementFromPoint(f.pageX - window.pageXOffset, f.pageY - window.pageYOffset) || g, g.fastClickScrollParent = this.targetElement.fastClickScrollParent), d = g.tagName.toLowerCase(), "label" === d) { if (b = this.findControl(g)) { if (this.focus(g), this.deviceIsAndroid) return !1; g = b } } else if (this.needsFocus(g)) return a.timeStamp - c > 100 || this.deviceIsIOS && window.top !== window && "input" === d ? (this.targetElement = null, !1) : (this.focus(g), this.deviceIsIOS4 && "select" === d || (this.targetElement = null, a.preventDefault()), !1); return this.deviceIsIOS && !this.deviceIsIOS4 && (e = g.fastClickScrollParent, e && e.fastClickLastScrollTop !== e.scrollTop) ? !0 : (this.needsClick(g) || (a.preventDefault(), this.sendClick(g, a)), !1) }, c.prototype.onTouchCancel = function () { "use strict"; this.trackingClick = !1, this.targetElement = null }, c.prototype.onMouse = function (a) { "use strict"; return this.targetElement ? a.forwardedTouchEvent ? !0 : a.cancelable ? !this.needsClick(this.targetElement) || this.cancelNextClick ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped = !0, a.stopPropagation(), a.preventDefault(), !1) : !0 : !0 : !0 }, c.prototype.onClick = function (a) { "use strict"; var b; return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === a.target.type && 0 === a.detail ? !0 : (b = this.onMouse(a), b || (this.targetElement = null), b) }, c.prototype.destroy = function () { "use strict"; var a = this.layer; this.deviceIsAndroid && (a.removeEventListener("mouseover", this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), a.removeEventListener("mouseup", this.onMouse, !0)), a.removeEventListener("click", this.onClick, !0), a.removeEventListener("touchstart", this.onTouchStart, !1), a.removeEventListener("touchmove", this.onTouchMove, !1), a.removeEventListener("touchend", this.onTouchEnd, !1), a.removeEventListener("touchcancel", this.onTouchCancel, !1) }, c.notNeeded = function (a) { "use strict"; var b, d; if ("undefined" == typeof window.ontouchstart) return !0; if (d = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) { if (!c.prototype.deviceIsAndroid) return !0; if (b = document.querySelector("meta[name=viewport]")) { if (-1 !== b.content.indexOf("user-scalable=no")) return !0; if (d > 31 && window.innerWidth <= window.screen.width) return !0 } } return "none" === a.style.msTouchAction ? !0 : !1 }, c.attach = function (a) { "use strict"; return new c(a) }, "undefined" != typeof define && define.amd ? define(function () { "use strict"; return c }) : "undefined" != typeof b && b.exports ? (b.exports = c.attach, b.exports.FastClick = c) : window.FastClick = c }), a.register("component~indexof@0.0.3", function (a, b) { b.exports = function (a, b) { if (a.indexOf) return a.indexOf(b); for (var c = 0; c < a.length; ++c) if (a[c] === b) return c; return -1 } }), a.register("component~classes@1.2.1", function (b, c) { function g(a) { if (!a) throw new Error("A DOM element reference is required"); this.el = a, this.list = a.classList } var d = a("component~indexof@0.0.3"), e = /\s+/, f = Object.prototype.toString; c.exports = function (a) { return new g(a) }, g.prototype.add = function (a) { var b, c; return this.list ? (this.list.add(a), this) : (b = this.array(), c = d(b, a), ~c || b.push(a), this.el.className = b.join(" "), this) }, g.prototype.remove = function (a) { var b, c; return "[object RegExp]" == f.call(a) ? this.removeMatching(a) : this.list ? (this.list.remove(a), this) : (b = this.array(), c = d(b, a), ~c && b.splice(c, 1), this.el.className = b.join(" "), this) }, g.prototype.removeMatching = function (a) { var c, b = this.array(); for (c = 0; c < b.length; c++) a.test(b[c]) && this.remove(b[c]); return this }, g.prototype.toggle = function (a, b) { return this.list ? ("undefined" != typeof b ? b !== this.list.toggle(a, b) && this.list.toggle(a) : this.list.toggle(a), this) : ("undefined" != typeof b ? b ? this.add(a) : this.remove(a) : this.has(a) ? this.remove(a) : this.add(a), this) }, g.prototype.array = function () { var a = this.el.className.replace(/^\s+|\s+$/g, ""), b = a.split(e); return "" === b[0] && b.shift(), b }, g.prototype.has = g.prototype.contains = function (a) { return this.list ? this.list.contains(a) : !!~d(this.array(), a) } }), a.register("component~event@0.1.4", function (a) { var c = window.addEventListener ? "addEventListener" : "attachEvent", d = window.removeEventListener ? "removeEventListener" : "detachEvent", e = "addEventListener" !== c ? "on" : ""; a.bind = function (a, b, d, f) { return a[c](e + b, d, f || !1), d }, a.unbind = function (a, b, c, f) { return a[d](e + b, c, f || !1), c } }), a.register("component~query@0.0.3", function (a, b) { function c(a, b) { return b.querySelector(a) } a = b.exports = function (a, b) { return b = b || document, c(a, b) }, a.all = function (a, b) { return b = b || document, b.querySelectorAll(a) }, a.engine = function (b) { if (!b.one) throw new Error(".one callback required"); if (!b.all) throw new Error(".all callback required"); return c = b.one, a.all = b.all, a } }), a.register("component~matches-selector@0.1.5", function (b, c) { function g(a, b) { var c, e; if (!a || 1 !== a.nodeType) return !1; if (f) return f.call(a, b); for (c = d.all(b, a.parentNode), e = 0; e < c.length; ++e) if (c[e] == a) return !0; return !1 } var d = a("component~query@0.0.3"), e = Element.prototype, f = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector; c.exports = g }), a.register("component~closest@0.1.4", function (b, c) { var d = a("component~matches-selector@0.1.5"); c.exports = function (a, b, c, e) { for (a = c ? { parentNode: a } : a, e = e || document; (a = a.parentNode) && a !== document;) { if (d(a, b)) return a; if (a === e) return } } }), a.register("component~delegate@0.2.3", function (b) { var d = a("component~closest@0.1.4"), e = a("component~event@0.1.4"); b.bind = function (a, b, c, f, g) { return e.bind(a, c, function (c) { var e = c.target || c.srcElement; c.delegateTarget = d(e, b, !0, a), c.delegateTarget && f.call(a, c) }, g) }, b.unbind = function (a, b, c, d) { e.unbind(a, b, c, d) } }), a.register("component~events@1.0.9", function (b, c) { function f(a, b) { if (!(this instanceof f)) return new f(a, b); if (!a) throw new Error("element required"); if (!b) throw new Error("object required"); this.el = a, this.obj = b, this._events = {} } function g(a) { var b = a.split(/ +/); return { name: b.shift(), selector: b.join(" ") } } var d = a("component~event@0.1.4"), e = a("component~delegate@0.2.3"); c.exports = f, f.prototype.sub = function (a, b, c) { this._events[a] = this._events[a] || {}, this._events[a][b] = c }, f.prototype.bind = function (a, b) { function k() { var a = [].slice.call(arguments).concat(j); h[b].apply(h, a) } var j, c = g(a), f = this.el, h = this.obj, i = c.name; return b = b || "on" + i, j = [].slice.call(arguments, 2), c.selector ? k = e.bind(f, c.selector, i, k) : d.bind(f, i, k), this.sub(i, b, k), k }, f.prototype.unbind = function (a, b) { var c, e; return 0 == arguments.length ? this.unbindAll() : 1 == arguments.length ? this.unbindAllOf(a) : (c = this._events[a], c && (e = c[b], e && d.unbind(this.el, a, e)), void 0) }, f.prototype.unbindAll = function () { for (var a in this._events) this.unbindAllOf(a) }, f.prototype.unbindAllOf = function (a) { var c, b = this._events[a]; if (b) for (c in b) this.unbind(a, c) } }), a.register("switchery", function (b, c) { function i(a, b) { if (!(this instanceof i)) return new i(a, b); this.element = a, this.options = b || {}; for (var c in h) null == this.options[c] && (this.options[c] = h[c]); null != this.element && "checkbox" == this.element.type && 0 == $(this.element).next().hasClass("switchery") && this.init(), this.isDisabled() === !0 && this.disable() } var h, d = a("abpetkov~transitionize@0.0.3"), e = a("ftlabs~fastclick@v0.6.11"), f = a("component~classes@1.2.1"), g = a("component~events@1.0.9"); c.exports = i, h = { color: "#64bd63", secondaryColor: "#dfdfdf", jackColor: "#fff", jackSecondaryColor: null, className: "switchery", disabled: !1, disabledOpacity: .5, speed: "0.4s", size: "default" }, i.prototype.hide = function () { this.element.style.display = "none" }, i.prototype.show = function () { var a = this.create(); this.insertAfter(this.element, a) }, i.prototype.create = function () { return this.switcher = document.createElement("span"), this.jack = document.createElement("small"), this.jack.setAttribute("class", "switchery-button"), this.switcher.appendChild(this.jack), this.switcher.className = this.options.className, this.events = g(this.switcher, this), touch.on(this.switcher, "swiperight", function (a) { $(a.target).prev('input[type="checkbox"]').attr("checked", "checked") }), touch.on(this.switcher, "swipeleft", function (a) { $(a.target).prev('input[type="checkbox"]').removeAttr("checked") }), touch.on(this.jack, "swiperight", function (a) { $(a.target).parents(".switchery").prev('input[type="checkbox"]').attr("checked", "checked") }), touch.on(this.jack, "swipeleft", function (a) { $(a.target).parents(".switchery").prev('input[type="checkbox"]').removeAttr("checked") }), this.switcher }, i.prototype.insertAfter = function (a, b) { a.parentNode.insertBefore(b, a.nextSibling) }, i.prototype.setPosition = function (a) { var b = this.isChecked(), c = this.switcher, d = this.jack; a && b ? b = !1 : a && !b && (b = !0), b === !0 ? (this.element.checked = !0, d.style.left = window.getComputedStyle ? parseInt(window.getComputedStyle(c).width) - parseInt(window.getComputedStyle(d).width) + "px" : parseInt(c.currentStyle["width"]) - parseInt(d.currentStyle["width"]) + "px", this.options.color && this.colorize(), this.setSpeed()) : (d.style.left = 0, this.element.checked = !1, this.switcher.style.boxShadow = "inset 0 0 0 0 " + this.options.secondaryColor, this.switcher.style.borderColor = this.options.secondaryColor, this.switcher.style.backgroundColor = this.options.secondaryColor !== h.secondaryColor ? this.options.secondaryColor : "#fff", this.jack.style.backgroundColor = this.options.jackSecondaryColor !== this.options.jackColor ? this.options.jackSecondaryColor : this.options.jackColor, this.setSpeed()) }, i.prototype.setSpeed = function () { var a = {}, b = { "background-color": this.options.speed, left: this.options.speed.replace(/[a-z]/, "") / 2 + "s" }; a = this.isChecked() ? { border: this.options.speed, "box-shadow": this.options.speed, "background-color": 3 * this.options.speed.replace(/[a-z]/, "") + "s" } : { border: this.options.speed, "box-shadow": this.options.speed }, d(this.switcher, a), d(this.jack, b) }, i.prototype.setSize = function () { var a = "switchery-small", b = "switchery-default", c = "switchery-large"; switch (this.options.size) { case "small": f(this.switcher).add(a); break; case "large": f(this.switcher).add(c); break; default: f(this.switcher).add(b) } }, i.prototype.colorize = function () { var a = this.switcher.offsetHeight / 2; this.switcher.style.backgroundColor = this.options.color, this.switcher.style.borderColor = this.options.color, this.switcher.style.boxShadow = "inset 0 0 0 " + a + "px " + this.options.color, this.jack.style.backgroundColor = this.options.jackColor }, i.prototype.handleOnchange = function () { if (document.dispatchEvent) { var b = document.createEvent("HTMLEvents"); b.initEvent("change", !0, !0), this.element.dispatchEvent(b) } else this.element.fireEvent("onchange") }, i.prototype.handleChange = function () { var a = this, b = this.element; b.addEventListener ? b.addEventListener("change", function () { a.setPosition() }) : b.attachEvent("onchange", function () { a.setPosition() }) }, i.prototype.handleClick = function () { var a = this.switcher; e(a), this.events.bind("click", "bindClick") }, i.prototype.bindClick = function () { var a = this.element.parentNode.tagName.toLowerCase(), b = "label" === a ? !1 : !0; this.setPosition(b), this.handleOnchange(this.element.checked) }, i.prototype.markAsSwitched = function () { this.element.setAttribute("data-switchery", !0) }, i.prototype.markedAsSwitched = function () { return this.element.getAttribute("data-switchery") }, i.prototype.init = function () { this.hide(), this.show(), this.setSize(), this.setPosition(), this.markAsSwitched(), this.handleChange(), this.handleClick() }, i.prototype.isChecked = function () { return this.element.checked }, i.prototype.isDisabled = function () { return this.options.disabled || this.element.disabled || this.element.readOnly }, i.prototype.destroy = function () { this.events.unbind() }, i.prototype.enable = function () { this.options.disabled && (this.options.disabled = !1), this.element.disabled && (this.element.disabled = !1), this.element.readOnly && (this.element.readOnly = !1), this.switcher.style.opacity = 1, this.events.bind("click", "bindClick") }, i.prototype.disable = function () { this.options.disabled || (this.options.disabled = !0), this.element.disabled || (this.element.disabled = !0), this.element.readOnly || (this.element.readOnly = !0), this.switcher.style.opacity = this.options.disabledOpacity, this.destroy() } }), "object" == typeof exports ? module.exports = a("switchery") : "function" == typeof define && define.amd ? define("Switchery", [], function () { return a("switchery") }) : (this || window)["Switchery"] = a("switchery") }();

// jFlick
jFlick.__performance = 'no';
jFlick.__currentBlurTimer = null;
jFlick.__touched = false;
jFlick.__elasticTimer = null;
jFlick.__elasticLock = false;
jFlick.__elasticTop = '.scroll-view';

$(document).ready(function () {
    var elastic = function (current) {
        if (current.find('.scroll-view').length > 0) {
            var scrollTop = current.find(jFlick.__elasticTop).offset().top + current.scrollTop();
            if ($('.navigator[data-parent="#' + current.attr('id') + '"]').length > 0)
                scrollTop -= $('.navigator[data-parent="#' + current.attr('id') + '"]').outerHeight();

            if (current.scrollTop() < scrollTop && !jFlick.__elasticLock) {
                jFlick.__elasticLock = true;
                current.animate({ scrollTop: scrollTop }, 250);
                setTimeout(function () { jFlick.__elasticLock = false; }, 250);
            }

            if ($(window).height() - current.find('.elastic-bottom').offset().top > 0 && !jFlick.__elasticLock) {
                jFlick.__elasticLock = true;
                current.animate({ scrollTop: current.scrollTop() - $(window).height() + current.find('.elastic-bottom').offset().top }, 250);
                setTimeout(function () { jFlick.__elasticLock = false; }, 250);
            }
        }
    };
    var elastic_touch = function (e) {
        if ($(e.target).attr('href'))
            return;
        var current = $(e.target).hasClass('.container') ? $(e.target) : $(e.target).parents('.container');
        elastic(current);
    }
    jFlick.__elasticTimer = setInterval(function () {
        if (!jFlick.__touched)
        {
            var current = jFlick.GetView(0);
            elastic(current);
        }
    }, 100);
    $(document).bind('touchstart', function (e) {
        jFlick.__touched = true;
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
            fix.css('top', tr.offset().top + tr.parents('.container').scrollTop());
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
        jFlick.__touched = false;
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
    $(document).bind('touchend', elastic_touch);
    $(document).bind('touchcancel', elastic_touch);
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
    top.remove();
    if (jFlick.__topBlurTimer)
        clearInterval(jFlick.__topBlurTimer);
    jFlick.__topBlurTimer = setInterval(function () {
        $('.navigator[data-parent="#' + bottom.attr('id') + '"] .container-blurred').scrollTop(bottom.scrollTop(), true);
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

router.use(function (req, res, next) {
    if (res.find('.scroll-view').length > 0) {
        res.prepend('<div class="elastic-top"></div>');
        res.append('<div class="elastic-bottom"></div>');
    }
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

jFlick.Elastic = function (selector) {
    if (!selector)
        jFlick.__elasticTop = '.scroll-view';
    else
        jFlick.__elasticTop = selector;
};