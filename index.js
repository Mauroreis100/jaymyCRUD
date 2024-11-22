function removeAllChildNodes(parent) {
  while (parent.firstChild) {
      parent.removeChild(parent.firstChild);
  }
}


async function fetchIMDBData(name) {

  if(name){
    query = name;
  }else{
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
    let cards = []
    if(movieData!=0){
      movieData.forEach(movie => {
        
        const card = document.createElement('div');
        card.className = "movie-card";
        card.innerHTML = `
          <div class="card" style="width: 18rem;">
            <a href=${movie.Poster}><img class="card-img-top" src=${movie.Poster} alt="Card image cap"></a>
            <div class="card-body">
              <p class="card-text"><h1>${movie.Title}</h1><h3>${movie.Year}</h3></p>
            </div>
          </div>
        `;
  
        cards.push(card)
  
      });
      
    }else{
      const errorView = document.createElement('div');
      errorView.errorView = "movie-card";
      errorView.innerHTML = `
          <div class="error-message" style="position: center;">
            <h1>Erro 404 - No Media named ${name}</h1>
          </div>
        `;
        cards.push(errorView)
      console.log(`No media encountered named ${name}`)
    }
    
      let list = document.getElementById("list")
      removeAllChildNodes(list)
      cards.forEach(card =>{
        list.appendChild(card, list.firstChild);
      });
   
  

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchIMDBData();

