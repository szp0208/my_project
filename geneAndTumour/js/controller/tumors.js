var router_tumors = Vue.extend({
    template: '#tumors',
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
                {'name': 'LUAD/LUSC', 'id': '14/15', 'list': [
                    {'name': 'LUAD', 'id': '14'},
                    {'name': 'LUSC', 'id': '15'},
                ], 'type': 'list', 'sty': {'width': '42px', 'height': '44px', 'top': '112px', 'left': '154px'}},
                {'name': 'PAAD', 'id': '17', 'sty': {'width': '42px', 'height': '44px', 'top': '166px', 'left': '170px'}},
                {'name': 'PRAD', 'id': '19', 'sty': {'width': '42px', 'height': '44px', 'top': '262px', 'left': '166px'}},
                {'name': 'COAD/READ', 'id': '4/20', 'list': [
                    {'name': 'COAD', 'id': '4'},
                    {'name': 'READ', 'id': '20'},
                ], 'type': 'list', 'sty': {'width': '42px', 'height': '44px', 'top': '210px', 'left': '137px'}},
                {'name': 'OV', 'id': '16', 'sty': {'width': '42px', 'height': '44px', 'top': '238px', 'left': '376px'}},
                {'name': 'LIHC', 'id': '13', 'sty': {'width': '42px', 'height': '44px', 'top': '191px', 'left': '394px'}},
                {'name': 'BRCA', 'id': '2', 'sty': {'width': '42px', 'height': '44px', 'top': '137px', 'left': '373px'}},
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
                    'type': 1,
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
                    'type': 1,
                },
                success: function(res) {
                    _this.restaurants = res.context || [];
                }
            });
        },
        //点击输入搜索
        clickSearch() {
            this.$router.push({path: 'tumour_details', query: {id: this.searchData.id}});
        },
        //点击下拉搜索
        clickSearch_() {
            this.$router.push({path: 'tumour_details', query: {id: this.selectData.id}});
        },
        //点击的小圈圈
        clickCirclesMap(d) {
            console.log(d);
            if(d.type == 'list') {
                this.dialogVisible = true;
                this.clickMapList = d.list;
            } else {
                this.$router.push({path: 'tumour_details', query: {id: d.id}});
            }
        },
    },
    mounted() {
        this.loadAll();
    }
});


