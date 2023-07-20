// Getting Elements & Assigning Constant Values
const elFilmsForm = document.querySelector(".films__form");
const elFilmsSelect = document.querySelector(".films__select");
const elInputPoster = elFilmsForm.querySelector(".film__input--poster");
const elInputTitle = elFilmsForm.querySelector(".film__input--title");
const elInputOverview = elFilmsForm.querySelector(".film__input--overview");
const elInputGenres = elFilmsForm.querySelector(".film__input--genres");

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
  element.innerHTML = null;

  array.forEach((genre) => {
    const elFilmsOptions = document.createElement("option");
    // Assigning values and text content to the Options
    elFilmsOptions.value = genre;
    elFilmsOptions.textContent = genre;
    // Appending the Options to Select
    element.appendChild(elFilmsOptions);
  });
};

createOptions(filterGenres(films), elFilmsSelect);

// Rendering Genres List to DOM
const renderGenres = (array, element) => {
  element.innerHTML = null;

  array.forEach((genre) => {
    const genresTemplate = elTemplateGenres.cloneNode(true);

    genresTemplate.querySelector(".film__genre").textContent = genre;

    element.appendChild(genresTemplate);
  });
};

// Rendering Films to DOM
const renderFilms = (array, element) => {
  element.innerHTML = null;

  array.forEach((film) => {
    const filmTemplate = elTemplateFilms.cloneNode(true);

    filmTemplate.querySelector(".film__poster").src = film.poster;
    filmTemplate.querySelector(".film__poster").alt = film.title + " poster";
    filmTemplate.querySelector(".film__title").textContent = film.title;
    filmTemplate.querySelector(".film__overview").textContent = film.overview;
    filmTemplate.querySelector(".film__release-date").textContent =
      normalizeReleaseDate(film.release_date);

    const elFilmGenres = filmTemplate.querySelector(".film__genres");
    renderGenres(film.genres, elFilmGenres);

    element.appendChild(filmTemplate);
  });
};

renderFilms(films, elFilmsList);

const handleFilmsFormSubmit = (evt) => {
  evt.preventDefault();
  elFilmsList.innerHTML = null;
  const userFilmsSelect = elFilmsSelect.value;

  // One way to filter Films that takes longer lines of code (7 lines)

  // const filteredFilms = [];
  // films.forEach((film) => {
  //   if (film.genres.includes(userFilmsSelect)) {
  //     filteredFilms.push(film);
  //   }
  // });
  // renderFilms(filteredFilms, elFilmsList);

  // Second more effective way to filter Films that take fewer lines of code (4 lines)

  const filteredFilms = films.filter((film) =>
    film.genres.includes(userFilmsSelect)
  );
  renderFilms(filteredFilms, elFilmsList);

  // const newFilmPoster = elInputPoster.value.trim();
  // const newFilmTitle = elInputTitle.value.trim();
  // const newFilmOverview = elInputOverview.value.trim();
  // const newFilmReleaseDate = calculatePresentTime(new Date());
  // const newFilmGenres = elInputGenres.value.trim().split(", ");

  // const newFilm = {
  //   title: newFilmTitle,
  //   poster: newFilmPoster,
  //   overview: newFilmOverview,
  //   release_date: newFilmReleaseDate,
  //   genres: newFilmGenres,
  // };

  // films.unshift(newFilm);

  // renderFilms(films, elFilmsList);

  // elInputPoster.value = null;
  // elInputTitle.value = null;
  // elInputOverview.value = null;
  // elInputGenres.value = null;
  // elInputReleaseDate.value = null;
};

elFilmsForm.addEventListener("submit", handleFilmsFormSubmit);
