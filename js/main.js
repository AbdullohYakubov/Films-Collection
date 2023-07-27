// Getting Elements & Assigning Constant Values
const elFilmsForm = document.querySelector(".films__filter__form");
const elFilmsSelect = document.querySelector(".films__select");
const elFilmsSelectByOrder = document.querySelector(".films__select-by-order");
const elFilmsSearchInput = document.querySelector(".films__search__input");

const elFilmsAddForm = document.querySelector(".films__add__form");
const elToggle = document.querySelector(".toggle");
const elInputPoster = document.querySelector(".film__input--poster");
const elInputTitle = document.querySelector(".film__input--title");
const elInputOverview = document.querySelector(".film__input--overview");
const elInputReleaseDate = document.querySelector(".film__input--release-date");
const elInputGenres = document.querySelector(".film__input--genres");
const elInvalidInputs = document.querySelector(".valid-inputs");

const elFilmsList = document.querySelector(".films__list");
const elTemplateFilms = document.querySelector("#films__template").content;
const elTemplateGenres = document.querySelector("#genres__template").content;

// Normalizing the Date Format
const normalizeReleaseDate = (format) => {
  const date = String(new Date(format).getDate()).padStart(2, 0);
  const month = String(new Date(format).getMonth() + 1).padStart(2, 0);
  const year = new Date(format).getFullYear();

  return date + "." + month + "." + year;
};

// Getting all Genres in an Array
const filterGenres = (array) => {
  const filmGenres = [];

  array.forEach((film) => {
    film.genres.forEach((genre) => {
      if (!filmGenres.includes(genre)) {
        filmGenres.push(genre);
      }
    });
  });

  return filmGenres;
};

// Creating Option Elements for each Genre
const createOptions = (array, element) => {
  // Creating a Fragment for all Option elements
  const optionsFragment = document.createDocumentFragment();

  array.forEach((genre) => {
    // Creating Option elements for each loop
    const elFilmsOptions = document.createElement("option");

    // Assigning values and text content to Options elements
    elFilmsOptions.value = genre;
    elFilmsOptions.textContent = genre;

    // Appending Option elements to the Fragment
    optionsFragment.appendChild(elFilmsOptions);
  });

  // Appending the Fragment to Select element
  element.appendChild(optionsFragment);
};

createOptions(filterGenres(films), elFilmsSelect);

// Rendering Genres List to DOM
const renderGenres = (array, element) => {
  element.innerHTML = null;

  const genresFragment = document.createDocumentFragment();

  array.forEach((genre) => {
    // Creating a Fragment for each genre

    // Copying the Template content and multiplying it on every iteration
    const genresTemplate = elTemplateGenres.cloneNode(true);

    // Assigning text Content to every genre
    genresTemplate.querySelector(".film__genre").textContent = genre;

    // Appending the Template content to the Fragment
    genresFragment.appendChild(genresTemplate);
  });

  // Appending the Fragment to Genres list
  element.appendChild(genresFragment);
};

// Rendering Films to DOM
const renderFilms = (array, element) => {
  // Nulifying the elements in Films list
  element.innerHTML = null;

  // Creating a Fragment for each film
  const filmsFragment = document.createDocumentFragment();

  array.forEach((film) => {
    // Copying the Template content and multiplying it on every iteration
    const filmTemplate = elTemplateFilms.cloneNode(true);

    // Changing the attributes to the respective values
    filmTemplate.querySelector(".film__poster").src = film.poster;
    filmTemplate.querySelector(".film__poster").alt = film.title + " poster";
    filmTemplate.querySelector(".film__title").textContent = film.title;
    filmTemplate.querySelector(".film__overview").textContent = film.overview;
    filmTemplate.querySelector(".film__release-date").textContent =
      normalizeReleaseDate(film.release_date);

    // Activating the Genres list
    const elFilmGenres = filmTemplate.querySelector(".film__genres");
    renderGenres(film.genres, elFilmGenres);

    // Appending the films to the Fragment
    filmsFragment.appendChild(filmTemplate);
  });

  // Appending the Fragment to the Films list
  element.appendChild(filmsFragment);
};

renderFilms(films, elFilmsList);

// Handle Form Activation
const handleFilmsFilterFormSubmit = (evt) => {
  evt.preventDefault();

  elFilmsList.innerHTML = null;

  // Search by genre
  const selectedFilm = elFilmsSelect.value.trim();

  let filteredFilmsByGenre = [];

  if (selectedFilm === "all") {
    filteredFilmsByGenre = films;
  } else {
    filteredFilmsByGenre = films.filter((film) =>
      film.genres.includes(selectedFilm)
    );
  }

  // Search by order
  const selectedFilmOrder = elFilmsSelectByOrder.value.trim();

  if (selectedFilmOrder === "a-z") {
    filteredFilmsByGenre.sort((a, b) => {
      if (a.title > b.title) {
        return 1;
      } else if (a.title < b.title) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (selectedFilmOrder === "z-a") {
    filteredFilmsByGenre.sort((a, b) => {
      if (b.title > a.title) {
        return 1;
      } else if (b.title < a.title) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (selectedFilmOrder === "new-old") {
    filteredFilmsByGenre.sort((a, b) => {
      if (a.release_date > b.release_date) {
        return 1;
      } else if (a.release_date < b.release_date) {
        return -1;
      } else {
        return 0;
      }
    });
  } else if (selectedFilmOrder === "old-new") {
    filteredFilmsByGenre.sort((a, b) => {
      if (b.release_date > a.release_date) {
        return 1;
      } else if (b.release_date < a.release_date) {
        return -1;
      } else {
        return 0;
      }
    });
  }

  // Search by title
  const searchedValue = elFilmsSearchInput.value.trim();

  const regex = new RegExp(searchedValue, "gi");

  const filteredFilmsByTitle = filteredFilmsByGenre.filter((film) =>
    film.title.match(regex)
  );

  renderFilms(filteredFilmsByTitle, elFilmsList);
};

elFilmsForm.addEventListener("submit", handleFilmsFilterFormSubmit);

const validateUserInputs = (element) => {
  const newFilmTitle = elInputTitle.value.trim();
  const newFilmOverview = elInputOverview.value.trim();
  const emptyArr = [];

  if (newFilmTitle === "" && newFilmOverview === "") {
    element.classList.add("invalid-inputs");
    renderFilms(emptyArr, elFilmsList);
  } else {
    element.classList.remove("invalid-inputs");
    renderFilms(films, elFilmsList);
  }
};

const handleFilmsAddFormSubmit = (evt) => {
  evt.preventDefault();
  const newFilmTitle = elInputTitle.value.trim();
  const newFilmPoster = elInputPoster.value.trim();
  const newFilmOverview = elInputOverview.value.trim();
  const newFilmReleaseDate = elInputReleaseDate.value.trim();
  const newFilmGenres = elInputGenres.value.trim().split(", ");

  const newFilm = {
    title: newFilmTitle,
    poster: newFilmPoster,
    overview: newFilmOverview,
    release_date: newFilmReleaseDate,
    genres: newFilmGenres,
  };

  films.unshift(newFilm);

  renderFilms(films, elFilmsList);

  validateUserInputs(elInvalidInputs);

  elInputPoster.value = null;
  elInputTitle.value = null;
  elInputOverview.value = null;
  elInputGenres.value = null;
  elInputReleaseDate.value = null;
};

elFilmsAddForm.addEventListener("submit", handleFilmsAddFormSubmit);

const handleToggleButton = (evt) => {
  if (elFilmsAddForm.classList.contains("close-add-films-form")) {
    elFilmsAddForm.classList.remove("close-add-films-form");
    elFilmsAddForm.classList.add("open-add-films-form");
    elToggle.textContent = "Close";
  } else {
    elFilmsAddForm.classList.remove("open-add-films-form");
    elFilmsAddForm.classList.add("close-add-films-form");
    elToggle.innerHTML = "Add your movie";
  }
};

elToggle.addEventListener("change", handleToggleButton);
