(function(){

    function GoodItem(obj){
        var space=20;
        var colume=5;
        var width=(1200-space*(colume-1))/colume;
        this.des=obj;
        this.item=$("<div class='goods-box' data-id='"+obj.goods_id+"'></div>")
        var name = $("<p class='good-name'>"+obj.goods_name+"</p>");
        var other = $("<p><img width='"+width+"px' src='"+obj.goods_thumb+"' alt=''></p><h3>￥"+obj.price+"</h3><p>"+obj.goods_desc+"</p>");
        this.item.append(name);
        this.item.append(other);
        this.item.css({
           width:width+"px",
           height:"384px",
           "border-top":"2px solid #ff4411",
           "box-sizing":"border-box",

           overflow: "hidden",
           position: "relative",

           "margin-bottom":"2px"
        })
        name.css({
           position: "absolute",
           width:width+"px",
           height: "60px",
           "background":"#333",
           color:"#999",
           "opacity":0.5,
           "line-height": "20px",
           top:"0",
           left:"0",
           display: "none",
        })
        this.item.hover(function(){
            $(this).children().slideDown(200,"swing")
            $(this).css({"border":"2px solid #ff4411","box-sizing":"border-box"})
        },function(){
            $(".good-name").css("display","none")
            $(this).css({"border-left":"none","border-right":"none","border-bottom":"none"})
        });
    }
   
    GoodItem.prototype.click=function(callback){
        this.item.on("click",this,callback)
        return this;
        console.log(this)
    };
    function Good(url,parm,superView,action){
        this.loadData(url,parm,superView,action);
        this.goodsDetails(url);
    };
    //加载数据
    Good.prototype.loadData=function(url,parm,superView,action){
        $.get(url,parm,function(result){
        	//console.log(result)
            //如果加载成功，执行这个showGoodsView方法
            if(result.code==0){
                this.showGoodsView(result.data,superView,action);
            };
        }.bind(this));
    };
    //
    Good.prototype.showGoodsView=function(goods,superView,action){
    	//console.log(goods)
    	//便利商品数组
        goods.forEach(function(data){
            superView.append(new GoodItem(data).click(action).item)
        })
    };
    Good.prototype.goodsDetails=function(url){
    	console.log($(".goods-box"))
    	//当点击某件商品时，跳转到这个商品的详情页面
    	$(document).on('click','.goods-box',function(){
    		var getid=$(this).data("id")//当前的商品id
    		//console.log(getid)
    		window.open("xiangqing.html?goods_id="+getid)//跳转
    	});
    }
    
    window.Good=Good;
})();
