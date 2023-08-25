const APIToken =
  "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2YzJkYjdmYjlmMGZkODFlYWYwMzg4NTBiOTZkNjAyZSIsInN1YiI6IjY0ZTgxMTRlZTg5NGE2MDBjNzI4MzQwZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.j7OfqZlLm0eHzGUdwUoHC3qsZc_rNxKXy3Ibnu_vkMM";

const APIKey = "6c2db7fb9f0fd81eaf038850b96d602e";

//Golbal Path Level
const global = {
  currentPage: window.location.pathname,
};

//Highlight active Link

//init App
const init = () => {
  switch (global.currentPage) {
    case "/index.html":
    case "/":
      console.log("Home");
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
