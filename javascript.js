window.addEventListener('load', start);

var globalNames = ['um', 'dois', 'três', 'quatro'];
var inputName = null;
var isEditing = false;
var currentIndex =  null;


function start() {
  inputName = document.querySelector('#inputName');

  preventFormSubmit();
  activateInput();
  render();
}

function preventFormSubmit() {
  function handleFormSubmit(event) {
    event.preventDefault();
  }
  var form = document.querySelector('form');
  form.addEventListener('submit', handleFormSubmit);
}

function activateInput() {
  function insertName(newName) {
    globalNames.push(newName);
    render();
  }

  function updateName(newName){
    globalNames[currentIndex] = newName;
    render();
  }
  
  function handleTyping(event) {
    var hasText = !!event.target.value && event.target.value.trim() !== '' ;

    if (!hasText){
      clearInput();
      return;
    }

    if (event.key === 'Enter') {
      if (isEditing) {
        updateName(event.target.value);
      }else{
        var typedName = event.target.value;
        insertName(typedName);
      }
      isEditing = false;
      clearInput();
    }
  }
  inputName.focus();
  inputName.addEventListener('keyup', handleTyping);
}




function render() {
  function createDeleteButton(index){
    function deleteName(){
      globalNames.splice(index, 1 );
      render();
    }
    var button = document.createElement('button');
    button.textContent = 'x';
    button.classList.add('deleteButton');
    button .addEventListener('click',deleteName);
    return button;
  }

  function creatSpan(name, index){
    function editItem(){
      inputName.value = name;
      inputName.focus();
      isEditing = true;
      currentIndex = index;
    }
    var span = document.createElement('span');
    span.classList.add('clickable');
    span.textContent = name;
    span.addEventListener('click',editItem);
    return span;
  }

  var divNames = document.querySelector('#names');
  var ul = document.createElement('ul');
  divNames.innerHTML ='';

  for (var i = 0; i < globalNames.length; i++) {
    var currentName = globalNames[i];

    var li = document.createElement('li');
    var button = createDeleteButton(i);

    var span = creatSpan(currentName,i);


    li.appendChild(button);
    li.appendChild(span);
    ul.appendChild(li);
  }

  divNames.appendChild(ul);
  clearInput();
}

function  clearInput(){
  inputName.value = '';
  inputName.focus();

}