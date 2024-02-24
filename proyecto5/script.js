// Selecting the search form, add form, and list elements from the HTML
const searchForm = document.forms[0];
const addForm = document.forms["add-ex"];
const list = document.querySelector('#ex-list ul');

// Event listener for deleting exercises
list.addEventListener('click', function(e) {
  if (e.target.className == 'delete') {
    const li = e.target.parentElement;

    // Check if it's a folder and has elements
    if (li.querySelector('ul') && li.querySelector('ul').childElementCount > 0) {
      console.log('The folder cannot be deleted because it contains elements. Empty the folder.');
    } else {
      // Remove the folder only if it is empty
      li.parentNode.removeChild(li);
    }
  }
});

// Event listener for adding exercises
list.addEventListener('click', function(e) {
  if (e.target.className == 'add') {
    // Get the entered value
    const value = addForm.querySelector('input[type="text"]').value.trim();

    // Check for duplicates and empty value
    if (value != '' && !isDuplicate(value, e.target.closest('li'))) {
      // Create elements
      const ul = document.createElement('ul');
      const li = document.createElement('li');
      const ExName = document.createElement('span');
      const imgName = document.createElement('img');
      const deleteBtn = document.createElement('span');
      const addBtn = document.createElement('span');
      const checkbox = document.createElement('input');

      // Add text content
      ExName.textContent = value;

      // Determine if it's a document or a folder based on the presence of a dot in the value
      if (value.includes('.')) {
        // It's a document, set properties accordingly
        imgName.src = './imagenes/documentos.png';
        imgName.className = 'documento';
        imgName.alt = '';
        deleteBtn.textContent = '-';
        addBtn.style.display = 'none';
        checkbox.style.display = 'none';
      } else {
        // It's a folder, set properties accordingly
        imgName.src = './imagenes/carpeta.png';
        imgName.className = 'carpeta';
        imgName.alt = '';
        deleteBtn.textContent = '-';
        addBtn.textContent = '+';
        checkbox.type = 'checkbox';
        checkbox.checked = true; // Checked by default
        checkbox.addEventListener('change', function() {
          toggleFolderContent(this, li);
        });
      }

      imgName.textContent = value;

      // Add classes
      ExName.classList.add('name');
      deleteBtn.classList.add('delete');
      addBtn.classList.add('add');

      // Append to DOM
      li.appendChild(imgName);
      li.appendChild(ExName);
      li.appendChild(deleteBtn);
      li.appendChild(addBtn);
      li.appendChild(checkbox);
      li.appendChild(ul);

      // Clear the input value
      addForm.querySelector('input[type="text"]').value = '';

      // Add the new element to the list
      const parentLi = e.target.closest('li');
      const level = parseInt(parentLi.getAttribute('data-level')) + 1;
      li.setAttribute('data-level', level);
      parentLi.querySelector('ul').appendChild(li);
    } else if (value === '') {
      console.log('The entered value is empty. You need to enter a value in the input.');
    } else {
      console.log('A folder or document with that name already exists in the same folder. Change the name.');
    }
  }
});

let exerciseNames = {};

function isDuplicate(value, parentLi) {
  const level = parentLi.getAttribute('data-level');

  // If this level has not been seen before, initialize it
  if (!exerciseNames[level]) {
    exerciseNames[level] = new Set();
  }

  // Convert to lowercase for case-insensitive comparison
  value = value.toLowerCase();

  // Check if the value is a duplicate
  if (exerciseNames[level].has(value)) {
    return true; // Duplicate element with the same name in the same folder
  } else {
    // If it's not a duplicate, add it to the set of names for this level
    exerciseNames[level].add(value);
    return false; // No duplicates in the same folder
  }
}

// Function to handle the change of the checkbox
function toggleFolderContent(checkbox, folder) {
  const ul = folder.querySelector('ul');
  if (ul) {
    ul.style.display = checkbox.checked ? 'block' : 'none';
  }
}

// Reference to the root folder element
const rootFolder = document.querySelector('#ex-list li[data-level="0"]');

// Event listener for the change of the checkbox in the root folder
const rootCheckbox = document.getElementById('rootCheckbox');
rootCheckbox.addEventListener('change', function() {
  toggleFolderContent(this, rootFolder);
});

// Event listener for filtering exercises based on search input
const searchBar = document.forms['search-ex'].querySelector('input');

searchBar.addEventListener('keydown', function(e) {
  const term = e.target.value.toLowerCase();
  const exercises = list.getElementsByTagName('li');
  const matchingElements = [];

  Array.from(exercises).forEach(function(exer) {
    const title = exer.querySelector('.name').textContent.toLowerCase();
    const isMatch = title.includes(term);
    exer.style.display = isMatch ? 'block' : 'none';

    if (isMatch) {
      matchingElements.push(title);
    }

    // Also show the parents of matching elements
    let parent = exer.parentNode.parentNode;
    while (parent && parent.tagName === 'LI') {
      parent.style.display = 'block';
      parent = parent.parentNode.parentNode;
    }
  });

  // Autocomplete if there is a single match and TAB is pressed
  if (matchingElements.length === 1 && e.key === 'Tab') {
    e.preventDefault(); // Prevent the default TAB behavior
    searchBar.value = matchingElements[0];
  }
});

addForm.addEventListener('submit', function(e) {
  e.preventDefault();
});

searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
});
