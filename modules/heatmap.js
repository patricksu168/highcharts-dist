/*
 Highmaps JS v8.0.0 (2020-02-16)

 (c) 2009-2019 Torstein Honsi

 License: www.highcharts.com/license
*/
(function(f){"object"===typeof module&&module.exports?(f["default"]=f,module.exports=f):"function"===typeof define&&define.amd?define("highcharts/modules/heatmap",["highcharts"],function(p){f(p);f.Highcharts=p;return f}):f("undefined"!==typeof Highcharts?Highcharts:void 0)})(function(f){function p(d,a,f,n){d.hasOwnProperty(a)||(d[a]=n.apply(null,f))}f=f?f._modules:{};p(f,"parts-map/ColorSeriesMixin.js",[f["parts/Globals.js"]],function(d){d.colorPointMixin={setVisible:function(d){var a=this,f=d?"show":
"hide";a.visible=a.options.visible=!!d;["graphic","dataLabel"].forEach(function(d){if(a[d])a[d][f]()})}};d.colorSeriesMixin={optionalAxis:"colorAxis",colorAxis:0,translateColors:function(){var d=this,f=this.options.nullColor,n=this.colorAxis,t=this.colorKey;(this.data.length?this.data:this.points).forEach(function(a){var v=a.getNestedProperty(t);if(v=a.options.color||(a.isNull?f:n&&"undefined"!==typeof v?n.toColor(v,a):a.color||d.color))a.color=v})}}});p(f,"parts-map/ColorAxis.js",[f["parts/Globals.js"],
f["parts/Utilities.js"]],function(d,a){"";var f=a.addEvent,n=a.erase,t=a.extend,p=a.isNumber,u=a.merge,q=a.pick,w=a.splat,l=d.Axis;a=d.Chart;var r=d.Series,k=d.Point,m=d.color,x=d.Legend,B=d.LegendSymbolMixin,C=d.colorPointMixin,A=d.noop;t(r.prototype,d.colorSeriesMixin);t(k.prototype,C);a.prototype.collectionsWithUpdate.push("colorAxis");a.prototype.collectionsWithInit.colorAxis=[a.prototype.addColorAxis];var y=d.ColorAxis=function(){this.init.apply(this,arguments)};t(y.prototype,l.prototype);t(y.prototype,
{defaultColorAxisOptions:{lineWidth:0,minPadding:0,maxPadding:0,gridLineWidth:1,tickPixelInterval:72,startOnTick:!0,endOnTick:!0,offset:0,marker:{animation:{duration:50},width:.01,color:"#999999"},labels:{overflow:"justify",rotation:0},minColor:"#e6ebf5",maxColor:"#003399",tickLength:5,showInLegend:!0},keepProps:["legendGroup","legendItemHeight","legendItemWidth","legendItem","legendSymbol"].concat(l.prototype.keepProps),init:function(b,c){this.coll="colorAxis";var g=this.buildOptions.call(b,this.defaultColorAxisOptions,
c);l.prototype.init.call(this,b,g);c.dataClasses&&this.initDataClasses(c);this.initStops();this.horiz=!g.opposite;this.zoomEnabled=!1;this.defaultLegendLength=200},initDataClasses:function(b){var c=this.chart,g,e=0,h=c.options.chart.colorCount,d=this.options,a=b.dataClasses.length;this.dataClasses=g=[];this.legendItems=[];b.dataClasses.forEach(function(b,f){b=u(b);g.push(b);if(c.styledMode||!b.color)"category"===d.dataClassColor?(c.styledMode||(f=c.options.colors,h=f.length,b.color=f[e]),b.colorIndex=
e,e++,e===h&&(e=0)):b.color=m(d.minColor).tweenTo(m(d.maxColor),2>a?.5:f/(a-1))})},hasData:function(){return!(!this.tickPositions||!this.tickPositions.length)},setTickPositions:function(){if(!this.dataClasses)return l.prototype.setTickPositions.call(this)},initStops:function(){this.stops=this.options.stops||[[0,this.options.minColor],[1,this.options.maxColor]];this.stops.forEach(function(b){b.color=m(b[1])})},buildOptions:function(b,c){var g=this.options.legend,e=c.layout?"vertical"!==c.layout:"vertical"!==
g.layout;return u(b,{side:e?2:1,reversed:!e},c,{opposite:!e,showEmpty:!1,title:null,visible:g.enabled&&(c?!1!==c.visible:!0)})},setOptions:function(b){l.prototype.setOptions.call(this,b);this.options.crosshair=this.options.marker},setAxisSize:function(){var b=this.legendSymbol,c=this.chart,g=c.options.legend||{},e,h;b?(this.left=g=b.attr("x"),this.top=e=b.attr("y"),this.width=h=b.attr("width"),this.height=b=b.attr("height"),this.right=c.chartWidth-g-h,this.bottom=c.chartHeight-e-b,this.len=this.horiz?
h:b,this.pos=this.horiz?g:e):this.len=(this.horiz?g.symbolWidth:g.symbolHeight)||this.defaultLegendLength},normalizedValue:function(b){this.isLog&&(b=this.val2lin(b));return 1-(this.max-b)/(this.max-this.min||1)},toColor:function(b,c){var g=this.stops,e=this.dataClasses,h;if(e)for(h=e.length;h--;){var d=e[h];var a=d.from;g=d.to;if(("undefined"===typeof a||b>=a)&&("undefined"===typeof g||b<=g)){var f=d.color;c&&(c.dataClass=h,c.colorIndex=d.colorIndex);break}}else{b=this.normalizedValue(b);for(h=g.length;h--&&
!(b>g[h][0]););a=g[h]||g[h+1];g=g[h+1]||a;b=1-(g[0]-b)/(g[0]-a[0]||1);f=a.color.tweenTo(g.color,b)}return f},getOffset:function(){var b=this.legendGroup,c=this.chart.axisOffset[this.side];b&&(this.axisParent=b,l.prototype.getOffset.call(this),this.added||(this.added=!0,this.labelLeft=0,this.labelRight=this.width),this.chart.axisOffset[this.side]=c)},setLegendColor:function(){var b=this.reversed;var c=b?1:0;b=b?0:1;c=this.horiz?[c,0,b,0]:[0,b,0,c];this.legendColor={linearGradient:{x1:c[0],y1:c[1],
x2:c[2],y2:c[3]},stops:this.stops}},drawLegendSymbol:function(b,c){var g=b.padding,e=b.options,h=this.horiz,d=q(e.symbolWidth,h?this.defaultLegendLength:12),a=q(e.symbolHeight,h?12:this.defaultLegendLength),f=q(e.labelPadding,h?16:30);e=q(e.itemDistance,10);this.setLegendColor();c.legendSymbol=this.chart.renderer.rect(0,b.baseline-11,d,a).attr({zIndex:1}).add(c.legendGroup);this.legendItemWidth=d+g+(h?e:f);this.legendItemHeight=a+g+(h?f:0)},setState:function(b){this.series.forEach(function(c){c.setState(b)})},
visible:!0,setVisible:A,getSeriesExtremes:function(){var b=this.series,c=b.length,g;this.dataMin=Infinity;for(this.dataMax=-Infinity;c--;){var e=b[c];var d=e.colorKey=q(e.options.colorKey,e.colorKey,e.pointValKey,e.zoneAxis,"y");var a=e.pointArrayMap;var f=e[d+"Min"]&&e[d+"Max"];if(e[d+"Data"])var k=e[d+"Data"];else if(a){k=[];a=a.indexOf(d);var m=e.yData;if(0<=a&&m)for(g=0;g<m.length;g++)k.push(q(m[g][a],m[g]))}else k=e.yData;f?(e.minColorValue=e[d+"Min"],e.maxColorValue=e[d+"Max"]):(r.prototype.getExtremes.call(e,
k),e.minColorValue=e.dataMin,e.maxColorValue=e.dataMax);"undefined"!==typeof e.minColorValue&&(this.dataMin=Math.min(this.dataMin,e.minColorValue),this.dataMax=Math.max(this.dataMax,e.maxColorValue));f||r.prototype.getExtremes.call(e)}},drawCrosshair:function(b,c){var d=c&&c.plotX,e=c&&c.plotY,a=this.pos,f=this.len;if(c){var k=this.toPixels(c.getNestedProperty(c.series.colorKey));k<a?k=a-2:k>a+f&&(k=a+f+2);c.plotX=k;c.plotY=this.len-k;l.prototype.drawCrosshair.call(this,b,c);c.plotX=d;c.plotY=e;this.cross&&
!this.cross.addedToColorAxis&&this.legendGroup&&(this.cross.addClass("highcharts-coloraxis-marker").add(this.legendGroup),this.cross.addedToColorAxis=!0,this.chart.styledMode||this.cross.attr({fill:this.crosshair.color}))}},getPlotLinePath:function(b){var c=b.translatedValue;return p(c)?this.horiz?["M",c-4,this.top-6,"L",c+4,this.top-6,c,this.top,"Z"]:["M",this.left,c,"L",this.left-6,c+6,this.left-6,c-6,"Z"]:l.prototype.getPlotLinePath.apply(this,arguments)},update:function(b,c){var a=this.chart,
e=a.legend,d=this.buildOptions.call(a,{},b);this.series.forEach(function(b){b.isDirtyData=!0});(b.dataClasses&&e.allItems||this.dataClasses)&&this.destroyItems();a.options[this.coll]=u(this.userOptions,d);l.prototype.update.call(this,d,c);this.legendItem&&(this.setLegendColor(),e.colorizeItem(this,!0))},destroyItems:function(){var b=this.chart;this.legendItem?b.legend.destroyItem(this):this.legendItems&&this.legendItems.forEach(function(c){b.legend.destroyItem(c)});b.isDirtyLegend=!0},remove:function(b){this.destroyItems();
l.prototype.remove.call(this,b)},getDataClassLegendSymbols:function(){var b=this,c=this.chart,a=this.legendItems,e=c.options.legend,d=e.valueDecimals,f=e.valueSuffix||"",k;a.length||this.dataClasses.forEach(function(e,g){var h=!0,m=e.from,l=e.to,n=c.numberFormatter;k="";"undefined"===typeof m?k="< ":"undefined"===typeof l&&(k="> ");"undefined"!==typeof m&&(k+=n(m,d)+f);"undefined"!==typeof m&&"undefined"!==typeof l&&(k+=" - ");"undefined"!==typeof l&&(k+=n(l,d)+f);a.push(t({chart:c,name:k,options:{},
drawLegendSymbol:B.drawRectangle,visible:!0,setState:A,isDataClass:!0,setVisible:function(){h=this.visible=!h;b.series.forEach(function(b){b.points.forEach(function(b){b.dataClass===g&&b.setVisible(h)})});c.legend.colorizeItem(this,h)}},e))});return a},beforePadding:!1,name:""});["fill","stroke"].forEach(function(b){d.Fx.prototype[b+"Setter"]=function(){this.elem.attr(b,m(this.start).tweenTo(m(this.end),this.pos),null,!0)}});f(a,"afterGetAxes",function(){var b=this,c=b.options;this.colorAxis=[];c.colorAxis&&
(c.colorAxis=w(c.colorAxis),c.colorAxis.forEach(function(c,e){c.index=e;new y(b,c)}))});f(r,"bindAxes",function(){var b=this.axisTypes;b?-1===b.indexOf("colorAxis")&&b.push("colorAxis"):this.axisTypes=["colorAxis"]});f(x,"afterGetAllItems",function(b){var c=[],a,e;(this.chart.colorAxis||[]).forEach(function(e){(a=e.options)&&a.showInLegend&&(a.dataClasses&&a.visible?c=c.concat(e.getDataClassLegendSymbols()):a.visible&&c.push(e),e.series.forEach(function(c){if(!c.options.showInLegend||a.dataClasses)"point"===
c.options.legendType?c.points.forEach(function(c){n(b.allItems,c)}):n(b.allItems,c)}))});for(e=c.length;e--;)b.allItems.unshift(c[e])});f(x,"afterColorizeItem",function(b){b.visible&&b.item.legendColor&&b.item.legendSymbol.attr({fill:b.item.legendColor})});f(x,"afterUpdate",function(){var b=this.chart.colorAxis;b&&b.forEach(function(b,a,e){b.update({},e)})});f(r,"afterTranslate",function(){(this.chart.colorAxis&&this.chart.colorAxis.length||this.colorAttribs)&&this.translateColors()})});p(f,"parts-map/ColorMapSeriesMixin.js",
[f["parts/Globals.js"],f["parts/Utilities.js"]],function(d,a){var f=a.defined;a=d.noop;var n=d.seriesTypes;d.colorMapPointMixin={dataLabelOnNull:!0,isValid:function(){return null!==this.value&&Infinity!==this.value&&-Infinity!==this.value},setState:function(a){d.Point.prototype.setState.call(this,a);this.graphic&&this.graphic.attr({zIndex:"hover"===a?1:0})}};d.colorMapSeriesMixin={pointArrayMap:["value"],axisTypes:["xAxis","yAxis","colorAxis"],trackerGroups:["group","markerGroup","dataLabelsGroup"],
getSymbol:a,parallelArrays:["x","y","value"],colorKey:"value",pointAttribs:n.column.prototype.pointAttribs,colorAttribs:function(a){var d={};f(a.color)&&(d[this.colorProp||"fill"]=a.color);return d}}});p(f,"parts-map/HeatmapSeries.js",[f["parts/Globals.js"],f["parts/Utilities.js"]],function(d,a){var f=a.clamp,n=a.extend,p=a.merge,z=a.pick;a=a.seriesType;var u=d.colorMapPointMixin,q=d.noop,w=d.fireEvent,l=d.Series,r=d.seriesTypes;a("heatmap","scatter",{animation:!1,borderWidth:0,nullColor:"#f7f7f7",
dataLabels:{formatter:function(){return this.point.value},inside:!0,verticalAlign:"middle",crop:!1,overflow:!1,padding:0},marker:null,pointRange:null,tooltip:{pointFormat:"{point.x}, {point.y}: {point.value}<br/>"},states:{hover:{halo:!1,brightness:.2}}},p(d.colorMapSeriesMixin,{pointArrayMap:["y","value"],hasPointSpecificOptions:!0,getExtremesFromAll:!0,directTouch:!0,init:function(){r.scatter.prototype.init.apply(this,arguments);var a=this.options;a.pointRange=z(a.pointRange,a.colsize||1);this.yAxis.axisPointRange=
a.rowsize||1},translate:function(){this.generatePoints();var a=this.options,d=a.colsize,l=a.pointPadding,n=void 0===l?0:l;a=a.rowsize;l=this.points;var p=this.xAxis,q=this.yAxis,r=(void 0===d?1:d)/2,b=(void 0===a?1:a)/2,c=this.pointPlacementToXValue(),g=function(b){return Math.round(f(p.translate(b,!1,!1,!1,!0,c),0,p.len))};l.forEach(function(a){var c=g(a.x-r),e=g(a.x+r),d=Math.round(f(q.translate(a.y-b,!1,!0,!1,!0),0,q.len)),k=Math.round(f(q.translate(a.y+b,!1,!0,!1,!0),0,q.len)),m=z(a.pointPadding,
n);a.plotX=a.clientX=(c+e)/2;a.plotY=(d+k)/2;a.shapeType="rect";a.shapeArgs={x:Math.min(c,e)+m,y:Math.min(d,k)+m,width:Math.max(Math.abs(e-c)-2*m,0),height:Math.max(Math.abs(k-d)-2*m,0)}});w(this,"afterTranslate")},drawPoints:function(){var a=this.chart.styledMode?"css":"animate";r.column.prototype.drawPoints.call(this);this.points.forEach(function(d){d.graphic[a](this.colorAttribs(d))},this)},hasData:function(){return!!this.processedXData.length},getValidPoints:function(a,d){return l.prototype.getValidPoints.call(this,
a,d,!0)},animate:q,getBox:q,drawLegendSymbol:d.LegendSymbolMixin.drawRectangle,alignDataLabel:r.column.prototype.alignDataLabel,getExtremes:function(){l.prototype.getExtremes.call(this,this.valueData);this.valueMin=this.dataMin;this.valueMax=this.dataMax;l.prototype.getExtremes.call(this)}}),n({haloPath:function(a){if(!a)return[];var d=this.shapeArgs;return["M",d.x-a,d.y-a,"L",d.x-a,d.y+d.height+a,d.x+d.width+a,d.y+d.height+a,d.x+d.width+a,d.y-a,"Z"]}},u));""});p(f,"masters/modules/heatmap.src.js",
[],function(){})});
//# sourceMappingURL=heatmap.js.map