//$(document).on("click",".click-search",function(){
//    var keywords=$(".key-content").val()
//    window.open("html/search.html?search_text="+keywords)
//    console.log(keywords)
//})
function SearchGood(url){
    this.SearchGoodMes(url)
}
//搜索商品
SearchGood.prototype.SearchGoodMes=function(url){
    var add=window.location.search//获取地址栏的参数部分
    console.log(add)
    var b=add.indexOf("=")
    var gds=add.slice(b+1)
    var wupin=decodeURIComponent(gds)
    console.log(wupin)//获取id
    //搜索商品结果的界面
    $.get(url,{search_text:wupin,token:localStorage.getItem("token")},function(result){
      // console.log(result)
       var bjt=result.data
      // console.log(bjt)
      //创建搜索的商品界面
       bjt.forEach(function(bje){
          var searchdetail=$("<div><div><img src='"+bje.goods_thumb+"'/></div></div>")
          var introduce=$("<div><p>"+bje.goods_name+"</p><p>"+bje.goods_desc+"</p><p>"+bje.price+"</p></div>")
          searchdetail.append(introduce)
          $("body").append(searchdetail)
       })
    })
}
new SearchGood(PRODUCT_HOST+GOODS)
