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

var layer = layui.layer; //弹出层模块 
//监听注册表单提交事件
$("#form_reg").on("submit", function (e) {
  e.preventDefault(); //阻止表单默认提交行为
  var data = {
    username: $("#form_reg [name=username]").val(), //将用户输入的注册表单内的数据保存起来
    password: $("#form_reg [name=password]").val(),
    repassword: $("#form_reg [name=repassword]").val(),
  };
  $.post("http://www.liulongbin.top:3008/api/reg", data, function (res) {
    //通过ajax的post请求发送到后台验证是否存在重复注册
    if (res.code === 0) {
      //判断成功后的返回值
      layer.msg("注册成功,请登录");
      $("#link_login").click();
    } else {
      layer.msg(res.message);
    }
  });
});

//监听登录表单提交事件
$("#form_login").submit(function (e) {
  e.preventDefault(); //阻止表单默认提交行为
  $.ajax({
    method: "POST",
    url: "http://www.liulongbin.top:3008/api/login",
    data: $(this).serialize(),//快速获取表单数据
    success: function (res) {
      if (res.code !== 0) {
        return layer.msg(res.message);
      } else {
        localStorage.setItem("token", res.token);//将token值保存到本地
        location.href = "../../index.html";//登录成功后的跳转页面
      }
    },
  });
});
