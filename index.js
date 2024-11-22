async function fetchIMDBData() {
  const apiKey = 'apikey 6Kt1sfLrUqNhe4W94HcKMW:7IpNljkbED6o5jnriHRt1r';
  const query = 'Avengers';  
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

    movieData.forEach(movie => {
      const card = document.createElement('div');
      card.className = "card";
      card.innerHTML = `
        <div class="card" style="width: 18rem;">
          <a href=${movie.Poster}><img class="card-img-top" src=${movie.Poster} alt="Card image cap"></a>
          <div class="card-body">
            <p class="card-text"><h1>${movie.Title}</h1><h3>${movie.Year}</h3></p>
          </div>
        </div>
      `;
      card.style.height = 250;
      document.body.appendChild(card);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchIMDBData();