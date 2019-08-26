var router_tumour_details = Vue.extend({
    template: '#tumour_details',
    data: function() {
        return {
            tumorId: this.$route.query.id,
            tumorInfo: '',  //肿瘤基本信息
            ge_gs: {    //Gene expression模块数据
                checkAll: false,
                checkedGenes: [],    //选中的基因
                genes: [],
                isIndeterminate: true,
                bss: {
                    data: [],
                    page: 1,
                    totalNum: 0,
                },
                bs: {
                    data: [],
                    page: 1,
                    totalNum: 0,
                },
                bsv: {
                    data: [],
                    page: 1,
                    totalNum: 0,
                },
            },
            cl: {
                filter: {   //肿瘤筛选项
                    genelist: [],
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
            activeNames: [], //折叠面板展示数据
            activeNames_2: [], //折叠面板展示数据
            km_plot: {
                //下拉筛选能够选择的数据
                population_selData: [{value: 'Stage'},{value: 'Contraceptive'},{value: 'Grade'},{value: 'Gender'}], //筛选项可选的list
                filter_btn: false,  //点击提交筛选项
                selArr: [   //筛选的每一项的数据
                    {
                        population_type: 'Stage',   //本条筛选的名称
                        screen_dataType: 'checkbox',    //radio
                        screen_dataAll: ['Stage', 'Stage IIa', 'Stage IIb', 'Stage IIc', 'Stage IIIa', 'Stage IV'],   //待选区
                        screen_data: ['Stage', 'Stage IIa'],    //所选区
                        checkAll: false,    //全选
                        isIndeterminate: false, //反全选
                    },
                    {
                        population_type: 'Contraceptive',   //本条筛选的名称
                        screen_dataType: 'radio',    //radio
                        screen_dataAll: ['Stage', 'Stage IIa', 'Stage IIb', 'Stage IIc', 'Stage IIIa', 'Stage IV'],   //待选区
                        radioData: '',
                    },
                ],
                geneFilterData: [],   //基因筛选数据
                geneFilter: '1_ACBD5', //选择的基因id
                data: [],   //km图数据
                searchBarData: '',  //筛选项数据
                loading: true,  //筛选项数据
                imgUrl: true,  //km图片地址,
            },
            km_jud: 1,
            km_GEO: {   //km_GEO tab的数据
                selArr: [],
                selData: '',
                geneFilter: '', //选择的基因
                geneFilterData: [],
                data: [],   //km图数据
                loading: false,  //筛选项数据
            },
            CT: {
                data: [],
                page: 1,
                totalNum: 0,
            },
        }
    },
    methods: {
        returnTop() {   //点击返回顶部
            $('body, html').animate({scrollTop: 0});
        },
        handleOpen(key, keyPath) {
            console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            console.log(key, keyPath);
        },
        //侧边栏点击滑动定位
        handleSelect(key, keyPath) {
            var scrolltit_num = $('.scrolltit_' + key).offset().top;
            $('body, html').animate({scrollTop: scrolltit_num - 100});
        },
        //复选框
        handleCheckAllChange(val) { //全选
            console.log(val)
            this.ge_gs.checkedGenes = val ? this.ge_gs.genes : [];
            this.ge_gs.isIndeterminate = false;
        },
        handleCheckedCitiesChange(value) {  //选择单个
            console.log(value)
            let checkedCount = value.length;
            this.ge_gs.checkAll = checkedCount === this.ge_gs.genes.length;
            this.ge_gs.isIndeterminate = checkedCount > 0 && checkedCount < this.ge_gs.genes.length;
        },
        //cl模块筛选项
        handleCheckAllChange_cl(val) { //全选
            console.log(val);
            this.cl.searchBar.sel_idlist = val ? this.cl.filter.genelist : [];
            this.cl.filter.isIndeterminate = false;
        },
        handleCheckedCitiesChange_cl(value) {  //选择单个
            console.log(value)
            let checkedCount = value.length;
            this.cl.filter.checkAll = checkedCount === this.cl.filter.genelist.length;
            this.cl.filter.isIndeterminate = checkedCount > 0 && checkedCount < this.cl.filter.genelist.length;
        },
        submit_cl_searchBar() { //点击筛选cl的数据
            console.log(this.cl.searchBar);
            _this = this;
            this.cl.searchBar.idlist = [];
            this.cl.searchBar.sel_idlist.forEach(function(v) {
                _this.cl.searchBar.idlist.push(v.gene_id);
            });
            this.cl.mRna.mapDataJud = true;
            this.cl.tfRna.mapDataJud = true;
            this.cl.lRna.mapDataJud = true;
            this.activeNames_2 = [];
        },
        //分页
        handleCurrentChange(val, type) {
            console.log(val, type);
            switch(type) {
                case 'mr': this.cl.mRna.page = val; this.getCLData_1(this.tumorId); break;
                case 'tfg': this.cl.tfRna.page = val; this.getCLData_2(this.tumorId); break;
                case 'lr': this.cl.lRna.page = val; this.getCLData_3(this.tumorId); break;
                case 'bss': this.ge_gs.bss.page = val; this.getBSSData(this.tumorId); break;
                case 'bs': this.ge_gs.bs.page = val; this.getBSData(this.tumorId); break;
                case 'bsv': this.ge_gs.bsv.page = val; this.getBSVData(this.tumorId); break;
                case 'CT': this.CT.page = val; this.getCT_data(this.tumorId); break;
            }
        },
        //折叠面板展示数据
        handleChange(val) {
            console.log(val);
        },
        handleChange_2(val) {
            console.log(val);
            _this = this;
            val.forEach(function(v) {
                console.log(v);
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
        //km_plot模板的复选框
        handleCheckAllChange_(val) {  //全选
            val.screen_data = val.checkAll ? val.screen_dataAll : [];
            val.isIndeterminate = false;
            _this.$forceUpdate();
        },
        handleCheckedCitiesChange_(value) {  //选择单个
            let checkedCount = value.screen_data.length;
            value.checkAll = checkedCount === value.screen_dataAll.length;
            value.isIndeterminate = checkedCount > 0 && checkedCount < value.screen_dataAll.length;
            _this.$forceUpdate();
        },
        //更多筛选项
        filterOpearte(type, ind) {
            switch(type) {
                case 'add':
                    console.log(this.km_plot.population_selData);
                    var obj = {
                        population_type: '',   //本条赛选的名称
                        screen_dataType: 'radio',    //radio
                        screen_dataAll: [],   //待选区
                        radioData: '',
                    };
                    this.km_plot.selArr.push(obj);
                    break;
                case 'delete':
                console.log(ind)
                    this.km_plot.selArr.splice(ind, 1);
                    break;
            }
        },
        sel_population(d, ind) { //km_plot的filter下拉选择
            var _index = null, _this = this;
            //去除重复的选项
            this.km_plot.selArr.forEach(function(v, _i) {
                if(v != d && v['population_type'] == d['population_type']) {
                    _index = _i;
                    alertMsg('option duplication');
                }
            });
            //获取选择的对象
            this.km_plot.population_selData.forEach(function(val) {
                if(d['population_type'] == val['population_type']) {
                    _this.km_plot.selArr[ind] = cloneObj(val);
                    _this.$forceUpdate();
                }
            });
            if(_index || _index == 0) this.km_plot.selArr.splice(_index, 1);
        },
        //获取肿瘤详情
        getTumorInfo(id) {
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/tumor",
                dataType: "json",
                data: {
                    'tumor_id': id? id : this.tumorId,
                },
                success: function(res) {
                    _this.tumorInfo = res.context || [];
                    _this.getKm_plotData(); //获取km图
                }
            });
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
                    _this.ge_gs.genes = res.context || [];
                    _this.cl.filter.genelist =  res.context || [];
                    _this.km_plot.geneFilterData =  res.context || [];
                    //默认选取五个数据
                    _this.cl.filter.genelist.forEach(function (_v1, _ind) {
                        if(_ind < 3) {
                            _this.cl.searchBar.sel_idlist.push(_v1);
                            _this.cl.searchBar.idlist.push(_v1.gene_id);
                        }
                    })
                }
            });
        },
        //选择要显示的基因列表
        sel_geneslist() {
            this.getBSSData(this.tumorId);
            this.getBSData(this.tumorId);
            this.getBSVData(this.tumorId);
        },
        //Gene expression三个表格数据
        getBSSData(id, orderName, orderType) {
            _this = this;
            var _a = [];
            this.ge_gs.checkedGenes.forEach(function(v) {
                _a.push(v.gene_id);
            });
            $getData({
                type: "get",
                url: CONFIG.URL + "/tumorTissue",
                dataType: "json",
                data: {
                    'tumor_id': id? id : this.tumorId,
                    'start': (this.ge_gs.bss.page - 1) * 10,
                    'count': 10,
                    'idlist': _a.length > 0?_a : undefined,
                    'orderName': orderName?orderName:undefined,
                    'orderType': orderType?orderType:undefined,    //asc  desc
                },
                success: function(res) {
                    _this.ge_gs.bss.data = res.context.items || [];
                    _this.ge_gs.bss.totalNum = res.context.totalNum || 0;
                }
            });
        },
        //Gene expression三个表格数据
        getBSData(id, orderName, orderType) {
            _this = this;
            var _a = [];
            this.ge_gs.checkedGenes.forEach(function(v) {
                _a.push(v.gene_id);
            });
            $getData({
                type: "get",
                url: CONFIG.URL + "/tumorStage",
                dataType: "json",
                data: {
                    'tumor_id': id? id : this.tumorId,
                    'start': (this.ge_gs.bs.page - 1) * 10,
                    'count': 10,
                    'idlist': _a.length > 0?_a : undefined,
                    'orderName': orderName?orderName:undefined,
                    'orderType': orderType?orderType:undefined,    //asc  desc
                },
                success: function(res) {
                    console.log(res)
                    _this.ge_gs.bs.data = res.context.items || [];
                    _this.ge_gs.bs.totalNum = res.context.totalNum || 0;
                }
            });
        },
        //Gene expression三个表格数据
        getBSVData(id, orderName, orderType) {
            _this = this;
            var _a = [];
            this.ge_gs.checkedGenes.forEach(function(v) {
                _a.push(v.gene_id);
            });
            $getData({
                type: "get",
                url: CONFIG.URL + "/tumorSurviavl",
                dataType: "json",
                data: {
                    'tumor_id': id? id : this.tumorId,
                    'start': (this.ge_gs.bsv.page - 1) * 10,
                    'count': 10,
                    'idlist': _a.length > 0?_a : undefined,
                    'orderName': orderName?orderName:undefined,
                    'orderType': orderType?orderType:undefined,    //asc  desc
                },
                success: function(res) {
                    console.log(res)
                    _this.ge_gs.bsv.data = res.context.items || [];
                    _this.ge_gs.bsv.totalNum = res.context.totalNum || 0;
                }
            });
        },
        //Differential expression genes表格排序
        changeTabe(data, type) {
            console.log(data)
            if(data.order) {
                var orderType = (data.order == "descending")? 'desc': 'asc';
            };
            switch(type) {
                case 1: this.getBSSData(this.tumorId, data.prop, orderType);break;
                case 2: this.getBSData(this.tumorId, data.prop, orderType);break;
                case 3: this.getBSVData(this.tumorId, data.prop, orderType);break;
                case 'mr':  this.getCLData_1(this.tumorId, data.prop, orderType); break;
                case 'tfg':  this.getCLData_2(this.tumorId, data.prop, orderType); break;
                case 'lr':  this.getCLData_3(this.tumorId, data.prop, orderType); break;
            }
        },
        //Differential expression genes表格点击
        clickTable(data, type) {
            console.log(data);
            console.log(type);
        },
        //Correlation模块数据
        getCLData_1(id, orderName, orderType) {   //mrna
            _this = this;
            $getData({
                type: "post",
                url: CONFIG.URL + "/tumorMirrna",
                dataType: "json",
                data: JSON.stringify({
                    'tumor_id': id? id : this.tumorId,
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
                url: CONFIG.URL + "/tumorMirrna",
                dataType: "json",
                data: JSON.stringify({
                    'tumor_id': id? id : this.tumorId,
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
                url: CONFIG.URL + "/tumorTranscriptFactor",
                dataType: "json",
                data: JSON.stringify({
                    'tumor_id': id? id : this.tumorId,
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
                url: CONFIG.URL + "/tumorTranscriptFactor",
                dataType: "json",
                data: JSON.stringify({
                    'tumor_id': id? id : this.tumorId,
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
                url: CONFIG.URL + "/tumorLncRna",
                dataType: "json",
                data: JSON.stringify({
                    'tumor_id': id? id : this.tumorId,
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
                url: CONFIG.URL + "/tumorLncRna",
                dataType: "json",
                data: JSON.stringify({
                    'tumor_id': id? id : this.tumorId,
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
        
        //KM图模块 
        getKm_searchBar(id) { //获取km图筛选项数据
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/tumorFilterDetails",
                dataType: "json",
                data: {
                    'tumor_id': id? id : this.tumorId,
                },
                success: function(res) {
                    console.log(res);
                    _this.km_plot.population_selData = [];
                    _this.km_plot.selArr = [];
                    res.context.forEach(function(v, ind) {
                        var obj = {
                            'population_type': v.field,
                            'screen_dataType': 'checkbox',
                            'screen_dataAll': v.listDetail,
                            'screen_data': [],
                            'checkAll': false,
                            'isIndeterminate': false,
                            'type_1_char_0_num': v.type_1_char_0_num,
                        };
                        if(ind < 2) {
                            _this.km_plot.selArr.push(cloneObj(obj));
                        };
                        _this.km_plot.population_selData.push(cloneObj(obj));
                    });
                }
            });
        },
        //确定提交筛选项
        submit_searchBar_km() {
            var searchArr = [], searchArrStr;
            this.km_plot.selArr.forEach(function(_v1) {
                var _a = [], _astr, name = 'pas.'+_v1.population_type, arr, str;
                if(_v1.type_1_char_0_num == 0) { //数值比较
                    _v1.screen_data.forEach(function(_v2) {
                        arr = _v2.split('-'), str = '';
                        if(arr.length == 2) {
                            str = name + '>' + parseInt(arr[0]) + ' and ' + parseInt(arr[1]) + '>' + name;
                        } else {
                            str = name + '>' + parseInt(arr[0]);
                        };
                        if(str) _a.push('(' + str +')');
                    });
                    _astr = _a.join(' or ');
                } else {    //字符串比较
                    _v1.screen_data.forEach(function(_v2) {
                        str = name + '="' + _v2 + '"';
                        if(str) _a.push('(' + str +')');
                    });
                    _astr = _a.join(' or ');
                };
                if(_astr) searchArr.push('('+ _astr +')');
            });
            searchArrStr = searchArr.join(' and ');
            this.km_plot.searchBarData = searchArrStr;
            this.getKm_plotData();
        },
        //确定提交筛选项km_GEO的提交
        submit_searchBar_km2() {
            console.log(this.km_GEO.selData);
            console.log(this.km_GEO.geneFilter);
            _this.km_GEO.loading = true;  //转圈开始
            $getData({
                type: "get",
                url: CONFIG.URL + "/getTCGA",
                dataType: "json",
                data: {
                    'tumor_id': this.tumorId,
                    'gene_id': this.km_GEO.geneFilter?this.km_GEO.geneFilter:undefined,
                    'GSE_platform': this.km_GEO.selData?this.km_GEO.selData.GSE_platform:undefined,
                },
                success: function(res) {
                    console.log(res);
                    var arr = [];
                    res.context.forEach(function(_v1) {
                        arr.push({
                            'os_time': _v1['time']?(_v1['time']*1):0,
                            'os_event': _v1['event']?(_v1['event']*1):1,
                            'group': _v1['value']?(_v1['value']*1):0,
                            'sampleID': _v1['pt']?_v1['pt']:'',
                        });
                    });
                    $('#km_GEO_map').html('');
                    if(arr.length > 0) {
                        plot_km($('#km_GEO_map')[0], arr, {'expression_unit': '', 'abscissa_unit': 'Time in Months'});
                    } else {
                        alertMsg('no data');
                    }
                    _this.km_GEO.loading = false;  //转圈结束
                }
            });
        },
        getKm_plotData() {
            this.km_plot.loading = true;
            this.km_plot.imgUrl = true;
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/phenoAndSurv",
                dataType: "json",
                data: {
                    'tumor': this.tumorInfo.tumor,
                    'condition': this.km_plot.searchBarData?this.km_plot.searchBarData:undefined,
                    'gene_id': this.km_plot.geneFilter.split('_')[0],
                },
                success: function(res) {
                    var arr = [];
                    res.context.forEach(function(_v1) {
                        arr.push({
                            'os_time': _v1['X_OS']?(_v1['X_OS']*1):0,
                            'os_event': _v1['X_OS_IND']?(_v1['X_OS_IND']*1):1,
                            'group': _v1['value']?(_v1['value']*1):0,
                            'sampleID': _v1['submitter_id_samples']?_v1['submitter_id_samples']:'',
                        });
                    });
                    $('#km_plot_map').html('');
                    if(arr.length > 0) {
                        plot_km ($('#km_plot_map')[0], arr, {'expression_unit': ' (FPKM)', 'abscissa_unit': 'Time in Days'});
                    } else {
                        alertMsg('no data');
                    }
                    _this.km_plot.loading = false;  //转圈结束
                    $('.km_plot_map_img div span').css({'left': '50%'});
                    
                    //图片加载
                    var _url = 'http://47.110.225.123/imgs_tAA/hr_trends/' + _this.tumorInfo.tumor + '/' + _this.km_plot.geneFilter.split('_')[1] + '_HR.jpg';
                    $('#tumor_km_img').attr('src', _url);
                    $('#tumor_km_img').load(function() {
                        _this.km_plot.imgUrl = false;
                    });
                }
            });
//          var aaa = [
//              {'os_time': 10, 'os_event': '1', 'group': 10.25, 'sampleID': 'gene0'},
//              {'os_time': 111, 'os_event': '1', 'group': 11.25, 'sampleID': 'gene1'},
//              {'os_time': 212, 'os_event': '1', 'group': 12.25, 'sampleID': 'gene2'},
//              {'os_time': 313, 'os_event': '1', 'group': 13.25, 'sampleID': 'gene3'},
//              {'os_time': 414, 'os_event': '1', 'group': 14.25, 'sampleID': 'gene4'},
//              {'os_time': 515, 'os_event': '1', 'group': 15.25, 'sampleID': 'gene5'},
//              {'os_time': 616, 'os_event': '1', 'group': 16.25, 'sampleID': 'gene6'},
//              {'os_time': 717, 'os_event': '1', 'group': 17.25, 'sampleID': 'gene7'},
//              {'os_time': 818, 'os_event': '1', 'group': 18.25, 'sampleID': 'gene8'},
//              {'os_time': 919, 'os_event': '1', 'group': 19.25, 'sampleID': 'gene9'},
//          ];
//          plot_km ($('.km_plot_map')[0], aaa);
        },
        changeKMTb: function(type) {
            _this = this;
            this.km_jud = type;
            switch(type) {
                case 1:
                    
                    break;
                case 2:
                    //获取筛选项
                    $getData({
                        type: "get",
                        url: CONFIG.URL + "/getGSEPlatform",
                        dataType: "json",
                        data: {
                            'tumor_id': this.tumorId,
                        },
                        success: function(res) {
                            _this.km_GEO.selArr = res.context;
                        }
                    });
                    //获取筛选项的基因列表
                    $getData({
                        type: "get",
                        url: CONFIG.URL + "/getGeneInGEOMatrix",
                        dataType: "json",
                        data: {
                            'tumor_id': this.tumorId,
                        },
                        success: function(res) {
                            console.log(res);
                            _this.km_GEO.geneFilterData = res.context;
                        }
                    });
                    break;
            }
        },
        getCT_data(id) {
            var _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/getClinicalTrial",
                dataType: "json",
                data: {
                    'tumor_id': id? id : this.tumorId,
                    'start': (this.CT.page - 1) * 10,
                    'count': 10,
                },
                success: function(res) {
                    console.log(res);
                    _this.CT.data = res.context.items;
                    _this.CT.totalNum = res.context.totalNum;
                }
            });
        },
    },
    mounted() {
        var _params = this.$route.query;
        this.getAllGenes();
        this.getTumorInfo(_params.id);
        this.getBSSData(_params.id);
        this.getBSData(_params.id);
        this.getBSVData(_params.id);
        this.getKm_searchBar(_params.id);

        this.getCT_data(_params.id);
        
        //侧边栏固定
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

//km自动绘制线图
function drawKmImg(_d) {
    console.log(_d, window.kmimgData);
    var _top = '50%', num;
    num = (_d - window.kmimgData.min.group) / (window.kmimgData.max.group - window.kmimgData.min.group);
    _top = (num * 100).toFixed(2) + '%';
    $('.km_plot_map_img div span').css({'left': _top});
}
