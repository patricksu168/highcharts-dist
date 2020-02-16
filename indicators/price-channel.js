/*
 Highstock JS v8.0.0 (2020-02-16)

 Indicator series type for Highstock

 (c) 2010-2019 Daniel Studencki

 License: www.highcharts.com/license
*/
(function(a){"object"===typeof module&&module.exports?(a["default"]=a,module.exports=a):"function"===typeof define&&define.amd?define("highcharts/indicators/price-channel",["highcharts","highcharts/modules/stock"],function(d){a(d);a.Highcharts=d;return a}):a("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(a){function d(a,b,u,e){a.hasOwnProperty(b)||(a[b]=e.apply(null,u))}a=a?a._modules:{};d(a,"mixins/reduce-array.js",[a["parts/Globals.js"]],function(a){var b=a.reduce;return{minInArray:function(a,
e){return b(a,function(a,c){return Math.min(a,c[e])},Number.MAX_VALUE)},maxInArray:function(a,e){return b(a,function(a,c){return Math.max(a,c[e])},-Number.MAX_VALUE)},getArrayExtremes:function(a,e,d){return b(a,function(a,b){return[Math.min(a[0],b[e]),Math.max(a[1],b[d])]},[Number.MAX_VALUE,-Number.MAX_VALUE])}}});d(a,"mixins/multipe-lines.js",[a["parts/Globals.js"],a["parts/Utilities.js"]],function(a,b){var d=b.defined,e=b.error,r=b.merge,c=a.each,t=a.seriesTypes.sma;return{pointArrayMap:["top",
"bottom"],pointValKey:"top",linesApiNames:["bottomLine"],getTranslatedLinesNames:function(a){var h=[];c(this.pointArrayMap,function(c){c!==a&&h.push("plot"+c.charAt(0).toUpperCase()+c.slice(1))});return h},toYData:function(a){var h=[];c(this.pointArrayMap,function(c){h.push(a[c])});return h},translate:function(){var a=this,b=a.pointArrayMap,e=[],d;e=a.getTranslatedLinesNames();t.prototype.translate.apply(a,arguments);c(a.points,function(h){c(b,function(c,b){d=h[c];null!==d&&(h[e[b]]=a.yAxis.toPixels(d,
!0))})})},drawGraph:function(){var a=this,b=a.linesApiNames,p=a.points,n=p.length,l=a.options,k=a.graph,q={options:{gapSize:l.gapSize}},f=[],m=a.getTranslatedLinesNames(a.pointValKey),g;c(m,function(a,c){for(f[c]=[];n--;)g=p[n],f[c].push({x:g.x,plotX:g.plotX,plotY:g[a],isNull:!d(g[a])});n=p.length});c(b,function(c,b){f[b]?(a.points=f[b],l[c]?a.options=r(l[c].styles,q):e('Error: "There is no '+c+' in DOCS options declared. Check if linesApiNames are consistent with your DOCS line names." at mixin/multiple-line.js:34'),
a.graph=a["graph"+c],t.prototype.drawGraph.call(a),a["graph"+c]=a.graph):e('Error: "'+c+" doesn't have equivalent in pointArrayMap. To many elements in linesApiNames relative to pointArrayMap.\"")});a.points=p;a.options=l;a.graph=k;t.prototype.drawGraph.call(a)}}});d(a,"indicators/price-channel.src.js",[a["parts/Utilities.js"],a["mixins/reduce-array.js"],a["mixins/multipe-lines.js"]],function(a,b,d){var e=a.merge;a=a.seriesType;var r=b.getArrayExtremes;a("pc","sma",{params:{period:20},lineWidth:1,
topLine:{styles:{lineColor:"#90ed7d",lineWidth:1}},bottomLine:{styles:{lineColor:"#f45b5b",lineWidth:1}},dataGrouping:{approximation:"averages"}},e(d,{pointArrayMap:["top","middle","bottom"],pointValKey:"middle",nameBase:"Price Channel",nameComponents:["period"],linesApiNames:["topLine","bottomLine"],getValues:function(a,b){b=b.period;var c=a.xData,d=(a=a.yData)?a.length:0,e=[],n=[],l=[],k;if(!(d<b)){for(k=b;k<=d;k++){var q=c[k-1];var f=a.slice(k-b,k);var m=r(f,2,1);f=m[1];var g=m[0];m=(f+g)/2;e.push([q,
f,m,g]);n.push(q);l.push([f,m,g])}return{values:e,xData:n,yData:l}}}}));""});d(a,"masters/indicators/price-channel.src.js",[],function(){})});
//# sourceMappingURL=price-channel.js.map