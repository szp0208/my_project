var router_genes_details = Vue.extend({
    template: '#genes_details',
    data: function() {
        return {
            geneId: this.$route.query.id,
            activeNames: [], //cl折叠面板展示数据
            genesInfo: {  //基因数据
                sum: {},    //基因简介
                eit: [],
                eic: [],
            },
            ep: {   //Expression profile模块数据
                check_1_data: [],
                check_2: '1',
                check_3: 'HPA',
                check2_2: '1',
            },
            il: {   //Intracellular localization模块数据
                selList: ['1'],
                imgUrl: true,
            },
            cl: {
                filter: {   //肿瘤筛选项
                    tumorlist: [],
                    isIndeterminate: false, //反全选
                    checkAll: false,    //全选
                },
                searchBar: {    //数据筛选项
                    cof: '',
                    pv: '',
                    sel_idlist: [],
                    idlist: [],
                },
                mRna: {
                    data: [],
                    page: 1,
                    totalNum: 0,
                    mapData: [],
                    mapDataJud: true,
                },
                tfRna: {
                    data: [],
                    page: 1,
                    totalNum: 0,
                    mapData: [],
                    mapDataJud: true,
                },
                lRna: {
                    data: [],
                    page: 1,
                    totalNum: 0,
                    mapData: [],
                    mapDataJud: true,
                },
            },
            ptm: {  //PTM模块数据
                data: [],
                page: 1,
                totalNum: 0,
            },
            nr: {
                data1: [],
                data2: [],
                page1: 1,
                page2: 1,
                totalNum1: 0,
                totalNum2: 0,
            },
            ML: {
                data: [],
                page: 1,
                totalNum: 0,
            },
            AM: {
                data: [],
                page: 1,
                totalNum: 0,
            },
            AS: {
                selTumor: '',
                data: [],
                page: 1,
                totalNum: 0,
            }
        }
    },
    methods: {
        formatNum(row, column) {
            var value = row[column.property];
            return (value * 1).toFixed(6);  
        },
        returnTop() {   //点击返回顶部
            $('body, html').animate({scrollTop: 0});
        },
        handleOpen(key, keyPath) {

        },
        handleClose(key, keyPath) {

        },
        //侧边栏点击滑动定位
        handleSelect(key, keyPath) {
            var scrolltit_num = $('.scrolltit_' + key).offset().top;
            $('body, html').animate({scrollTop: scrolltit_num - 100});
        },
        //折叠面板展示数据
        handleChange(val) {
            _this = this;
            val.forEach(function(v) {
                switch(v) {
                    case 'mRna':
                        if(_this.cl.mRna.mapDataJud) {
                            _this.getCLData_1();
                            _this.getCLData_1_map();
                        };
                        break;
                    case 'tfRna':
                        if(_this.cl.tfRna.mapDataJud) {
                            _this.getCLData_2();
                            _this.getCLData_2_map();
                        };
                        break;
                    case 'lRna':
                        if(_this.cl.lRna.mapDataJud) {
                            _this.getCLData_3();
                            _this.getCLData_3_map();
                        };
                        break;
                };
            });
        },
        //cl模块点折叠打开
        handleChange_2(val) {

        },
        //分页
        handleCurrentChange(val, type) {
            switch(type) {
                case 'nr1': this.nr.page1 = val; this.getNRData_1(this.geneId); break;
                case 'nr2': this.nr.page2 = val; this.getNRData_2(this.geneId); break;
                case 'ptm': this.ptm.page = val; this.getPTMData(this.geneId); break;
                case 'mr': this.cl.mRna.page = val; this.getCLData_1(this.geneId); break;
                case 'tfg': this.cl.tfRna.page = val; this.getCLData_2(this.geneId); break;
                case 'lr': this.cl.lRna.page = val; this.getCLData_3(this.geneId); break;
                case 'ML': this.ML.page = val; this.getMLData(this.geneId); break;
                case 'AM': this.AM.page = val; this.getAMData(this.geneId); break;
            }
        },
        //表格排序
        changeTabe(data, type) {
            if(data.order) {
                var orderType = (data.order == "descending")? 'desc': 'asc';
            };
            switch(type) {
                case 'nr1':  this.getNRData_1(this.geneId, data.prop, orderType); break;
                case 'nr2':  this.getNRData_2(this.geneId, data.prop, orderType); break;
                case 'ptm':  this.getPTMData(this.geneId, data.prop, orderType); break;
                case 'mr':  this.getCLData_1(this.geneId, data.prop, orderType); break;
                case 'tfg':  this.getCLData_2(this.geneId, data.prop, orderType); break;
                case 'lr':  this.getCLData_3(this.geneId, data.prop, orderType); break;
                case 'ML':  this.getMLData(this.geneId, data.prop, orderType); break;
                case 'AM':  this.getAMData(this.geneId, data.prop, orderType); break;
            }
        },
        //获取所有的基因列表
        getAllGenes() {
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/geneList",
                dataType: "json",
                data: {},
                success: function(res) {
                    _this.ep.check_1_data = res.context || [];
                }
            });
        },
        //获取所有的肿瘤列表
        getAllTumors() {
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/tumorList",
                dataType: "json",
                data: {},
                success: function(res) {
                    _this.cl.filter.tumorlist = res.context || [];
                    //默认选取五个数据
                    _this.cl.filter.tumorlist.forEach(function (_v1, _ind) {
                        if(_ind < 3) {
                            _this.cl.searchBar.sel_idlist.push(_v1);
                            _this.cl.searchBar.idlist.push(_v1.tumor_id);
                        }
                    })
            }
            });
        },
        //获取基因详情
        getGenesSum(id) {
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/gene",
                dataType: "json",
                data: {
                    'gene_id': id,
                },
                success: function(res) {
                    _this.genesInfo.sum = res.context || [];
                    _this.ep.check_1 = _this.genesInfo.sum;
                    _this.ep.check2_1 = _this.genesInfo.sum;
                    //默认细胞图片
                    var _url = 'http://47.110.225.123/imgs_tAA/intra_cellular_location/' + _this.genesInfo.sum.official_symbol + '/blue.jpg';
                    $('#genes_cell_img').attr('src', _url);
                    $('#genes_cell_img').load(function() {
                        _this.il.imgUrl = false;
                    });
                }
            });
        },
        //获取Expression in Tissues图表数据
        getEITData(id) {
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/geneTissue",
                dataType: "json",
                data: {
                    'gene_id': id? id : this.geneId,
                    'orderName': this.ep.check_2 == '1'?'label': 'value',
                    'searchType': 'platform',
                    'searchName': this.ep.check_3,
                },
                success: function(res) {
                    var dataAxis = [];
                    var dataName = [];
                    _this.genesInfo.eit = res.context || [];
                    _this.genesInfo.eit.forEach(function(v) {
                        dataName.push(v.label);
                        dataAxis.push(v.value);
                    })
                    echart(dataName, dataAxis, $('.g_con_li_2_li1'));
                }
            });
        },
        //获取Expression profile cell图表数据
        getEPCData(id) {
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/geneCell",
                dataType: "json",
                data: {
                    'gene_id': id? id : this.geneId,
                    'orderName': this.ep.check2_2 == '1'?'label': 'value',
                },
                success: function(res) {
                    var dataAxis = [];
                    var dataName = [];
                    _this.genesInfo.eic = res.context || [];
                    _this.genesInfo.eic.forEach(function(v) {
                        dataName.push(v.label);
                        dataAxis.push(v.value);
                    });
                    echart(dataName, dataAxis, $('.g_con_li_2_li2'));
                }
            });
        },
        //获取il的肿瘤图片
        getilImg() {
            var arr = cloneObj(this.il.selList);
            arr.sort(function(a,b){
                return a - b;
            });
            arr.forEach(function(_v1, _ind) {
                switch(_v1) {
                    case '1': arr[_ind] = 'blue'; break;
                    case '2': arr[_ind] = 'red'; break;
                    case '3': arr[_ind] = 'green'; break;
                    case '4': arr[_ind] = 'yellow'; break;
                };
            });
            var _this = this, _url = 'http://47.110.225.123/imgs_tAA/intra_cellular_location/' + this.genesInfo.sum.official_symbol + '/' + arr.join('_') + '.jpg';
            _this.il.imgUrl = true;
            $('#genes_cell_img').attr('src', _url);
            $('#genes_cell_img').load(function() {
                _this.il.imgUrl = false;
            });
        },
        //获取Correlation模块数据
            //复选框
        handleCheckAllChange_cl(val) { //全选
            this.cl.searchBar.sel_idlist = val ? this.cl.filter.tumorlist : [];
            this.cl.filter.isIndeterminate = false;
        },
        handleCheckedCitiesChange_cl(value) {  //选择单个
            let checkedCount = value.length;
            this.cl.filter.checkAll = checkedCount === this.cl.filter.tumorlist.length;
            this.cl.filter.isIndeterminate = checkedCount > 0 && checkedCount < this.cl.filter.tumorlist.length;
        },
        submit_cl_searchBar() { //点击筛选cl的数据
            _this = this;
            this.cl.searchBar.idlist = [];
            this.cl.searchBar.sel_idlist.forEach(function(v) {
                _this.cl.searchBar.idlist.push(v.tumor_id);
            });
            this.cl.mRna.mapDataJud = true;
            this.cl.tfRna.mapDataJud = true;
            this.cl.lRna.mapDataJud = true;
            this.activeNames = [];
        },
        getCLData_1(id, orderName, orderType) {   //mrna
            _this = this;
            $getData({
                type: "post",
                url: CONFIG.URL + "/geneMirna",
                dataType: "json",
                data: JSON.stringify({
                    'gene_id': id? id : this.geneId,
                    'start': (this.cl.mRna.page - 1) * 10,
                    'count': 10,
                    'orderName': orderName?orderName:undefined,
                    'orderType': orderType?orderType:undefined,    //asc  desc
                    'correlation_coefficent': this.cl.searchBar.cof?this.cl.searchBar.cof:undefined,
                    'p_value': this.cl.searchBar.pv?this.cl.searchBar.pv:undefined,
                    'idlist': this.cl.searchBar.idlist.length > 0?this.cl.searchBar.idlist:undefined,
                }),
                success: function(res) {
                    _this.cl.mRna.data = res.context.items || [];
                    _this.cl.mRna.totalNum = res.context.totalNum || 0;
                }
            });
        },
        getCLData_1_map(id) {   //mrna
            _this = this;
            $getData({
                type: "post",
                url: CONFIG.URL + "/geneMirna",
                dataType: "json",
                data: JSON.stringify({
                    'gene_id': id? id : this.geneId,
                    'correlation_coefficent': this.cl.searchBar.cof?this.cl.searchBar.cof:undefined,
                    'p_value': this.cl.searchBar.pv?this.cl.searchBar.pv:undefined,
                    'idlist': this.cl.searchBar.idlist.length > 0?this.cl.searchBar.idlist:undefined,
                    'orderName': 'correlation_coefficent',
                    'orderType': 'asc',    //asc  desc
                }),
                success: function(res) {
                    _this.cl.mRna.mapData = res.context;
                    _this.cl.mRna.mapDataJud = false;
                }
            });
        },
        getCLData_2(id, orderName, orderType) {   //tf
            _this = this;
            $getData({
                type: "post",
                url: CONFIG.URL + "/geneTranscriptFactor",
                dataType: "json",
                data: JSON.stringify({
                    'gene_id': id? id : this.geneId,
                    'start': (this.cl.tfRna.page - 1) * 10,
                    'count': 10,
                    'orderName': orderName?orderName:undefined,
                    'orderType': orderType?orderType:undefined,    //asc  desc
                    'correlation_coefficent': this.cl.searchBar.cof?this.cl.searchBar.cof:undefined,
                    'p_value': this.cl.searchBar.pv?this.cl.searchBar.pv:undefined,
                    'idlist': this.cl.searchBar.idlist.length > 0?this.cl.searchBar.idlist:undefined,
                }),
                success: function(res) {
                    _this.cl.tfRna.data = res.context.items || [];
                     _this.cl.tfRna.totalNum = res.context.totalNum || 0;
                }
            }); 
        },
        getCLData_2_map(id) {   //mrna
            _this = this;
            $getData({
                type: "post",
                url: CONFIG.URL + "/geneTranscriptFactor",
                dataType: "json",
                data: JSON.stringify({
                    'gene_id': id? id : this.geneId,
                    'correlation_coefficent': this.cl.searchBar.cof?this.cl.searchBar.cof:undefined,
                    'p_value': this.cl.searchBar.pv?this.cl.searchBar.pv:undefined,
                    'idlist': this.cl.searchBar.idlist.length > 0?this.cl.searchBar.idlist:undefined,
                    'orderName': 'correlation_coefficent',
                    'orderType': 'asc',    //asc  desc
                }),
                success: function(res) {
                    _this.cl.tfRna.mapData = res.context;
                    _this.cl.tfRna.mapDataJud = false;
                }
            });
        },
        //Correlation模块数据
        getCLData_3(id, orderName, orderType) {   //lrna
            _this = this;
            $getData({
                type: "post",
                url: CONFIG.URL + "/geneLncRna",
                dataType: "json",
                data: JSON.stringify({
                    'gene_id': id? id : this.geneId,
                    'start': (this.cl.lRna.page - 1) * 10,
                    'count': 10,
                    'orderName': orderName?orderName:undefined,
                    'orderType': orderType?orderType:undefined,    //asc  desc
                    'correlation_coefficent': this.cl.searchBar.cof?this.cl.searchBar.cof:undefined,
                    'p_value': this.cl.searchBar.pv?this.cl.searchBar.pv:undefined,
                    'idlist': this.cl.searchBar.idlist.length > 0?this.cl.searchBar.idlist:undefined,
                }),
                success: function(res) {
                    _this.cl.lRna.data = res.context.items || [];
                    _this.cl.lRna.totalNum = res.context.totalNum || 0;
                }
            });
        },
        getCLData_3_map(id) {   //mrna
            _this = this;
            $getData({
                type: "post",
                url: CONFIG.URL + "/geneLncRna",
                dataType: "json",
                data: JSON.stringify({
                    'gene_id': id? id : this.geneId,
                    'correlation_coefficent': this.cl.searchBar.cof?this.cl.searchBar.cof:undefined,
                    'p_value': this.cl.searchBar.pv?this.cl.searchBar.pv:undefined,
                    'idlist': this.cl.searchBar.idlist.length > 0?this.cl.searchBar.idlist:undefined,
                    'orderName': 'correlation_coefficent',
                    'orderType': 'asc',    //asc  desc
                }),
                success: function(res) {
                    _this.cl.lRna.mapData = res.context;
                    _this.cl.lRna.mapDataJud = false;
                }
            });
        },
        //获取Post-transcriptional Modification模块数据
        getPTMData(id, orderName, orderType) {
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/genePhosphorylation",
                dataType: "json",
                data: {
                    'gene_id': id? id : this.geneId,
                    'start': (this.ptm.page - 1) * 10,
                    'count': 10,
                    'orderName': orderName?orderName:undefined,
                    'orderType': orderType?orderType:undefined,    //asc  desc
                },
                success: function(res) {
                    _this.ptm.data = res.context.items || [];
                    _this.ptm.totalNum = res.context.totalNum || 0;
                }
            });
        },
        //获取ncRNA regulation模块数据
        getNRData_1(id, orderName, orderType) {
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/geneRegulationMicrorna",
                dataType: "json",
                data: {
                    'gene_id': id? id : this.geneId,
                    'start': (this.nr.page1 - 1) * 10,
                    'count': 10,
                    'orderName': orderName?orderName:undefined,
                    'orderType': orderType?orderType:undefined,    //asc  desc
                },
                success: function(res) {
                    _this.nr.data1 = res.context.items || [];
                    _this.nr.totalNum1 = res.context.totalNum || 0;
                }
            });
        },
        getNRData_2(id, orderName, orderType) {
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/geneRegulationLncrna",
                dataType: "json",
                data: {
                    'gene_id': id? id : this.geneId,
                    'start': (this.nr.page2 - 1) * 10,
                    'count': 10,
                    'orderName': orderName?orderName:undefined,
                    'orderType': orderType?orderType:undefined,    //asc  desc
                },
                success: function(res) {
                    _this.nr.data2 = res.context.items || [];
                    _this.nr.totalNum2 = res.context.totalNum || 0;
                }
            });
        },
        //获取Methylation数据
        getMLData: function(id, orderName, orderType) {
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/geneMethylation",
                dataType: "json",
                data: {
                    'gene_id': id? id : this.geneId,
                    'start': (this.ML.page - 1) * 10,
                    'count': 10,
                    'orderName': orderName?orderName:undefined,
                    'orderType': orderType?orderType:undefined,    //asc  desc
                },
                success: function(res) {
                    console.log(res);
                    _this.ML.data = res.context.items || [];
                    _this.ML.totalNum = res.context.totalNum || 0;
                }
            });
        },
        //获取AnimalModel数据
        getAMData: function(id, orderName, orderType) {
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/geneAnimalModel",
                dataType: "json",
                data: {
                    'gene_id': id? id : this.geneId,
                    'start': (this.AM.page - 1) * 10,
                    'count': 10,
                    'orderName': orderName?orderName:undefined,
                    'orderType': orderType?orderType:undefined,    //asc  desc
                },
                success: function(res) {
                    console.log(res);
                    _this.AM.data = res.context.items || [];
                    _this.AM.totalNum = res.context.totalNum || 0;
                }
            });
        },
        // 点击Alternative splicing数据筛选肿瘤
        getASScreen() {
            this.getASData();
        },
        //获取Alternative splicing数据
        getASData: function(id, orderName, orderType) {
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/getAlternativeSplicing",
                dataType: "json",
                data: {
                    'gene_id': id? id : this.geneId,
                    'tumor_id': this.AS.selTumor? this.AS.selTumor : undefined,
                    // 'start': (this.nr.page2 - 1) * 10,
                    // 'count': 10,
                    // 'orderName': orderName?orderName:undefined,
                    // 'orderType': orderType?orderType:undefined,    //asc  desc
                },
                success: function(res) {
                    _this.$refs.genes_bar.handleOn(res);
                    console.log(res);
                    _this.AS.data = res.context || [];
                }
            });
        },
    },
    mounted() {
        var _params = this.$route.query;
        console.log(_params.id);
        this.getGenesSum(_params.id);
        this.getEITData(_params.id);
        this.getEPCData(_params.id);
        this.getPTMData(_params.id);
        this.getNRData_1(_params.id);
        this.getNRData_2(_params.id);
        this.getMLData(_params.id);
        this.getAMData(_params.id);
        this.getAllGenes();
        this.getAllTumors();
        
        //左侧导航栏固定
        window.addEventListener('scroll', function() {
            var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
            if(document.querySelector('.d_side_edge')) {
                document.querySelector('.d_side_edge').style.top = 200 + scrollTop + 'px';
            }
        })
    },
    filters: {
        n: function(value, num){
            return (value * 1).toFixed(num?num:4);
        }
    }
});

//柱状图
function echart(dataName, dataAxis, ele) {
    // 基于准备好的dom，初始化echarts实例
    var worldMapContainer = ele[0], myChart2 = echarts.init(worldMapContainer), colorArr = [];
    //用于使chart自适应高度和宽度,通过窗体高宽计算容器高宽
    var resizeWorldMapContainer = function() {
        worldMapContainer.style.width = ele.width() + 'px';
    };
    // 基于准备好的dom，初始化echarts实例
    dataName.forEach(function(v) {
        colorArr.push((function(params) { 
            var colorList = ['#FDB462','#FFFFB3','#CCEBC5','#80B1D3','#FB8072', '#BEBADA','#8DD3C7','#BC80BD','#FCCDE5','#B3DE69','#C39BD3 ','#F9E79F','#BA4A00','#39f','#616A6B','#616A6B','#4A235A','#3498DB']; 
            var num = Math.floor(Math.random() * 18);
            return colorList[num];
        }));
    })
    option = {
        color: colorArr,
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : dataName,
                axisTick: {
                    alignWithLabel: true
                },
                axisLabel : {
                    interval: 0,
                    rotate: 45,
                },
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'value',
                type:'bar',
                barWidth: '60%',
                data: dataAxis
            }
        ]
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
