// 下载资源
var router_downloads = Vue.extend({
    template: '#router_downloads',
    data: function() {
        return {
            list: page_data['downloads']['list'],
        }
    },
    methods: {
    }
});

// 关于我们
var router_about_us = Vue.extend({
    template: '#router_about_us',
    data: function() {
        return {
            list: page_data['about_us']['list'],
        }
    },
    methods: {
    }
});

// 联系我们
var router_contact = Vue.extend({
    template: '#router_contact',
    data: function() {
        return {
            list: page_data['contact']['list'],
        }
    },
    methods: {
    }
});

// 视频辅导
var router_tutorail = Vue.extend({
    template: '#router_tutorail',
    data: function() {
        return {
            list: page_data['tutorail']['list'],
        }
    },
    methods: {
    }
});