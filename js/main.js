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

// const dumbbell = document.querySelector('.dumbbell');
// dumbbell.addEventListener('click', () => {
//   // console.log('clicked');
//   dumbbell.classList.add('clicked');
// });

// Calendar
let nav = 0;
// let clicked = null;
// const workouts = localStorage.getItem('workouts') ? JSON.parse(localStorage.getItem('workouts')) : {};

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

  // const day = date.getDate();
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
      var dumbbellIcon = document.createElement('i');
      dumbbellIcon.setAttribute('class', 'fa-solid fa-dumbbell', 'dumbbell', 'dumbbell-day');
      daySquare.appendChild(dumbbellIcon);
      daySquare.addEventListener('click', () => {
        data.clicked = (`${month + 1
}/${i - paddingDays}/${year}`);
        contentDislay();
      });
    } else {
      daySquare.classList.add('padding');
    }

    calendar.appendChild(daySquare);
  }
}

function closeModal() {
  evenTitleInput.classList.remove('error');
  modal.style.visibility = 'hidden';
  newWorkoutModal.style.visibility = 'hidden';
  evenTitleInput.value = '';
  load();
}

function createWorkout() {
  data.workouts.forEach(o => {
    if (o.date === data.clicked) {
      o.exercises.push(evenTitleInput.value);
      // data.workouts.push(o);
      renderList(o);
    } else {
      const workout = {
        date: data.clicked,
        exercises: [evenTitleInput.value]
      };
      data.workouts.push(workout);
      renderList(workout);
    }
  });
  if (data.workouts.length === 0) {
    const workout = {
      date: data.clicked,
      exercises: [evenTitleInput.value]
    };
    data.workouts.push(workout);
    renderList(workout);
  }

  noLog.style.display = 'none';

  workoutDeatails.style.display = 'contents';
  closeModal();
}

function renderList(object) {
  if (object.exercises.length === 1) {
    workoutList.setAttribute('id', `${object.date}`);
  }
  object.exercises.forEach(element => {
    const listItem = document.createElement('li');
    listItem.textContent = `${element}`;
    workoutList.appendChild(listItem);
  });

  workoutList.style.display = 'content';

}
const workoutDeatails = document.querySelector('.workout-details');
const workoutList = document.querySelector('.workout-list');

function contentDislay() {
  if (data.workouts.length >= 1) {
    data.workouts.forEach(o => {
      if (o.date === event.target.id) {
        renderList(o);
        workoutDeatails.style.display = 'contents';
        noLog.style.display = 'none';
      } else {
        noLog.style.display = 'contents';
      }
    });
  } else {
    noLog.style.display = 'contents';
  }

  calendarConatiner.style.display = 'none';
  quoteContainer.style.display = 'none';
}

// function viewSwitch() {
//   const view = data.view;
//   switch (view) {
//     case 'calendar view':
//       calendarConatiner.style.display = 'contents';
//       quoteContainer.style.display = 'flex';
//       noLog.style.display = 'none';
//       workoutDeatails.style.display = 'none';
//       break;

//   }

// }

// const calendarView = document.querySelector('.calendar-view');
// // const exerciseCat = document.querySelector('.exercise-cat');
// // const favorites = document.querySelector('.favorites');

// calendarView.addEventListener('click', () => {
//   viewSwitch('calendar view');
//   console.log('clicked');
// });

function initButtons() {
  document.querySelector('.next-btn').addEventListener('click', () => {
    nav++;
    load();
  });

  document.querySelector('.back-btn').addEventListener('click', () => {
    nav--;
    load();
  });

  document.querySelector('.save-btn').addEventListener('click', createWorkout);
  document.querySelector('.cancel-btn').addEventListener('click', closeModal);
}

initButtons();
load();

// add exercise
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
