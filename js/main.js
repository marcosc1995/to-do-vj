const list = document.getElementById("list");
const inputTexto = document.getElementById("inputTexto");
const inputBtn = document.getElementById("inputBtn");
const form = document.getElementById("form");
const formTrigger = document.getElementById("formTrigger");
const formAddContainer = document.getElementById("formAddContainer");
formAddContainer.style.visibility = "hidden"; // need to read the property in the DOM
const formCloseBtn = document.getElementById("formCloseBtn");
let arrList = [];

// GENERAL FUNCTIONS
function toggleVisibility(element) {
  if (element.style.visibility === "hidden") {
    console.log("Test toggle function when is not visible");
    element.style.visibility = "visible";
    element.style.opacity = '100%'
  } else {
    console.log("Test toggle function when IS visible");
    element.style.visibility = "hidden";
    element.style.opacity = '0'
  }
}
//-------------------------------------------------------------

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
//FORM TRIGGER & CLOSE
formTrigger.addEventListener("click", () => {
  console.log("event listened");
  toggleVisibility(formAddContainer);
});
//FORM CLOSE
formCloseBtn.addEventListener("click", () => {
  toggleVisibility(formAddContainer);
});
//FUNCION PARA IMPRIMIR LISTA
function printList(item) {
  list.innerHTML = "";
  const arr = getStorange(item);
  for (let i = 0; i < arr.length; i++) {
    const listElement = document.createElement("li");
    if (arr[i].status == "active") {
      listElement.classList = "unDone";
    } else {
      listElement.classList = "done";
    }
    const note = document.createElement("div");
    note.classList.add("note-text");
    note.addEventListener("click", () => {
      if (arr[i].status == "active") {
        listElement.classList.toggle("done");
        arr[i].status = "done";
      } else {
        listElement.classList.toggle("done");
        arr[i].status = "active";
      }

      console.log(arr[i]);
      saveStorage("list", arr);
      arrList = arr;
      printList(item);
    });
    // DELETE BUTTON OF THE LIST ITEM
    const btnDel = document.createElement('button');
    btnDel.textContent = 'X'
    btnDel.classList = "btn";
    btnDel.addEventListener("click", (e) => {
      console.log(e);
      const text = e.target.parentNode.innerText.trim();
      let result = arrList.filter((element) => element.note !== text);
      arrList = result;

      list.removeChild(e.target.parentElement);
      saveStorage("list", result);
      printList(item);
    });
    //btnDel.textContent = 'x'

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
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    toggleVisibility(formAddContainer);

    arrList = getStorange("list");
    const nota = { note: inputTexto.value.trim(), status: "active" };
    //tests
    //console.log(arrList.filter((element) => element.note == nota.note))
    const filtered = arrList.filter((element) => element.note == nota.note);
    //console.log(filtered)
    if (filtered == false) {
      //console.log(filtered)
      arrList.push(nota);
    } else {
      alert("Nota repetida");
      console.log("nota repetida");
      //arrList.push(nota);
    }
    saveStorage("list", arrList);
    printList("list");
    inputTexto.value = "";
  });
})();
