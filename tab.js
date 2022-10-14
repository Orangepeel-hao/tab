var that
var content=''
class Tab{
    constructor(id){
        that=this
        this.main=document.querySelector(id)
        this.add=this.main.querySelector('.add')
        this.ul=this.main.querySelector('ul')
        this.tabBody=this.main.querySelector('.tabBody')
        this.init()
    }
    init(){
        this.update()
        this.add.onclick=this.addTab
        for(var i=0;i<this.lis.length;i++){
            this.lis[i].index=i
            this.lis[i].onclick=this.toogleTab
            this.close[i].onclick=this.closeTab
            this.spans[i].ondblclick=this.editTab
            this.sections[i].ondblclick=this.editTab
        }
    }
    update(){
        this.lis=this.main.querySelectorAll('li')
        this.sections=this.main.querySelectorAll('section')
        this.close=this.main.querySelectorAll('.close')
        this.spans=this.main.querySelectorAll('.tabHead ul li span:first-child')
    }
    toogleTab(){
        that.clearClass()
        that.lis[this.index].className='liActive'
        that.sections[this.index].className='secActive'
    }
    clearClass(){
        for(let i=0;i<this.lis.length;i++){
            this.lis[i].className='liDisactive'
            this.sections[i].className='secDisactive'
        }
    }
    addTab(){
        console.log(this);
        that.clearClass()
        var li=`<li class="liActive"><span>新选项卡</span><div class="close">x</div></li>`
        var section=`<section class="secActive">新选项卡</section>`
        that.ul.insertAdjacentHTML('beforeend',li)
        that.tabBody.insertAdjacentHTML('beforeend',section)
        that.init()
    }
    closeTab(e){
        e.stopPropagation()
        var index=this.parentNode.index
        console.log(index);
        that.lis[index].remove()
        that.sections[index].remove()
        that.init()
        if(document.querySelector('.liActive'))return
        that.lis[--index]&&that.lis[index].click()
    }
    editTab(){
        console.log('this:',this);
        window.Selection?window.getSelection().removeAllRanges():document.selection.empty()
        content==''?content=this.innerHTML:content='未命名'
        this.innerHTML=`<input type="text" />`
        var input =this.children[0]
        input.value=content
        input.select()
        input.onblur=function(){
            this.parentNode.innerHTML=input.value
        }    
        input.onkeyup=function(e){
            e.keyCode==13?this.blur():console.log('keyCode undefined');
        }
    }
}
new Tab('.tab')