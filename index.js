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

      if (data.success && data.result.length > 0) {
          const resultsContainer = document.getElementById('results');

          data.result.forEach(item => {
              const col = document.createElement('div');
              col.className = 'col-md-2 mb-4';

              col.innerHTML = `
                  <div class="card h-60 rounded-0 border-0 shadow-sm poster-card " style="background:#141414;">
                      <a href="https://www.imdb.com/title/${item.imdbID}/?ref_=fn_al_tt_1" target="_blank">
                          <img src="${item.Poster}" class="card-img-top rounded-0 poster" alt="${item.Title}">
                      </a>
                      <div class="card-body text-white">
                          <h6 class="card-title">${item.Title}</h6>
                          <p class="card-text" style="font-size: 0.780rem">${item.Year} ${item.Type}</p>
                      </div>
                  </div>
              `;
              resultsContainer.appendChild(col);
          });
      } else {
          console.error('No results found:', data.message || 'Unknown error');
      }
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

fetchIMDBData();