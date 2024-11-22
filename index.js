async function getData(name) {
    if(name!=null){
         url = `https://imdb-api.projects.thetuhin.com/search?query=${name}`;
    }else{
        const url = `https://imdb-api.projects.thetuhin.com/search?query=Avengers`;
    }
    
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Response status: ${response.status}`);
      }
  
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error.message);
    }
}

getData("Avengers")
  