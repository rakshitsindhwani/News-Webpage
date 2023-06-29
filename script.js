const API_key = "c7067f38ef634edabae093e432d9022e";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load" , () => fetchNews("India"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_key}`);
    const data = await res.json() ;
    bindData(data.articles);
}

function bindData(articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainer.innerHTML = "";

    articles.forEach((articles) => {
        if (!articles.urlToImage) return ;
        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataincard(cardClone , articles);
        cardsContainer.appendChild(cardClone);
    });
}

function fillDataincard(cardClone , _articles){
    const newsimg = cardClone.querySelector('#news-img');
    const newstitle = cardClone.querySelector('#news-title');
    const newssource = cardClone.querySelector('#news-source');
    const newsdesc = cardClone.querySelector('#news-desc');

    newsimg.src = _articles.urlToImage;
    newstitle.innerHTML = _articles.title;
    newsdesc.innerHTML = _articles.description;

    const date = new Date(_articles.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newssource.innerHTML = `${_articles.source.name} · ${date}`;

    cardClone.firstElementChild.addEventListener("click", () => {
        window.open(_articles.url, "_blank");
    });
}

function onnavitemclick(id){
       fetchNews(id);
}

const searchButton = document.getElementById("search-button");
const searchText = document.getElementById("search-text");

searchButton.addEventListener("click", () => {
    const query = searchText.value;
    if (!query) return;
    fetchNews(query);
});

