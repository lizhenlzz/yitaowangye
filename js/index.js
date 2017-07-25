function init(){
	$(".header-top-login").click(function(){
		new Login(function(user){
		    $(".header-top-menu ul li:first-child").html("<a href='#'>"+user.username+"</a>");
	    });
	});
	
	
	//导航
	new Navigater().createView(PRODUCT_HOST+PRODUCT_TYPE,$(".main-nav-container"),function(event){
	    console.log(event);
	});

    //轮播
    new corouselView.Corouse("#left-course",[{imagePath:"img/image/header/hot2.jpg"},{imagePath:"img/image/header/hot1.jpg"}],200,400)
    .putSuperView().startTimer(3000)

    new corouselView.Corouse("#center-course",[{imagePath:"img/image/header/TB1BunHRVXXXXagaXXXXXXXXXXX-750-340.jpg"},{imagePath:"img/image/header/TB1jT3mRVXXXXXnXXXXXXXXXXXX-750-340.jpg"}],800,400)
    .putSuperView().createControlButton().startTimer(2000)
    
    new corouselView.Corouse("#right-course",[{imagePath:"img/image/header/hot2.jpg"},{imagePath:"img/image/header/hot1.jpg"}],200,400)
    .putSuperView().startTimer(3000)

    //url parm
    new Good(PRODUCT_HOST+GOODS,null,$(".goods-container"),function(event){
        console.log(event.data)
    });

};

init();