/* exported data */
// quote generator
const quoteText = document.querySelector('.quote');
const authorName = document.querySelector('.author .name');
const quote = new XMLHttpRequest();
const quoteContainer = document.querySelector('.quote-container');
quote.addEventListener('load', quoteGenerator);
quote.open('GET', 'https://api.quotable.io/random');
quote.responseText = 'json';
quote.send();

function quoteGenerator() {
  const result = JSON.parse(quote.responseText);
  quoteText.textContent = result.content;
  authorName.textContent = result.author;
}

// header

const calendarView = document.querySelector('.calendar-view');
const calendarDay = document.getElementById('calendar');
calendarDay.addEventListener('click', () => {
  data.clicked = event.target.id;
  calendarView.classList.add('clicked');
  dumbbellHead.classList.remove('clicked');
  contentDislay();
});

calendarView.addEventListener('click', () => {
  data.view = 'calendar view';
  calendarView.classList.add('clicked');
  dumbbellHead.classList.remove('clicked');
  viewSwitch();
});

const dumbbellHead = document.querySelector('.exercise-cat-dumbbell');
const catContainer = document.querySelector('.category-container');
dumbbellHead.addEventListener('click', () => {
  data.view = 'exercise cat';
  calendarView.classList.remove('clicked');
  dumbbellHead.classList.add('clicked');

  viewSwitch();
});

// Calendar
let nav = 0;

const calendar = document.getElementById('calendar');
const calendarConatiner = document.querySelector('.calendar-container');
const newWorkoutModal = document.getElementById('new-workout-modal');
const evenTitleInput = document.querySelector('.event-title');
const modal = document.getElementById('modal');
const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const noLog = document.querySelector('.no-log');

// function addExercise(date) {
//   data.clicked = date;
// }

function load() {
  const date = new Date();

  if (nav !== 0) {
    date.setMonth(new Date().getMonth() + nav);
  }

  const day = date.getDate();
  const month = date.getMonth();
  const year = date.getFullYear();

  const firstDayOfMonth = new Date(year, month, 1);
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const dateString = firstDayOfMonth.toLocaleDateString('en-us', {
    weekday: 'short',
    year: 'numeric',
    month: 'numeric',
    day: 'numeric'
  });

  const paddingDays = weekdays.indexOf(dateString.split(', ')[0]);

  document.getElementById('month-display').textContent = `${date.toLocaleDateString('en-us', { month: 'long' })} ${year}`;

  calendar.innerHTML = '';

  for (let i = 1; i <= paddingDays + daysInMonth; i++) {
    const daySquare = document.createElement('div');
    daySquare.classList.add('day');
    daySquare.setAttribute('id', `${month + 1
      }/${i - paddingDays}/${year}`);

    if (i > paddingDays) {
      daySquare.textContent = i - paddingDays;
      if (i - paddingDays === day && nav === 0) {
        daySquare.id = 'current-day';
      }
    } else {
      daySquare.classList.add('padding');
    }
    if (data.workouts.find(element => element.date === daySquare.id)) {
      var dumbbellIcon = document.createElement('i');
      dumbbellIcon.setAttribute('class', 'fa-solid fa-dumbbell', 'dumbbell', 'dumbbell-day');
      dumbbellIcon.setAttribute('id', `${daySquare.id}`);
      daySquare.appendChild(dumbbellIcon);
    }

    calendar.appendChild(daySquare);
  }
}

function closeModal() {
  modal.style.visibility = 'hidden';
  newWorkoutModal.style.visibility = 'hidden';
  evenTitleInput.value = '';
  load();
}

function createWorkout() {
  const found = data.workouts.find(element => element.date === data.clicked);
  if (found) {
    found.exercises.push(evenTitleInput.value);
    displayItem(found);
  } else {
    const workout = {
      date: data.clicked,
      exercises: [evenTitleInput.value]
    };
    data.workouts.push(workout);
    displayItem(workout);
  }
  if (data.workouts.length === 0) {
    const workout = {
      date: data.clicked,
      exercises: [evenTitleInput.value]
    };
    data.workouts.push(workout);
    displayItem(workout);
  }

  viewSwitch('date');
  closeModal();
}

function displayItem(object) {
  if (object.exercises.length === 1) {
    workoutList.setAttribute('id', `${object.date}`);
  }
  const currentExercise = object.exercises[object.exercises.length - 1];
  const listItem = document.createElement('li');
  listItem.textContent = `${currentExercise}`;
  workoutList.appendChild(listItem);
}

// render on click
function renderList(object) {
  object.exercises.forEach(element => {
    const listItem = document.createElement('li');
    listItem.textContent = `${element}`;
    workoutList.appendChild(listItem);
  });
}
const workoutDeatails = document.querySelector('.workout-details');
const workoutList = document.querySelector('.workout-list');
const showDate = document.querySelector('.show-date');
// display as added
function contentDislay() {
  showDate.textContent = data.clicked;
  const found = data.workouts.find(element => element.date === data.clicked);
  if (data.workouts.length >= 1) {
    if (found) {
      data.view = 'date';
      viewSwitch();
      renderList(found);
    } else {
      data.view = 'no log';
      viewSwitch();
    }
  }
}

function viewSwitch() {
  const view = data.view;
  switch (view) {
    case 'calendar view':
      calendarConatiner.style.display = 'contents';
      quoteContainer.style.display = 'flex';
      noLog.style.display = 'none';
      workoutDeatails.style.display = 'none';
      catContainer.style.display = 'none';
      data.clicked = null;
      clearList(workoutList);
      break;
    case 'date':
      workoutDeatails.style.display = 'flex';
      noLog.style.display = 'none';
      calendarConatiner.style.display = 'none';
      quoteContainer.style.display = 'none';
      catContainer.style.display = 'none';
      break;
    case 'no log':
      noLog.style.display = 'flex';
      workoutDeatails.style.display = 'none';
      calendarConatiner.style.display = 'none';
      quoteContainer.style.display = 'none';
      catContainer.style.display = 'none';
      break;
    case 'exercise cat':
      catContainer.style.display = 'flex';
      noLog.style.display = 'none';
      workoutDeatails.style.display = 'none';
      calendarConatiner.style.display = 'none';
      quoteContainer.style.display = 'none';
      break;

  }

}

// // const favorites = document.querySelector('.favorites');

function initButtons() {
  document.querySelector('.next-btn').addEventListener('click', () => {
    nav++;
    load();
  });

  document.querySelector('.back-btn').addEventListener('click', () => {
    nav--;
    load();
  });

  document.querySelector('.add-btn').addEventListener('click', createWorkout);
  document.querySelector('.cancel-btn').addEventListener('click', closeModal);
}

initButtons();
load();

// bring up modal to add exercise
var addWorkout = document.querySelector('.add-exercise');

addWorkout.addEventListener('click', () => {
  newWorkoutModal.style.visibility = 'visible';
  modal.style.visibility = 'visible';
});

var additonalExercise = document.querySelector('.additonal-exercise');
additonalExercise.addEventListener('click', () => {
  newWorkoutModal.style.visibility = 'visible';
  modal.style.visibility = 'visible';
});

// window.addEventListener('DOMContentLoaded', event => {

//   if (data.clicked !== null) {
//     renderList(data.workouts.find(x => x.date === data.clicked));
//   }
// });

// remove list items
function clearList(list) {
  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
}

// exercise info
const exerciseData = [];
const info = new XMLHttpRequest();
info.open('GET', 'https://wger.de/api/v2/exerciseinfo/?limit=500&offset=50"', 'Authorization: Token 8e408e3874a8f9855d02826fd4c5a0c04abc1464');
info.send();
info.addEventListener('load', reqListener);

function reqListener() {
  var response = JSON.parse(info.responseText);
  response.results.forEach(item => {
    if (item.language.id === 2) {
      exerciseData.push(item);
    }

  });
}

function displayExerciseName() {

}

catContainer.addEventListener('click', displayExerciseName);

// if (item.category.name === target) {
//   console.log('exercise name:', item.name, target);
//   console.log('exercise decription:', item.description);
// }

// const target = event.target.id;
// if (item.images.length !== 0) {
//   console.log('exercise photo:', item.images);
// }
