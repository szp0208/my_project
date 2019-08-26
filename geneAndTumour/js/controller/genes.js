var router_genes = Vue.extend({
    template: '#genes',
    data: function() {
        return {
            listName: 1,    //点击搜索类型
            searchVal: '',  //输入框的值
            searchData: '', //输入框选择的数据
            btnJud: true,   //输入框按钮的判断
            btnJud_: true,   //下拉框按钮的判断
            restaurants: [],    //输入框提示的数据
            selectData: '', //下拉选中的数据
            maplist_1: [  //能够点击的小圈圈数据
                {'name': 'MTOR', 'id': '53', 'sty': {'width': '66px', 'height': '30px', 'top': '91px', 'left': '185px'}},
                {'name': 'AMBRA1', 'id': '3', 'sty': {'width': '54px', 'height': '31px', 'top': '151px', 'left': '318px'}},
                {'name': 'BCL2', 'id': '23', 'sty': {'width': '55px', 'height': '38px', 'top': '162px', 'left': '370px'}},
                {'name': 'BECN1', 'id': '22', 'sty': {'width': '55px', 'height': '38px', 'top': '162px', 'left': '476px'}},
                {'name': 'ULK1', 'id': '90', 'sty': {'width': '41px', 'height': '36px', 'top': '160px', 'left': '180px'}},
                {'name': 'ULK2', 'id': '91', 'sty': {'width': '41px', 'height': '36px', 'top': '160px', 'left': '220px'}},
                {'name': 'ATG13', 'id': '7', 'sty': {'width': '46px', 'height': '33px', 'top': '191px', 'left': '205px'}},
                {'name': 'ATG101', 'id': '5', 'sty': {'width': '46px', 'height': '33px', 'top': '190px', 'left': '245px'}},
                {'name': 'ATG14', 'id': '8', 'sty': {'width': '48px', 'height': '32px', 'top': '238px', 'left': '327px'}},
                {'name': 'UVRAG', 'id': '95', 'sty': {'width': '47px', 'height': '32px', 'top': '208px', 'left': '324px'}},
                {'name': 'ATG16L1', 'id': '9', 'sty': {'width': '45px', 'height': '32px', 'top': '357px', 'left': '54px'}},
                {'name': 'ATG16L1', 'id': '9', 'sty': {'width': '45px', 'height': '32px', 'top': '408px', 'left': '0px'}},
                {'name': 'ATG12', 'id': '6', 'sty': {'width': '43px', 'height': '32px', 'top': '359px', 'left': '99px'}},
                {'name': 'ATG12', 'id': '6', 'sty': {'width': '43px', 'height': '32px', 'top': '492px', 'left': '96px'}},
                {'name': 'ATG5', 'id': '18', 'sty': {'width': '43px', 'height': '32px', 'top': '420px', 'left': '58px'}},
                {'name': 'ATG5', 'id': '18', 'sty': {'width': '43px', 'height': '32px', 'top': '359px', 'left': '143px'}},
                {'name': 'ATG10', 'id': '4', 'sty': {'width': '45px', 'height': '32px', 'top': '433px', 'left': '138px'}},
                {'name': 'ATG7', 'id': '19', 'sty': {'width': '45px', 'height': '32px', 'top': '476px', 'left': '140px'}},
                {'name': 'ATG7', 'id': '19', 'sty': {'width': '45px', 'height': '32px', 'top': '460px', 'left': '228px'}},
                {'name': 'ATG3', 'id': '13', 'sty': {'width': '45px', 'height': '32px', 'top': '420px', 'left': '228px'}},
                {'name': 'ATG4A/ATG4B/ATG4C/ATG4D', 'id': '14/15/16/17', 'list': [
                    {'name': 'ATG4A', 'id': '14'},
                    {'name': 'ATG4B', 'id': '15'},
                    {'name': 'ATG4C', 'id': '16'},
                    {'name': 'ATG4D', 'id': '17'},
                ], 'type': 'list', 'sty': {'width': '45px', 'height': '32px', 'top': '527px', 'left': '228px'}},
                {'name': 'MLST8', 'id': '52', 'sty': {'width': '50px', 'height': '26px', 'top': '120px', 'left': '168px'}},
                {'name': 'MAP1LC3A/MAP1LC3B/MAP1LC3B2/MAP1LC3C', 'id': '46/47/48/49', 'list': [
                    {'name': 'MAP1LC3A', 'id': '46'},
                    {'name': 'MAP1LC3B', 'id': '47'},
                    {'name': 'MAP1LC3B2', 'id': '48'},
                    {'name': 'MAP1LC3C', 'id': '49'},
                ], 'type': 'list', 'sty': {'width': '41px', 'height': '33px', 'top': '358px', 'left': '267px'}},
                {'name': 'MAP1LC3A/MAP1LC3B/MAP1LC3B2/MAP1LC3C', 'id': '46/47/48/49', 'list': [
                    {'name': 'MAP1LC3A', 'id': '46'},
                    {'name': 'MAP1LC3B', 'id': '47'},
                    {'name': 'MAP1LC3B2', 'id': '48'},
                    {'name': 'MAP1LC3C', 'id': '49'},
                ], 'type': 'list', 'sty': {'width': '41px', 'height': '33px', 'top': '495px', 'left': '265px'}},
                {'name': 'MAP1LC3A/MAP1LC3B/MAP1LC3B2/MAP1LC3C', 'id': '46/47/48/49', 'list': [
                    {'name': 'MAP1LC3A', 'id': '46'},
                    {'name': 'MAP1LC3B', 'id': '47'},
                    {'name': 'MAP1LC3B2', 'id': '48'},
                    {'name': 'MAP1LC3C', 'id': '49'},
                ], 'type': 'list', 'sty': {'width': '41px', 'height': '33px', 'top': '551px', 'left': '267px'}},
            ],
            maplist_2: [
                {'name': 'PINK1', 'id': '59', 'sty': {'width': '53px', 'height': '30px', 'top': '137px', 'left': '51px'}},
                {'name': 'PINK1', 'id': '59', 'sty': {'width': '53px', 'height': '30px', 'top': '139px', 'left': '288px'}},
                {'name': 'PINK1', 'id': '59', 'sty': {'width': '30px', 'height': '53px', 'top': '164px', 'left': '422px'}},
                {'name': 'TOMM20', 'id': '86', 'sty': {'width': '36px', 'height': '22px', 'top': '156px', 'left': '60px'}},
                {'name': 'TOMM20', 'id': '86', 'sty': {'width': '36px', 'height': '22px', 'top': '158px', 'left': '297px'}},
                {'name': 'TOMM20', 'id': '86', 'sty': {'width': '22px', 'height': '36px', 'top': '173px', 'left': '403px'}},
                {'name': 'PRKN', 'id': '62', 'sty': {'width': '50px', 'height': '32px', 'top': '97px', 'left': '106px'}},
                {'name': 'PRKN', 'id': '62', 'sty': {'width': '50px', 'height': '32px', 'top': '56px', 'left': '351px'}},
                {'name': 'PRKN', 'id': '62', 'sty': {'width': '50px', 'height': '32px', 'top': '98px', 'left': '343px'}},
                {'name': 'MAP1LC3A/MAP1LC3B/MAP1LC3B2/MAP1LC3C', 'id': '46/47/48/49', 'list': [
                    {'name': 'MAP1LC3A', 'id': '46'},
                    {'name': 'MAP1LC3B', 'id': '47'},
                    {'name': 'MAP1LC3B2', 'id': '48'},
                    {'name': 'MAP1LC3C', 'id': '49'},
                ], 'type': 'list', 'sty': {'width': '31px', 'height': '24px', 'top': '293px', 'left': '275px'}},
                {'name': 'MAP1LC3A/MAP1LC3B/MAP1LC3B2/MAP1LC3C', 'id': '46/47/48/49', 'list': [
                    {'name': 'MAP1LC3A', 'id': '46'},
                    {'name': 'MAP1LC3B', 'id': '47'},
                    {'name': 'MAP1LC3B2', 'id': '48'},
                    {'name': 'MAP1LC3C', 'id': '49'},
                ], 'type': 'list', 'sty': {'width': '31px', 'height': '24px', 'top': '380px', 'left': '293px'}},
                {'name': 'MAP1LC3A/MAP1LC3B/MAP1LC3B2/MAP1LC3C', 'id': '46/47/48/49', 'list': [
                    {'name': 'MAP1LC3A', 'id': '46'},
                    {'name': 'MAP1LC3B', 'id': '47'},
                    {'name': 'MAP1LC3B2', 'id': '48'},
                    {'name': 'MAP1LC3C', 'id': '49'},
                ], 'type': 'list', 'sty': {'width': '28px', 'height': '32px', 'top': '428px', 'left': '345px'}},
                {'name': 'MAP1LC3A/MAP1LC3B/MAP1LC3B2/MAP1LC3C', 'id': '46/47/48/49', 'list': [
                    {'name': 'MAP1LC3A', 'id': '46'},
                    {'name': 'MAP1LC3B', 'id': '47'},
                    {'name': 'MAP1LC3B2', 'id': '48'},
                    {'name': 'MAP1LC3C', 'id': '49'},
                ], 'type': 'list', 'sty': {'width': '26px', 'height': '31px', 'top': '284px', 'left': '370px'}},
                {'name': 'TBK1', 'id': '82', 'sty': {'width': '41px', 'height': '23px', 'top': '345px', 'left': '321px'}},
                {'name': 'OPTN', 'id': '55', 'sty': {'width': '33px', 'height': '21px', 'top': '363px', 'left': '312px'}},
                {'name': 'TAX1BP1', 'id': '78', 'sty': {'width': '42px', 'height': '40px', 'top': '407px', 'left': '366px'}},
                {'name': 'CALCOCO2', 'id': '26', 'sty': {'width': '39px', 'height': '23px', 'top': '313px', 'left': '369px'}},
            ],
            dialogVisible: false,   //弹出框
            clickMapList: [],   //点击如果的圈圈是多个的暂存区
        }
    },
    methods: {
        select_lis(val) {
            this.listName = val;
        },
        querySearch(queryString, cb) {  //搜索
            this.searchData = '';   //输入后搜索数据清空
            this.btnJud = true;
            this.getListData(queryString, function(arr) {
                // 调用 callback 返回建议列表的数据
                cb(arr);
            });
        },
        handleSelect(item) {
            this.searchData = item;
            this.searchVal = item.name;
            this.btnJud = false;
        },
        //获取搜索下拉数据列表
        getListData(d, fn) {
            $getData({
                type: "get",
                url: CONFIG.URL + "/searchList",
                dataType: "json",
                data: {
                    'searchName': d,
                    'type': 0,
                },
                success: function(res) {
                    var res = res.context || [];
                    if(fn) fn(res);
                }
            });
        },
        loadAll() { //所有的数据
            _this = this;
            $getData({
                type: "get",
                url: CONFIG.URL + "/searchList",
                dataType: "json",
                data: {
                    'type': 0,
                },
                success: function(res) {
                    _this.restaurants = res.context || [];
                }
            });
        },
        //点击输入搜索
        clickSearch() {
            this.$router.push({path: 'genes_details', query: {id: this.searchData.id}});
        },
        //点击下拉搜索
        clickSearch_() {
            this.$router.push({path: 'genes_details', query: {id: this.selectData.id}});
        },
        //点击的小圈圈
        clickCirclesMap(d) {
            console.log(d);
            if(d.type == 'list') {
                this.dialogVisible = true;
                this.clickMapList = d.list;
            } else {
                this.$router.push({path: 'genes_details', query: {id: d.id}});
            }
        },
    },
    mounted() {
        this.loadAll();
    }
});


