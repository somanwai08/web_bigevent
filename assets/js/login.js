$(function(){
    // 点击‘去注册账号’的链接
    $('#link_reg').on('click',function(){
        $('.login-box').hide()
        $('.reg-box').show()
    })
    // 点击‘去登录’的链接
    $('#link_login').on('click',function(){
       $('.reg-box').hide()
       $('.login-box').show()
    })

    // 从layui中获取form对象
    var form = layui.form
    var layer = layui.layer
    // 通过form.verify()函数自定义校验规则
    form.verify({
        // 自定义了一个叫做pwd的校验规则
        pwd: [
            /^[\S]{6,12}$/,
            '密码必须6到12位，且不能出现空格'
          ],
        //   校验两次密码是否一致
        repwd: function(value){
        //   通过形参拿到的是确认密码框中的内容
        // 还需要拿到密码框中的内容
        // 然后进行一次等于的判断
        // 如果判断失败，则return一个提示消息
       var pwd = $('.reg-box [name=password]').val()
       if(pwd !== value){
           return '两次密码不一致！'
       }
        }
    })

    // 监听注册表单的提交事件
    $('#form_reg').on('submit',function(e){
        e.preventDefault()
        var data = {username:$('#form_reg [name=username]').val(),password:$('#form_reg [name=password]').val()}
        $.post('/api/reguser', data ,function(res){
            if(res.status !== 0){
                return layer.msg(res.message)
            }
            layer.msg('注册成功')
            // 模拟人手点击‘去登录’
            $('#link_login').click()
        })
        
    })

    // 监听登录表达的提交事件
    $('#form_login').submit(function(e){
        // 阻止默认提交行为
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'post',
            // 快速获取表单中的数据
            data: $(this).serialize(),
            success:function(res){
                console.log(res);
                if(res.status !== 0) {return layer.msg('登录失败')}

                layer.msg('登录成功！')
                // 将登录成功得到的token保存到本地存储中
                localStorage.setItem('token',res.token)
                // 登录成功后调到后台
                location.href = '/code/index.html'
            }
        }
        )
    })
})