let colors = ["#6c757d", "#495057", "#343a40"];
let currentColorIndex = -1;

const main = document.querySelector("main")
const generateButton = document.querySelector(".generate-button")
generateButton.addEventListener("click", () => generatedQuote());

async function generatedQuote() {
    try {
        let response = await fetch("https://thatsthespir.it/api");
        let quote = await response.json();

        displayQuote(quote);

    } catch (error) {
        window.alert(error);
    }
}

function displayQuote(quote) {
    let article = document.createElement("article");
    let figure = document.createElement("figure");
    let blockquote = document.createElement("blockquote");
    blockquote.setAttribute("cite", "https://thatsthespir.it/")
    let p = document.createElement("p");
    let figcaption = document.createElement("figcaption");
    let newtIndex = ++currentColorIndex % colors.length;
    console.log(newtIndex);

    if (newtIndex !== 3) {
        article.style.backgroundColor = colors[newtIndex];

    } else {
        console.log(colors);
        colors.reverse();
        console.log(colors);
    }


    p.innerText = quote.quote;
    figcaption.innerHTML = quote.author;

    blockquote.appendChild(p);
    figure.appendChild(blockquote);
    figure.appendChild(figcaption);
    article.appendChild(figure);
    main.prepend(article);
}


/*!
 * Get the contrasting color for any hex color
 * (c) 2019 Chris Ferdinandi, MIT License, https://gomakethings.com
 * Derived from work by Brian Suda, https://24ways.org/2010/calculating-color-contrast/
 * @param  {String} A hexcolor value
 * @return {String} The contrasting color (black or white)
 */
var getContrast = function (hexcolor) {

    // If a leading # is provided, remove it
    if (hexcolor.slice(0, 1) === '#') {
        hexcolor = hexcolor.slice(1);
    }

    // If a three-character hexcode, make six-character
    if (hexcolor.length === 3) {
        hexcolor = hexcolor.split('').map(function (hex) {
            return hex + hex;
        }).join('');
    }

    // Convert to RGB value
    var r = parseInt(hexcolor.substr(0, 2), 16);
    var g = parseInt(hexcolor.substr(2, 2), 16);
    var b = parseInt(hexcolor.substr(4, 2), 16);

    // Get YIQ ratio
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;

    // Check contrast
    return (yiq >= 128) ? 'black' : 'white';

};