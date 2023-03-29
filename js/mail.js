const list = document.getElementById("list");
const inputTexto = document.getElementById("inputTexto");
const inputBtn = document.getElementById("inputBtn");

let arrList = [];

function saveStorage(item, newArr) {
  localStorage.setItem(item, JSON.stringify(newArr));
}
function getStorange(item) {
  if (localStorage.getItem(item)) {
    let resultLocalStonrange = JSON.parse(localStorage.getItem(item));
    return resultLocalStonrange;
  } else {
    localStorage.setItem(item, JSON.stringify([]));
    let resultLocalStonrange = JSON.parse(localStorage.getItem(item));
    return resultLocalStonrange;
  }
}

//FUNCION PARA IMPRIMIR LISTA
function printList(item) {
  list.innerHTML = "";
  const arr = getStorange(item);
  for (let i = 0; i < arr.length; i++) {
    const listElement = document.createElement("li");
    if (arr[i].status == "active") {
      listElement.classList = "unDone";
    }
    listElement.addEventListener("click", () => {
      listElement.classList.toggle("done");
      arr[i].status = "done";
    });
    const btnDel = document.createElement("div");
    btnDel.classList = "btn";
    btnDel.addEventListener("click", (e) => {
      console.log(e);
      const text = e.target.parentNode.innerText.trim();
      let result = arrList.filter((element) => element.note !== text);
      arrList = result;

      list.removeChild(e.target.parentElement);
      saveStorage("list", result);
    });
    const note = document.createElement("p");
    note.textContent = arr[i].note;

    listElement.append(note, btnDel);
    list.append(listElement);
    console.log(listElement);
  }
}
//LLAMADA A LA FUNCION DE IMPRIMIR LISTA
//printList('productos');
//FUNCION MANEJO DEL INPUT DE NOTAS
(function manageInput() {
  arrList = getStorange("list");
  console.log(arrList, "console de mI");

  // const list = getStorange('list')
  // console.log(list);
  printList("list");
  inputBtn.addEventListener("click", () => {
    arrList = getStorange("list");
    const nota = { note: inputTexto.value.trim() };
    //tests
    //console.log(arrList.filter((element) => element.note == nota.note))
    const filtered = arrList.filter((element) => element.note == nota.note)
    //console.log(filtered)
    if (filtered == false) {
      //console.log(filtered)
      arrList.push(nota);
      
    } else {
      alert('Nota repetida')
      console.log("nota repetida");
      //arrList.push(nota);
    }
    saveStorage("list", arrList);
    printList("list");
    inputTexto.value = "";
  });
})();
