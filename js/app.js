/**
 * Created by Administrator on 2017/7/26.
 */
/*
* 有界面
* 点击加减（事件）  更改显示的数字  更数字需要给 使用插件的地方改后的
* 更新界面
*
* */

function AddControl(superEle,maxNum) {
    this.superEle = superEle;
    this.maxNum = maxNum;
    this.curNum = 1;
    this.createView();
}

AddControl.prototype.createView = function () {
    var container = document.createElement("div");
    var self = this;
    var datas = [{type:"button",content:"-",action:self.lessAction()},{type:"input",content:"1",action:self.changeAction()},{type:"button",content:"+",action:self.moreAction()}];

    datas.forEach(function (info) {
        var ele = document.createElement(info.type);
        if (info.type==="input"){
            self.showNumView = ele;
        }
        info.type==="input"?ele.value = info.content:ele.textContent = info.content;
        info.type==="input"?ele.onblur = info.action:ele.onclick = info.action;
        container.appendChild(ele);
    });
    //console.log(container)
    this.superEle.appendChild(container);
    return this;
};

AddControl.prototype.lessAction = function () {
    var self = this;
    return function () {
        --self.curNum;
        self.curNum = self.curNum<1?1:self.curNum;
        self.updateUI();
    }
};

AddControl.prototype.moreAction = function () {
    var self = this;
    return function () {
        ++self.curNum;
        self.curNum = self.curNum>self.maxNum?self.maxNum:self.curNum;
        self.updateUI();
    }
};

AddControl.prototype.changeAction = function () {

    var self = this;
    return function (event) {
        self.curNum = event.currentTarget.value;
        self.curNum = self.curNum>self.maxNum?self.maxNum:self.curNum;
        self.curNum = self.curNum<1?1:self.curNum;
        self.updateUI();
    }

};

AddControl.prototype.updateUI = function () {

    this.showNumView.value = this.curNum;

};


new AddControl(document.querySelector("#goods-message"),10);

// document.querySelector(".ddd").onclick = function () {
//     console.log(this);
//     alert("111");
// };

// function action () {
//     console.log(this);
//     return function () {
//         console.log(this);
//     }
// }
// document.querySelector(".ddd").onclick = action();



