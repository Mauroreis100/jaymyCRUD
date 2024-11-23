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
    sessionBD.forEach(movie => {
      const card = document.createElement('div');
      card.className = "movie-card";
      card.innerHTML = `
      <div class="card" style="width: 18rem;">
        <a href=${movie.Poster} target="_blank"><img class="card-img-top" src=${movie.Poster} alt="Card image cap"></a>
        <div class="card-body">
          <p class="card-text"><h1>${movie.Title}</h1><h3>${movie.Year}</h3></p>
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
          <p class="card-text"><h1>${movies.Title}</h1><h3>${movies.Year}</h3></p>
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
    console.log('New Movies:', sessionBD);
  }

}
fetchIMDBData(); //1º Carregamento ao armazenamento local

