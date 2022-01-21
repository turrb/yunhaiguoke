$(function () {
  //去登录页面
  $("#link_reg").on("click", function () {
    $(".login-box").hide();
    $(".reg-box").show();
  });
  //去注册页面
  $("#link_login").on("click", function () {
    $(".login-box").show();
    $(".reg-box").hide();
  });
});

var form = layui.form; //获取form模块
form.verify({
  pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"], //定义一个pwd规则
  repwd: function (value) {
    if ($(".reg-box [name=password]").val() !== value) {
      return "两次密码不同";
    }
  },
});

$("#form_reg").on("submit", function (e) {//监听表单提交事件
  e.preventDefault();//阻止表单默认提交行为
  var data = {
    username: $("#form_reg [name=username]").val(),//将用户输入的注册表单内的数据保存起来
    password: $("#form_reg [name=password]").val(),
    repassword: $("#form_reg [name=repassword]").val(),
  };
  $.post("http://www.liulongbin.top:3008/api/reg", data, function (res) {//通过ajax的post请求发送到后台验证是否存在重复注册
    if (res.code === 0) {//判断成功后的返回值
      console.log("注册成功");
    }else{
      console.log(res.message);
    }
  });
});
