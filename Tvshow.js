const tvShows = async (searchString) => {
    const resultsContainer = document.getElementById('results');
    resultsContainer.innerHTML = ''; 

    if (!searchString) {
        const defaultUrl = 'https://static.tvmaze.com/uploads/images/medium_portrait/475/1188298.jpg'; // Replace with your default movie image URL
        const defaultRating = '8.9'; 
        const dname = "One peice";
        const dgens = "Action";


        const defaultContainer = document.createElement("div");
        const dgen = document.createElement("div");
        const dnm = document.createElement("h2");
        const defaultImg = document.createElement("img");
        const defaultRatingElem = document.createElement("p");

        dgen.classList.add("gons");
        defaultContainer.classList.add('show-container');

        dgen.textContent=`Genres: ${dgens ? dgens : 'N/A'}`
        defaultImg.src = defaultUrl;
        dnm.textContent = dname;
        defaultRatingElem.textContent = `Rating: ${defaultRating}`;
        defaultRatingElem.style.marginLeft = "9px";
        defaultRatingElem.style.fontSize = "large";
        defaultRatingElem.style.fontFamily = 'Lucida Sans Unicode';

        resultsContainer.appendChild(dnm);
        defaultContainer.appendChild(defaultImg);
        defaultContainer.appendChild(defaultRatingElem);
        defaultContainer.appendChild(dgen)

        resultsContainer.appendChild(defaultContainer);
    }
    
    
    else {
        const res = await axios.get(`https://api.tvmaze.com/search/shows?q=${searchString}`);
        const shows = res.data;
        console.log(shows[0])
        for (let result of shows) {
            if (result.show.image) {
                const name = result.show.name;
                const url = result.show.image.medium;
                const rating = result.show.rating.average;
                const gens = result.show.genres[0];

                const gen = document.createElement("div");
                const nm = document.createElement("h2");
                const container = document.createElement("div");
                const ratingElem = document.createElement("p");
                const img = document.createElement("img");

                gen.classList.add("gons");
                container.classList.add('show-container');
                ratingElem.classList.add('rat')
                img.src = url;

                gen.textContent=`Genres: ${gens ? gens : 'N/A'}`
                nm.textContent = name;
                ratingElem.textContent = `Rating: ${rating ? rating : 'N/A'}`;

                resultsContainer.appendChild(nm);
                container.appendChild(img);
                container.appendChild(ratingElem);
                container.appendChild(gen)

                resultsContainer.appendChild(container);
                break;
            }
        }
    }
};

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("#display")
    form.addEventListener("submit", function (e) {
        e.preventDefault();
        const searchString = form.elements.query.value;
        tvShows(searchString);
    })

    tvShows(''); 
});
