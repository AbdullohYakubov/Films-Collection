var elFilmsForm = document.querySelector(".films__form");
var elInputPoster = document.querySelector(".film__input--poster");
var elInputTitle = document.querySelector(".film__input--title");
var elInputOverview = document.querySelector(".film__input--overview");
var elInputReleaseDate = document.querySelector(".film__input--release_date");
var elInputGenres = document.querySelector(".film__input--genres");
var elFilmsList = document.querySelector(".films__list");

function normalizeReleaseDate(format) {
  var date = String(new Date(format).getDate()).padStart(2, 0);
  var month = String(new Date(format).getMonth() + 1).padStart(2, 0);
  var year = new Date(format).getFullYear();

  return date + "." + month + "." + year;
}

// function calculatePresentTime(format) {
//   var date = String(format.getDate()).padStart(2, 0);
//   var month = String(format.getMonth() + 1).padStart(2, 0);
//   var year = format.getFullYear();

//   return date + "." + month + "." + year;
// }

function renderFilms(_films, element) {
  element.innerHTML = null;

  for (var i = 0; i < _films.length; i++) {
    var newLi = document.createElement("li");
    var NewImg = document.createElement("img");
    var NewHeading = document.createElement("h1");
    var NewParagraph = document.createElement("p");
    var newTime = document.createElement("time");
    var newUl = document.createElement("ul");

    for (var j = 0; j < _films[i].genres.length; j++) {
      var newGenreLi = document.createElement("li");
      newGenreLi.textContent = _films[i].genres[j];
      newUl.appendChild(newGenreLi);
    }

    newLi.setAttribute("class", "film");
    NewImg.setAttribute("class", "film__poster");
    NewImg.setAttribute("src", _films[i].poster);
    NewImg.setAttribute("alt", _films[i].title + " poster");
    NewHeading.setAttribute("class", "film__title");
    NewParagraph.setAttribute("class", "film__overview");
    newTime.setAttribute("class", "film__release");
    newUl.setAttribute("class", "film__genres");

    NewHeading.textContent = _films[i].title;
    NewParagraph.textContent = _films[i].overview;
    newTime.textContent = normalizeReleaseDate(_films[i].release_date);

    newLi.appendChild(NewImg);
    newLi.appendChild(NewHeading);
    newLi.appendChild(NewParagraph);
    newLi.appendChild(newTime);
    newLi.appendChild(newUl);

    elFilmsList.appendChild(newLi);
  }
}

renderFilms(films, elFilmsList);

function handleFilmsFormSubmit(evt) {
  evt.preventDefault();
  var newFilmPoster = elInputPoster.value.trim();
  var newFilmTitle = elInputTitle.value.trim();
  var newFilmOverview = elInputOverview.value.trim();
  // var newFilmReleaseDate = calculatePresentTime(new Date());
  // var newFilmReleaseDate = elInputOverview.value.trim();
  var newFilmGenres = elInputGenres.value.trim().split(", ");

  var newFilm = {
    title: newFilmTitle,
    poster: newFilmPoster,
    overview: newFilmOverview,
    // release_date: newFilmReleaseDate,
    genres: newFilmGenres,
  };

  films.unshift(newFilm);

  renderFilms(films, elFilmsList);

  elInputPoster.value = null;
  elInputTitle.value = null;
  elInputOverview.value = null;
  elInputGenres.value = null;
  elInputReleaseDate.value = null;
}

elFilmsForm.addEventListener("submit", handleFilmsFormSubmit);
