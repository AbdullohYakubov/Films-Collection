// Getting Elements & Assigning Constant Values
const elFilmsForm = findElement(".films__filter__form");
const elFilmsSelect = findElement(".films__select", elFilmsForm);
const elFilmsSelectByOrder = findElement(
  ".films__select-by-order",
  elFilmsForm
);
const elFilmsSearchInput = findElement(".films__search__input", elFilmsForm);
const elToggle = findElement(".toggle", elFilmsForm);

const elFilmsAddForm = findElement(".films__add__form");
const elInputPoster = findElement(".film__input--poster", elFilmsAddForm);
const elInputTitle = findElement(".film__input--title", elFilmsAddForm);
const elInputOverview = findElement(".film__input--overview", elFilmsAddForm);
const elInputReleaseDate = findElement(
  ".film__input--release-date",
  elFilmsAddForm
);
const elInputGenres = findElement(".film__input--genres", elFilmsAddForm);
const elInvalidInputs = findElement(".valid-inputs", elFilmsAddForm);

const elFilmsList = findElement(".films__list");
const elTemplateFilms = findElement("#films__template").content;
const elTemplateGenres = findElement("#genres__template").content;

const elAsideFeatures = findElement(".features");

const elPagination = findElement(".pagination");

let filmsCopy = films.map((film) => {
  return {
    ...film,
    addToFavorites: false,
    watchLater: false,
  };
});

films = filmsCopy;

const API_KEY = "aa58f87f";

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

    const favoritesIcon = findElement(".favourite-icon", filmTemplate);
    const watchLaterIcon = findElement(".watch-later-icon", filmTemplate);

    // Changing the attributes to the respective values
    filmTemplate.querySelector(".film").dataset.filmId = film.id;
    // filmTemplate.querySelector(".film").dataset.addToFavorites = false;
    filmTemplate.querySelector(".favourite-icon").dataset.filmId = film.id;
    filmTemplate.querySelector(".favourite-icon polygon").dataset.filmId =
      film.id;
    filmTemplate.querySelector(".film__poster").src = film.poster;
    filmTemplate.querySelector(".film__poster").alt = film.title + " poster";
    filmTemplate.querySelector(".film__title").textContent = film.title;
    filmTemplate.querySelector(".film__overview").textContent = film.overview;
    filmTemplate.querySelector(".film__release-date").textContent =
      normalizeReleaseDate(film.release_date);

    // Activating the Genres list
    const elFilmGenres = filmTemplate.querySelector(".film__genres");
    renderGenres(film.genres, elFilmGenres);

    if (film.addToFavorites) {
      favoritesIcon.classList.add("add-to-favorites");
    } else {
      favoritesIcon.classList.remove("add-to-favorites");
    }

    // if (film.watchLater) {
    //   watchLaterIcon.classList.add("add-to-watch-later");
    // } else {
    //   watchLaterIcon.classList.remove("add-to-watch-later");
    // }

    // Appending the films to the Fragment
    filmsFragment.appendChild(filmTemplate);
  });

  // Appending the Fragment to the Films list
  element.appendChild(filmsFragment);
};

// renderFilms(films, elFilmsList);

const renderFilmsFromAPI = (array, element) => {
  // Nulifying the elements in Films list
  element.innerHTML = null;

  // Creating a Fragment for each film
  const filmsFragment = document.createDocumentFragment();

  array.forEach((film) => {
    // Copying the Template content and multiplying it on every iteration
    const filmTemplate = elTemplateFilms.cloneNode(true);

    const favoritesIcon = findElement(".favourite-icon", filmTemplate);
    const watchLaterIcon = findElement(".watch-later-icon", filmTemplate);

    // Changing the attributes to the respective values
    filmTemplate.querySelector(".film").dataset.addToFavorites = false;
    filmTemplate.querySelector(".film").dataset.addToWatchLater = false;
    filmTemplate.querySelector(".film").dataset.filmId = film.imdbID;
    filmTemplate.querySelector(".favourite-icon").dataset.filmId = film.imdbID;
    filmTemplate.querySelector(".favourite-icon polygon").dataset.filmId =
      film.imdbID;
    filmTemplate.querySelector(".film__poster").src = film.Poster;
    filmTemplate.querySelector(".film__poster").alt = film.Title + " poster";
    filmTemplate.querySelector(".film__title").textContent = film.Title;
    // filmTemplate.querySelector(".film__overview").textContent = film.overview;
    filmTemplate.querySelector(".film__release-date").textContent =
      normalizeReleaseDate(film.Year);

    if (film.addToFavorites) {
      favoritesIcon.classList.add("add-to-favorites");
    } else {
      favoritesIcon.classList.remove("add-to-favorites");
    }

    // if (film.addToWatchLater) {
    //   watchLaterIcon.classList.add("add-to-watch-later");
    // } else {
    //   watchLaterIcon.classList.remove("add-to-watch-later");
    // }

    // Appending the films to the Fragment
    filmsFragment.appendChild(filmTemplate);
  });

  // Appending the Fragment to the Films list
  element.appendChild(filmsFragment);
};

async function getFilms(searchQuery = "hulk", page = 1) {
  try {
    const response = await fetch(
      "https://www.omdbapi.com/?apikey=" +
        API_KEY +
        "&s=" +
        searchQuery +
        "&page=" +
        page
    );
    const data = await response.json();

    if (data?.Search?.length > 0) {
      renderFilmsFromAPI(data.Search, elFilmsList);
    }

    if (data.Response === "True") {
      renderFilmsFromAPI(data.Search, elFilmsList);
    }

    if (pagination <= 1) {
      findElement(".previous__page").classList.add("disabled");
    } else {
      findElement(".previous__page").classList.remove("disabled");
    }

    const lastPage = Math.ceil(data.totalResults / 10);

    if (pagination === lastPage) {
      findElement(".next__page").classList.add("disabled");
    } else {
      findElement(".next__page").classList.remove("disabled");
    }
  } catch (err) {
    elFilmsList.textContent = "No movie found!";
  }
}

// getFilms();

// Handle Form Activation
const searchedValue = elFilmsSearchInput.value.trim();

const handleFilmsFilterFormSubmit = (evt) => {
  evt.preventDefault();

  elFilmsList.innerHTML = null;

  // Search by genre
  // const selectedFilm = elFilmsSelect.value.trim();

  // let filteredFilmsByGenre = [];

  // if (selectedFilm === "all") {
  //   filteredFilmsByGenre = films;
  // } else {
  //   filteredFilmsByGenre = films.filter((film) =>
  //     film.genres.includes(selectedFilm)
  //   );
  // }

  // Search by order
  // const selectedFilmOrder = elFilmsSelectByOrder.value.trim();

  // if (selectedFilmOrder === "a-z") {
  //   filteredFilmsByGenre.sort((a, b) => {
  //     if (a.title > b.title) {
  //       return 1;
  //     } else if (a.title < b.title) {
  //       return -1;
  //     } else {
  //       return 0;
  //     }
  //   });
  // } else if (selectedFilmOrder === "z-a") {
  //   filteredFilmsByGenre.sort((a, b) => {
  //     if (b.title > a.title) {
  //       return 1;
  //     } else if (b.title < a.title) {
  //       return -1;
  //     } else {
  //       return 0;
  //     }
  //   });
  // } else if (selectedFilmOrder === "new-old") {
  //   filteredFilmsByGenre.sort((a, b) => {
  //     if (a.release_date > b.release_date) {
  //       return 1;
  //     } else if (a.release_date < b.release_date) {
  //       return -1;
  //     } else {
  //       return 0;
  //     }
  //   });
  // } else if (selectedFilmOrder === "old-new") {
  //   filteredFilmsByGenre.sort((a, b) => {
  //     if (b.release_date > a.release_date) {
  //       return 1;
  //     } else if (b.release_date < a.release_date) {
  //       return -1;
  //     } else {
  //       return 0;
  //     }
  //   });
  // }

  // Search by title

  // const regex = new RegExp(searchedValue, "gi");

  // const filteredFilmsByTitle = filteredFilmsByGenre.filter((film) =>
  //   film.title.match(regex)
  // );

  // renderFilms(filteredFilmsByTitle, elFilmsList);

  getFilms(searchedValue);
};

elFilmsForm.addEventListener("submit", handleFilmsFilterFormSubmit);

const validateUserInputs = (element) => {
  const newFilmTitle = elInputTitle.value.trim();
  const newFilmOverview = elInputOverview.value.trim();
  const emptyArr = [];

  // const newInvalidFilm = films.find((film) => !film.title || !film.overview);

  // films.splice(newInvalidFilm, 1);
  // element.classList.add("invalid-inputs");
  // renderFilms(emptyArr, elFilmsList);

  if (!newFilmTitle && !newFilmOverview) {
    const newInvalidFilm = films.find((film) => !film.title || !film.overview);
    films.splice(newInvalidFilm, 1);
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
    addToFavorites: false,
    watchLater: false,
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
    findElement(".valid-inputs").classList.remove("invalid-inputs");
  } else {
    elFilmsAddForm.classList.remove("open-add-films-form");
    elFilmsAddForm.classList.add("close-add-films-form");
    elToggle.innerHTML = "Add your movie";
  }
};

elToggle.addEventListener("click", handleToggleButton);

const favouriteFilmsArr =
  JSON.parse(window.localStorage.getItem("favouriteFilms")) || [];

const findFavourites = (id, array) => {
  const favouriteFilms = array.find((film) => film.id == id);

  favouriteFilms.addToFavorites = !favouriteFilms.addToFavorites;

  if (
    !favouriteFilmsArr.includes(favouriteFilms) &&
    favouriteFilms.addToFavorites
  ) {
    favouriteFilmsArr.push(favouriteFilms);
  } else {
    favouriteFilmsArr.splice(favouriteFilms, 1);
  }
};

// const watchLaterFilmsArr =
//   JSON.parse(window.localStorage.getItem("watchLaterFilmsArr")) || [];

// const findWatchLater = (id, array) => {
//   const watchLaterFilms = array.find((film) => (film.id = id));

//   watchLaterFilms.watchLater = !watchLaterFilms.watchLater;

//   if (watchLaterFilmsArr.includes(watchLaterFilms)) {
//     watchLaterFilmsArr.push(watchLaterFilms);
//   } else {
//     watchLaterFilmsArr.splice(watchLaterFilms, 1);
//   }
// };

elFilmsList.addEventListener("click", (evt) => {
  if (evt.target.matches(".favourite-icon")) {
    const clickedFavouriteFilms = Number(evt.target.dataset.filmId);

    findFavourites(clickedFavouriteFilms, films);

    evt.target.classList.toggle("add-to-favorites");

    window.localStorage.setItem(
      "favouriteFilms",
      JSON.stringify(favouriteFilmsArr)
    );
  }

  // if (evt.target.matches(".watch-later-icon")) {
  //   const clickedWatchLater = Number(evt.target.dataset.filmId);
  //   console.log(evt.target);

  //   findWatchLater(clickedWatchLater, films);

  //   window.localStorage.setItem(
  //     "watchLaterFilmsArr",
  //     JSON.stringify(watchLaterFilmsArr)
  //   );
  // }
});

elAsideFeatures.addEventListener("click", (evt) => {
  if (evt.target.matches(".trending")) {
    renderFilms(films, elFilmsList);
    findElement(".valid-inputs").classList.remove("invalid-inputs");
  }

  if (evt.target.matches(".favourites")) {
    renderFilms(favouriteFilmsArr, elFilmsList);

    findElement(".valid-inputs").classList.remove("invalid-inputs");
  }

  if (evt.target.matches(".watch-later")) {
    renderFilms(watchLaterFilmsArr, elFilmsList);

    findElement(".valid-inputs").classList.remove("invalid-inputs");
  }
});

var pagination = 0;
elPagination.addEventListener("click", (evt) => {
  if (evt.target.matches(".previous__page")) {
    if (pagination <= 1) {
      pagination = 1;
      const searchedValue = elFilmsSearchInput.value.trim();
      getFilms(searchedValue, pagination);
    } else {
      pagination--;
      const searchedValue = elFilmsSearchInput.value.trim();
      getFilms(searchedValue, pagination);
    }
  }

  if (evt.target.matches(".first__page")) {
    if (pagination >= 1) {
      pagination = 1;
      getFilms(searchedValue, pagination);
    } else {
      pagination++;
      getFilms(searchedValue, pagination);
    }
  }

  if (evt.target.matches(".second__page")) {
    if (pagination >= 2) {
      pagination = 2;
      getFilms(searchedValue, pagination);
    } else {
      pagination++;
      getFilms(searchedValue, pagination);
    }
  }

  if (evt.target.matches(".third__page")) {
    if (pagination >= 3) {
      pagination = 3;
      getFilms(searchedValue, pagination);
    } else {
      if ((pagination = 1)) {
        pagination = pagination + 2;
        getFilms(searchedValue, pagination);
      } else {
        pagination++;
        getFilms(searchedValue, pagination);
      }
    }
  }

  if (evt.target.matches(".next__page")) {
    pagination++;
    getFilms(searchedValue, pagination);
  }
});
