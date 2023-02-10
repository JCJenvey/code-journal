var $photo = document.querySelector('#photo');
var $journalPhoto = document.querySelector('.journal-photo');
var $newEntry = document.querySelector('.new-entry');
var $entryList = document.querySelector('.entry-list');

$photo.addEventListener('input', function (e) {
  $journalPhoto.setAttribute('src', e.target.value);
});

$newEntry.addEventListener('submit', function (e) {
  e.preventDefault();
  var entry = {
    title: $newEntry.elements.title.value,
    photoUrl: $newEntry.elements['photo-url'].value,
    notes: $newEntry.elements.notes.value,
    entryId: data.nextEntryId
  };
  data.nextEntryId++;
  data.entries.push(entry);
  $journalPhoto.setAttribute('src', 'images/placeholder-image-square.jpg');
  $newEntry.reset();
});

document.addEventListener('DOMContentLoaded', function (e) {
  for (var i = 0; i < data.entries.length; i++) {
    var $entry = renderEntry(data.entries[i]);
    $entryList.appendChild($entry);
  }
});

function renderEntry(entry) {
  var $entry = document.createElement('li');

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

  var $notes = document.createElement('p');
  $notes.textContent = entry.notes;

  $entry.append($row);
  $row.append($firstColumn, $secondColumn);
  $firstColumn.append($img);
  $secondColumn.append($title, $notes);

  return $entry;
}

function makeColumnHalf() {
  var col = document.createElement('div');
  col.setAttribute('class', 'column-half');
  return col;
}
