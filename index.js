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
        <h3>${movie.Title} (${movie.Year})</h3>
        <img src="${movie.Poster}" alt="${movie.Title}">
        <p>Type: ${movie.Type}</p>
      `;
      document.body.appendChild(card);
    });

  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchIMDBData();