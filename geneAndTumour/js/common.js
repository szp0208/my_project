var CONFIG = { //接口地址
    URL: 'http://192.168.0.127:8080',
//  URL: 'http://192.168.0.107:8080/medicine',
    URL: 'http://47.110.225.123/medicine/', //服务地址
};
var gradualColorArr = gradientColor('#FFEEA8', '#D93428', 50).concat(gradientColor('#FFEEA8', '#4273B6', 50));    //颜色渐变表数组
var creatColorList = ['#FDB462','#FFFFB3','#CCEBC5','#80B1D3','#FB8072', '#BEBADA','#8DD3C7','#BC80BD','#FCCDE5','#B3DE69','#C39BD3 ','#F9E79F','#BA4A00','#39f','#616A6B','#616A6B','#4A235A','#3498DB']; 

window.kmimgData = {
    cutpoint: null,
    max: null,
    min: null,
};
//获取后台接口数据
function $getData(opt) {
    opt = opt || {};
    opt.type = opt.type.toUpperCase() || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    opt.success = opt.success || function() {};
    opt.error = opt.error || function() {};
    NProgress.start();
    $.ajax({
        contentType:'application/json',
        type : opt.type,
        url: opt.url,
        data : opt.data,
        dataType : opt.dataType,
        success : function(res) {
            NProgress.done();
            if(res.status == 200) {
                opt.success(res);
            };
            //统一处理错误提示，如果result为true表示调用者已经处理了相关错误信息，不用再处理
            if(res.status != 200 && res.status != 401) {
                if(res.message && res.message.length > 0) {
                    alertMsg(res.message, {
                        icon: 1
                    });
                }
            }
        },
        error: function(XMLHttpRequest, textStatus, errorThrown) {
            NProgress.done();
            //调用失败代码
            var errMsg = 'The network is unstable. Please try again later～';
            if(XMLHttpRequest.status == 400) {
                errMsg = 'The data is incorrectly filled in. Please check and fill in again～';
            } else if(XMLHttpRequest.status == 404 || XMLHttpRequest.status == 500) {
                errMsg = 'An unknown error occurred~';
            }
            if(opt.error) {
                opt.error(XMLHttpRequest);
            } else {
                alertMsg(errMsg, {
                    icon: 4
                });
            }
        }
    });
}


/* 颜色渐变色值表
 * startColor：开始颜色hex
 * endColor：结束颜色hex
 * step:几个阶级（几步）
 */
function gradientColor(startColor, endColor, step) {

    //方法初始化
    function init(startColor, endColor, step) {
        startRGB = colorToRgb(startColor); //转换为rgb数组模式
        startR = startRGB[0];
        startG = startRGB[1];
        startB = startRGB[2];

        endRGB = colorToRgb(endColor);
        endR = endRGB[0];
        endG = endRGB[1];
        endB = endRGB[2];

        sR = (endR - startR) / step; //总差值
        sG = (endG - startG) / step;
        sB = (endB - startB) / step;

        var colorArr = [];
        for(var i = 0; i < step; i++) {
            //计算每一步的hex值
            var hex = colorToHex('rgb(' + parseInt((sR * i + startR)) + ',' + parseInt((sG * i + startG)) + ',' + parseInt((sB * i + startB)) + ')');
            colorArr.push(hex);
        }
        return colorArr;
    }

    // 将hex表示方式转换为rgb表示方式(这里返回rgb数组模式)
    function colorToRgb(sColor) {
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        var sColor = sColor.toLowerCase();
        if(sColor && reg.test(sColor)) {
            if(sColor.length === 4) {
                var sColorNew = "#";
                for(var i = 1; i < 4; i += 1) {
                    sColorNew += sColor.slice(i, i + 1).concat(sColor.slice(i, i + 1));
                }
                sColor = sColorNew;
            }
            //处理六位的颜色值
            var sColorChange = [];
            for(var i = 1; i < 7; i += 2) {
                sColorChange.push(parseInt("0x" + sColor.slice(i, i + 2)));
            }
            return sColorChange;
        } else {
            return sColor;
        }
    };

    // 将rgb表示方式转换为hex表示方式
    function colorToHex(rgb) {
        var _this = rgb;
        var reg = /^#([0-9a-fA-f]{3}|[0-9a-fA-f]{6})$/;
        if(/^(rgb|RGB)/.test(_this)) {
            var aColor = _this.replace(/(?:\(|\)|rgb|RGB)*/g, "").split(",");
            var strHex = "#";
            for(var i = 0; i < aColor.length; i++) {
                var hex = Number(aColor[i]).toString(16);
                hex = hex < 10 ? 0 + '' + hex : hex; // 保证每个rgb的值为2位
                if(hex === "0") {
                    hex += hex;
                }
                strHex += hex;
            }
            if(strHex.length !== 7) {
                strHex = _this;
            }

            return strHex;
        } else if(reg.test(_this)) {
            var aNum = _this.replace(/#/, "").split("");
            if(aNum.length === 6) {
                return _this;
            } else if(aNum.length === 3) {
                var numHex = "#";
                for(var i = 0; i < aNum.length; i += 1) {
                    numHex += (aNum[i] + aNum[i]);
                }
                return numHex;
            }
        } else {
            return _this;
        }
    }

    return init(startColor, endColor, step);
};

//把数据转换成颜色变渐变度
function changeColor(num, type) {   //从100个颜色当中去除属于当前值的颜色前五十个是由橙色到红色，后五十个是由橙色到蓝色
    var num = num * 1, res;
    if(num > 0) {
        num = parseInt(num.toFixed(2) * 100);
        res = gradualColorArr[num > 49? 49: num];
    } else {
        num = parseInt(Math.abs(num).toFixed(2) * 100 + 50);
        res = gradualColorArr[num > 99? 99: num];
    }
    return res;
};

//散点图
function drawScatterPlot(obj, ele) {
    // 基于准备好的dom，初始化echarts实例
    var data = obj.list, worldMapContainer = ele[0], myChart2 = echarts.init(worldMapContainer);
    //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
    var resizeWorldMapContainer = function() {
        worldMapContainer.style.width = ele.width() + 'px';
    };
    var myRegression = ecStat.regression('linear', data);
    
    myRegression.points.sort(function(a, b) {
        return a[0] - b[0];
    });
    option = {
        // title: {
        //     text: obj.info.gene_name,
        //     left: 'center'
        // },
        grid: {
            x: 100,
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        xAxis: {
            name: obj.info.gene_name + '（FKPM）',
            nameLocation:'middle',
            nameGap: 30,
            type: 'value',
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
        },
        yAxis: {
            name: obj.info.symbol + '（' + (obj.type == 2?'RPM':'FKPM') + '）',
            type: 'value',
            min: 0,
            splitLine: {
                lineStyle: {
                    type: 'dashed'
                }
            },
        },
        series: [{
            name: 'scatter',
            type: 'scatter',
            symbolSize: 5,
            label: {
                emphasis: {
                    show: true,
                    position: 'left',
                    textStyle: {
                        color: 'blue',
                        fontSize: 16
                    }
                }
            },
            data: data
        }, {
            name: 'line',
            type: 'line',
            showSymbol: false,
            data: myRegression.points,
            markPoint: {
                itemStyle: {
                    normal: {
                        color: 'transparent'
                    }
                },
                label: {
                    normal: {
                        show: true,
                        position: 'left',
                        formatter: myRegression.expression,
                        textStyle: {
                            color: '#333',
                            fontSize: 14
                        }
                    }
                },
                data: [{
                    coord: myRegression.points[myRegression.points.length - 1]
                }]
            }
        }]
    };

    //清空画布，防止缓存
    myChart2.clear();
    // 使用刚指定的配置项和数据显示图表。
    myChart2.setOption(option);
    resizeWorldMapContainer();
    //用于使chart自适应高度和宽度
    window.addEventListener("resize", function() {
        resizeWorldMapContainer();
        myChart2.resize();
    });

}

//对象深拷贝
function cloneObj(obj) {
    if(obj === null) return null;
    if(typeof obj !== 'object') return obj;
    if(obj.constructor === Date) return new Date(obj);
    var newObj = new obj.constructor ();  //保持继承链
    for (var key in obj) {
        if (obj.hasOwnProperty(key)) {   //不遍历其原型链上的属性
            var val = obj[key];
            newObj[key] = typeof val === 'object' ? arguments.callee(val) : val; // 使用arguments.callee解除与函数名的耦合
        }
    }
    return newObj;  
}
