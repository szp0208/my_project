// 定义路由组件
var router = new VueRouter({
    routes: [//路由list配置
        {
            path:"/",
            component: router_homepage
        },
        {
            path:"/Homepage",
            component: router_homepage
        },
        {
            path:"/Genes",
            component: router_genes
        },
        {
            path:"/Tumors",
            component: router_tumors
        },
        {
            path: '/tumour_details',    //肿瘤详情页面
            component: router_tumour_details
        },
        {
            path: '/genes_details',    //基因详情页面
            component: router_genes_details
        },
        {
            path: '/Downloads',    //下载资源
            component: router_downloads
        },
        {
            path: '/About',    //关于我们
            component: router_about_us
        },
        {
            path: '/Contact',    //联系我们
            component: router_contact
        },
        {
            path: '/Tutorial',    //视频辅导
            component: router_tutorail
        },
    ]
});

// 绑定路由
var myApp = new Vue({
    el:"#app",
    router: router,
    data: {
        navList: [
            {name: 'Homepage'},
            {name: 'Genes'},
            {name: 'Tumors'},
            {name: 'Downloads'},
          //  {name: 'About'},
            {name: 'Contact'},
            {name: 'Tutorial'},
        ],
        navShow: 'Homepage',
    },
    methods: {
        jumpRouter: function(d) {    //跳转路由
            this.navShow = d;
            this.$router.push({path: d});
            console.log(this.navShow)
        },
        //错误提示弹框msg
        alertMsg: function(msg, opt) {
            var opt = opt || {};
            opt.icon = opt.icon || 1;
            opt.time = opt.time || 1000;
            opt.showClose = opt.showClose || true;
            opt.callback = opt.callback || function() {};
            console.log(opt);
            switch(opt.icon) {
                case 2: //弹框提示
                    this.$alert(msg, 'Tips', {
                        confirmButtonText: 'sure',
                        callback: opt.callback,
                    });
                    break;
                default:    //蒙层提示
                    var _t = 'info';
                    switch(opt.icon) {
                        case 3:    _t = 'success'; break;  //成功蒙层
                        case 4:    _t = 'error'; break;  //错误蒙层
                        case 5:    _t = 'warning'; break;  //警告蒙层
                    };
                    this.$message({
                        message: msg,
                        customClass: 'alert_msg',
                        duration: opt.time,
                        showClose: opt.showClose,
                        type: _t,
                        onClose: opt.callback,
                    });
                    break;
            }
        },
        returnTop() {
            console.log('sss');
        }
    },
    mounted() {
        this.navShow = this.$route.path.replace(new RegExp('/', 'g'), '');
        console.log(this.navShow)
    },
    filters: {
        n: function(value){
            return (value * 1).toFixed(2);
        }
    }
});

//错误提示方法调用
function alertMsg(msg, type) {
    var type = type || 1;
    myApp.alertMsg(msg, {icon: type});
};

$('.contain').css({'min-height': $(window).height() - 120 + 'px'});
