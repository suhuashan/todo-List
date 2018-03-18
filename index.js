
window.onload=function() {
    var todoForm = $('#todoForm'),
        todoInput = $('#todoInput'),
        todoCount = $('#todoCount'),
        todoList = $('#todoList'),
        finishedList = $('#finishedList'),
        checkbox = $('#checkbox'),
        count = $('.count'),
        deleteBtn = $('.deleteBtn'),
        todoListLength = $('#todoListLength'),
        finishedListLength = $('#finishedListLength');
    /*点击回车进行表单提交*/
    todoForm.submit(function () {
        var input_value = todoInput.val(),
            deleteBtn = '<button type="button" class="deleteBtn">x</button>',
            innerHtml = '<li>'+'&nbsp&nbsp&nbsp' +'<input id="checkbox" checked="true" type="checkbox"/>'+ '&nbsp;'+ '<input type="text" id="value"  value='+input_value+' >' + deleteBtn +'</li>';
        todoList.append(innerHtml);
        todoInput.val(" ");
        todoList.find('li #checkbox').attr("checked",false);
        countLength(todoList,todoListLength);
        SaveData('#todoList', 'mess1');
    });
    /*当(等待处理)todoList栏里需要进行修改并保存*/
    todoList.on('change','#value', function () {
        $(this).attr("value",this.value);
        SaveData('#todoList', 'mess1');
    });
    /*已经完成todoList栏里需要进行修改并保存*/
    finishedList.on('change','#value', function () {
        $(this).attr("value",this.value);
        SaveData('#finishedList', 'mess2');
    });
    /*对(等待处理)todoList的checkbox进行点击转移到(已经完成)finishedList*/
    todoList.on('click', '#checkbox', function () {
        var status = this.checked;
        if (status == true) {
            finishedList.append(this.parentNode);
        }
        countLength(todoList,todoListLength);
        countLength(finishedList,finishedListLength);
        SaveData('#finishedList', 'mess2');
        SaveData('#todoList', 'mess1');
    });
    /*对(已经完成)finishedList的checkbox进行点击转移到(等待处理)todoList*/
    finishedList.on('click', '#checkbox', function () {
        var status = this.checked;
        if (status == false) {
            todoList.append(this.parentNode);
        }
        countLength(todoList,todoListLength);
        countLength(finishedList,finishedListLength);
        SaveData('#todoList', 'mess1');
        SaveData('#finishedList', 'mess2');
    });
    /*对(等待处理)todoList下面的信息进行删除*/
    todoList.on('click', '.deleteBtn', function () {
        $(this).parent().remove();
        countLength(todoList,todoListLength);
        SaveData('#todoList', 'mess1');
    });
    /*对(已经完成)finishedList下面的信息进行删除*/
    finishedList.on('click', '.deleteBtn', function () {
        $(this).parent().remove();
        countLength(finishedList,finishedListLength);
        SaveData('#finishedList', 'mess2');
    });
    /*当页面进行刷新时，保留页面里checkbox的状态（是否被选中）*/
    function reset(){
        todoList.find('li #checkbox').attr("checked",false);
        finishedList.find('li #checkbox').attr("checked",true);
    }
    /*计算信息的条数*/
    function countLength(temp,length) {
        var len = temp.children().length;
        length.html(len);
    }
    /*以下是对信息进行本地存储，页面刷新后仍保留*/
    function SaveData(id, key) {
        var target = $(id),
            str = target.html();
        localStorage.setItem(key, str);
    }
    function LoadData(id, key) {
        var target = $(id),
            msg = localStorage.getItem(key);
        target.html(msg);
    }


    LoadData('#todoList', 'mess1');
    LoadData('#finishedList', 'mess2');
    reset();
    countLength(todoList,todoListLength);
    countLength(finishedList,finishedListLength);
};