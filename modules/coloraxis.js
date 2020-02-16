/*
 Highcharts JS v8.0.0 (2020-02-16)

 ColorAxis module

 (c) 2012-2019 Pawel Potaczek

 License: www.highcharts.com/license
*/
(function(b){"object"===typeof module&&module.exports?(b["default"]=b,module.exports=b):"function"===typeof define&&define.amd?define("highcharts/modules/color-axis",["highcharts"],function(h){b(h);b.Highcharts=h;return b}):b("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(b){function h(n,e,b,q){n.hasOwnProperty(e)||(n[e]=q.apply(null,b))}b=b?b._modules:{};h(b,"parts-map/ColorSeriesMixin.js",[b["parts/Globals.js"]],function(b){b.colorPointMixin={setVisible:function(b){var e=this,n=b?
"show":"hide";e.visible=e.options.visible=!!b;["graphic","dataLabel"].forEach(function(b){if(e[b])e[b][n]()})}};b.colorSeriesMixin={optionalAxis:"colorAxis",colorAxis:0,translateColors:function(){var b=this,n=this.options.nullColor,q=this.colorAxis,r=this.colorKey;(this.data.length?this.data:this.points).forEach(function(e){var p=e.getNestedProperty(r);if(p=e.options.color||(e.isNull?n:q&&"undefined"!==typeof p?q.toColor(p,e):e.color||b.color))e.color=p})}}});h(b,"parts-map/ColorAxis.js",[b["parts/Globals.js"],
b["parts/Utilities.js"]],function(b,e){"";var h=e.addEvent,q=e.erase,r=e.extend,n=e.isNumber,p=e.merge,t=e.pick,A=e.splat,k=b.Axis;e=b.Chart;var u=b.Series,B=b.Point,v=b.color,w=b.Legend,C=b.LegendSymbolMixin,D=b.colorPointMixin,y=b.noop;r(u.prototype,b.colorSeriesMixin);r(B.prototype,D);e.prototype.collectionsWithUpdate.push("colorAxis");e.prototype.collectionsWithInit.colorAxis=[e.prototype.addColorAxis];var x=b.ColorAxis=function(){this.init.apply(this,arguments)};r(x.prototype,k.prototype);r(x.prototype,
{defaultColorAxisOptions:{lineWidth:0,minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},width:.01,color:"#999999"},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0},keepProps:["legendGroup","legendItemHeight","legendItemWidth","legendItem","legendSymbol"].concat(k.prototype.keepProps),init:function(a,c){this.coll="colorAxis";var g=this.buildOptions.call(a,this.defaultColorAxisOptions,
c);k.prototype.init.call(this,a,g);c.dataClasses&&this.initDataClasses(c);this.initStops();this.horiz=!g.opposite;this.zoomEnabled=!1;this.defaultLegendLength=200},initDataClasses:function(a){var c=this.chart,g,d=0,z=c.options.chart.colorCount,b=this.options,f=a.dataClasses.length;this.dataClasses=g=[];this.legendItems=[];a.dataClasses.forEach(function(a,e){a=p(a);g.push(a);if(c.styledMode||!a.color)"category"===b.dataClassColor?(c.styledMode||(e=c.options.colors,z=e.length,a.color=e[d]),a.colorIndex=
d,d++,d===z&&(d=0)):a.color=v(b.minColor).tweenTo(v(b.maxColor),2>f?.5:e/(f-1))})},hasData:function(){return!(!this.tickPositions||!this.tickPositions.length)},setTickPositions:function(){if(!this.dataClasses)return k.prototype.setTickPositions.call(this)},initStops:function(){this.stops=this.options.stops||[[0,this.options.minColor],[1,this.options.maxColor]];this.stops.forEach(function(a){a.color=v(a[1])})},buildOptions:function(a,c){var g=this.options.legend,d=c.layout?"vertical"!==c.layout:"vertical"!==
g.layout;return p(a,{side:d?2:1,reversed:!d},c,{opposite:!d,showEmpty:!1,title:null,visible:g.enabled&&(c?!1!==c.visible:!0)})},setOptions:function(a){k.prototype.setOptions.call(this,a);this.options.crosshair=this.options.marker},setAxisSize:function(){var a=this.legendSymbol,c=this.chart,g=c.options.legend||{},d,b;a?(this.left=g=a.attr("x"),this.top=d=a.attr("y"),this.width=b=a.attr("width"),this.height=a=a.attr("height"),this.right=c.chartWidth-g-b,this.bottom=c.chartHeight-d-a,this.len=this.horiz?
b:a,this.pos=this.horiz?g:d):this.len=(this.horiz?g.symbolWidth:g.symbolHeight)||this.defaultLegendLength},normalizedValue:function(a){this.isLog&&(a=this.val2lin(a));return 1-(this.max-a)/(this.max-this.min||1)},toColor:function(a,c){var g=this.stops,d=this.dataClasses,b;if(d)for(b=d.length;b--;){var e=d[b];var f=e.from;g=e.to;if(("undefined"===typeof f||a>=f)&&("undefined"===typeof g||a<=g)){var l=e.color;c&&(c.dataClass=b,c.colorIndex=e.colorIndex);break}}else{a=this.normalizedValue(a);for(b=g.length;b--&&
!(a>g[b][0]););f=g[b]||g[b+1];g=g[b+1]||f;a=1-(g[0]-a)/(g[0]-f[0]||1);l=f.color.tweenTo(g.color,a)}return l},getOffset:function(){var a=this.legendGroup,c=this.chart.axisOffset[this.side];a&&(this.axisParent=a,k.prototype.getOffset.call(this),this.added||(this.added=!0,this.labelLeft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=c)},setLegendColor:function(){var a=this.reversed;var c=a?1:0;a=a?0:1;c=this.horiz?[c,0,a,0]:[0,a,0,c];this.legendColor={linearGradient:{x1:c[0],y1:c[1],
x2:c[2],y2:c[3]},stops:this.stops}},drawLegendSymbol:function(a,c){var b=a.padding,d=a.options,e=this.horiz,m=t(d.symbolWidth,e?this.defaultLegendLength:12),f=t(d.symbolHeight,e?12:this.defaultLegendLength),l=t(d.labelPadding,e?16:30);d=t(d.itemDistance,10);this.setLegendColor();c.legendSymbol=this.chart.renderer.rect(0,a.baseline-11,m,f).attr({zIndex:1}).add(c.legendGroup);this.legendItemWidth=m+b+(e?d:l);this.legendItemHeight=f+b+(e?l:0)},setState:function(a){this.series.forEach(function(c){c.setState(a)})},
visible:!0,setVisible:y,getSeriesExtremes:function(){var a=this.series,c=a.length,b;this.dataMin=Infinity;for(this.dataMax=-Infinity;c--;){var d=a[c];var e=d.colorKey=t(d.options.colorKey,d.colorKey,d.pointValKey,d.zoneAxis,"y");var m=d.pointArrayMap;var f=d[e+"Min"]&&d[e+"Max"];if(d[e+"Data"])var l=d[e+"Data"];else if(m){l=[];m=m.indexOf(e);var h=d.yData;if(0<=m&&h)for(b=0;b<h.length;b++)l.push(t(h[b][m],h[b]))}else l=d.yData;f?(d.minColorValue=d[e+"Min"],d.maxColorValue=d[e+"Max"]):(u.prototype.getExtremes.call(d,
l),d.minColorValue=d.dataMin,d.maxColorValue=d.dataMax);"undefined"!==typeof d.minColorValue&&(this.dataMin=Math.min(this.dataMin,d.minColorValue),this.dataMax=Math.max(this.dataMax,d.maxColorValue));f||u.prototype.getExtremes.call(d)}},drawCrosshair:function(a,c){var b=c&&c.plotX,d=c&&c.plotY,e=this.pos,m=this.len;if(c){var f=this.toPixels(c.getNestedProperty(c.series.colorKey));f<e?f=e-2:f>e+m&&(f=e+m+2);c.plotX=f;c.plotY=this.len-f;k.prototype.drawCrosshair.call(this,a,c);c.plotX=b;c.plotY=d;this.cross&&
!this.cross.addedToColorAxis&&this.legendGroup&&(this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),this.cross.addedToColorAxis=!0,this.chart.styledMode||this.cross.attr({fill:this.crosshair.color}))}},getPlotLinePath:function(a){var c=a.translatedValue;return n(c)?this.horiz?["M",c-4,this.top-6,"L",c+4,this.top-6,c,this.top,"Z"]:["M",this.left,c,"L",this.left-6,c+6,this.left-6,c-6,"Z"]:k.prototype.getPlotLinePath.apply(this,arguments)},update:function(a,c){var b=this.chart,
d=b.legend,e=this.buildOptions.call(b,{},a);this.series.forEach(function(a){a.isDirtyData=!0});(a.dataClasses&&d.allItems||this.dataClasses)&&this.destroyItems();b.options[this.coll]=p(this.userOptions,e);k.prototype.update.call(this,e,c);this.legendItem&&(this.setLegendColor(),d.colorizeItem(this,!0))},destroyItems:function(){var a=this.chart;this.legendItem?a.legend.destroyItem(this):this.legendItems&&this.legendItems.forEach(function(c){a.legend.destroyItem(c)});a.isDirtyLegend=!0},remove:function(a){this.destroyItems();
k.prototype.remove.call(this,a)},getDataClassLegendSymbols:function(){var a=this,c=this.chart,b=this.legendItems,d=c.options.legend,e=d.valueDecimals,m=d.valueSuffix||"",f;b.length||this.dataClasses.forEach(function(d,g){var h=!0,k=d.from,l=d.to,n=c.numberFormatter;f="";"undefined"===typeof k?f="< ":"undefined"===typeof l&&(f="> ");"undefined"!==typeof k&&(f+=n(k,e)+m);"undefined"!==typeof k&&"undefined"!==typeof l&&(f+=" - ");"undefined"!==typeof l&&(f+=n(l,e)+m);b.push(r({chart:c,name:f,options:{},
drawLegendSymbol:C.drawRectangle,visible:!0,setState:y,isDataClass:!0,setVisible:function(){h=this.visible=!h;a.series.forEach(function(a){a.points.forEach(function(a){a.dataClass===g&&a.setVisible(h)})});c.legend.colorizeItem(this,h)}},d))});return b},beforePadding:!1,name:""});["fill","stroke"].forEach(function(a){b.Fx.prototype[a+"Setter"]=function(){this.elem.attr(a,v(this.start).tweenTo(v(this.end),this.pos),null,!0)}});h(e,"afterGetAxes",function(){var a=this,c=a.options;this.colorAxis=[];c.colorAxis&&
(c.colorAxis=A(c.colorAxis),c.colorAxis.forEach(function(c,b){c.index=b;new x(a,c)}))});h(u,"bindAxes",function(){var a=this.axisTypes;a?-1===a.indexOf("colorAxis")&&a.push("colorAxis"):this.axisTypes=["colorAxis"]});h(w,"afterGetAllItems",function(a){var c=[],b,d;(this.chart.colorAxis||[]).forEach(function(d){(b=d.options)&&b.showInLegend&&(b.dataClasses&&b.visible?c=c.concat(d.getDataClassLegendSymbols()):b.visible&&c.push(d),d.series.forEach(function(c){if(!c.options.showInLegend||b.dataClasses)"point"===
c.options.legendType?c.points.forEach(function(c){q(a.allItems,c)}):q(a.allItems,c)}))});for(d=c.length;d--;)a.allItems.unshift(c[d])});h(w,"afterColorizeItem",function(a){a.visible&&a.item.legendColor&&a.item.legendSymbol.attr({fill:a.item.legendColor})});h(w,"afterUpdate",function(){var a=this.chart.colorAxis;a&&a.forEach(function(a,b,d){a.update({},d)})});h(u,"afterTranslate",function(){(this.chart.colorAxis&&this.chart.colorAxis.length||this.colorAttribs)&&this.translateColors()})});h(b,"masters/modules/coloraxis.src.js",
[],function(){})});
//# sourceMappingURL=coloraxis.js.map