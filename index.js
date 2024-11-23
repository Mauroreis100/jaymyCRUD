// Projecto PWEB2 - Amadeu, Joaquim, Mauro,, Yannick, Yula - LECC31 2024
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

let sessionBD = [{}]
async function fetchIMDBData(name) {
  if (name) {
    query = name;
  } else {
    query = "Avengers"
  }
  console.log(`QUERY: ${query}`)
  const apiKey = 'apikey 6Kt1sfLrUqNhe4W94HcKMW:7IpNljkbED6o5jnriHRt1r';
  const url = `https://api.collectapi.com/imdb/imdbSearchByName?query=${encodeURIComponent(query)}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'authorization': `apikey ${apiKey}`,
        'content-type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error();
    }
//Carremamento ao LocalStorageSession 
    const data = await response.json();
    console.log('Fetched Data:', data);
    const movieData = data.result;
    sessionStorage.setItem('movies', JSON.stringify(movieData))
    sessionBD = JSON.parse(sessionStorage.getItem('movies') || '[]');
    listIMDBData()
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

//Faz a listagem do sessionStorage
function listIMDBData() {
  let cards = []
  sessionBD = JSON.parse(sessionStorage.getItem('movies') || '[]');
  console.log('Movies:', sessionBD);

  //Renderização dos elementos no session storage
  if (sessionBD.length != 0) {
    sessionBD.forEach((movie,index) => {
      const card = document.createElement('div');
      card.className = "movie-card";
      card.innerHTML = `
      <div class="card" style="width: 18rem;">
        <a href=${movie.Poster} target="_blank"><img class="card-img-top" src=${movie.Poster} alt="Card image cap"></a>
        <div class="card-body">

<div class="dropdown">
  <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
  </button>
  <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
    <li><a class="dropdown-item" onclick="editMovie(${index})" href="#">Editar</a></li>
  </ul>
</div>


 <p class="card-text"><h2>${movie.Title}</h2><h3><span class="badge bg-secondary"> ${movie.Year}</span> </h3></p>
        </div>
      </div>
    `;

      cards.push(card)

    });

  } else { 
    //Tela de conteúdo não encontrado
    const errorView = document.createElement('div');
    errorView.errorView = "movie-card";
    errorView.innerHTML = `
      <div class="error-message" style="position: center;">
        <h1>Movie Not found :( ${name}</h1>
      </div>
    `;
    cards.push(errorView)
    console.log(`No media encountered named ${name}`)
  }

  let list = document.getElementById("list")
  removeAllChildNodes(list)
  cards.forEach(card => {
    list.appendChild(card, list.firstChild);
  });



}

// Função de procura de filmes por nome
function searchLocal(name) {
  sessionBD = JSON.parse(sessionStorage.getItem('movies') || '[]');
  let cards = []
  sessionBD.forEach(movies => {
    if (movies.Title.includes(name)) {
      console.log("Encontrado" + movies.Title)
      const card = document.createElement('div');
      card.className = "movie-card";
      card.innerHTML = `
      <div class="card" style="width: 18rem;">
        <a href=${movies.Poster} target="_blank"><img class="card-img-top" src=${movies.Poster} alt="Card image cap"></a>
        <div class="card-body">
          <p class="card-text"><h1>${movies.Title}</h1><h3><span class="badge bg-secondary"> ${movies.Year}</span> </h3></p>
        </div>
      </div>
    `;

      cards.push(card)
    }
  });
  if (cards == 0) {
    const errorView = document.createElement('div');
    errorView.errorView = "movie-card";
    errorView.innerHTML = `
          <div class="error-message" style="position: center;">
            <h1>Movie Not found :( ${name}</h1>
          </div>
        `;
    cards.push(errorView)
    console.log(`No media encountered named ${name}`)


  }
  let list = document.getElementById("list")
  removeAllChildNodes(list)
  cards.forEach(card => {
    list.appendChild(card, list.firstChild);
  });
}

// Se filme existir na IMDb, deve buscar os dados da IMDb e criar um novo registro na base de dados local.
async function addIMBDData(title, year, type, poster) {
  const spinner = document.getElementById("loadingSpinner");
  // spinner.style.display = "flex"; // Show spinner
  sessionBD = JSON.parse(sessionStorage.getItem('movies') || '[]');
  
  const apiKey = 'apikey 6Kt1sfLrUqNhe4W94HcKMW:7IpNljkbED6o5jnriHRt1r';
  const url = `https://api.collectapi.com/imdb/imdbSearchByName?query=${encodeURIComponent(title)}`;
  try {
    const response = await fetch(url, {
      method: 'GET',
      headers: {
        'authorization': `apikey ${apiKey}`,
        'content-type': 'application/json'
      }
    });

    if (!response.ok) {
      throw new Error();
    }
    
    const data = await response.json();
    console.log('Fetched Data:', data);
    if(data.result!=''){ //Se encontra no IMDb
      const movieData = data.result;
      sessionBD.push(movieData[0])
      alert(`Movie ${movieData[0].Title} found on IMDb! - Added to Local DataBase`)
      document.getElementById('modalClose').click()
      sessionStorage.setItem('movies', JSON.stringify(sessionBD))
    }else{ //Se não encontra on IMDb
      newMovie = {
        Title: title,
        Year: year,
        imdbID: Math.floor(Math.random() * (100000000 - 0 + 1)) + 0,
        Type: type,
        Poster: poster
      }

      sessionBD.push(newMovie)
      sessionStorage.setItem('movies', JSON.stringify(sessionBD))
      alert(`Movie ${title} found on IMDb! - Added to Local DataBase`)
      document.getElementById('modalClose').click()
    }
  } catch (error) {
    console.error('Error fetching data:', error);
  }finally{
    listIMDBData()
    // spinner.style.display = "none"; // Hide spinner
    console.log('New Movies:', sessionBD);
  }

}

function editMovie(index) {
  console.log(index)
  // Get the current session storage data
  sessionBD = JSON.parse(sessionStorage.getItem('movies') || '[]');

  // Ensure the index is valid
  if (index < 0 || index >= sessionBD.length) {
    console.error(`Invalid index: ${index}. No movie found.`);
    
  }
   const modalHTML = `<div class="modal fade" id="dynamicModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Edit "${sessionBD[index].Title}" movie</h5>

          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          
          <div id="movie-form" style="padding-right: 7px;">
            <form id="addMovieForm" class="" style="display: flow;" >
                <div class="mb-3">
                    <label for="name" class="form-label">Movie Title</label>
                    <input type="text" class="form-control" value="" id="editTitle" required>
                </div>
                <div class="mb-3">
                    <label for="category" class="form-label">Type</label>
                    <input type="text" class="form-control" value="${sessionBD[index].Type}" id="editType" required>
                </div>
                <div class="mb-3">
                    <label for="year" class="form-label">Year</label>
                    <input type="number" class="form-control" value="${sessionBD[index].Year}" id="editYear" required>
                </div>
                <div class="mb-3">
                    <label for="image" class="form-label">Image URL</label>
                    <input type="text" class="form-control" value="${sessionBD[index].Poster}" id="editImageURL" required>
                </div>
           
              </form>
            </div>
          </div>
          <div class="modal-footer">
          <button id="editId"  type="button" onclick="const editImageURL = document.getElementById('imageURL').value; const editYear = document.getElementById('editYear').value;const editTitle = document.getElementById('editTitle').value;const editType = document.getElementById('editType').value; editIMBDData(editTitle, editYear, editType,editImageURL)" class="btn btn-success">Confirm edit</button>
          <button id="modalClose2" type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        </div>
      </div>
    </div>
  </div>`

  document.body.insertAdjacentHTML("beforeend", modalHTML);
  // Initialize the modal using Bootstrap's JavaScript API
  const dynamicModal = new bootstrap.Modal(document.getElementById("dynamicModal"));
  dynamicModal.show();
  
document.getElementById("editTitle").value=sessionBD[index].Title
document.getElementById("editYear").value=sessionBD[index].Year
document.getElementById("editType").value=sessionBD[index].Type
document.getElementById("editImageURL").value=sessionBD[index].Poster

  document.getElementById("editId").onclick = function() {
    updatedMovie={
      Title: editTitle.value,
      Year: editYear.value,
      Type: editType.value,
      Poster: editImageURL.value,
      imdbID: sessionBD[index].imdbID
    }
    // Update the movie data at the given index with new properties
    sessionBD[index] =updatedMovie
    console.log(updatedMovie)
  
    //Save the updated data back to sessionStorage
    sessionStorage.setItem('movies', JSON.stringify(sessionBD));
    // // Refresh the list to show the updated movie data
    document.getElementById('modalClose2').click()
    listIMDBData();
};


  console.log(`Movie at index ${index} updated successfully!`, sessionBD[index]);
}

setTimeout(() => {
  listIMDBData()
}, 2000);


fetchIMDBData(); //1º Carregamento ao armazenamento local
// console.log(editMovie(2))

