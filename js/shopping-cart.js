$(".header-top-menu ul li:first-child").html("<a href='#'>"+localStorage.getItem('username')+"</a>");
//查看购物车
$.get(PRODUCT_HOST+CART,{token:localStorage.getItem('token')},function(result){
	console.log(result.data)
	result.data.forEach(function(ojb){
		console.log(ojb)
		var numgods=$("<div class='text-line'></div>")
		var count=$("<input type='checkbox' class='judge' name='hhhh'/>")
	    var img=$("<i><img src='"+ojb.goods_thumb+"'style='width:80px;height:80px'/><a>"+ojb.goods_name+"</a></i>")
	    var app=$("<div class='app-add'></div>")
		
		
	    new AddControl(app[0],10);
	    var num = $('.app-add input').val();
	    var count1=$("<span class='dj'>"+ojb.goods_price+"</span><span class='alldj'>"+(ojb.goods_price)*(ojb.goods_number)+"</span><button class='delete' data-id="+ojb.goods_id+">删除</button>")
	    numgods.append(count)
	    numgods.append(img)
	    numgods.append(app)
	    numgods.append(count1)
	    $(".order-message-num").append(numgods)
	    console.log(numgods)
	    //删除购物车里面的物品
	    $(".delete").click(function(){
	    	var getid=$(this).data("id");
	    	console.log(getid)
	    	var pram={goods_id:getid,number:0};
	    	$.post(PRODUCT_HOST+CART+'?token='+localStorage.getItem('token'),pram,function(result){
	    		//console.log(localStorage.getItem('token'))
	    		if (result.code==0) {
	    			$(this).parent().remove();
	    		};
	    	}.bind(this));
	    });
	    
	    //全选按钮
	    $(".order-message-nav>input").click(function(){
	    	console.dir(this)
	    	if(this.checked==true){
	    		console.log(1)
	    		$(".judge").prop('checked',true)
	    	}else{
	    		console.log(2)
	    		$(".judge").prop('checked',false)
	    	}
	    })
	    //反选
	    $(".judge").click(function(){
	    	var every=$(".judge").length;
	    	console.log(every)
	    	var chooselgh=$(".judge:checked").length;
	    	if (every==chooselgh) {
	    		$(".order-message-nav>input").prop('checked',true)
	    	} else{
	    		$(".order-message-nav>input").prop('checked',false)
	    	};
	    })
	})
	
})


//数量和价格
$(document).on('click','.app-add button',function(){
	console.log(this)
	var sign=$(this).html()
	if (sign=="+"||sign=="-") {//判断电价的按钮
		var num= parseInt($('.app-add input').val())//获取单个物品的数量
		//console.log(num)
		var dj= $(".dj").html()//获取单价
		var alldj= $(".alldj").html()//获取总价
		//console.log(alldj)
		alldj=num*dj
		//console.log(alldj);
		$(".alldj").html(alldj);//将计算出来的总价赋值到总价容器中
		
		//更新购物车
		var getid=$(this).parent().parent().next().next().next().data('id');
	    	var pram={goods_id:getid,number:num};
	    	$.post(PRODUCT_HOST+CART+'?token='+localStorage.getItem('token'),pram,function(result){
	    		//console.log(localStorage.getItem('token'))
	    		if (result.code==0) {
	    		console.log(result)
	    		};
	    	}.bind(this));
	}
	
});

