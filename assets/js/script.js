const main = document.querySelector("main")
const generateButton = document.querySelector(".generate-button")
generateButton.addEventListener("click", () => generateQuote());

async function generateQuote() {
    try {
        let response = await fetch("https://thatsthespir.it/api");
        let quote = await response.json();
        let article = document.createElement("article");
        let spinner = document.createElement("div");
        spinner.className = "spinner";
        article.appendChild(spinner);
        main.prepend(article);

        let presumedAge = await fetchName(quote.author.split(" ")[0]);
        displayQuote(article, quote, presumedAge);
        spinner.style.display = "none";

    } catch (error) {
        window.alert(error);
    }
}

function displayQuote(article, quote, presumedAge) {
    let figure = document.createElement("figure");
    let blockquote = document.createElement("blockquote");
    blockquote.setAttribute("cite", "https://thatsthespir.it/")
    let h2 = document.createElement("h2");
    let h4 = document.createElement("h4");

    h2.innerText = quote.quote;
    h4.innerText = quote.author + "\n" + "Presumed age: " + presumedAge + " years old";

    blockquote.appendChild(h2);
    figure.appendChild(blockquote);
    blockquote.appendChild(h4);
    article.appendChild(figure);
}

async function fetchName(name) {
    let response = await fetch("https://api.agify.io/?name=" + name);
    let data = await response.json();
    return data.age;
}

generateQuote();