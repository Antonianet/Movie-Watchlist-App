const inputBox = document.getElementById("input-box");
const MovieGenre = document.getElementById("genre");
const AddButton = document.getElementById("add-button");
const listContainer = document.getElementById("list-container");

let movies = JSON.parse(localStorage.getItem("movies")) || [];
AddButton.addEventListener("click", AddMovie);

function AddMovie() {
    const filmname = inputBox.value.trim();
    const genre = MovieGenre.value;

    if (filmname === "" || genre === "choose_genre") {
        alert("Введи назву фільму та вибери жанр!");
        return;
    }

    const movie = { name: filmname, genre: genre, watched: false };
    movies.push(movie);

    inputBox.value = "";
    MovieGenre.value = "choose_genre";

    saveAndRender(); 
}
function saveAndRender() {
  localStorage.setItem("movies", JSON.stringify(movies));
  renderMovies();
}
function renderMovies() {
  listContainer.innerHTML = "";
  movies.forEach((movie, index) => {
    const li = document.createElement("li");

    li.innerHTML = `
      <span>${movie.name} (${movie.genre})</span>
      <button onclick="toggleWatched(${index})">
        ${movie.watched ? "✅ Переглянуто" : "👁 Переглянути"}
      </button>
      <button onclick="deleteMovie(${index})">🗑️ Видалити</button>
    `;

    listContainer.appendChild(li);
  });
}
function toggleWatched(index) {
  movies[index].watched = !movies[index].watched;
  saveAndRender();
}
function deleteMovie(index) {
  movies.splice(index, 1);
  saveAndRender();
}
