/* exported data */
var data = {
  workouts: [],
  clicked: null,
  favorites: [],
  view: 'calendar view'
};

var previousEntries = localStorage.getItem('entry-local-storage');

if (previousEntries !== null) {
  data = JSON.parse(previousEntries);
}

window.addEventListener('beforeunload', event => {
  var dataJSON = JSON.stringify(data);
  localStorage.setItem('entry-local-storage', dataJSON);
});
