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
  } catch (error) {
      console.error('Error fetching data:', error);
  }
}

fetchIMDBData();