//Создаем массив объектов
var arrayData = [];

//Функция добавления строки в таблицу
function addRow(){

    //Находим нашу таблицу и добавляем ей строку
    var tbody = document.getElementById('table').getElementsByTagName('TBODY')[0];
    var row = document.createElement("TR");
        row.setAttribute('class','table_row');
    tbody.appendChild(row);

    //Создаем первую ячейку строки, устанавливаем параметры
    var td1 = document.createElement("TD");
    td1.setAttribute('contenteditable',true);
    td1.setAttribute('class','name_input');

    //Создаем вторую ячейку строки, устанавливаем параметры
    var td2 = document.createElement("TD");
    td2.setAttribute('contenteditable',true);
    td2.setAttribute('class','value_input');

    //Создаем третью ячейку строки и input, устанавливаем параметры для input, вставляем input в ячейку
    var td3 = document.createElement("TD");
        var input = document.createElement("input");
        input.setAttribute('class','btn');
        input.setAttribute('type','button');
        input.setAttribute('id','delete');
        input.setAttribute('value','Delete');
        input.setAttribute('onclick','deleteRow(this)');
    td3.appendChild(input);

    //Создаем четвертую ячейку строки и input*2, устанавливаем параметры для input*2, вставляем input*2 в ячейку
    var td4 = document.createElement("TD");
        var input = document.createElement("input");
        input.setAttribute('class','btn');
        input.setAttribute('type','button');
        input.setAttribute('id','up');
        input.setAttribute('value','↑');
        input.setAttribute('onclick','rowUp(this)');
    td4.appendChild(input);
        var input = document.createElement("input");
        input.setAttribute('class','btn');
        input.setAttribute('type','button');
        input.setAttribute('id','down');
        input.setAttribute('value','↓');
        input.setAttribute('onclick','rowDown(this)');
    td4.appendChild(input);

    //Создаем пятую ячейку строки
    var td5 = document.createElement("TD");

    //вставляем ячейки в строку
    row.appendChild(td1);
    row.appendChild(td2);
    row.appendChild(td3);
    row.appendChild(td4);
    row.appendChild(td5);
}

//Функция удаления строки из таблицы
function deleteRow(row){
    //Получаем индекс строки
    var index = row.parentNode.parentNode.rowIndex;
    //Удаляем строку
    document.getElementById('table').deleteRow(index);
    //Удаляем элемент в массиве объектов
    arrayData.splice(index-1,1);
}

//Функция перемещения строки наверх по таблице
function rowUp(row){
    //Получаем индекс строки
    var index = row.parentNode.parentNode.rowIndex;
    //Получаем текущую и предыдущую строки
    var rowCurrent = document.getElementsByTagName('tr')[index];
    var rowPrevios = document.getElementsByTagName('tr')[index-1];
    //Выход в случае отстутсвия одной из строк или равенства предыдущей строки шапке таблицы
    if((index - 1 == 0) || !(rowPrevios)||!(rowCurrent))
        return;
    //Меняем элементы местами
    rowPrevios.parentNode.insertBefore(rowCurrent,rowPrevios);
}

//Функция перемещения строки вниз по таблице
function rowDown(row){

    //Получаем индекс строки
    var index = row.parentNode.parentNode.rowIndex;
    //Получаем текущую и следующую строки
    var rowCurrent = document.getElementsByTagName('tr')[index];
    var rowNext = document.getElementsByTagName('tr')[index + 1];
    //Выход в случае отстутсвия одной из строк
    if(!(rowNext)||!(rowCurrent))
        return;
    //Меняем элементы местами
    rowCurrent.parentNode.insertBefore(rowNext,rowCurrent);
}

//Функция экспортирующая данные из таблицы в textarea, в формате JSON
function exportData() {
          //Получаем множество строк таблицы
          var tr = document.getElementsByClassName('table_row');
          //Обнуляем массив
          arrayData = [];
          //Обходим множество строк таблицы, записываем значения в ячейках в массив объектов
          for(var i = 0;i < tr.length;i++){
                var row = tr[i];
                var name = row.getElementsByClassName('name_input')[0].innerHTML;
                var value = row.getElementsByClassName('value_input')[0].innerHTML;

                Obj = {
                    name : name,
                    value: value
                }

                // Переводим в формат JSON
                var str = JSON.stringify(Obj);
                arrayData.push(str)
          }
          //Выводим массив в textarea
          document.getElementById('export').value = arrayData;
}

//Функция импортирующая данные из textarea в таблицу
function importData() {
          var table = document.getElementById('table');
          var index = table.rows.length;

          //Удаляем все строки таблицы которые есть
          while((index-1) != 0){
              document.getElementById('table').deleteRow(index-1);
              index = index - 1;
          }
          //Разбиваем строку на массив
          var valueJSON = document.getElementById('export').value;
          var value = valueJSON.replace(/},/g,'} ');
          var arr = value.split(' ');

          //Вызываем в цикле функцию addRow() и прописываем в ячейки таблицы name value
          for(var i=0;i<arr.length;i++){
                addRow();
                var td1 = document.getElementsByClassName('name_input')[i];
                var td2 = document.getElementsByClassName('value_input')[i];
                var queue = JSON.parse(arr[i]);
                td1.innerHTML = queue.name;
                td2.innerHTML = queue.value;
          }
}
