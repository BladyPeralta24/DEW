const searchForm=document.forms[0];
const addForm=document.forms["add-ex"];
const list = document.querySelector('#ex-list ul');

// delete exercises
list.addEventListener('click', function(e) {
  if(e.target.className == 'delete'){
    const li = e.target.parentElement;
    li.parentNode.removeChild(li); //removes the element
   //li.setAttribute ('style', 'display: none');//Hides the element 
  // li.style.display="none"; 
    //https://www.w3schools.com/jsref/prop_style_display.asp
  }
});

/* //Hide exercises
const hideBox = document.querySelector('#hide');
hideBox.addEventListener('change', function(){
  if(hideBox.checked){
    list.style.display = "none";
  } else {
    list.style.display = "initial";
  }
}); */

// add exercises
list.addEventListener('click', function(e) {
  if(e.target.className == 'add'){
      // create elements
    const value = addForm.querySelector('input[type="text"]').value;
    const li = document.createElement('li');
    const ExName = document.createElement('span');
    const imgName = document.createElement('img');
    const deleteBtn = document.createElement('span');
    const addBtn = document.createElement('span');

    // add text content
    ExName.textContent = value;
    imgName.textContent = value;
    imgName.src='./imagenes/carpeta.png';
    deleteBtn.textContent = '-';
    addBtn.textContent = '+';
    
      // add classes
    ExName.classList.add('name');
    imgName.classList.add('carpeta');
    deleteBtn.classList.add('delete');
    addBtn.classList.add('add');


    // append to DOM
    li.appendChild(imgName);
    li.appendChild(ExName);
    li.appendChild(deleteBtn);
    li.appendChild(addBtn);
    list.appendChild(li);
  }
});


/* // add exercises

addForm.querySelector("button").addEventListener('click', function(e){
 e.preventDefault();//https://www.w3schools.com/tags/att_button_type.asp

  // create elements
  const value = addForm.querySelector('input[type="text"]').value;
  const li = document.createElement('li');
  const ExName = document.createElement('span');
  const deleteBtn = document.createElement('span');
  const addBtn = document.createElement('span');

  // add text content
  ExName.textContent = value;
  deleteBtn.textContent = '-';
  addBtn.textContent = '+';
  
    // add classes
  ExName.classList.add('name');
  deleteBtn.classList.add('delete');
  addBtn.classList.add('add');


  // append to DOM
  li.appendChild(ExName);
  li.appendChild(deleteBtn);
  li.appendChild(addBtn);
  list.appendChild(li);
}); */

// filter exercises
const searchBar = document.forms['search-ex'].querySelector('input');
searchBar.addEventListener('keyup',(e)=>{// FAT ARROW FUNCTION
  const term = e.target.value.toLowerCase();// to insure matches
  const exercises = list.getElementsByTagName('li');
    
  Array.from(exercises).forEach(function (exer){ //FOR EACH instead of for loop
    const title = exer.firstElementChild.textContent;
    if(title.toLowerCase().indexOf(term) == -1){ //-1 means not present
      exer.style.display = 'none';
    } else {
      exer.style.display = 'block';
    }
  });
});