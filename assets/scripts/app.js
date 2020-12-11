const startAddMovieBtn = document.querySelector('header button');
const backdrop = document.getElementById('backdrop');
const addMovieModal = document.getElementById('add-modal');
const cancelAddMovieBtn = addMovieModal.querySelector('button.btn--passive');
const confirmAddMovieBtn = cancelAddMovieBtn.nextElementSibling;
const userInputs = document.querySelectorAll('input');
const entryTextSection = document.getElementById('entry-text');
const movieLists = document.getElementById('movie-list');
// const deleteModal = document.getElementById('delete-modal');
// const cancelDeleteMovieBtn = deleteModal.querySelector('button.btn--passive');
// const deleteMovieBtn = cancelDeleteMovieBtn.nextElementSibling;
let deleteMovieBtn;

// DATA STRUCTURE
const movies = [];

// DISPLAY AND RENDER
const updateUI = () => {
  if (!movies.length) {
    entryTextSection.style.display = 'block';
  } else {
    entryTextSection.style.display = 'none';
  }
};

const createNewMovieElement = ({ id, title, imageUrl, rating }) => {
  const newMovieElement = document.createElement('li');
  newMovieElement.className = 'movie-element';
  newMovieElement.innerHTML = `
    <div class='movie-element__image'>
        <img src='${imageUrl}' alt='${title}'>
    </div>
    <div class='movie-element__info'>
        <h2>${title}</h2>
        <p>${rating}/5 star</p>
    </div>
    <div class='movie-element__delete'>
        <button class='btn btn--danger c-${id}'>x</button>
    </div>
    `;
  newMovieElement
    .querySelector(`.c-${id}`)
    .addEventListener('click', deleteMovieHandler.bind(null, id));
  movieLists.append(newMovieElement);
};

const deleteMovieHandler = (id) => {
  const index = movies.findIndex((movie) => movie.id === id);
  movies.splice(index, 1);
  movieLists.children[index].remove();
};

const toggleDeleteModal = () => {
  deleteModal.classList.toggle('visible');
  toogleBackdrop();
};

const renderNewMovieElement = (newMovie) => {
  createNewMovieElement(newMovie);
};

// UTILS FUNCTIONS
const toogleAddMovieModal = () => {
  addMovieModal.classList.toggle('visible');
};
const toogleBackdrop = () => {
  backdrop.classList.toggle('visible');
};
const toogleMovieModal = () => {
  toogleAddMovieModal();
  toogleBackdrop();
  clearAddMovieInput();
};
const clearAddMovieInput = () => {
  userInputs.forEach((input) => {
    input.value = '';
  });
};

// ADD MOVIE MODAL
const startAddMovieClickHandler = () => {
  toogleMovieModal();
};
const cancelAddMovieClickHandler = () => {
  toogleMovieModal();
};
confirmAddMovieClickHandler = () => {
  const title = userInputs[0].value.trim();
  const imageUrl = userInputs[1].value.trim();
  const rating = userInputs[2].value.trim();

  if (!(title && imageUrl && +rating <= 5 && +rating >= 1)) {
    alert('Put valid input');
    return;
  } else {
    const newMovie = {
      id: Math.round(Math.random() * 10000),
      title,
      imageUrl,
      rating,
    };
    movies.push(newMovie);
    console.log(movies);
    toogleMovieModal();
    updateUI();
    renderNewMovieElement(newMovie);
  }
};

// EVENT LISTENER
startAddMovieBtn.addEventListener('click', startAddMovieClickHandler);
cancelAddMovieBtn.addEventListener('click', cancelAddMovieClickHandler);
confirmAddMovieBtn.addEventListener('click', confirmAddMovieClickHandler);
