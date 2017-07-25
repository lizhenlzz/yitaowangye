(function(){

    function GoodItem(obj){
        var space=20;
        var colume=5;
        var width=(1200-space*(colume-1))/colume;
        this.des=obj;
        this.item=$("<div></div>")
        var name = $("<p class='good-name'>"+obj.goods_name+"</p>");
        var other = $("<p><img width='"+width+"px' src='"+obj.goods_thumb+"' alt=''></p><h3>￥"+obj.price+"</h3><p>"+obj.goods_desc+"</p>");
        this.item.append(name);
        this.item.append(other);
        this.item.css({
           width:width+"px",
           height:"384px",
           border:"2px solid #ff4411",
           "box-sizing":"border-box",
           float:"left",
           overflow: "hidden",
           position: "relative",
           "margin-left":"5px"
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
        },function(){
            $(".good-name").css("display","none")
        });
    }
   
    GoodItem.prototype.click=function(callback){
        this.item.on("click",this,callback)
        return this;
    };
    function Good(url,parm,superView,action){
        
        this.loadData(url,parm,superView,action);
    };
    Good.prototype.loadData=function(url,parm,superView,action){
        $.get(url,parm,function(result){
            if(result.code==0){
                this.showGoodsView(result.data,superView,action);
            };
        }.bind(this));
    };
    
    Good.prototype.showGoodsView=function(goods,superView,action){
        goods.forEach(function(data){
            superView.append(new GoodItem(data).click(action).item)
        })
    };
    
    window.Good=Good;
})();
