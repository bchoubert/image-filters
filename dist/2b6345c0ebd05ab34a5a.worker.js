(function(t){var e={};function n(r){if(e[r])return e[r].exports;var a=e[r]={i:r,l:!1,exports:{}};return t[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=t,n.c=e,n.d=function(t,e,r){n.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:r})},n.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},n.t=function(t,e){if(1&e&&(t=n(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)n.d(r,a,function(e){return t[e]}.bind(null,a));return r},n.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="/image-filters/dist/",n(n.s="18ff")})({"18ff":function(t,e){var n=1.25,r={MORE_RED:function(t,e){return t.data.data[e]*=n},LESS_RED:function(t,e){return t.data.data[e]/=n},MORE_GREEN:function(t,e){return t.data.data[e+1]*=n},LESS_GREEN:function(t,e){return t.data.data[e+1]/=n},MORE_BLUE:function(t,e){return t.data.data[e+2]*=n},LESS_BLUE:function(t,e){return t.data.data[e+2]/=n}};executeFunctionOverPixels=function(t,e){for(var n=0;n<t.height;n++)for(var r=0;r<t.width;r++){var a=4*(r+n*t.width);e(t,a)}},self.onmessage=function(t){executeFunctionOverPixels(t.data.image,r[t.data.filterCode]),self.postMessage(t.data.image)}}});
//# sourceMappingURL=2b6345c0ebd05ab34a5a.worker.js.map