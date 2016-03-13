// Switchery
!function () { function a(b) { var c = a.modules[b]; if (!c) throw new Error('failed to require "' + b + '"'); return "exports" in c || "function" != typeof c.definition || (c.client = c.component = !0, c.definition.call(this, c.exports = {}, c), delete c.definition), c.exports } a.loader = "component", a.helper = {}, a.helper.semVerSort = function (a, b) { var e, f, g, h, i, c = a.version.split("."), d = b.version.split("."); for (e = 0; e < c.length; ++e) { if (f = parseInt(c[e], 10), g = parseInt(d[e], 10), f !== g) return f > g ? 1 : -1; if (h = c[e].substr(("" + f).length), i = d[e].substr(("" + g).length), "" === h && "" !== i) return 1; if ("" !== h && "" === i) return -1; if ("" !== h && "" !== i) return h > i ? 1 : -1 } return 0 }, a.latest = function (b, c) { function d(a) { throw new Error('failed to find latest module of "' + a + '"') } var g, h, i, j, k, l, m, n, e = /(.*)~(.*)@v?(\d+\.\d+\.\d+[^\/]*)$/, f = /(.*)~(.*)/; for (f.test(b) || d(b), g = Object.keys(a.modules), h = [], i = [], j = 0; j < g.length; j++) k = g[j], new RegExp(b + "@").test(k) && (l = k.substr(b.length + 1), m = e.exec(k), null != m ? h.push({ version: l, name: k }) : i.push({ version: l, name: k })); return 0 === h.concat(i).length && d(b), h.length > 0 ? (n = h.sort(a.helper.semVerSort).pop().name, c === !0 ? n : a(n)) : (n = i.sort(function (a, b) { return a.name > b.name })[0].name, c === !0 ? n : a(n)) }, a.modules = {}, a.register = function (b, c) { a.modules[b] = { definition: c } }, a.define = function (b, c) { a.modules[b] = { exports: c } }, a.register("abpetkov~transitionize@0.0.3", function (a, b) { function c(a, b) { return this instanceof c ? (this.element = a, this.props = b || {}, this.init(), void 0) : new c(a, b) } b.exports = c, c.prototype.isSafari = function () { return /Safari/.test(navigator.userAgent) && /Apple Computer/.test(navigator.vendor) }, c.prototype.init = function () { var b, a = []; for (b in this.props) a.push(b + " " + this.props[b]); this.element.style.transition = a.join(", "), this.isSafari() && (this.element.style.webkitTransition = a.join(", ")) } }), a.register("ftlabs~fastclick@v0.6.11", function (a, b) { function c(a) { "use strict"; var b, d = this; if (this.trackingClick = !1, this.trackingClickStart = 0, this.targetElement = null, this.touchStartX = 0, this.touchStartY = 0, this.lastTouchIdentifier = 0, this.touchBoundary = 10, this.layer = a, !a || !a.nodeType) throw new TypeError("Layer must be a document node"); this.onClick = function () { return c.prototype.onClick.apply(d, arguments) }, this.onMouse = function () { return c.prototype.onMouse.apply(d, arguments) }, this.onTouchStart = function () { return c.prototype.onTouchStart.apply(d, arguments) }, this.onTouchMove = function () { return c.prototype.onTouchMove.apply(d, arguments) }, this.onTouchEnd = function () { return c.prototype.onTouchEnd.apply(d, arguments) }, this.onTouchCancel = function () { return c.prototype.onTouchCancel.apply(d, arguments) }, c.notNeeded(a) || (this.deviceIsAndroid && (a.addEventListener("mouseover", this.onMouse, !0), a.addEventListener("mousedown", this.onMouse, !0), a.addEventListener("mouseup", this.onMouse, !0)), a.addEventListener("click", this.onClick, !0), a.addEventListener("touchstart", this.onTouchStart, !1), a.addEventListener("touchmove", this.onTouchMove, !1), a.addEventListener("touchend", this.onTouchEnd, !1), a.addEventListener("touchcancel", this.onTouchCancel, !1), Event.prototype.stopImmediatePropagation || (a.removeEventListener = function (b, c, d) { var e = Node.prototype.removeEventListener; "click" === b ? e.call(a, b, c.hijacked || c, d) : e.call(a, b, c, d) }, a.addEventListener = function (b, c, d) { var e = Node.prototype.addEventListener; "click" === b ? e.call(a, b, c.hijacked || (c.hijacked = function (a) { a.propagationStopped || c(a) }), d) : e.call(a, b, c, d) }), "function" == typeof a.onclick && (b = a.onclick, a.addEventListener("click", function (a) { b(a) }, !1), a.onclick = null)) } c.prototype.deviceIsAndroid = navigator.userAgent.indexOf("Android") > 0, c.prototype.deviceIsIOS = /iP(ad|hone|od)/.test(navigator.userAgent), c.prototype.deviceIsIOS4 = c.prototype.deviceIsIOS && /OS 4_\d(_\d)?/.test(navigator.userAgent), c.prototype.deviceIsIOSWithBadTarget = c.prototype.deviceIsIOS && /OS ([6-9]|\d{2})_\d/.test(navigator.userAgent), c.prototype.needsClick = function (a) { "use strict"; switch (a.nodeName.toLowerCase()) { case "button": case "select": case "textarea": if (a.disabled) return !0; break; case "input": if (this.deviceIsIOS && "file" === a.type || a.disabled) return !0; break; case "label": case "video": return !0 } return /\bneedsclick\b/.test(a.className) }, c.prototype.needsFocus = function (a) { "use strict"; switch (a.nodeName.toLowerCase()) { case "textarea": return !0; case "select": return !this.deviceIsAndroid; case "input": switch (a.type) { case "button": case "checkbox": case "file": case "image": case "radio": case "submit": return !1 } return !a.disabled && !a.readOnly; default: return /\bneedsfocus\b/.test(a.className) } }, c.prototype.sendClick = function (a, b) { "use strict"; var c, d; document.activeElement && document.activeElement !== a && document.activeElement.blur(), d = b.changedTouches[0], c = document.createEvent("MouseEvents"), c.initMouseEvent(this.determineEventType(a), !0, !0, window, 1, d.screenX, d.screenY, d.clientX, d.clientY, !1, !1, !1, !1, 0, null), c.forwardedTouchEvent = !0, a.dispatchEvent(c) }, c.prototype.determineEventType = function (a) { "use strict"; return this.deviceIsAndroid && "select" === a.tagName.toLowerCase() ? "mousedown" : "click" }, c.prototype.focus = function (a) { "use strict"; var b; this.deviceIsIOS && a.setSelectionRange && 0 !== a.type.indexOf("date") && "time" !== a.type ? (b = a.value.length, a.setSelectionRange(b, b)) : a.focus() }, c.prototype.updateScrollParent = function (a) { "use strict"; var b, c; if (b = a.fastClickScrollParent, !b || !b.contains(a)) { c = a; do { if (c.scrollHeight > c.offsetHeight) { b = c, a.fastClickScrollParent = c; break } c = c.parentElement } while (c) } b && (b.fastClickLastScrollTop = b.scrollTop) }, c.prototype.getTargetElementFromEventTarget = function (a) { "use strict"; return a.nodeType === Node.TEXT_NODE ? a.parentNode : a }, c.prototype.onTouchStart = function (a) { "use strict"; var b, c, d; if (a.targetTouches.length > 1) return !0; if (b = this.getTargetElementFromEventTarget(a.target), c = a.targetTouches[0], this.deviceIsIOS) { if (d = window.getSelection(), d.rangeCount && !d.isCollapsed) return !0; if (!this.deviceIsIOS4) { if (c.identifier === this.lastTouchIdentifier) return a.preventDefault(), !1; this.lastTouchIdentifier = c.identifier, this.updateScrollParent(b) } } return this.trackingClick = !0, this.trackingClickStart = a.timeStamp, this.targetElement = b, this.touchStartX = c.pageX, this.touchStartY = c.pageY, a.timeStamp - this.lastClickTime < 200 && a.preventDefault(), !0 }, c.prototype.touchHasMoved = function (a) { "use strict"; var b = a.changedTouches[0], c = this.touchBoundary; return Math.abs(b.pageX - this.touchStartX) > c || Math.abs(b.pageY - this.touchStartY) > c ? !0 : !1 }, c.prototype.onTouchMove = function (a) { "use strict"; return this.trackingClick ? ((this.targetElement !== this.getTargetElementFromEventTarget(a.target) || this.touchHasMoved(a)) && (this.trackingClick = !1, this.targetElement = null), !0) : !0 }, c.prototype.findControl = function (a) { "use strict"; return void 0 !== a.control ? a.control : a.htmlFor ? document.getElementById(a.htmlFor) : a.querySelector("button, input:not([type=hidden]), keygen, meter, output, progress, select, textarea") }, c.prototype.onTouchEnd = function (a) { "use strict"; var b, c, d, e, f, g = this.targetElement; if (!this.trackingClick) return !0; if (a.timeStamp - this.lastClickTime < 200) return this.cancelNextClick = !0, !0; if (this.cancelNextClick = !1, this.lastClickTime = a.timeStamp, c = this.trackingClickStart, this.trackingClick = !1, this.trackingClickStart = 0, this.deviceIsIOSWithBadTarget && (f = a.changedTouches[0], g = document.elementFromPoint(f.pageX - window.pageXOffset, f.pageY - window.pageYOffset) || g, g.fastClickScrollParent = this.targetElement.fastClickScrollParent), d = g.tagName.toLowerCase(), "label" === d) { if (b = this.findControl(g)) { if (this.focus(g), this.deviceIsAndroid) return !1; g = b } } else if (this.needsFocus(g)) return a.timeStamp - c > 100 || this.deviceIsIOS && window.top !== window && "input" === d ? (this.targetElement = null, !1) : (this.focus(g), this.deviceIsIOS4 && "select" === d || (this.targetElement = null, a.preventDefault()), !1); return this.deviceIsIOS && !this.deviceIsIOS4 && (e = g.fastClickScrollParent, e && e.fastClickLastScrollTop !== e.scrollTop) ? !0 : (this.needsClick(g) || (a.preventDefault(), this.sendClick(g, a)), !1) }, c.prototype.onTouchCancel = function () { "use strict"; this.trackingClick = !1, this.targetElement = null }, c.prototype.onMouse = function (a) { "use strict"; return this.targetElement ? a.forwardedTouchEvent ? !0 : a.cancelable ? !this.needsClick(this.targetElement) || this.cancelNextClick ? (a.stopImmediatePropagation ? a.stopImmediatePropagation() : a.propagationStopped = !0, a.stopPropagation(), a.preventDefault(), !1) : !0 : !0 : !0 }, c.prototype.onClick = function (a) { "use strict"; var b; return this.trackingClick ? (this.targetElement = null, this.trackingClick = !1, !0) : "submit" === a.target.type && 0 === a.detail ? !0 : (b = this.onMouse(a), b || (this.targetElement = null), b) }, c.prototype.destroy = function () { "use strict"; var a = this.layer; this.deviceIsAndroid && (a.removeEventListener("mouseover", this.onMouse, !0), a.removeEventListener("mousedown", this.onMouse, !0), a.removeEventListener("mouseup", this.onMouse, !0)), a.removeEventListener("click", this.onClick, !0), a.removeEventListener("touchstart", this.onTouchStart, !1), a.removeEventListener("touchmove", this.onTouchMove, !1), a.removeEventListener("touchend", this.onTouchEnd, !1), a.removeEventListener("touchcancel", this.onTouchCancel, !1) }, c.notNeeded = function (a) { "use strict"; var b, d; if ("undefined" == typeof window.ontouchstart) return !0; if (d = +(/Chrome\/([0-9]+)/.exec(navigator.userAgent) || [, 0])[1]) { if (!c.prototype.deviceIsAndroid) return !0; if (b = document.querySelector("meta[name=viewport]")) { if (-1 !== b.content.indexOf("user-scalable=no")) return !0; if (d > 31 && window.innerWidth <= window.screen.width) return !0 } } return "none" === a.style.msTouchAction ? !0 : !1 }, c.attach = function (a) { "use strict"; return new c(a) }, "undefined" != typeof define && define.amd ? define(function () { "use strict"; return c }) : "undefined" != typeof b && b.exports ? (b.exports = c.attach, b.exports.FastClick = c) : window.FastClick = c }), a.register("component~indexof@0.0.3", function (a, b) { b.exports = function (a, b) { if (a.indexOf) return a.indexOf(b); for (var c = 0; c < a.length; ++c) if (a[c] === b) return c; return -1 } }), a.register("component~classes@1.2.1", function (b, c) { function g(a) { if (!a) throw new Error("A DOM element reference is required"); this.el = a, this.list = a.classList } var d = a("component~indexof@0.0.3"), e = /\s+/, f = Object.prototype.toString; c.exports = function (a) { return new g(a) }, g.prototype.add = function (a) { var b, c; return this.list ? (this.list.add(a), this) : (b = this.array(), c = d(b, a), ~c || b.push(a), this.el.className = b.join(" "), this) }, g.prototype.remove = function (a) { var b, c; return "[object RegExp]" == f.call(a) ? this.removeMatching(a) : this.list ? (this.list.remove(a), this) : (b = this.array(), c = d(b, a), ~c && b.splice(c, 1), this.el.className = b.join(" "), this) }, g.prototype.removeMatching = function (a) { var c, b = this.array(); for (c = 0; c < b.length; c++) a.test(b[c]) && this.remove(b[c]); return this }, g.prototype.toggle = function (a, b) { return this.list ? ("undefined" != typeof b ? b !== this.list.toggle(a, b) && this.list.toggle(a) : this.list.toggle(a), this) : ("undefined" != typeof b ? b ? this.add(a) : this.remove(a) : this.has(a) ? this.remove(a) : this.add(a), this) }, g.prototype.array = function () { var a = this.el.className.replace(/^\s+|\s+$/g, ""), b = a.split(e); return "" === b[0] && b.shift(), b }, g.prototype.has = g.prototype.contains = function (a) { return this.list ? this.list.contains(a) : !!~d(this.array(), a) } }), a.register("component~event@0.1.4", function (a) { var c = window.addEventListener ? "addEventListener" : "attachEvent", d = window.removeEventListener ? "removeEventListener" : "detachEvent", e = "addEventListener" !== c ? "on" : ""; a.bind = function (a, b, d, f) { return a[c](e + b, d, f || !1), d }, a.unbind = function (a, b, c, f) { return a[d](e + b, c, f || !1), c } }), a.register("component~query@0.0.3", function (a, b) { function c(a, b) { return b.querySelector(a) } a = b.exports = function (a, b) { return b = b || document, c(a, b) }, a.all = function (a, b) { return b = b || document, b.querySelectorAll(a) }, a.engine = function (b) { if (!b.one) throw new Error(".one callback required"); if (!b.all) throw new Error(".all callback required"); return c = b.one, a.all = b.all, a } }), a.register("component~matches-selector@0.1.5", function (b, c) { function g(a, b) { var c, e; if (!a || 1 !== a.nodeType) return !1; if (f) return f.call(a, b); for (c = d.all(b, a.parentNode), e = 0; e < c.length; ++e) if (c[e] == a) return !0; return !1 } var d = a("component~query@0.0.3"), e = Element.prototype, f = e.matches || e.webkitMatchesSelector || e.mozMatchesSelector || e.msMatchesSelector || e.oMatchesSelector; c.exports = g }), a.register("component~closest@0.1.4", function (b, c) { var d = a("component~matches-selector@0.1.5"); c.exports = function (a, b, c, e) { for (a = c ? { parentNode: a } : a, e = e || document; (a = a.parentNode) && a !== document;) { if (d(a, b)) return a; if (a === e) return } } }), a.register("component~delegate@0.2.3", function (b) { var d = a("component~closest@0.1.4"), e = a("component~event@0.1.4"); b.bind = function (a, b, c, f, g) { return e.bind(a, c, function (c) { var e = c.target || c.srcElement; c.delegateTarget = d(e, b, !0, a), c.delegateTarget && f.call(a, c) }, g) }, b.unbind = function (a, b, c, d) { e.unbind(a, b, c, d) } }), a.register("component~events@1.0.9", function (b, c) { function f(a, b) { if (!(this instanceof f)) return new f(a, b); if (!a) throw new Error("element required"); if (!b) throw new Error("object required"); this.el = a, this.obj = b, this._events = {} } function g(a) { var b = a.split(/ +/); return { name: b.shift(), selector: b.join(" ") } } var d = a("component~event@0.1.4"), e = a("component~delegate@0.2.3"); c.exports = f, f.prototype.sub = function (a, b, c) { this._events[a] = this._events[a] || {}, this._events[a][b] = c }, f.prototype.bind = function (a, b) { function k() { var a = [].slice.call(arguments).concat(j); h[b].apply(h, a) } var j, c = g(a), f = this.el, h = this.obj, i = c.name; return b = b || "on" + i, j = [].slice.call(arguments, 2), c.selector ? k = e.bind(f, c.selector, i, k) : d.bind(f, i, k), this.sub(i, b, k), k }, f.prototype.unbind = function (a, b) { var c, e; return 0 == arguments.length ? this.unbindAll() : 1 == arguments.length ? this.unbindAllOf(a) : (c = this._events[a], c && (e = c[b], e && d.unbind(this.el, a, e)), void 0) }, f.prototype.unbindAll = function () { for (var a in this._events) this.unbindAllOf(a) }, f.prototype.unbindAllOf = function (a) { var c, b = this._events[a]; if (b) for (c in b) this.unbind(a, c) } }), a.register("switchery", function (b, c) { function i(a, b) { if (!(this instanceof i)) return new i(a, b); this.element = a, this.options = b || {}; for (var c in h) null == this.options[c] && (this.options[c] = h[c]); null != this.element && "checkbox" == this.element.type && 0 == $(this.element).next().hasClass("switchery") && this.init(), this.isDisabled() === !0 && this.disable() } var h, d = a("abpetkov~transitionize@0.0.3"), e = a("ftlabs~fastclick@v0.6.11"), f = a("component~classes@1.2.1"), g = a("component~events@1.0.9"); c.exports = i, h = { color: "#64bd63", secondaryColor: "#dfdfdf", jackColor: "#fff", jackSecondaryColor: null, className: "switchery", disabled: !1, disabledOpacity: .5, speed: "0.4s", size: "default" }, i.prototype.hide = function () { this.element.style.display = "none" }, i.prototype.show = function () { var a = this.create(); this.insertAfter(this.element, a) }, i.prototype.create = function () { return this.switcher = document.createElement("span"), this.jack = document.createElement("small"), this.jack.setAttribute("class", "switchery-button"), this.switcher.appendChild(this.jack), this.switcher.className = this.options.className, this.events = g(this.switcher, this), touch.on(this.switcher, "swiperight", function (a) { $(a.target).prev('input[type="checkbox"]').attr("checked", "checked") }), touch.on(this.switcher, "swipeleft", function (a) { $(a.target).prev('input[type="checkbox"]').removeAttr("checked") }), touch.on(this.jack, "swiperight", function (a) { $(a.target).parents(".switchery").prev('input[type="checkbox"]').attr("checked", "checked") }), touch.on(this.jack, "swipeleft", function (a) { $(a.target).parents(".switchery").prev('input[type="checkbox"]').removeAttr("checked") }), this.switcher }, i.prototype.insertAfter = function (a, b) { a.parentNode.insertBefore(b, a.nextSibling) }, i.prototype.setPosition = function (a) { var b = this.isChecked(), c = this.switcher, d = this.jack; a && b ? b = !1 : a && !b && (b = !0), b === !0 ? (this.element.checked = !0, d.style.left = window.getComputedStyle ? parseInt(window.getComputedStyle(c).width) - parseInt(window.getComputedStyle(d).width) + "px" : parseInt(c.currentStyle["width"]) - parseInt(d.currentStyle["width"]) + "px", this.options.color && this.colorize(), this.setSpeed()) : (d.style.left = 0, this.element.checked = !1, this.switcher.style.boxShadow = "inset 0 0 0 0 " + this.options.secondaryColor, this.switcher.style.borderColor = this.options.secondaryColor, this.switcher.style.backgroundColor = this.options.secondaryColor !== h.secondaryColor ? this.options.secondaryColor : "#fff", this.jack.style.backgroundColor = this.options.jackSecondaryColor !== this.options.jackColor ? this.options.jackSecondaryColor : this.options.jackColor, this.setSpeed()) }, i.prototype.setSpeed = function () { var a = {}, b = { "background-color": this.options.speed, left: this.options.speed.replace(/[a-z]/, "") / 2 + "s" }; a = this.isChecked() ? { border: this.options.speed, "box-shadow": this.options.speed, "background-color": 3 * this.options.speed.replace(/[a-z]/, "") + "s" } : { border: this.options.speed, "box-shadow": this.options.speed }, d(this.switcher, a), d(this.jack, b) }, i.prototype.setSize = function () { var a = "switchery-small", b = "switchery-default", c = "switchery-large"; switch (this.options.size) { case "small": f(this.switcher).add(a); break; case "large": f(this.switcher).add(c); break; default: f(this.switcher).add(b) } }, i.prototype.colorize = function () { var a = this.switcher.offsetHeight / 2; this.switcher.style.backgroundColor = this.options.color, this.switcher.style.borderColor = this.options.color, this.switcher.style.boxShadow = "inset 0 0 0 " + a + "px " + this.options.color, this.jack.style.backgroundColor = this.options.jackColor }, i.prototype.handleOnchange = function () { if (document.dispatchEvent) { var b = document.createEvent("HTMLEvents"); b.initEvent("change", !0, !0), this.element.dispatchEvent(b) } else this.element.fireEvent("onchange") }, i.prototype.handleChange = function () { var a = this, b = this.element; b.addEventListener ? b.addEventListener("change", function () { a.setPosition() }) : b.attachEvent("onchange", function () { a.setPosition() }) }, i.prototype.handleClick = function () { var a = this.switcher; e(a), this.events.bind("click", "bindClick") }, i.prototype.bindClick = function () { var a = this.element.parentNode.tagName.toLowerCase(), b = "label" === a ? !1 : !0; this.setPosition(b), this.handleOnchange(this.element.checked) }, i.prototype.markAsSwitched = function () { this.element.setAttribute("data-switchery", !0) }, i.prototype.markedAsSwitched = function () { return this.element.getAttribute("data-switchery") }, i.prototype.init = function () { this.hide(), this.show(), this.setSize(), this.setPosition(), this.markAsSwitched(), this.handleChange(), this.handleClick() }, i.prototype.isChecked = function () { return this.element.checked }, i.prototype.isDisabled = function () { return this.options.disabled || this.element.disabled || this.element.readOnly }, i.prototype.destroy = function () { this.events.unbind() }, i.prototype.enable = function () { this.options.disabled && (this.options.disabled = !1), this.element.disabled && (this.element.disabled = !1), this.element.readOnly && (this.element.readOnly = !1), this.switcher.style.opacity = 1, this.events.bind("click", "bindClick") }, i.prototype.disable = function () { this.options.disabled || (this.options.disabled = !0), this.element.disabled || (this.element.disabled = !0), this.element.readOnly || (this.element.readOnly = !0), this.switcher.style.opacity = this.options.disabledOpacity, this.destroy() } }), "object" == typeof exports ? module.exports = a("switchery") : "function" == typeof define && define.amd ? define("Switchery", [], function () { return a("switchery") }) : (this || window)["Switchery"] = a("switchery") }();

// Touch
"use strict"; !function (a, b) { "function" == typeof define && (define.amd || define.cmd) ? define(b) : a.touch = b() }(this, function () { function a() { var a = "mouseup mousedown mousemove mouseout", c = "touchstart touchmove touchend touchcancel", d = b.hasTouch ? c : a; d.split(" ").forEach(function (a) { document.addEventListener(a, A, !1) }) } var b = {}; b.PCevts = { touchstart: "mousedown", touchmove: "mousemove", touchend: "mouseup", touchcancel: "mouseout" }, b.hasTouch = "ontouchstart" in window, b.getType = function (a) { return Object.prototype.toString.call(a).match(/\s([a-z|A-Z]+)/)[1].toLowerCase() }, b.getSelector = function (a) { if (a.id) return "#" + a.id; if (a.className) { var b = a.className.split(/\s+/); return "." + b.join(".") } return a === document ? "body" : a.tagName.toLowerCase() }, b.matchSelector = function (a, b) { return a.webkitMatchesSelector(b) }, b.getEventListeners = function (a) { return a.listeners }, b.getPCevts = function (a) { return this.PCevts[a] || a }, b.forceReflow = function () { var a = "reflowDivBlock", b = document.getElementById(a); b || (b = document.createElement("div"), b.id = a, document.body.appendChild(b)); var c = b.parentNode, d = b.nextSibling; c.removeChild(b), c.insertBefore(b, d) }, b.simpleClone = function (a) { return Object.create(a) }, b.getPosOfEvent = function (a) { if (this.hasTouch) { for (var b = [], c = null, d = 0, e = a.touches.length; e > d; d++) c = a.touches[d], b.push({ x: c.pageX, y: c.pageY }); return b } return [{ x: a.pageX, y: a.pageY }] }, b.getDistance = function (a, b) { var c = b.x - a.x, d = b.y - a.y; return Math.sqrt(c * c + d * d) }, b.getFingers = function (a) { return a.touches ? a.touches.length : 1 }, b.calScale = function (a, b) { if (a.length >= 2 && b.length >= 2) { var c = this.getDistance(a[1], a[0]), d = this.getDistance(b[1], b[0]); return d / c } return 1 }, b.getAngle = function (a, b) { return 180 * Math.atan2(b.y - a.y, b.x - a.x) / Math.PI }, b.getAngle180 = function (a, b) { var c = Math.atan(-1 * (b.y - a.y) / (b.x - a.x)) * (180 / Math.PI); return 0 > c ? c + 180 : c }, b.getDirectionFromAngle = function (a) { var b = { up: -45 > a && a > -135, down: a >= 45 && 135 > a, left: a >= 135 || -135 >= a, right: a >= -45 && 45 >= a }; for (var c in b) if (b[c]) return c; return null }, b.getXYByElement = function (a) { for (var b = 0, c = 0; a.offsetParent;) b += a.offsetLeft, c += a.offsetTop, a = a.offsetParent; return { left: b, top: c } }, b.reset = function () { h = i = j = null, q = o = k = l = !1, m = !1, f = {}, t = !1 }, b.isTouchMove = function (a) { return "touchmove" === a.type || "mousemove" === a.type }, b.isTouchEnd = function (a) { return "touchend" === a.type || "mouseup" === a.type || "touchcancel" === a.type }, b.env = function () { var a = {}, b = navigator.userAgent, c = b.match(/(Android)[\s\/]+([\d\.]+)/), d = b.match(/(iPad|iPhone|iPod)\s+OS\s([\d_\.]+)/), e = b.match(/(Windows\s+Phone)\s([\d\.]+)/), f = /WebKit\/[\d.]+/i.test(b), g = d ? navigator.standalone ? f : /Safari/i.test(b) && !/CriOS/i.test(b) && !/MQQBrowser/i.test(b) : !1; return c && (a.android = !0, a.version = c[2]), d && (a.ios = !0, a.version = d[2].replace(/_/g, "."), a.ios7 = /^7/.test(a.version), "iPad" === d[1] ? a.ipad = !0 : "iPhone" === d[1] ? (a.iphone = !0, a.iphone5 = 568 == screen.height) : "iPod" === d[1] && (a.ipod = !0)), e && (a.wp = !0, a.version = e[2], a.wp8 = /^8/.test(a.version)), f && (a.webkit = !0), g && (a.safari = !0), a }(); var c = { proxyid: 0, proxies: [], trigger: function (a, b, c) { c = c || {}; var d, e = { bubbles: !0, cancelable: !0, detail: c }; try { "undefined" != typeof CustomEvent ? (d = new CustomEvent(b, e), a && a.dispatchEvent(d)) : (d = document.createEvent("CustomEvent"), d.initCustomEvent(b, !0, !0, c), a && a.dispatchEvent(d)) } catch (f) { console.warn("Touch.js is not supported by environment.") } }, bind: function (a, c, d) { a.listeners = a.listeners || {}, a.listeners[c] ? a.listeners[c].push(d) : a.listeners[c] = [d]; var e = function (a) { b.env.ios7 && b.forceReflow(), a.originEvent = a; for (var c in a.detail) "type" !== c && (a[c] = a.detail[c]); a.startRotate = function () { t = !0 }; var e = d.call(a.target, a); "undefined" == typeof e || e || (a.stopPropagation(), a.preventDefault()) }; d.proxy = d.proxy || {}, d.proxy[c] ? d.proxy[c].push(this.proxyid++) : d.proxy[c] = [this.proxyid++], this.proxies.push(e), a.addEventListener && a.addEventListener(c, e, !1) }, unbind: function (a, b, c) { if (c) { var d = c.proxy[b]; d && d.length && d.forEach(function () { a.removeEventListener && a.removeEventListener(b, this.proxies[this.proxyid], !1) }) } else { var e = a.listeners[b]; e && e.length && e.forEach(function (c) { a.removeEventListener(b, c, !1) }) } }, delegate: function (a, c, d, e) { var f = function (c) { var f, g; c.originEvent = c; for (var h in c.detail) "type" !== h && (c[h] = c.detail[h]); c.startRotate = function () { t = !0 }; var i = b.getSelector(a) + " " + d, j = b.matchSelector(c.target, i), k = b.matchSelector(c.target, i + " " + c.target.nodeName); if (!j && k) { for (b.env.ios7 && b.forceReflow(), f = c.target; !b.matchSelector(f, i) ;) f = f.parentNode; g = e.call(c.target, c), "undefined" == typeof g || g || (c.stopPropagation(), c.preventDefault()) } else b.env.ios7 && b.forceReflow(), (j || k) && (g = e.call(c.target, c), "undefined" == typeof g || g || (c.stopPropagation(), c.preventDefault())) }; e.proxy = e.proxy || {}, e.proxy[c] ? e.proxy[c].push(this.proxyid++) : e.proxy[c] = [this.proxyid++], this.proxies.push(f), a.listeners = a.listeners || {}, a.listeners[c] ? a.listeners[c].push(f) : a.listeners[c] = [f], a.addEventListener && a.addEventListener(c, f, !1) }, undelegate: function (a, b, c, d) { if (d) { var e = d.proxy[b]; e.length && e.forEach(function () { a.removeEventListener && a.removeEventListener(b, this.proxies[this.proxyid], !1) }) } else { var f = a.listeners[b]; f.forEach(function (c) { a.removeEventListener(b, c, !1) }) } } }, d = { tap: !0, doubleTap: !0, tapMaxDistance: 10, hold: !0, tapTime: 200, holdTime: 650, maxDoubleTapInterval: 300, swipe: !0, swipeTime: 300, swipeMinDistance: 18, swipeFactor: 5, drag: !0, pinch: !0, minScaleRate: 0, minRotationAngle: 0 }, e = { TOUCH_START: "touchstart", TOUCH_MOVE: "touchmove", TOUCH_END: "touchend", TOUCH_CANCEL: "touchcancel", MOUSE_DOWN: "mousedown", MOUSE_MOVE: "mousemove", MOUSE_UP: "mouseup", CLICK: "click", PINCH_START: "pinchstart", PINCH_END: "pinchend", PINCH: "pinch", PINCH_IN: "pinchin", PINCH_OUT: "pinchout", ROTATION_LEFT: "rotateleft", ROTATION_RIGHT: "rotateright", ROTATION: "rotate", SWIPE_START: "swipestart", SWIPING: "swiping", SWIPE_END: "swipeend", SWIPE_LEFT: "swipeleft", SWIPE_RIGHT: "swiperight", SWIPE_UP: "swipeup", SWIPE_DOWN: "swipedown", SWIPE: "swipe", DRAG: "drag", DRAGSTART: "dragstart", DRAGEND: "dragend", HOLD: "hold", TAP: "tap", DOUBLE_TAP: "doubletap" }, f = { start: null, move: null, end: null }, g = 0, h = null, i = null, j = null, k = !1, l = !1, m = !1, n = {}, o = !1, p = null, q = !1, r = null, s = 1, t = !1, u = [], v = 0, w = 0, x = 0, y = null, z = { getAngleDiff: function (a) { for (var c = parseInt(v - b.getAngle180(a[0], a[1]), 10), d = 0; Math.abs(c - w) > 90 && d++ < 50;) 0 > w ? c -= 180 : c += 180; return w = parseInt(c, 10) }, pinch: function (a) { var g = a.target; if (d.pinch) { if (!o) return; if (b.getFingers(a) < 2 && !b.isTouchEnd(a)) return; var h = b.calScale(f.start, f.move), i = this.getAngleDiff(f.move), j = { type: "", originEvent: a, scale: h, rotation: i, direction: i > 0 ? "right" : "left", fingersCount: b.getFingers(a) }; if (l ? b.isTouchMove(a) ? (j.fingerStatus = "move", c.trigger(g, e.PINCH, j)) : b.isTouchEnd(a) && (j.fingerStatus = "end", c.trigger(g, e.PINCH_END, j), b.reset()) : (l = !0, j.fingerStatus = "start", c.trigger(g, e.PINCH_START, j)), Math.abs(1 - h) > d.minScaleRate) { var k = b.simpleClone(j), m = 1e-11; h > s ? (s = h - m, c.trigger(g, e.PINCH_OUT, k, !1)) : s > h && (s = h + m, c.trigger(g, e.PINCH_IN, k, !1)), b.isTouchEnd(a) && (s = 1) } if (Math.abs(i) > d.minRotationAngle) { var n, p = b.simpleClone(j); n = i > 0 ? e.ROTATION_RIGHT : e.ROTATION_LEFT, c.trigger(g, n, p, !1), c.trigger(g, e.ROTATION, j) } } }, rotateSingleFinger: function (a) { var d = a.target; if (t && b.getFingers(a) < 2) { if (!f.move) return; if (u.length < 2) { var g = b.getXYByElement(d); u = [{ x: g.left + d.offsetWidth / 2, y: g.top + d.offsetHeight / 2 }, f.move[0]], v = parseInt(b.getAngle180(u[0], u[1]), 10) } var h = [u[0], f.move[0]], i = this.getAngleDiff(h), j = { type: "", originEvent: a, rotation: i, direction: i > 0 ? "right" : "left", fingersCount: b.getFingers(a) }; b.isTouchMove(a) ? j.fingerStatus = "move" : (b.isTouchEnd(a) || "mouseout" === a.type) && (j.fingerStatus = "end", c.trigger(d, e.PINCH_END, j), b.reset()); var k = i > 0 ? e.ROTATION_RIGHT : e.ROTATION_LEFT; c.trigger(d, k, j), c.trigger(d, e.ROTATION, j) } }, swipe: function (a) { var h = a.target; if (o && f.move && !(b.getFingers(a) > 1)) { var i = Date.now(), j = i - g, l = b.getDistance(f.start[0], f.move[0]), p = { x: f.move[0].x - n.left, y: f.move[0].y - n.top }, q = b.getAngle(f.start[0], f.move[0]), r = b.getDirectionFromAngle(q), s = j / 1e3, t = 10 * (10 - d.swipeFactor) * s * s, u = { type: e.SWIPE, originEvent: a, position: p, direction: r, distance: l, distanceX: f.move[0].x - f.start[0].x, distanceY: f.move[0].y - f.start[0].y, x: f.move[0].x - f.start[0].x, y: f.move[0].y - f.start[0].y, angle: q, duration: j, fingersCount: b.getFingers(a), factor: t }; if (d.swipe) { var v = function () { var a = e; switch (r) { case "up": c.trigger(h, a.SWIPE_UP, u); break; case "down": c.trigger(h, a.SWIPE_DOWN, u); break; case "left": c.trigger(h, a.SWIPE_LEFT, u); break; case "right": c.trigger(h, a.SWIPE_RIGHT, u) } }; k ? b.isTouchMove(a) ? (u.fingerStatus = u.swipe = "move", c.trigger(h, e.SWIPING, u), j > d.swipeTime && j < d.swipeTime + 50 && l > d.swipeMinDistance && (v(), c.trigger(h, e.SWIPE, u, !1))) : (b.isTouchEnd(a) || "mouseout" === a.type) && (u.fingerStatus = u.swipe = "end", c.trigger(h, e.SWIPE_END, u), d.swipeTime > j && l > d.swipeMinDistance && (v(), c.trigger(h, e.SWIPE, u, !1))) : (u.fingerStatus = u.swipe = "start", k = !0, c.trigger(h, e.SWIPE_START, u)) } d.drag && (m ? b.isTouchMove(a) ? (u.fingerStatus = u.swipe = "move", c.trigger(h, e.DRAG, u)) : b.isTouchEnd(a) && (u.fingerStatus = u.swipe = "end", c.trigger(h, e.DRAGEND, u)) : (u.fingerStatus = u.swipe = "start", m = !0, c.trigger(h, e.DRAGSTART, u))) } }, tap: function (a) { var h = a.target; if (d.tap) { var i = Date.now(), j = i - g, k = b.getDistance(f.start[0], f.move ? f.move[0] : f.start[0]); clearTimeout(p); var l = function () { if (y && d.doubleTap && g - x < d.maxDoubleTapInterval) { var a = b.getDistance(y, f.start[0]); if (16 > a) return !0 } return !1 }(); if (l) return clearTimeout(r), void c.trigger(h, e.DOUBLE_TAP, { type: e.DOUBLE_TAP, originEvent: a, position: f.start[0] }); if (d.tapMaxDistance < k) return; d.holdTime > j && b.getFingers(a) <= 1 && (q = !0, x = i, y = f.start[0], r = setTimeout(function () { c.trigger(h, e.TAP, { type: e.TAP, originEvent: a, fingersCount: b.getFingers(a), position: y }) }, d.tapTime)) } }, hold: function (a) { var e = a.target; d.hold && (clearTimeout(p), p = setTimeout(function () { if (f.start) { var g = b.getDistance(f.start[0], f.move ? f.move[0] : f.start[0]); d.tapMaxDistance < g || q || c.trigger(e, "hold", { type: "hold", originEvent: a, fingersCount: b.getFingers(a), position: f.start[0] }) } }, d.holdTime)) } }, A = function (a) { var c = a.target; switch (a.type) { case "touchstart": case "mousedown": u = [], o = !0, (!f.start || f.start.length < 2) && (f.start = b.getPosOfEvent(a)), b.getFingers(a) >= 2 && (v = parseInt(b.getAngle180(f.start[0], f.start[1]), 10)), g = Date.now(), h = a, n = {}; var d = c.getBoundingClientRect(), e = document.documentElement; n = { top: d.top + (window.pageYOffset || e.scrollTop) - (e.clientTop || 0), left: d.left + (window.pageXOffset || e.scrollLeft) - (e.clientLeft || 0) }, z.hold(a); break; case "touchmove": case "mousemove": if (!o || !f.start) return; f.move = b.getPosOfEvent(a), b.getFingers(a) >= 2 ? z.pinch(a) : t ? z.rotateSingleFinger(a) : z.swipe(a); break; case "touchend": case "touchcancel": case "mouseup": case "mouseout": if (!o) return; j = a, l ? z.pinch(a) : t ? z.rotateSingleFinger(a) : k ? z.swipe(a) : z.tap(a), b.reset(), v = 0, w = 0, a.touches && 1 === a.touches.length && (o = !0, t = !0) } }, B = function () { function a(a) { b.hasTouch || (a = b.getPCevts(a)), j.forEach(function (b) { c.delegate(b, a, h, g[a]) }) } function d(a) { b.hasTouch || (a = b.getPCevts(a)), j.forEach(function (b) { c.bind(b, a, g[a]) }) } var e, f, g, h, i = arguments; if (i.length < 2 || i > 4) return console.error("unexpected arguments!"); var j = "string" === b.getType(i[0]) ? document.querySelectorAll(i[0]) : i[0]; if (j = j.length ? Array.prototype.slice.call(j) : [j], 3 === i.length && "string" === b.getType(i[1])) return e = i[1].split(" "), f = i[2], void e.forEach(function (a) { b.hasTouch || (a = b.getPCevts(a)), j.forEach(function (b) { c.bind(b, a, f) }) }); if (3 !== i.length || "object" !== b.getType(i[1])) if (2 !== i.length || "object" !== b.getType(i[1])) { if (4 === i.length && "object" === b.getType(i[2])) return e = i[1].split(" "), f = i[3], void e.forEach(function (a) { b.hasTouch || (a = b.getPCevts(a)), j.forEach(function (b) { c.bind(b, a, f) }) }); if (4 === i.length) { var k = j[0]; return e = i[1].split(" "), h = i[2], f = i[3], void e.forEach(function (a) { b.hasTouch || (a = b.getPCevts(a)), c.delegate(k, a, h, f) }) } } else { g = i[1]; for (var l in g) d(l) } else { g = i[1], h = i[2]; for (var m in g) a(m) } }, C = function () { var a, d, e = arguments; if (e.length < 1 || e.length > 4) return console.error("unexpected arguments!"); var f = "string" === b.getType(e[0]) ? document.querySelectorAll(e[0]) : e[0]; if (f = f.length ? Array.prototype.slice.call(f) : [f], 1 === e.length || 2 === e.length) return void f.forEach(function (d) { a = e[1] ? e[1].split(" ") : Object.keys(d.listeners), a.length && a.forEach(function (a) { b.hasTouch || (a = b.getPCevts(a)), c.unbind(d, a), c.undelegate(d, a) }) }); if (3 === e.length && "function" === b.getType(e[2])) return d = e[2], void f.forEach(function (f) { a = e[1].split(" "), a.forEach(function (a) { b.hasTouch || (a = b.getPCevts(a)), c.unbind(f, a, d) }) }); if (3 === e.length && "string" === b.getType(e[2])) { var g = e[2]; return void f.forEach(function (d) { a = e[1].split(" "), a.forEach(function (a) { b.hasTouch || (a = b.getPCevts(a)), c.undelegate(d, a, g) }) }) } return 4 === e.length ? (d = e[3], void f.forEach(function (f) { a = e[1].split(" "), a.forEach(function (a) { b.hasTouch || (a = b.getPCevts(a)), c.undelegate(f, a, g, d) }) })) : void 0 }, D = function (a, d, e) { var f = arguments; b.hasTouch || (d = b.getPCevts(d)); var g = "string" === b.getType(f[0]) ? document.querySelectorAll(f[0]) : f[0]; g = g.length ? Array.prototype.call(g) : [g], g.forEach(function (a) { c.trigger(a, d, e) }) }; a(); var E = {}; return E.on = E.bind = E.live = B, E.off = E.unbind = E.die = C, E.config = d, E.trigger = D, E });

// jFlick
jFlick.__performance = 'no';
jFlick.__currentBlurTimer = null;
jFlick.__touched = false;
jFlick.__elasticTimer = null;
jFlick.__elasticLock = true;
jFlick.__elasticTop = '.scroll-view';
jFlick.__loading = false;

jFlick.__elastic = function (current) {
    if (jFlick.__elasticLock)
        return;
    if (current.find('.scroll-view').length > 0) {
        var scrollTop = current.find(jFlick.__elasticTop).offset().top + current.scrollTop();
        var navheight = 0;
        if ($('.navigator[data-parent="#' + current.attr('id') + '"]').length > 0)
            navheight = $('.navigator[data-parent="#' + current.attr('id') + '"]').outerHeight();
        scrollTop -= navheight;

        if (current.scrollTop() < scrollTop && !jFlick.__elasticLock) {
            jFlick.__elasticLock = true;
            current.animate({ scrollTop: scrollTop }, 250);
            setTimeout(function () { jFlick.__elasticLock = false; }, 250);
        }

        var tbheight = $('.tab-bar[data-parent="#' + current.attr('id') + '"]').outerHeight() || 0;

        if ($(window).height() - current.find('.elastic-bottom').offset().top > tbheight && current.scrollTop() + tbheight > current.find('.elastic-top').outerHeight() + navheight && !jFlick.__elasticLock) {
            jFlick.__elasticLock = true;
            if (current.find('.scroll-view').outerHeight() < $(window).height())
                current.animate({ scrollTop: scrollTop }, 250);
            else
                current.animate({ scrollTop: current.scrollTop() - $(window).height() + current.find('.elastic-bottom').offset().top + tbheight }, 250);
            setTimeout(function () { jFlick.__elasticLock = false; }, 250);
        }
    }
};

$(document).ready(function () {
    $('body').append('<div id="jflick-navigators"></div>');
    $('body').append('<div id="jflick-tab-bars"></div>');
    var elastic_touch = function (e) {
        if ($(e.target).attr('href'))
            return;
        var current = $(e.target).hasClass('.container') ? $(e.target) : $(e.target).parents('.container');
        jFlick.__elastic(current);
    }
    jFlick.__elasticTimer = setInterval(function () {
        if (!jFlick.__touched && !jFlick.__elasticLock)
        {
            jFlick.__elastic(jFlick.GetView(0));
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
    $('.tab-bar[data-parent="#' + bottom.attr('id') + '"]').show();
    bottom.css('display', 'inline');
    var tabbar1 = $('.tab-bar[data-parent="#' + top.attr('id') + '"]');
    var tabbar2 = $('.tab-bar[data-parent="#' + bottom.attr('id') + '"]');
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
            tabbar1.css('transform', 'translateX(' + $(window).width() + 'px)');
            bottom.css('transform', 'none');
            tabbar2.css('transform', 'none');

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
    $('.tab-bar[data-parent="#' + top.attr('id') + '"]').remove();
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
    clearInterval(jFlick.__elasticTimer);
    jFlick.__elasticLock = true;
    jFlick.__loading = true;
    var performance = jFlick.__performance;
    var tabbar = top.find('.tab-bar');
    tabbar.attr('data-parent', '#' + top.attr('id'));
    if (performance == 'slide') {
        top.addClass('swipable');
        if (top.find('.navigator').length == 0 && $('.navigator[data-parent="#' + top.attr('id') + '"]').length == 0 || bottom.find('.navigator').length == 0 && $('.navigator[data-parent="#' + bottom.attr('id') + '"]').length == 0) {
            bottom.css('transform', 'translateX(' + -$(window).width() / 4 + 'px)');
            top.css('transform', 'translateX(' + $(window).width() + 'px)');
            next();
            tabbar.appendTo('#jflick-tab-bars');
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
            tabbar.css('transform', 'translateX(' + $(window).width() + 'px)');

            // 显示新视图
            next();
            tabbar.appendTo('#jflick-tab-bars');
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
                tabbar.css('transform', 'none');
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
        tabbar.appendTo('#jflick-tab-bars');
        top.appendTo('body');
        top.outerHeight($(window).height());

        // 调整新视图位置
        setTimeout(function () {
            top.css('transform', 'none');
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
    } else if (performance == 'tab') {
        top.find('.navigator').attr('data-parent', '#' + top.attr('id'));
        next();
        tabbar.appendTo('#jflick-tab-bars');
        top.appendTo('body');
        top.outerHeight($(window).height());
        top.find('.navigator').appendTo('#jflick-navigators');
        $('.navigator[data-parent="#' + bottom.attr('id') + '"]').remove();
        $('.tab-bar[data-parent="#' + bottom.attr('id') + '"]').remove();
        if (bottom.hasClass('swipable'))
            top.addClass('swipable');
        bottom.remove();
        final();
    }  else {
        top.find('.navigator').attr('data-parent', '#' + top.attr('id'));
        next();
        tabbar.appendTo('#jflick-tab-bars');
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

router.global.loaded(function (req, top, bottom, next) {
    var st = 0;
    $('.tab-bar[data-parent="#' + bottom.attr('id') + '"]').hide();
    if (top.find('.elastic-top').length > 0)
        st += top.find('.elastic-top').outerHeight();
    top.scrollTop(st);
    jFlick.__loading = false;
    jFlick.__elasticLock = false;
    jFlick.__elasticTimer = setInterval(function () {
        if (!jFlick.__touched && !jFlick.__elasticLock) {
            jFlick.__elastic(jFlick.GetView(0));
        }
    }, 100);
    next();
});

router.use(function (req, res, next) {
    if (res.find('.scroll-view').length > 0) {
        var top = $('<div class="elastic-top"></div>');
        top.height($(window).height() / 3 * 2);
        top.prependTo(res);
        var bottom = $('<div class="elastic-bottom"></div>');
        bottom.height($(window).height() / 3 * 2);
        bottom.appendTo(res);
    }
    next();
});

router.use(function (req, res, next) {
    var anchors = res.find('.tab-bar a');
    for (var i = 0; i < anchors.length; i++) {
        if (document.location.toString().indexOf(jFlick.ParseUrl($(anchors[i]).attr('href'))) == 0 && (!document.location.toString()[jFlick.ParseUrl($(anchors[i]).attr('href')).length]) || document.location.toString()[jFlick.ParseUrl($(anchors[i]).attr('href')).length] == '?') {
            $(anchors[i]).addClass('tab-active');
        }
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