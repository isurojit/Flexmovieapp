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
    div.classList.add = "card";
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
};

//Fetch data from TMDB API
const fetchAPIData = async (endpoint) => {
  const API_URL = "https://api.themoviedb.org/3/";

  const response = await fetch(
    `${API_URL}${endpoint}?api_key=${API_KEY}&language=en-US`
  );

  const data = await response.json();
  return data;
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
      console.log("Shows");
      break;
    case "/movie-details.html":
      console.log("Movies");
      break;
    case "/tv-details.html":
      console.log("Tv Shows");
      break;
    case "/search.html":
      console.log("Search");
      break;
  }
};

document.addEventListener("DOMContentLoaded", init);
