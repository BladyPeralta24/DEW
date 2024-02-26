// Selecting the search form, add form, and list elements from the HTML
const searchForm = document.forms[0];
const addForm = document.forms["add-ex"];
const $list = $('#ex-list ul');

// Event listener for deleting exercises
$list.on('click', function(e) {
  if ($(e.target).hasClass('delete')) {
    const $li = $(e.target).parent();

    // Check if it's a folder and has elements
    if ($li.find('ul').length > 0 && $li.find('ul').children().length > 0) {
      console.log('The folder cannot be deleted because it contains elements. Empty the folder.');
    } else {
      // Remove the folder only if it is empty
      $li.remove();
    }
  }
});

// Event listener for adding exercises
// Event listener for adding exercises
$list.on('click', function(e) {
  if ($(e.target).hasClass('add')) {
    // Get the entered value
    const value = $('input[type="text"]', addForm).val().trim();

    // Check for duplicates and empty value
    if (value != '' && !isDuplicate(value, $(e.target).closest('li'))) {
      // Create elements
      const $ul = $('<ul>');
      const $li = $('<li>').hide(); // Hide the element initially
      const $ExName = $('<span>');
      const $imgName = $('<img>');
      const $deleteBtn = $('<span>');
      const $addBtn = $('<span>');
      const $checkbox = $('<input>');

      // Add text content
      $ExName.text(value);

      // Determine if it's a document or a folder based on the presence of a dot in the value
      if (value.includes('.')) {
        // It's a document, set properties accordingly
        $imgName.attr('src', './imagenes/documentos.png');
        $imgName.addClass('documento');
        $imgName.attr('alt', '');
        $deleteBtn.text('-');
        $addBtn.hide();
        $checkbox.hide();
      } else {
        // It's a folder, set properties accordingly
        $imgName.attr('src', './imagenes/carpeta.png');
        $imgName.addClass('carpeta');
        $imgName.attr('alt', '');
        $deleteBtn.text('-');
        $addBtn.text('+');
        $checkbox.attr('type', 'checkbox');
        $checkbox.prop('checked', true); // Checked by default
        $checkbox.on('change', function() {
          toggleFolderContent(this, $li);
        });
      }

      // Add classes
      $ExName.addClass('name');
      $deleteBtn.addClass('delete');
      $addBtn.addClass('add');

      // Append to DOM
      $li.append($imgName, $ExName, $deleteBtn, $addBtn, $checkbox, $ul);

      // Clear the input value
      $('input[type="text"]', addForm).val('');

      // Add the new element to the list
      const $parentLi = $(e.target).closest('li');
      const level = parseInt($parentLi.data('level')) + 1;
      $li.data('level', level);
      $parentLi.find('ul').append($li);

      $li.fadeIn('slow'); // Show the element with a fade-in animation
    } else if (value === '') {
      console.log('The entered value is empty. You need to enter a value in the input.');
    } else {
      console.log('A folder or document with that name already exists in the same folder. Change the name.');
    }
  }
});

let exerciseNames = {};

function isDuplicate(value, $parentLi) {
  const level = $parentLi.data('level');

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
function toggleFolderContent(checkbox, $folder) {
  const $ul = $folder.find('ul');
  if ($ul) {
    $ul.css('display', checkbox.checked ? 'block' : 'none');
  }
}

// Reference to the root folder element
const $rootFolder = $('#ex-list li[data-level="0"]');

// Event listener for the change of the checkbox in the root folder
$('#rootCheckbox').on('change', function() {
  toggleFolderContent(this, $rootFolder);
});

// Event listener for filtering exercises based on search input
const $searchBar = $('input', searchForm);

$searchBar.on('keydown', function(e) {
  const term = $(e.target).val().toLowerCase();
  const $exercises = $list.find('li');
  const matchingElements = [];

  $exercises.each(function() {
    const $exer = $(this);
    const title = $exer.find('.name').text().toLowerCase();
    const isMatch = title.includes(term);
    $exer.css('display', isMatch ? 'block' : 'none');

    if (isMatch) {
      matchingElements.push(title);
    }

    // Also show the parents of matching elements
    let $parent = $exer.parent().parent();
    while ($parent && $parent.is('li')) {
      $parent.css('display', 'block');
      $parent = $parent.parent().parent();
    }
  });

  // Autocomplete if there is a single match and TAB is pressed
  if (matchingElements.length === 1 && e.key === 'Tab') {
    e.preventDefault(); // Prevent the default TAB behavior
    $searchBar.val(matchingElements[0]);
  }
});

addForm.addEventListener('submit', function(e) {
  e.preventDefault();
});

searchForm.addEventListener('submit', function(e) {
  e.preventDefault();
});