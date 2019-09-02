<%--
  Created by IntelliJ IDEA.
  User: Administrator
  Date: 2018/11/26
  Time: 9:36
  To change this template use File | Settings | File Templates.
--%>
<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<html>
<head>

  <title>My JSP 'index.jsp' starting page</title>
  <script src="http://libs.baidu.com/jquery/2.1.4/jquery.min.js"></script>
  <script src="js/extend.js"></script>
  <script type="text/javascript">
      //ajax 方式上传文件操作
      var b;
      //获取全部通知模板
      function getAllTemplate() {
          $.hello({
              url: 'http://192.168.0.127:8080/api/user/getTest',
              type: "get",
              success: function(res) {
                  if(res.status == 200) {
                      console.log(res.context);
                      b = res.context;
                  };
              }
          });
      }
      // 解压
      function unzip(key) {
          // 将二进制字符串转换为字符数组
          var charData = key.split('').map(function (x) { return x.charCodeAt(0); });
          console.log('压缩后的文件大小:', charData.join(","))

          // 将数字数组转换成字节数组
          var binData = new Uint8Array(charData);

          // 解压
          var data = pako.inflate(binData);

          // 将GunZip ByTAREAR转换回ASCII字符串
          key = String.fromCharCode.apply(null, new Uint16Array(data));

          //unescape(str)  --->解压后解码，防止中午乱码
          return unescape(key);
      }
  </script>
</head>
</head>

<body>
<div>1.通过简单的form表单提交方式，进行文件的上</br> 2.通过jquery.form.js插件提供的form表单一步提交功能 </div></br>
<button onclick="getAllTemplate()">开始请求 </button>



</body>
</html>
