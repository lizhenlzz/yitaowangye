function GoodsDet(url){
	this.Details(url)
}
GoodsDet.prototype.Details=function(url){
    	var address=window.location.search;
    	console.log(address)
    	var x=address.indexOf("=");
    	var gid=address.slice(x+1);
    	$(".header-top-menu ul li:first-child").html("<a href='#'>"+localStorage.getItem('username')+"</a>");
    	$.get(url,{goods_id:gid},function(result){
    		console.log(result);
    		 console.log(localStorage.getItem("token"));
    		var obj="";
    		if (result.data.length==2||result.data.length==1) {
    			obj=result.data[0]
    		}
    		console.log(obj)
    		var detail='';
    		//detail='<img src='"+obj.goods_thumb+"' alt=""/><p>"+obj.goods.name+"</p><p>￥+"+obj.price+"</p><span>"+obj.goods_desc+"</span>';
            // detail=`
    	    	// <div class="imging"><img src="${obj.goods_thumb}" width="300px" height="300px"></div>
    	    	// <div id="goods-message">
    	    	// <p class="goods-name">${obj.goods_name}</p>
    	    	// <p class="goods-price">${obj.price}</p>
    	    	// <span>${obj.goods_desc}</span>
    	    	// </div>
            // `;
			detail = $("<div><div class='imging'><img src="+obj.goods_thumb+" width=300px height=300px></div></div>");
			var goodsMessage = $("<div id='goods-message'><div>");
			var other = $("<div class='suggest'><p class='goods-name'>"+obj.goods_name+"</p><p class='goods-price'>"+obj.price+"</p><span>"+obj.goods_desc+"</span></div>");
			var trade=$("<div class='trading'><button id='emption' data-id="+obj.goods_id+">立即购买</button><button id='shopping'>加入购物车</button></div>")
			new AddControl(goodsMessage[0],10);
			detail.append(other);
			detail.append(goodsMessage);
			detail.append(trade);
    	    $(".goods-content-bor").html(detail)
    	    console.log(other)
    	})
    	$(document).on('click','#emption',function(){
    		var getid=$(this).data("id")
    		//console.log(getid)
    		window.open("html/balance.html?goods_id"+getid)
    	});
    	
    	$(document).on('click','#shopping',function(){
    		/*var url = "http://h6.duchengjiu.top/shop/api_cart.php?token="+localStorage.getItem("token");
		    var shopnum=$('#goods-message input').val();
		    var parm = {goods_id:gid,number:shopnum};
		    $.post(url,parm,function (result) {
		        console.log(result.message);
//		        console.log(result.data);
		    });*/
    		var shopnum=$('#goods-message input').val();
      		var parm = {goods_id:gid,number:shopnum};
    		$.post(PRODUCT_HOST+CART+'?token='+localStorage.getItem('token'),parm,function(result){
    			alert(result.message)
    		})
    	});
    	
    };
new GoodsDet(PRODUCT_HOST+GOODS);