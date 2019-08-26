var router_homepage = Vue.extend({
    template: '#homepage',
    data: function() {
        return {
            searchVal: '',  //输入的搜索值
            searchData: '', //需要点击搜索的数据
            btnJud: true,   //按钮状态判断
        }
    },
    methods: {
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
        btnSearch() {   //点击搜索按钮
            console.log(this.searchData);
            if(this.searchData.type == 0) { //跳转基因详情页面
                this.$router.push({path: 'genes_details', query: {id: this.searchData.id}});
            } else {    //跳转肿瘤详情页面
                this.$router.push({path: 'tumour_details', query: {id: this.searchData.id}});
            }
        },
        //获取搜索下拉数据列表
        getListData(d, fn) {
            $getData({
                type: "get",
                url: CONFIG.URL + "/searchList",
                dataType: "json",
                data: {
                    'searchName': d,
                },
                success: function(res) {
                    var res = res.context || [];
                    if(fn) fn(res);
                }
            });
        }
    },
    mounted() {
        
    }
})