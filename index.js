fetch("https://api.collectapi.com/imdb/imdbSearchByName?query=Avengers", {
    method: "GET",
    headers: {
      "content-type": "application/json",
      authorization: "apikey 3qD0Y8zSDgIFKcbh0NJ3yy:6rXFRh4FvlGl4d4k1tWml4",
    },
    credentials:"omit"
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((data) => console.log(data))
    .catch((error) => console.error("Error:", error));
  