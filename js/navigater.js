var $ = jQuery.noConflict();
(function() {
    //现在导航上面的每一个按钮
    function NavigaterItem(obj){
        var obj=obj||{};
        this.name=obj.cat_name;
        this.id=obj.cat_id;
        this.item=$("<li>"+this.name+"</li>")
    }
	NavigaterItem.prototype.itemClick=function(callback){
	    this.item.on("click",this,callback);
	    return this;
	};
//	function JQuery(selector){
//	    this.dom=document.querySelector(selector)
//	}
//	JQuery.prototype.on=function(type,parm,fun){
//	    this.dom.addEventListener(type,function(event){
//	        event.data=parm;
//	        fun(event);
//	    })
//	};
	
	function Navigater() {
        
	}
	//点击导航按钮的时候 需要知道 点击按钮的商品类型id
	Navigater.prototype.createView = function(url,superView,callback) {
        $.get(url,function(result){
       // result为服务端返回的数据
           // console.log(result)
            if(result.code==0){
               result.data.forEach(function(obj){
                   //创建导航列表
                   superView.append(new NavigaterItem(obj).itemClick(callback).item);
               });
            };
        });
        return this;
	};
	//当点击搜索按钮
	$(document).on("click",".click-search",function(){
      var keywords=$(".key-content").val()//传递的参数的值也就是搜索内容
      window.open("html/search.html?search_text="+keywords) //当点击搜索按钮时跳转到搜索的物品界面
      console.log(keywords)
    })
	
	window.Navigater = Navigater;
})();