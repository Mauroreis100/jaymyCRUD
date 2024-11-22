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

    let list = document.getElementById("list")
    list.replaceChild(<div></div>, list.firstChild);
    cards.forEach(card =>{
      list.appendChild(card, list.firstChild);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchIMDBData();

