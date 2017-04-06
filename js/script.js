
var arrayData = [];

document.getElementById('add').onclick=function addRow(){

    // Считываем значения с формы
    name = document.getElementById('name_input').value;
    value = document.getElementById('value_input').value;

    Obj = {
      name : name,
      value: value
    }

    arrayData.push(Obj)
    console.log(arrayData);
    // Находим нужную таблицу
    var tbody = document.getElementById('table').getElementsByTagName('TBODY')[0];

    // Создаем строку таблицы и добавляем ее
    var row = document.createElement("TR");
    tbody.appendChild(row);

    // Создаем ячейки в вышесозданной строке
    // и добавляем тх
    var td1 = document.createElement("TD");
    var td2 = document.createElement("TD");

    row.appendChild(td1);
    row.appendChild(td2);

    // Наполняем ячейки
    td1.innerHTML = name;
    td2.innerHTML = value;

};

function FindIndex() {
parent = document.getElementsByTagName('tbody');
parent.onclick = function (e) {
    var e = e || event;
    var target = e.target || e.srcElement;
    alert(parent.children.length);
    for(var i = 0; i < parent.children.length; i++) {
        if(parent.children[i] == target) return console.log(i);}}}

function highlight_Table_Rows(table_Id, hover_Class, click_Class,multiple) {
      var table = document.getElementById(table_Id);

      if (hover_Class) {
          var hover_Class_Reg = new RegExp("\\b"+hover_Class+"\\b");
          table.onmouseover = table.onmouseout = function(e) {
          if (!e) e = window.event;
          var elem = e.target || e.srcElement;
          while (!elem.tagName || !elem.tagName.match(/td|th|table/i))
          elem = elem.parentNode;

          if (elem.parentNode.tagName == 'TR' && elem.parentNode.parentNode.tagName == 'TBODY' && elem.parentNode.className !='first') {
           var row = elem.parentNode;
           if (!row.getAttribute('clicked_Row'))

           row.className = e.type=="mouseover"?row.className + " " + hover_Class:row.className.replace(hover_Class_Reg," ");
          }
         };
        }

      if (click_Class) table.onclick = function(e) {
       if (!e) e = window.event;
       var elem = e.target || e.srcElement;
       while (!elem.tagName || !elem.tagName.match(/td|th|table/i))
        elem = elem.parentNode;

       if (elem.parentNode.tagName == 'TR' && elem.parentNode.parentNode.tagName == 'TBODY' && elem.parentNode.className !='first') {
        var click_Class_Reg = new RegExp("\\b"+click_Class+"\\b");
        var row = elem.parentNode;

        if (row.getAttribute('clicked_Row')) {
         row.removeAttribute('clicked_Row');
         row.className = row.className.replace(click_Class_Reg, "");
         row.className += " "+hover_Class;
        }
        else {
         if (hover_Class) row.className = row.className.replace(hover_Class_Reg, "");
         row.className += " "+click_Class;
         row.setAttribute('clicked_Row', true);

         if (!multiple) {
   var lastRowI = table.getAttribute("last_Clicked_Row");
   if (lastRowI!==null && lastRowI!=='' && row.sectionRowIndex!=lastRowI) {
    var lastRow = table.tBodies[0].rows[lastRowI];
    lastRow.className = lastRow.className.replace(click_Class_Reg, "");
    lastRow.removeAttribute('clicked_Row');
   }
  }
  table.setAttribute("last_Clicked_Row", row.sectionRowIndex);
  FindIndex();
  }



       }
      };
      }
      highlight_Table_Rows('table', 'hover_Row', 'clicked_Row');




   //document.getElementById('delete').onclick=  function findElementIndex(){
