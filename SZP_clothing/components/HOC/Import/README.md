/*
* author: zero
* createdTime: 2018/09/19
* */

# Import - 导入数据 按钮组件

  居于 antd Upload 组件，所以基础 API 可以前往 <a href="https://ant.design/components/upload-cn/" target="_blank">Upload</a>。

## 组件API
   onExprotError: 报错导出
   onResponse: 导入失败, 报错弹框提示，配合报错导出功能
   onOk： 导入成功
   onError： 导入失败

## 注意报错返回 code
    400200 : prices
    405018 : productcenter
    401069 : inventorycenter
    412105 : orders
    1021 : dmcenter
    410001 : cmscenter
