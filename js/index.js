//1.获取元素
var header = document.getElementById('header');
var btnList = document.getElementsByTagName('a');
var shopList = document.getElementById('shopList');
var data = null;

//2.通过AJAX获取要操作的数据
var xhr = new XMLHttpRequest();
xhr.open('get', 'data/product.json', false);
xhr.onreadystatechange = function () {
    if (xhr.status == 200 && xhr.readyState == 4) {
        data = JSON.parse(xhr.responseText)
    }
};
xhr.send();

//3.将数据绑定到页面当中
function bindHtml() {
    var str = '';
    data.forEach(item => {
        str += `<li>
            <img src="${item.img}" alt="">
            <p>${item.title}</p>
            <p class="hot">热度${item.hot}</p>
            <del>$9999</del>
            <span>￥${item.price}</span>
            <p class="time">上架时间：${item.time}</p>
        </li>`
    });
    shopList.innerHTML = str;
}

bindHtml();

//4.绑定点击事件，实现sort排序
for (var i = 0; i < btnList.length; i++) {
    btnList[i].flg = -1;
    if (i == 2) {
        btnList[i].onclick = function () {
            this.flg*=-1;
            data.sort((a, b) => {
                return (a.price - b.price)*this.flg
            });
            bindHtml()
        }

    } else if (i == 1) {
        btnList[i].onclick = function () {
            this.flg*=-1;
            data.sort((a, b) => {
                return (a.hot - b.hot)*this.flg
            });
            bindHtml()
        }
    }else {
        btnList[i].onclick = function () {
            this.flg*=-1;
            data.sort((a,b)=>{
                return (new Date(a.time)-new Date(b.time))*this.flg
            });
            bindHtml()
        }
    }
}



