var data = null;

var xhr = new XMLHttpRequest();
xhr.withCredentials = true;

xhr.addEventListener("readystatechange", function () {
  if (this.readyState === this.DONE) {
    console.log(this.responseText);
  }
});

xhr.open("GET", "https://api.collectapi.com/imdb/imdbSearchByName?query=Avengers");
xhr.setRequestHeader("content-type", "application/json");
xhr.setRequestHeader("authorization", "apikey 3qD0Y8zSDgIFKcbh0NJ3yy:6rXFRh4FvlGl4d4k1tWml4");

xhr.send(data);