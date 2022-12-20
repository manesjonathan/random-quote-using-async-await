const main = document.querySelector("main")
const article = document.createElement("article");

const generateButton = document.querySelector(".generate-button")
generateButton.addEventListener("click", () => generateQuote());

async function generateQuote() {
    article.innerHTML = null;
    try {
        const response = await fetch("https://thatsthespir.it/api");
        const quote = await response.json();
        const spinner = document.createElement("div");
        spinner.className = "spinner";
        article.appendChild(spinner);
        main.prepend(article);

        const presumedAge = await fetchName(quote.author.split(" ")[0]);
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

    if (quote.photo.length > 0) {
        console.log(quote.photo);
        let img = document.createElement("img");
        let author = quote.author;
        img.setAttribute("src", quote.photo);
        img.setAttribute("alt", `Picture of ${author}`);
        blockquote.appendChild(img);
    }
    article.appendChild(figure);
}

async function fetchName(name) {
    let response = await fetch("https://api.agify.io/?name=" + name);
    let data = await response.json();
    return data.age;
}

generateQuote();
