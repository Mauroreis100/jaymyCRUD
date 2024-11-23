function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

let sessionBD=[{}]
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
    const data = await response.json();
    console.log('Fetched Data:', data);
    const movieData = data.result;
    sessionStorage.setItem('movies', JSON.stringify(movieData))
    sessionBD = JSON.parse(sessionStorage.getItem('movies') || '[]');

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function listIMDBData(){
  let cards = []
sessionBD = JSON.parse(sessionStorage.getItem('movies') || '[]');
console.log('Movies:', sessionBD);

// if (sessionBD.length != 0) {
//   sessionBD.forEach(movie => {
//     const card = document.createElement('div');
//     card.className = "movie-card";
//     card.innerHTML = `
//       <div class="card" style="width: 18rem;">
//         <a href=${movie.Poster} target="_blank"><img class="card-img-top" src=${movie.Poster} alt="Card image cap"></a>
//         <div class="card-body">
//           <p class="card-text"><h1>${movie.Title}</h1><h3>${movie.Year}</h3></p>
//         </div>
//       </div>
//     `;

//     cards.push(card)

//   });

// } else {
//   const errorView = document.createElement('div');
//   errorView.errorView = "movie-card";
//   errorView.innerHTML = `
//       <div class="error-message" style="position: center;">
//         <h1>Movie Not found :( ${name}</h1>
//       </div>
//     `;
//   cards.push(errorView)
//   console.log(`No media encountered named ${name}`)
// }

// let list = document.getElementById("list")
// removeAllChildNodes(list)
// cards.forEach(card => {
//   list.appendChild(card, list.firstChild);
// });




}



function searchLocal(name){
  sessionBD = JSON.parse(sessionStorage.getItem('movies') || '[]');
  console.log('Searcg local:', sessionBD[0].Title);
  sessionBD.forEach(movies => {
    if (movies.Title==name) {
      console.log("Found")
  
    } else {

    }
 });
}


function fetchLocal(){
  /*
      if (movieData != 0) {
      movieData.forEach(movie => {
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



  } catch (error) {
    console.error('Error fetching data:', error);
  } */
}

function addIMBDData() {
  newMovie = {
    Title: 'Mauro',
    Year: 2002,
    imdbID: "tt4154796",
    Type: "movie",
    Poster: "https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"
  }

  sessionStorage.setItem('movies',newMovie)
}
fetchIMDBData();
listIMDBData()
searchLocal('The Avengers')
addIMBDData()

