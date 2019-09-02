<html>
<head>

  <title>My JSP 'index.jsp' starting page</title>
  <script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
  <script src="js/jquery.form.js"></script>
  <script type="text/javascript">
      //ajax 方式上传文件操作

      //获取全部通知模板
      function getAllTemplate() {
          $.hello({
              url: 'http://192.168.0.127:8080/api/user/getTest',
              type: "get",
              success: function(res) {
                  if(res.status == 200) {
                      console.log(unzip(context));
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
<form method="POST"  enctype="multipart/form-data" id="form1" action="192.168.0.127:8080/api/oa/upFile/upload">
  <table>
    <tr>
      <td>上传文件: </td>
      <td> <input id="upfile" type="file" name="upfile"></td>
    </tr>
    <tr>
      <td><input type="submit" value="提交" onclick="return checkData()"></td>
      <td><input type="button" value="ajax方式提交" id="btn" name="btn" ></td>
    </tr>
  </table>
</form>



</body>
</html>