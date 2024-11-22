async function getData() {
  const url = "https://imdb-api.projects.thetuhin.com/search?query=Avengers";
  try {
    const response = await fetch(url, {mode:"no-cors"});
    if (!response.ok) {
      throw new Error(`Response status: ${response.status}`);
    }

    const json = await response.json();
    console.log(json);
  } catch (error) {
    console.error(error.message);
  }
}

getData()
