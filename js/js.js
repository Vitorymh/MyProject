var inputDom = document.querySelector("#write");
var todoList = document.querySelector(".todo .clist");
var doneList = document.querySelector(".done .clist");
//获取两个显示num的div
var todoNumSpan = document.querySelector(".todo h1 .num");
var doneNumSpan = document.querySelector(".done h1 .num");
var main = document.querySelector(".main")


//全局数组，每次都是通过它进行添加和删除
//判断本地存储里是否存在这个数组对象，存在就把这个对象里的数据传进来，否则赋值为空
//										将json格式的字符串转换为数组对象
var dataList = localStorage.dataList?JSON.parse(localStorage.dataList):[];
renderList();

inputDom.onkeypress = function(e){
	if(e.key=="Enter"&&inputDom.value!=""){
		//往dataList数据里添加待办事项数据
		var data = {
			content:inputDom.value,
			type:"todo"
		}
		dataList.push(data)
		//根据数据渲染列表
		renderList()
	}
}

function renderList(){
	//每次渲染若已存在一个数组对象，则把数组对象转换为json格式的字符串
	//赋个新的数值给本地存储，保证实时的数据
	localStorage.dataList = JSON.stringify(dataList)
	todoList.innerHTML="";
	doneList.innerHTML="";
	//一开始数字都设置0
	var todoNum = 0;
	var doneNum = 0;
	//每次循环进行添加一个数据,并且把这个数据加到对应的列表里
	dataList.forEach(function(item,index){
		var newdiv = document.createElement("div");
		newdiv.className = "item";
		//如果item项目里面的类型是todo正在进行
		if(item.type=="todo"){
			//对应的类型数字对应加1
			todoNum++;
			newdiv.innerHTML = `
				<span class="checkbox">
					<input type="checkbox" name="check"  value="" data-index="${index}"/>
				</span>			
				<span class="content">
					${item.content}
				</span>
				<span class="delete" data-index=${index}></span>
			`;
			todoList.appendChild(newdiv);
		}else{
			doneNum++;
			newdiv.innerHTML = `
				<span class="checkbox">
					<input type="checkbox" name="check" checked="checked"  value=""/>
				</span>			
				<span class="content">
					${item.content}
				</span>
				<span class="delete" data-index=${index}></span>
			`;
			doneList.appendChild(newdiv);
		}
	})
	//把最终的数字添加显示在页面上
		todoNumSpan.innerHTML = todoNum;
		doneNumSpan.innerHTML = doneNum;
}


todoList.onchange = function(e){
	var index = e.target.dataset.index;
	dataList[index].type="done";
	renderList();
	
}

//删除待办事项		当在main这个大div里发生点击事件
main.addEventListener("click",function(e){
	//如果点击的目标类名为delete
	if(e.target.className=="delete"){
		console.log(e)
		var index = e.target.dataset.index;
		dataList.splice(index,1)
		renderList()
	}
})
