$(function() {
    // 调用getUserInfo()函数获取用户基本信息
    getUserInfo()

    var layer = layui.layer
    // 实现退出功能
    $('#btnLogout').on('click',function(){
        // console.log('ok');
        // 提示用户是否退出
        layer.confirm('确定退出登录？', {icon: 3, title:'提示'}, function(index){
            // 清空本地存储的token
            localStorage.removeItem('token')
            //跳转到登录页面
            location.href = '/code/lo.html'
            // 关闭confirm框
            layer.close(index);
    })
})

})

// 获取用户的基本信息
function getUserInfo(){
    $.ajax({
        method:'get',
        url:'/my/userinfo',
        // headers就是请求头配置对象
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
        success: function(res){
            // console.log(res);
            if(res.status !== 0){
                return layui.layer.msg('获取用户信息失败')
            }
            // 获取用户信息成功，开始渲染头像,定义renderAvatar()再调用
            renderAvatar(res.data)
        },
        // 无论成功还是失败，最终都会调用这个函数
        // complete: function(res){
        //     console.log('执行了complete');
        //     console.log(res)
        //     // 在complete回调函数中，可以使用res.responseJSON拿到服务器响应回来的数据
        //     if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！'){
        //         // 强制清空token
        //         localStorage.removeItem('token')
        //         // 跳回登录页面
        //         location.href = '/code/index.html'
        //     }
        // }
    })
}

// 渲染用户头像函数
function renderAvatar(user){
    // 1.获取用户的名称
var name = user.nickname || user.username
    // 2.设置欢迎文本
  $("#welcome").html('欢迎&nbsp;&nbsp;'+ name)
    // 3.按需渲染用户的头像
    if(user.user_pic !== null){
        //  3.1渲染图片头像
        $('.layui-nav-img').attr('src', user.user_pic).show()
        $('.text-avatar').hide()
    }else {
        //  3.2渲染文字头像
        $('.layui-nav-img').hide()
        var first = name[0].toUpperCase()
        $('.text-avatar').html(first).show()
    }
}