$(".header-top-menu ul li:first-child").html("<a href='#'>"+localStorage.getItem('username')+"</a>");
(function() {
	//刷新界面展示用户地址
	$(".deliver-goods-site").html("")
	$.get(PRODUCT_HOST + USERADD + '?token=' + localStorage.getItem('token'), function(result) {
		//console.log(result.data)
		result.data.forEach(function(obj) {
			//console.log(obj)
			var Site = $("<div class='uesrsite'><span>收件人：" + obj.consignee + "</span><span>详细收货地址：" +obj.province+"省"+ obj.city+"市" +obj.district+"县区"+ obj.address+" </span><span>手机号码：" + obj.mobile + "</span><i class='shanchu' data-id='"+obj.address_id+"'>-</i></div>")
			$(".deliver-goods-site").append(Site);
		})
	})
	
	
	//当点击添加收货地址时，让添加地址界面出现
	$(".append-site").click(function() {
		$("#siteview").css("display", "block")
	})
	//当点击关闭按钮时让界面隐藏
	$(".close-button").click(function() {
		$("#siteview").css("display", "none")
	})
	//当点击保存新的地址按钮时，保存用户地址信息
	$(".keep").click(function() {
		var parm = {//添加新的地址时传递的参数
			consignee: $(".cargo").val(),
			province: $("#province").find("option:selected").attr("value"),
			city: $("#city").find("option:selected").attr("value"),
			district: $("#town").find("option:selected").attr("value"),
			address: $(".minute").val(),
			mobile: $(".mobile").val(),
			tel: $(".tel").val()
		};
		console.log(parm);
		//添加用户地址信息的请求
		$.post(PRODUCT_HOST + USERADD + "?status=add&token=" + localStorage.getItem('token'), parm, function(result) {
			console.log(result)
			if (result.code == 0) {//如果添加信息成功
				$("#siteview").css("display", "none");//添加地址界面隐藏
				$(".deliver-goods-site").html("")
				//查看用户地址信息的请求
				$.get(PRODUCT_HOST + USERADD + '?token=' + localStorage.getItem('token'), function(result) {
					//console.log(result.data)
					result.data.forEach(function(obj) {
		            //console.log(obj)
						var Site = $("<div class='uesrsite'><span>收件人：" + obj.consignee + "</span><span>详细收货地址：" +obj.province+"省"+ obj.city+"市" +obj.district+"县区"+ obj.address+" </span><span>手机号码：" + obj.mobile + "</span><i class='shanchu' data-id='"+obj.address_id+"'>-</i></div>")						
						$(".deliver-goods-site").append(Site);
					});
				});
			};
		});
	});
	
    //删除用户信息地址
    $(document).on("click",".shanchu",function(){
    	var git=$(this).data("id");//通过按钮的扩展属性data-获取当前点击按钮的id
        var parm = {status:"delete",address_id:git};//删除用户所传参数
        //删除用户信息地址发送的请求
        $.get(PRODUCT_HOST + USERADD + '?token=' + localStorage.getItem('token'),parm,function (result) {
            //console.log(result)
            if (result.code==0) {//如果请求成功 ，删除该条信息
            	$(this).parent().remove()
            	//console.log($(this).parent())
            };
        }.bind(this));
    });
})();