//User Your own Key by registering on tmdb.org
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzJkYjdmYjlmMGZkODFlYWYwMzg4NTBiOTZkNjAyZSIsInN1YiI6IjY0ZTgxMTRlZTg5NGE2MDBjNzI4MzQwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j7OfqZlLm0eHzGUdwUoHC3qsZc_rNxKXy3Ibnu_vkMM";
const API_KEY = "6c2db7fb9f0fd81eaf038850b96d602e";

//Golbal Path Level
const global = {
  currentPage: window.location.pathname,
};

//Highlight active Link
const highlightActiveLink = () => {
  const links = document.querySelectorAll(".nav-link");
  links.forEach((link) => {
    if (link.getAttribute("href") === global.currentPage) {
      link.classList.add("active");
    }
  });
};

const displayPopularMovies = async () => {
  const { results } = await fetchAPIData("movie/popular");
  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="movie-details.html?id=${movie.id}">
        ${
          movie.poster_path
            ? `<img
            src="https://image.tmdb.org/t/p/w300${movie.poster_path}"
            class="card-img-top"
            alt="Movie Title"
            />`
            : `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${movie.title}"
            />`
        }
    </a>
  <div class="card-body">
    <h5 class="card-title">${movie.title}</h5>
    <p class="card-text">
      <small class="text-muted">${movie.release_date}</small>
    </p>
  </div>`;
    document.querySelector("#popular-movies").appendChild(div);
  });
  console.log(results[0]);
};

const displayTVShows = async () => {
  const { results } = await fetchAPIData("tv/popular");
  results.forEach((tvShows) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="tv-details.html?id=${tvShows.id}">
    ${
      tvShows.poster_path
        ? `<img
        src="https://image.tmdb.org/t/p/w300${tvShows.poster_path}"
        class="card-img-top"
        alt="Movie Title"
        />`
        : `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${tvShows.title}"
        />`
    }
    </a>
    <div class="card-body">
      <h5 class="card-title">${tvShows.original_name}</h5>
      <p class="card-text">
        <small class="text-muted">Aired: ${tvShows.first_air_date}</small>
      </p>
    </div>`;
    document.querySelector("#popular-shows").appendChild(div);
  });
};

//Display details
const displayDetails = async () => {
  const id = window.location.search.split("=")[1];
  const movieData = await fetchAPIData(`movie/${id}`);

  const div = document.createElement("div");
  const li = document.createElement("li");
  div.innerHTML = `
  <div class="details-top">
          <div>
          ${
            movieData.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w300${movieData.poster_path}"
            class="card-img-top"
            alt="${movieData.title}"
            />`
              : `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${movieData.title}"
            />`
          }
          </div>
          <div>
            <h2>${movieData.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
               ${movieData.vote_average}
            </p>
            <p class="text-muted">Release Date: ${movieData.release_date}</p>
            <p>
            ${movieData.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${movieData.genres
                .map((gener) => `<li>${gener.name}</li>`)
                .join("")}
            </ul>
            <a href="https://www.acrossthespiderverse.movie"" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${addCommasToNumbers(
              movieData.budget
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${addCommasToNumbers(
              movieData.revenue
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movieData.runtime
            }</li>
            <li><span class="text-secondary">Status:</span> ${
              movieData.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${movieData.production_companies.map(
            (company) => ` <span>${company.name}</span>`
          )}</div>
        </div>
  `;
  document.querySelector("#movie-details").appendChild(div);
  console.log(movieData);
};

//Fetch data from TMDB API
const fetchAPIData = async (endpoint) => {
  const API_URL = "https://api.themoviedb.org/3/";
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US&watch_region=US`
  );
  const data = await response.json();
  setTimeout(function () {
    hideSpinner();
  }, 500);
  return data;
};

//Show Spinner
const showSpinner = () => {
  document.querySelector(".spinner").classList.add("show");
};

//Hide Spinner
const hideSpinner = () => {
  document.querySelector(".spinner").classList.remove("show");
};

//Add commas to numbers
const addCommasToNumbers = (number) => {
  return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

//init App
const init = () => {
  //Highlight active link
  highlightActiveLink();

  //Router Details
  switch (global.currentPage) {
    case "/index.html":
    case "/":
      displayPopularMovies();
      break;
    case "/shows.html":
      displayTVShows();
      break;
    case "/movie-details.html":
      displayDetails();
      break;
    case "/tv-details.html":
      console.log("Shows");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }
};
document.addEventListener("DOMContentLoaded", init);
