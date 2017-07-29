//为了防止其它的插件与jquery重名 可以通过noConflict找到jquery对象重新更改表示jquery的符号
var $=jQuery.noConflict();
(function(){
	
	function Login(success){
		this.shouLogin(success);
	}
	//登录界面
	Login.prototype.shouLogin=function(success){
		var loginContainer=$("<div class='loginContainer'></div>")
	    var closeButton=$("<p>关闭</p>")
	    var usernameInput=$("<p><input type='text' placeholder='用户名'></p>")
	    var passwordInput=$("<p><input type='password' placeholder='密码'></p>")
	    var loginButton=$("<p><button>登录</button></p>")
	    loginContainer.css({
	    	width:"400px",
	    	height:"300px",
	    	"background-color":"#912020",
	    	"border":"5px solid #ffd42e",
	    	"position":"absolute",
	    	"top":"50%",
	    	"left":"50%",
	    	"box-sizing":"border-box",
	    	"margin":"-150px -200px"
	    });
	    var inputCSS={
	    	padding:"40px 0 0px 0",
	    	margin:"0 auto",
	    	width:"300px",
	    	"text-align":"center"
	    };
	    usernameInput.css(inputCSS);
	    passwordInput.css(inputCSS);
	    loginButton.css(inputCSS);
	    
	    closeButton.css({
	    	"float":"right",
	    	"color":"white",
	    	"padding":"5px",
	    });
	    //点击关闭按钮，移除登录界面
	    closeButton.click(function(){
	    	loginContainer.fadeOut(600,function(){
	    		loginContainer.remove();
	    	});
	    });
	    //登录
	    loginButton.click(function(){
	    	$.post(PRODUCT_HOST+LOGIN,{status:"login",username:usernameInput.children().val(),password:passwordInput.children().val()},function(result){
	    			//alert("login success");
	    			console.log(result)
	    			//如果登录成功
	    			if (result.code==0) {
	    				loginContainer.fadeOut(600,function(){
	    		            loginContainer.remove();//移除登录界面
	    		            success(result.data);//执行外面传入的方法
	    	            });
	    			}else{
	    				alert(result.message);//否则提示失败原因
	    			}
	    			//登录后将用户的用户名、token、id下载到当地
	    			localStorage.setItem("username",result.data.username);
                    localStorage.setItem("token",result.data.token);
                    localStorage.setItem("user_id",result.data.user_id);
	    		}
	    	);
	    });
	    loginContainer.append(closeButton);
	    loginContainer.append(usernameInput);
	    loginContainer.append(passwordInput);
	    loginContainer.append(loginButton);
	    
	    
	    $(document.body).append(loginContainer)
	};
	
	
	window.Login=Login;
})();
