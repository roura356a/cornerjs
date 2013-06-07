/*
* Polyfills from:
* https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach.
* https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter
* https://developer.mozilla.org/en-US/docs/JavaScript/Reference/Global_Objects/Array/filter
*
* Required for IE8-
* */

Array.prototype.indexOf = Array.prototype.indexOf || function (searchElement /*, fromIndex */) {
    "use strict";
    if (this === null) {
        throw new TypeError();
    }
    var t = Object(this);
    var len = t.length >>> 0;
    if (len === 0) {
        return -1;
    }
    var n = 0;
    if (arguments.length > 1) {
        n = Number(arguments[1]);
        if (n != n) { // shortcut for verifying if it's NaN
            n = 0;
        } else if (n !== 0 && n !== Infinity && n !== -Infinity) {
            n = (n > 0 || -1) * Math.floor(Math.abs(n));
        }
    }
    if (n >= len) {
        return -1;
    }
    var k = n >= 0 ? n : Math.max(len - Math.abs(n), 0);
    for (; k < len; k++) {
        if (k in t && t[k] === searchElement) {
            return k;
        }
    }
    return -1;
};

Array.prototype.forEach = Array.prototype.forEach || function (fn, scope) {
    for (var i = 0, len = this.length; i < len; ++i) {
        fn.call(scope, this[i], i, this);
    }
};

Array.prototype.filter = Array.prototype.filter || function (fun /*, thisp*/) {
    "use strict";

    if (this == null)
        throw new TypeError();

    var t = Object(this);
    var len = t.length >>> 0;
    if (typeof fun != "function")
        throw new TypeError();

    var res = [];
    var thisp = arguments[1];
    for (var i = 0; i < len; i++) {
        if (i in t) {
            var val = t[i]; // in case fun mutates this
            if (fun.call(thisp, val, i, t))
                res.push(val);
        }
    }

    return res;
};