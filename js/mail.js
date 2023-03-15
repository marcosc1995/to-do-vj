const list = document.getElementById("list");
const inputTexto = document.getElementById("inputTexto");
const inputBtn = document.getElementById("inputBtn");

// let arrTask = JSON.parse(localStorage.getItem("list"));

// function printList(arr) {
//   for (let i = 0; i < arr.length; i++) {
//     const listElement = document.createElement("li");
//     const btnDel = document.createElement("div");
//     btnDel.textContent = "X";
//     const note = document.createElement("p");
//     note.textContent = arr[i].note;
//     note.classList = "active";
//     listElement.append(note, btnDel);
//     list.append(listElement);
//     console.log(listElement);
//     btnDel.addEventListener("click", () => {
//       const newList = arr.filter((note) => {
//         note == arrTask[i].note;
//       });
//       console.log(newList);
//       localStorage.setItem("list", JSON.stringify(newList));

//       list.removeChild(listElement);
//       console.log(arrTask);
//     });
//   }
//   inputBtn.addEventListener("click", () => {
//     const listElement = document.createElement("li");
//     const btnDel = document.createElement("div");
//     const note = document.createElement("p");
//     note.textContent = inputTexto.value;
//     note.classList = "active";
//     arrTask.push({ note: inputTexto.value, status: true });
//     localStorage.setItem("list", JSON.stringify(arrTask));
//     btnDel.textContent = "X";
//     listElement.append(note, btnDel);
//     btnDel.addEventListener("click", () => {
//       list.removeChild(listElement);
//       console.log(arrTask);
//     });
//     note.addEventListener("click", () => {
//       if (note.classList.contains("active")) {
//         note.classList.add("end");
//         note.classList.remove("active");
//       } else {
//         note.classList.remove("end");
//         note.classList.add("active");
//       }
//       console.log("escucho");
//     });

//     list.append(listElement);
//   });
// }

// printList(arrTask);
let arrList = [];

function saveStorage(item, newArr) {
  localStorage.setItem(item, JSON.stringify(newArr));
}
function getStorange(item) {
  let resultLocalStonrange = JSON.parse(localStorage.getItem(item));
  return resultLocalStonrange;
}
//FUNCION PARA IMPRIMIR LISTA
function printList(item) {
  list.innerHTML = "";
  const arr = getStorange(item);
  for (let i = 0; i < arr.length; i++) {
    const listElement = document.createElement("li");
    const btnDel = document.createElement("div");
    btnDel.classList= 'btn'
    // btnDel.textContent = "X";
    btnDel.addEventListener("click", (e) => {
      //console.log(arrList)
      console.log(e)
      const text = e.target.parentNode.innerText
      console.log('test')
      console.log(text)
      let result = arr.filter(element => element.note !== text);
      arrList = result
      console.log(e.target.parentNode.innerText);
      // console.log(element.note)
      console.log(arrList);
      list.removeChild(e.target.parentElement);
      saveStorage('list', result)
      arrList = getStorange("list");
    });
    const note = document.createElement("p");
    note.textContent = arr[i].note;
    note.classList = "active";
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
  // const list = getStorange('list')
  // console.log(list);
  printList("list");
  inputBtn.addEventListener("click", () => {
    const nota = { note: inputTexto.value };
    //tests
    arrList.push(nota);
    saveStorage("list", arrList);
    printList("list");
  });
})();
