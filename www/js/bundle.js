!function(t){var e={};function n(r){if(e[r])return e[r].exports;var i=e[r]={i:r,l:!1,exports:{}};return t[r].call(i.exports,i,i.exports,n),i.l=!0,i.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"==typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var i in t)n.d(r,i,function(e){return t[e]}.bind(null,i));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=0)}([function(t,e,n){"use strict";function r(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function i(t,e){for(var n=0;n<e.length;n++){var r=e[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(t,r.key,r)}}function u(t,e,n){return e&&i(t.prototype,e),n&&i(t,n),t}n.r(e);var o="closed",s="opening",c="closing",a="opened",l=o,f=500,d=function(){function t(e){r(this,t),this.element=e}return u(t,[{key:"notify",value:function(t){this.element.dataset.state=t}}]),t}(),y=function(){function t(e){var n=e.state,i=e.duration,u=e.elements;if(r(this,t),!u)throw new Error("Animatrong: constructor: elements were not passed");this._vacate(),this._elements=function(t){return t instanceof Array?t:[t]}(u).map(function(t){return new d(t)}),this._setState(n||l),this.duration=i||f}return u(t,[{key:"_setState",value:function(t){return this._state=t,this._notify(t),this}},{key:"_notify",value:function(t){return this._elements.forEach(function(e){return e.notify(t)}),this}},{key:"getState",value:function(){return this._state}},{key:"isState",value:function(t){return this.getState()===t}},{key:"isBusy",value:function(){return!!this._busy}},{key:"_occupy",value:function(){return this._busy=!0,this}},{key:"_vacate",value:function(){return this._busy=!1,this}},{key:"_process",value:function(t,e,n){var r=this;return this._occupy()._setState(e),setTimeout(function(){return r._setState(n)._vacate(),t()},this.duration),this}},{key:"start",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};return!this.isState(a)&&!this.isBusy()&&this._process(t,s,a)}},{key:"end",value:function(){var t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:function(){};return!this.isState(o)&&!this.isBusy()&&this._process(t,c,o)}},{key:"toggle",value:function(t){if(!this.isBusy())return this.isState(o)?this.start(t):this.end(t)}}]),t}(),v=500;$(document).ready(function(){document.querySelector("body").classList.remove("no-js"),function(){var t=document.querySelector("[data-navbar-toggle]"),e=document.getElementById("lining"),n=document.querySelector(".navbar"),r=document.querySelector(".dashboard__side-bar"),i=document.querySelector(".side-menu"),u=new y({elements:[t,e,n,r,i],duration:v});t.addEventListener("click",function e(n){t.removeEventListener("click",e),u.toggle(function(){t.addEventListener("click",e)})}),e.addEventListener("click",function t(n){u.isBusy()||(e.removeEventListener("click",t),u.end(function(){e.addEventListener("click",t)}))})}()})}]);
//# sourceMappingURL=bundle.js.map