//柱状图组件
Vue.component('bar-map', {
    props: ['data', 'type'],
    data: function () {
        return {
            mapData: [],    //画图数据数组-最大四个矩形图
            da: {max: 6, min: 0, med: 3, up: 4, down: 2, name: 'normal'},
            mapStyle: {},
            drawBar: {  //画图所需的数据
                scaleHeight: 60,    //刻度表每个刻度间距60px
                line: [-4, -2, 0, 2, 4],    //线条的刻度值
                bars: [    //小方块的样式
                    {maxH: {'height': '20px', 'n': 4}, minH: {'height': '40px'}, medH: {'height': '30px'}, barH: {'height': '60px'}, data: {}},
                ],
            },
            updateData: this.data,    //就初始化的时候更新一次，但在模板里会动态更新
        }
    },
    template: '#bar_map',
    methods: {
        drawFun() {
            var _this = this, d = this.updateData, obj = {}, maxN = 0, minN = 0, sub;
            this.mapData = [];
            // console.log('画图数据', d, this.type);
            switch(this.type) {
                case '1':
                    var d_1 = {
                        'max': d.normal_max, 'min': d.normal_min, 'med': d.normal_median, 
                        'up': d.normal_75, 'down': d.normal_25,
                        'n': d.normal_n, 'sd': d.normal_sd, 'mean': d.normal_mean?d.normal_mean:0,
                        'fc': d.logFC, 'pv': d.P_Value,
                        'name': 'normal'
                    },
                    d_2 = {
                        'max': d.tumor_max, 'min': d.tumor_min, 'med': d.tumor_median,
                        'up': d.tumor_75, 'down': d.tumor_25,
                        'n': d.tumor_n, 'sd': d.tumor_sd, 'mean': d.tumor_mean?d.tumor_mean:0,
                        'name': 'tumor'
                    };
                    _this.mapData = [d_1, d_2];
                    break;
                case '2':
                    var d_1 = {
                        'max': d.stage_i_max, 'min': d.stage_i_min, 'med': d.stage_i_median, 
                        'up': d.stage_i_75, 'down': d.stage_i_25,
                        'n': d.stage_i_n, 'sd': d.stage_i_sd, 'mean': d.stage_i_mean?d.stage_i_mean:0,
                        'fc': d.logFC, 'pv': d.P_Value,
                        'name': 'stage_i'
                    },
                    d_2 = {
                        'max': d.stage_ii_max, 'min': d.stage_ii_min, 'med': d.stage_ii_median,
                        'up': d.stage_ii_75, 'down': d.stage_ii_25,
                        'n': d.stage_ii_n, 'sd': d.stage_ii_sd, 'mean': d.stage_ii_mean?d.stage_ii_mean:0,
                        'name': 'stage_ii'
                    },
                    d_3 = {
                        'max': d.stage_iii_max, 'min': d.stage_iii_min, 'med': d.stage_iii_median,
                        'up': d.stage_iii_75, 'down': d.stage_iii_25,
                        'n': d.stage_iii_n, 'sd': d.stage_iii_sd, 'mean': d.stage_iii_mean?d.stage_iii_mean:0,
                        'name': 'stage_iii'
                    },
                    d_4 = {
                        'max': d.stage_iv_max, 'min': d.stage_iv_min, 'med': d.stage_iv_median,
                        'up': d.stage_iv_75, 'down': d.stage_iv_25,
                        'n': d.stage_iv_n, 'sd': d.stage_iv_sd, 'mean': d.stage_iv_mean?d.stage_iv_mean:0,
                        'name': 'stage_iv'
                    };
                    _this.mapData = [d_1, d_2, d_3, d_4];
                    break;
                case '3':
                    var d_1 = {
                        'max': d.g_0_50_max, 'min': d.g_0_50_min, 'med': d.g_0_50_median, 
                        'up': d.g_0_50_75, 'down': d.g_0_50_25,
                        'n': d.g_0_50_n, 'sd': d.g_0_50_sd, 'mean': d.g_0_50_mean?d.g_0_50_mean:0,
                        'fc': d.logFC, 'pv': d.P_Value,
                        'name': 'g_0_50'
                    },
                    d_2 = {
                        'max': d.g_50_100_max, 'min': d.g_50_100_min, 'med': d.g_50_100_median,
                        'up': d.g_50_100_75, 'down': d.g_50_100_25,
                        'n': d.g_50_100_n, 'sd': d.g_50_100_sd, 'mean': d.g_50_100_mean?d.g_50_100_mean:0,
                        'name': 'g_50_100'
                    };
                    _this.mapData = [d_1, d_2];
                    break;
                case '4':   //第四种图形，循环多个柱状图
                    d.forEach(function(v, ind) {
                        var d_1 = {
                            'max': v.max, 'min': v.min, 'med': v.median, 
                            'up': v.q75, 'down': v.q25,
                            'n': v.n, 'sd': v.sd, 'mean': v.mean?v.mean:0,
                            'fc': v.logFC, 'pv': v.P_Value,
                            'name': v.enst,
                        }
                        _this.mapData.push(d_1);
                    })
                    break;
            };
            
            this.mapData.forEach(function(v, ind) {    //第一次循环出右边的刻度值
                v.min = v.min * 1;
                v.max = v.max * 1;
                if(v.max > maxN) {
                    maxN = v.max;
                };
                if(v.min < minN) {
                    minN = v.min;
                };
            });
            sub = (maxN - minN) / 4;    //刻度的间隔值
            this.drawBar.bars = [];
            this.drawBar.line = [];
            this.drawBar.line = [minN, minN + (sub * 1), minN + (sub * 2), minN + (sub * 3), minN + (sub * 4)];
            
            this.mapData.forEach(function(v, ind) {    //第二次根据刻度值计算图形各高度
                var colorList = ['#FDB462','#FFFFB3','#CCEBC5','#80B1D3','#FB8072', '#BEBADA','#8DD3C7','#BC80BD','#FCCDE5','#B3DE69','#C39BD3 ','#F9E79F','#BA4A00','#39f','#616A6B','#616A6B','#4A235A','#3498DB']; 
                var colorNum = Math.floor(Math.random() * 18);
                var scale = _this.drawBar.scaleHeight / sub;    //像素和数值的倍数关系
                var obj = {
                    top: {'margin-top': (maxN - v.max) * scale + 'px', n: v.max, 'margin-right': _this.type==4?'90px':'30px'},
                    maxH: {'height': (v.max - v.up) * scale + 'px', n: v.max},
                    medH: {'height': (v.up - v.med) * scale + 'px', n: v.max},
                    minH: {'height': (v.down - minN) * scale + 'px', n: v.max},
                    barH: {'height': (v.up - v.down) * scale + 'px', 'background-color': colorList[colorNum], n: v.max},
                    data: v,
                };
                
                _this.drawBar.bars.push(obj);
            });
        },
        handleOn(res) { //获取父级动态调用的方法用于实时更新画图数据
            this.updateData = res.context;
            this.drawFun();
        },
    },
    mounted() { //初始化的时候运行一次画图
        this.drawFun();
    },
    filters: {
        n: function(value){
            return (value * 1).toFixed(2);
        }
    },
});

//冷热图组件
Vue.component('color-map', {
    data: function () {
        return {
            changeColor: changeColor,   //把数字转换成颜色
            colorArr: gradientColor('#D93428', '#FFEEA8', 10).concat(gradientColor('#FFEEA8', '#4273B6', 10)),
            dialogVisible: false,
            barData: {list: [], info: null},
        }
    },
    props: ['data', 'type'],
    template: '#color-map',
    methods: {
        clickBar(d) {
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/scatter",
                dataType: "json",
                data: {
                    'gene_id': d.gene_id,
                    'tumor_id': d.tumor_id,
                    'symbol': d.symbol,
                    'type': this.type,  //0:LNC 1:TF 2:MIR
                },
                success: function(res) {
                    _this.barData['list'] = [];
                    _this.barData['info'] = d;
                    _this.barData['type'] = _this.type;
                    res.context.forEach(function(v) {
                        _this.barData['list'].push([v.x, v.y]);
                    });
                    _this.dialogVisible = true;
                }
            });
        },
        dialogOpened() {    //调用散点图
            var str = '.scatter_plot_' + this.type;
            drawScatterPlot(_this.barData, $(str));
        }
    },
    mounted() {
        this.data.forEach(function(v) {
            v.len = v.list.length;
        });
    },
    watch: {    //监听data的变化计算length
        data: {
            handler(newValue, oldValue) {
                this.data.forEach(function(v) {
                    v.len = v.list.length;
                });
            }
        },
        deep: true,
    }
});