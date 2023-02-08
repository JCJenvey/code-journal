var $photo = document.querySelector('#photo');
var $journalPhoto = document.querySelector('.journal-photo');
var $newEntry = document.querySelector('.new-entry');

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
