function add(){

  alert(123)
    var row = document.createElement("TR")
    var td1 = document.createElement("TD")
    td1.appendChild(  document.getElementById('name_input').value())
    var td2 = document.createElement("TD")
    td2.appendChild (  document.getElementById('value_input').value())
    row.appendChild(td1);
    row.appendChild(td2);
    table.appendChild(row);
}
