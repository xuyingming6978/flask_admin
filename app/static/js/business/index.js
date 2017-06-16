/**
* Created by chenhui on 2017/6/15.
*/

var dashboardController = {
	init:function(){
		var cpuPie = dashboardController.cpuPieInit();
		var ramPie = dashboardController.ramPieInit();
		setInterval(function () {
			dashboardController.reloadPieAjax(cpuPie["selector"],cpuPie["option"],ramPie["selector"],ramPie["option"])
        },5000);

		dashboardController.cpuLineChartInit();
	},
	cpuPieInit:function(){
		//第二个参数可以指定前面引入的主题
		var cpuPie = echarts.init(document.getElementById('dev-status-bar-wxre1'), 'dark');
		var option1 = {
				tooltip : {formatter: "{a} <br/>{b} : {c}%"},
				toolbox: {feature: {saveAsImage: {}}},
				series: [
					{
						name: 'CPU使用率',
						type: 'gauge',
						detail: {formatter:'{value}%'},
						data: [{value: 50, name: '使用率'}]
					}]};
		return {
			"selector": cpuPie,
			"option": option1
		};
	},
	ramPieInit:function(){
		//第二个参数可以指定前面引入的主题
		var ramPie = echarts.init(document.getElementById('dev-status-bar-wxre3'), 'dark');
		var option3 = {
				tooltip : {formatter: "{a} <br/>{b} : {c}%"},
				toolbox: {feature: {saveAsImage: {}}},
				series: [
					{
						name: '内存使用率',
						type: 'gauge',
						detail: {formatter:'{value}%'},
						data: [{value: 50, name: '使用率'}]
					}]};
		return {
		"selector": ramPie,
		"option": option3
	    };

	},
	reloadPieAjax:function(cpuPie,CpuOption,ramPie,ramOption){
		 $.get("/systemPieInfo", function(result){
		 	var data = JSON.parse(result);
			var cpu_free = parseFloat(data["cpu_free"]).toFixed(2);
		 	var ram_usage = parseFloat(data["ram_usage"]).toFixed(2);

		 	CpuOption.series[0].data[0].value = (100-cpu_free);
		 	ramOption.series[0].data[0].value = ram_usage;
		 	cpuPie.setOption(CpuOption, true);
		 	ramPie.setOption(ramOption, true);
		 });
	},
	cpuLineChartInit:function(){
			//第二个参数可以指定前面引入的主题
			var cpuLineChart = echarts.init(document.getElementById('dev-status-bar-wxre2'), 'dark');
			//图表显示提示信息
			cpuLineChart.showLoading();
			var base = +new Date(2017, 6, 01);
			var oneDay = 24 * 3600 * 1000;
			var oneMinute = 60 * 1000;
			var date = [];//时间 x轴

			var data = [Math.random() * 300];//数据 y轴

			for (var i = 1; i < 20000; i++) {
				var now = new Date(base += oneMinute);
				date.push([now.getFullYear(), now.getMonth() + 1, now.getDate(),now.getHours(),now.getMinutes(),now.getSeconds()].join('/'));
				data.push(Math.round((Math.random()) * 20 + data[i - 1]));
			}
			var option2 = {
				tooltip: {
					trigger: 'axis',
					position: function (pt) {
						return [pt[0], '10%'];
					}
				},
				title: {
					left: 'center',
					text: 'CPU使用率记录',
					textStyle: {
						color: 'white',
						fontStyle: 'normal',
						fontWeight: 'bolder',
						fontFamily: 'sans-serif',
						fontSize: 18
						}},
				toolbox: {
					feature: {
						dataZoom: {
							yAxisIndex: 'none'
						},
						restore: {},
						saveAsImage: {}
					}
				},
				xAxis: {
					type: 'category',
					boundaryGap: false,
					data: date,
				   axisLine:{lineStyle:{color:'#9193A0'}}},
				yAxis: {
					type: 'value',
					boundaryGap: [0, '100%'],
					axisLine:{lineStyle:{color:'#9193A0'}}},
				dataZoom: [{
					type: 'inside',
					start: 0,
					end: 10},
					{
					start: 0,
					end: 10,
					handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
					handleSize: '80%',
					handleStyle: {
						color: '#fff',
						shadowBlur: 3,
						shadowColor: 'rgba(0, 0, 0, 0.6)',
						shadowOffsetX: 2,
						shadowOffsetY: 2}
				}],
				series: [
					{
						name:'模拟数据',
						type:'line',
						smooth:true,
						symbol: 'none',
						sampling: 'average',
						itemStyle: {
							normal: {
								color: '#1CB6F7'
							}
						},
						areaStyle: {
							normal: {
								color: {
									type: 'linear',
									x: 0, y: 0, x2: 0, y2: 1,
									colorStops: [{
										offset: 0, color: '#17cbd3' // 0% 处的颜色
									}, {
										offset: 1, color: '#f9747d' // 100% 处的颜色
									}],
									globalCoord: false // 缺省为 false
								}
							}
						},
						data: data
					}
				]
			};
			cpuLineChart.hideLoading();
			cpuLineChart.setOption(option2, true);

	}



};

$(document).ready(function() {
	dashboardController.init();
// loadyys1();
// loadyys2();
// loadyys3();
// loadyys4();

// $("#back").click(function(){
// $.openDialog({width:"700",height:"500",jq:$("#secondLevelDialog"),titleText:"配置",url:"html/iotxnew/edit.html"});
// });

});


function loadyys2() {
//第二个参数可以指定前面引入的主题
var myChart2 = echarts.init(document.getElementById('dev-status-bar-wxre2'), 'dark');
//图表显示提示信息
myChart2.showLoading();
var base = +new Date(1968, 9, 3);
var oneDay = 24 * 3600 * 1000;
var date = [];

var data = [Math.random() * 300];

for (var i = 1; i < 20000; i++) {
	var now = new Date(base += oneDay);
	date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
	data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}

option2 = {
	tooltip: {
		trigger: 'axis',
		position: function (pt) {
			return [pt[0], '10%'];
		}
	},
	title: {
		left: 'center',
		text: 'CPU使用记录',
		textStyle: {
			color: 'white',
			fontStyle: 'normal',
			fontWeight: 'bolder',
			fontFamily: 'sans-serif',
			fontSize: 18,
			},
	},
	toolbox: {
		feature: {
			dataZoom: {
				yAxisIndex: 'none'
			},
			restore: {},
			saveAsImage: {}
		}
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: date,
	   axisLine:{
		   lineStyle:{
			   color:'#9193A0',

		   }
	   }
	},
	yAxis: {
		type: 'value',
		boundaryGap: [0, '100%'],
		axisLine:{
			   lineStyle:{
				   color:'#9193A0',

			   }
		   }

	},
	dataZoom: [{
		type: 'inside',
		start: 0,
		end: 10
	}, {
		start: 0,
		end: 10,
		handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
		handleSize: '80%',
		handleStyle: {
			color: '#fff',
			shadowBlur: 3,
			shadowColor: 'rgba(0, 0, 0, 0.6)',
			shadowOffsetX: 2,
			shadowOffsetY: 2
		}
	}],
	series: [
		{
			name:'模拟数据',
			type:'line',
			smooth:true,
			symbol: 'none',
			sampling: 'average',
			itemStyle: {
				normal: {
					color: '#1CB6F7'
				}
			},
			areaStyle: {
				normal: {
					color: {
						type: 'linear',
						x: 0,
						y: 0,
						x2: 0,
						y2: 1,
						colorStops: [{
							offset: 0, color: '#54A6D3' // 0% 处的颜色
						}, {
							offset: 1, color: '#435D73' // 100% 处的颜色
						}],
						globalCoord: false // 缺省为 false
					}
				}
			},
			data: data
		}
	]
};
myChart2.hideLoading();
myChart2.setOption(option2, true);
}

function loadyys4() {
//第二个参数可以指定前面引入的主题
var myChart4 = echarts.init(document.getElementById('dev-status-bar-wxre4'), 'dark');
//图表显示提示信息
myChart4.showLoading();
var base = +new Date(1968, 9, 3);
var oneDay = 24 * 3600 * 1000;
var date = [];

var data = [Math.random() * 300];

for (var i = 1; i < 20000; i++) {
	var now = new Date(base += oneDay);
	date.push([now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/'));
	data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
}

option4= {
	tooltip: {
		trigger: 'axis',
		position: function (pt) {
			return [pt[0], '10%'];
		}
	},
	title: {
		left: 'center',
		text: 'CPU使用记录',
		textStyle: {
			color: 'white',
			fontStyle: 'normal',
			fontWeight: 'bolder',
			fontFamily: 'sans-serif',
			fontSize: 18,
			},
	},
	toolbox: {
		feature: {
			dataZoom: {
				yAxisIndex: 'none'
			},
			restore: {},
			saveAsImage: {}
		}
	},
	xAxis: {
		type: 'category',
		boundaryGap: false,
		data: date,
	   axisLine:{
		   lineStyle:{
			   color:'#9193A0',

		   }
	   }
	},
	yAxis: {
		type: 'value',
		boundaryGap: [0, '100%'],
		axisLine:{
			   lineStyle:{
				   color:'#9193A0',

			   }
		   }

	},
	dataZoom: [{
		type: 'inside',
		start: 0,
		end: 10
	}, {
		start: 0,
		end: 10,
		handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
		handleSize: '80%',
		handleStyle: {
			color: '#fff',
			shadowBlur: 3,
			shadowColor: 'rgba(0, 0, 0, 0.6)',
			shadowOffsetX: 2,
			shadowOffsetY: 2
		}
	}],
	series: [
				{
					name:'模拟数据',
					type:'line',
					smooth:true,
					symbol: 'none',
					sampling: 'average',
					itemStyle: {
						normal: {
							color: '#5C60D8'
						}
					},
					areaStyle: {
						normal: {
							color: {
								type: 'linear',
								x: 0,
								y: 0,
								x2: 0,
								y2: 1,
								colorStops: [{
									offset: 0, color: '#5663D3' // 0% 处的颜色
								}, {
									offset: 1, color: '#474C76' // 100% 处的颜色
								}],
								globalCoord: false // 缺省为 false
							}
						}
					},
					data: data
		}
	]
};
myChart4.hideLoading();
myChart4.setOption(option4, true);
}

