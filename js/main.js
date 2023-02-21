var $photo = document.querySelector('#photo');
var $title = document.querySelector('#title');
var $notes = document.querySelector('#notes');
var $journalPhoto = document.querySelector('.journal-photo');
var $newEntry = document.querySelector('.new-entry');
var $entryType = document.querySelector('.entry-type');
var $entryList = document.querySelector('.entry-list');
var $view = document.getElementsByClassName('view');
var $swapToEntries = document.querySelector('.swap-to-entries');
var $newEntryButton = document.querySelector('.new-entry-button');
var $delete = document.querySelector('.delete');
var $modalContainer = document.querySelector('.modal-container');
var $modalCancel = document.querySelector('.modal-cancel');
var $modalConfirm = document.querySelector('.modal-confirm');
var $listOfEntries = $entryList.getElementsByTagName('li');

// Event listeners below:
$photo.addEventListener('input', function (e) {
  $journalPhoto.setAttribute('src', e.target.value);
});

$newEntry.addEventListener('submit', function (e) {
  e.preventDefault();
  if (data.editing === null) {
    var entry = {
      title: $newEntry.elements.title.value,
      photoUrl: $newEntry.elements['photo-url'].value,
      notes: $newEntry.elements.notes.value,
      entryId: data.nextEntryId
    };
    data.nextEntryId++;
    data.entries.unshift(entry);
    var $entry = renderEntry(entry);
    $entryList.prepend($entry);
  } else {
    data.entries[findEntryId(data.editing.entryId)].title = $newEntry.elements.title.value;
    data.entries[findEntryId(data.editing.entryId)].photoUrl = $newEntry.elements['photo-url'].value;
    data.entries[findEntryId(data.editing.entryId)].notes = $newEntry.elements.notes.value;
    var $editedEntry = renderEntry(data.entries[findEntryId(data.editing.entryId)]);
    for (var i = 0; i < $listOfEntries.length; i++) {
      var $dataEntryId = parseInt($listOfEntries[i].getAttribute('data-entry-id'), 10);
      if ($dataEntryId === data.editing.entryId) {
        $listOfEntries[i].replaceWith($editedEntry);
      }
    }
    $entryType.textContent = 'New Entry';
    $notes.textContent = '';
    $delete.className = 'delete hidden';
    data.editing = null;
  }
  $journalPhoto.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntry.reset();
  viewSwap('entries');
  if (data.entries.length === 1) {
    toggleNoEntries();
  }
});

document.addEventListener('DOMContentLoaded', function (e) {
  for (var i = 0; i < data.entries.length; i++) {
    var $entry = renderEntry(data.entries[i]);
    $entryList.appendChild($entry);
  }

  viewSwap(data.view);

  if ($entryList.children.length) {
    toggleNoEntries();
  }
});

$swapToEntries.addEventListener('click', function (e) {
  viewSwap('entries');
});

$newEntryButton.addEventListener('click', function (e) {
  viewSwap('entry-form');
});

$entryList.addEventListener('click', function (e) {
  if (e.target && e.target.tagName === 'I') {
    viewSwap('entry-form');
    var $dataEntryId = e.target.closest('[data-entry-id]');
    $dataEntryId = parseInt($dataEntryId.getAttribute('data-entry-id'), 10);
    data.editing = data.entries[findEntryId($dataEntryId)];
    $title.value = data.editing.title;
    $photo.value = data.editing.photoUrl;
    $journalPhoto.setAttribute('src', data.editing.photoUrl);
    $notes.textContent = data.editing.notes;

    $entryType.textContent = 'Edit Entry';
    $delete.className = 'delete';
  }
});

$delete.addEventListener('click', toggleModal);

$modalCancel.addEventListener('click', toggleModal);

$modalConfirm.addEventListener('click', function (e) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.editing.entryId === data.entries[i].entryId) {
      data.entries.splice(i, 1);
      for (var j = 0; j < $listOfEntries.length; j++) {
        var $dataEntryId = parseInt($listOfEntries[j].getAttribute('data-entry-id'), 10);
        if ($dataEntryId === data.editing.entryId) {
          $listOfEntries[j].remove();
        }
      }
    }
  }
  if (data.entries.length !== 1) {
    toggleNoEntries();
  }
  viewSwap('entries');
  toggleModal();
  $entryType.textContent = 'New Entry';
  $notes.textContent = '';
  $journalPhoto.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntry.reset();
  $delete.className = 'delete hidden';
  data.editing = null;
});

// Function declarations below:
function toggleNoEntries() {
  var $noEntries = document.querySelector('.no-entries');
  var classes = $noEntries.classList;
  classes.toggle('hidden');
}

function toggleModal() {
  $modalContainer.classList.toggle('hidden');
}

function viewSwap(view) {
  data.view = view;
  for (var i = 0; i < $view.length; i++) {
    if ($view[i].getAttribute('data-view') === view) {
      $view[i].className = 'view';
    } else {
      $view[i].className = 'view hidden';
    }
  }
}

function renderEntry(entry) {
  var $entry = document.createElement('li');
  $entry.setAttribute('data-entry-id', entry.entryId);

  var $row = document.createElement('div');
  $row.setAttribute('class', 'row');

  var $firstColumn = makeColumnHalf();

  var $img = document.createElement('img');
  $img.setAttribute('src', entry.photoUrl);
  $img.setAttribute('alt', 'The image for a journal entry');
  $img.setAttribute('onerror', 'src=\'images / placeholder - image - square.jpg\';');

  var $secondColumn = makeColumnHalf();

  var $title = document.createElement('h3');
  $title.textContent = entry.title;

  var $pen = document.createElement('i');
  $pen.setAttribute('class', 'fa-solid fa-pen pen');

  var $notes = document.createElement('p');
  $notes.textContent = entry.notes;

  $entry.append($row);
  $row.append($firstColumn, $secondColumn);
  $firstColumn.append($img);
  $secondColumn.append($title, $notes);
  $title.append($pen);

  return $entry;
}

function makeColumnHalf() {
  var col = document.createElement('div');
  col.setAttribute('class', 'column-half');
  return col;
}

function findEntryId(entryId) {
  for (var i = 0; i < data.entries.length; i++) {
    if (data.entries[i].entryId === entryId) {
      return i;
    }
  }
}
