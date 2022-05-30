$(function(){
      //登录注册切换
      $('#link_reg').click(()=>{
            $(".reg-box").show()
            $('.login-box').hide()
      })
      $('#link_login').click(()=>{
            $(".reg-box").hide()
            $('.login-box').show()
      })

      
      const form = layui.form
      const layer = layui.layer
      // 自定义表单验证
      form.verify({
            // 
            pwd: [/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],

            repwd : (value)=>{
                  const pwd = $("#form_reg [name='password']").val()
                  if(pwd != value) return '俩次密码不一致'
            }
      })
      // baseUrl
      // const baseUrl = 'http://www.liulongbin.top:3007'
      // 注册功能
      $("#form_reg").on('submit',(e)=>{
            e.preventDefault()
            $.ajax({
                  type:'POST',
                  url:'/api/reguser',
                  data:{
                        username:$("#form_reg [name=username]").val(),
                        password:$("#form_reg [name=password]").val(),
                  },
                  success: (res) =>{
                        if(res.status !=0) return layer.msg("注册失败"+res.message)
                        layer.msg("注册成功")
                        $('#link_login').click()
                  }
            })
      })
      // 登录功能
      $("#form_login").on("submit",function(e){
            e.preventDefault()
            $.ajax({
                  type:"POST",
                  url:"/api/login",
                  data:$(this).serialize(),
                  success:(res) => {
                        // console.log(res);
                        if(res.status != 0) return layer.msg('登录失败')
                        layer.msg("登录成功")
                        localStorage.setItem('token',res.token)
                        location.href='/index.html'
                  }
            })
      })
})
