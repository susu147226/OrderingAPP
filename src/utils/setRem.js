const setRem = () => {
    // 当前设备的宽度
    let x = document.documentElement.clientWidth;
    if (x > 750) {
        x = 750;
    }
    document.documentElement.style.fontSize = x / 375 * 100 + "px";

    // console.log(x);
}


//绑定2个dom事件，页面加载以后和窗口大小调整以后，都去触发rem的改变
document.addEventListener("DOMContentLoaded", setRem);
window.addEventListener("resize", setRem);