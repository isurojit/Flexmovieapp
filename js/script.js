//User Your own Key by registering on tmdb.org
const API_TOKEN =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzJkYjdmYjlmMGZkODFlYWYwMzg4NTBiOTZkNjAyZSIsInN1YiI6IjY0ZTgxMTRlZTg5NGE2MDBjNzI4MzQwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j7OfqZlLm0eHzGUdwUoHC3qsZc_rNxKXy3Ibnu_vkMM";
const API_KEY = "6c2db7fb9f0fd81eaf038850b96d602e";

//Golbal Path Level
const global = {
  currentPage: window.location.pathname,
  search: {
    term: "",
    type: "",
    page: 1,
    totalPages: 1,
  },
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

//Display Movie
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
            src="https://image.tmdb.org/t/p/w780${movie.poster_path}"
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
        src="https://image.tmdb.org/t/p/w780${tvShows.poster_path}"
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

  //Overlay For Background Image
  displayBgImg("movie", movieData.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
          <div>
          ${
            movieData.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w780${movieData.poster_path}"
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
            <a href="${
              movieData.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
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
};

//Tv details
const tvDetails = async () => {
  const id = window.location.search.split("=")[1];
  const tvData = await fetchAPIData(`tv/${id}`);

  //Overlay For Background Image
  displayBgImg("tv", tvData.backdrop_path);

  const div = document.createElement("div");
  div.innerHTML = `
  <div class="details-top">
          <div>
          ${
            tvData.poster_path
              ? `<img
            src="https://image.tmdb.org/t/p/w780${tvData.poster_path}"
            class="card-img-top"
            alt="${tvData.name}"
            />`
              : `<img
            src="images/no-image.jpg"
            class="card-img-top"
            alt="${tvData.name}"
            />`
          }
          </div>
          <div>
            <h2>${tvData.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${Math.round(tvData.vote_average)}
            </p>
            <p class="text-muted">Release Date: ${tvData.first_air_date}</p>
            <p>${tvData.overview}</p>
            <h5>Genres</h5>
            <ul class="list-group">
              ${tvData.genres.map((gener) => `<li>${gener.name}</li>`).join("")}
            </ul>
            <a href="${
              tvData.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number Of Episodes: </span> ${
              tvData.number_of_episodes
            }</li>
            <li>
              <span class="text-secondary">Last Episode Air Date: </span> ${
                tvData.last_episode_to_air.air_date
              }
            </li>
            <li>
              <span class="text-secondary">Last Episode To Air: </span>${
                tvData.last_episode_to_air.name
              } 
            </li>
            <li><span class="text-secondary">Status: </span> ${
              tvData.status
            }</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">${tvData.production_companies
            .map((company) => `<span>${company.name}</span>, `)
            .join("")}</div>
        </div>
  `;
  document.querySelector("#show-details").appendChild(div);
};

//Display backdrop On Details Pages
const displayBgImg = (type, bgPath) => {
  const overlayDiv = document.createElement("div");
  overlayDiv.style.backgroundImage = `url(https://image.tmdb.org/t/p/original/${bgPath})`;
  overlayDiv.style.backgroundSize = "cover";
  overlayDiv.style.backgroundPosition = "no-repeat";
  overlayDiv.style.height = "100vh";
  overlayDiv.style.width = "100vw";
  overlayDiv.style.position = "absolute";
  overlayDiv.style.top = "0";
  overlayDiv.style.left = "0";
  overlayDiv.style.zIndex = "-1";
  overlayDiv.style.opacity = "0.1";

  if (type === "movie") {
    document.querySelector("#movie-details").appendChild(overlayDiv);
  } else {
    document.querySelector("#show-details").appendChild(overlayDiv);
  }
};

//Search Data
const search = async () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  global.search.type = urlParams.get("type");
  global.search.term = urlParams.get("search-term");
  if (global.search.term !== "" && global.search.term !== null) {
    //todo- make request and display result
    const { results, total_pages, total_results } = await searchAPIData();
    if (results.length === 0) {
      showAlert("No Results Found");
    }
    displaySearchResults(results);
    document.querySelector("#search-term").value = "";
  } else {
    showAlert("Please enter a search term");
  }
};

//Display search results
const displaySearchResults = (results) => {
  results.forEach((result) => {
    const div = document.createElement("div");
    div.classList.add("card");
    div.innerHTML = `
    <a href="${global.search.type}-details.html?id=${result.id}">
    ${
      result.poster_path
        ? `<img
        src="https://image.tmdb.org/t/p/w780${result.poster_path}"
        class="card-img-top"
        alt="${global.search.type === "movie" ? result.title : result.name}"
        />`
        : `<img
        src="images/no-image.jpg"
        class="card-img-top"
        alt="${global.search.type === "movie" ? result.title : result.name}"
        />`
    }
    </a>
    <div class="card-body">
      <h5 class="card-title">${
        global.search.type === "movie" ? result.title : result.name
      }</h5>
      <p class="card-text">
        <small class="text-muted">Aired: ${
          global.search.type === "movie"
            ? result.release_date
            : result.first_air_date
        }</small>
      </p>
    </div>`;
    document.querySelector("#search-results").appendChild(div);
  });
};

//Display Slider Movie
const displaySlider = async () => {
  const { results } = await fetchAPIData("movie/now_playing");

  results.forEach((movie) => {
    const div = document.createElement("div");
    div.classList.add("swiper-slide");

    div.innerHTML = `
      <a href="movie-details.html?id=${movie.id}">
        <img src="https://image.tmdb.org/t/p/w780${movie.poster_path}" alt="${movie.title}" />
      </a>
      <h4 class="swiper-rating">
        <i class="fas fa-star text-secondary"></i> ${movie.vote_average} / 10
      </h4>
    `;

    document.querySelector(".swiper-wrapper").appendChild(div);

    initSwiper();
  });
};

const initSwiper = () => {
  const swiper = new Swiper(".swiper", {
    a11y: {
      prevSlideMessage: "Previous slide",
      nextSlideMessage: "Next slide",
    },
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
};

//Fetch data from TMDB API
const fetchAPIData = async (endpoint) => {
  const API_URL = "https://api.themoviedb.org/3/";
  showSpinner();
  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );
  const data = await response.json();
  setTimeout(function () {
    hideSpinner();
  }, 500);
  return data;
};

//Search Api Data
const searchAPIData = async () => {
  const API_URL = "https://api.themoviedb.org/3/";
  showSpinner();
  const response = await fetch(
    `${API_URL}search/${global.search.type}?api_key=${API_KEY}&language=en-US&query=${global.search.term}`
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

//Show Alert
const showAlert = (msg, classname = "error") => {
  const alertEl = document.createElement("div");
  alertEl.classList.add("alert", classname);
  alertEl.appendChild(document.createTextNode(msg));
  document.querySelector("#alert").appendChild(alertEl);
  setTimeout(() => {
    alertEl.remove();
  }, 2000);
};

//init App
const init = () => {
  //Highlight active link
  highlightActiveLink();

  //Router Details
  switch (global.currentPage) {
    case "/index.html":
    case "/":
      displaySlider();
      displayPopularMovies();
      break;
    case "/shows.html":
      displayTVShows();
      break;
    case "/movie-details.html":
      displayDetails();
      break;
    case "/tv-details.html":
      tvDetails();
      break;
    case "/search.html":
      search();
      break;
  }
};
document.addEventListener("DOMContentLoaded", init);
