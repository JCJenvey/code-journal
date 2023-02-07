/* exported data */

var data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1
};

var previousDataJSON = localStorage.getItem('entryStorage');

window.addEventListener('beforeunload', function (e) {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('entryStorage', dataJSON);
});

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
