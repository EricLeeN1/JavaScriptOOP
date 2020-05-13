let that = null;
// 声明对象
class Tab {
    constructor(id) {
        // 获取元素
        that = this;
        this.main = document.querySelector(id);
        this.add = this.main.querySelector('.nav-add');
        this.ul = this.main.querySelector('.first-nav ul:first-child');
        this.tabPane = this.main.querySelector('.tab-pane');
        this.init();
    }
    // 初始化操作，初始化操作让相关的元素绑定事件
    init() {
        this.updateNode();
        this.add.onclick = this.addTab;
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].index = i;
            this.lis[i].onclick = this.toggleTab;
            this.remove[i].onclick = this.deleteTab;
            this.spans[i].ondblclick = this.editTab;
            this.sections[i].ondblclick = this.editTab;
        }
    }
    // 1、切换功能
    toggleTab() {
        that.clearClass();
        this.className = 'active';
        that.sections[this.index].className = 'active';
    }
    // 2、添加功能
    addTab() {
        that.clearClass();
        // （1）创建li元素和section元素
        let li = `<li class="active"><span>测试${that.lis.length + 1}</span><span class="close">X</span></li>`;
        let section = `<section class="active">测试${that.lis.length + 1}</section>`;
        // （2）把这两个元素追加到对应的父元素里面
        that.ul.insertAdjacentHTML('beforeend', li);
        that.tabPane.insertAdjacentHTML('beforeend', section);
        that.init();
    }
    // 3、删除功能
    deleteTab(e) {
        e.stopPropagation(); // 阻止冒泡
        let index = this.parentNode.index;
        console.log(index);
        // 根据索引号删除对应的li和section
        that.lis[index].remove();
        that.sections[index].remove();
        that.init();
        // 当我们删除的不是选定状态的li的时候，原来的选定状态的li保持不变。
        if (document.querySelector('.first-nav ul .active')) return;
        // 当我们删除了选中状态的li的时候，让它的前一个li处于选中状态
        index--;
        // 手动调用点击事件,不需要鼠标触发
        that.lis[index] && that.lis[index].click();
    }
    // 4、修改功能
    editTab(e) {
        let str = this.innerHTML;
        window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
        this.innerHTML = `<input type="text" value="${str}"/>`;
        const input = this.children[0];
        input.select();// 文本框里面的值给span
        input.onblur = function () {
            this.parentNode.innerHTML = this.value;
        }
        // 按下回车也可以把文本框里面的值给span
        input.onkeyup = function (e) {
            if (e.keyCode === 13) {
                this.blur();
            }
        }
    }
    clearClass() {
        for (let i = 0; i < this.lis.length; i++) {
            this.lis[i].className = '';
            this.sections[i].className = '';
        }
    }
    updateNode() {
        this.remove = this.main.querySelectorAll('.close');
        this.lis = this.main.querySelectorAll('li');
        this.sections = this.main.querySelectorAll('section');
        this.spans = this.main.querySelectorAll('.first-nav li span:first-child');
    }
}

new Tab("#tab");