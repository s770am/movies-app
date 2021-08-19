var suggestionBox;
var suggestionCon;
let form;
let movieInfo;
let myError;

function view(title) {
    fetch(`http://www.omdbapi.com/?t=${title}&apikey=b2954140`)
         .then((e) => e.json())
          .then((data) => displayInfo(data.Title, data.Year, data.Rated, data.Runtime, data.BoxOffice))
          .catch((err) => console.log(err));
};

// set up right side box
const displayInfo = (title, year, rated, runtime, boxoffice) => {
    movieInfo = document.querySelector(".movie-info");
    // movieInfo.childNodes.forEach((child) => child.remove());
    while (movieInfo.firstChild) {
        movieInfo.removeChild(movieInfo.firstChild);
    }

const p1 = document.createElement('p');
    p1.textContent = title;
    p1.className = "display-box-item";
    movieInfo.append(p1);

    const p2 = document.createElement('p');
    p2.textContent = rated;
    p2.className = "display-box-item";
    movieInfo.append(p2);

    const p3 = document.createElement('p');
    p3.textContent = `release: ${year}`;
    p3.className = "display-box-item";
    movieInfo.append(p3);

    const p4 = document.createElement('p');
    p4.textContent = `the runtime is ${runtime}`;
    p4.className = "display-box-item";
    movieInfo.append(p4);

    const p5 = document.createElement('p');
    if(boxoffice == undefined) {
        boxoffice = "unknown amount";
    };
    p5.textContent = `box office ${boxoffice}`;
    p5.className = "display-box-item";
    movieInfo.append(p5);

}


function createBox (title, year, rated) {
    
    const newBox = suggestionBox.cloneNode("deep");
    newBox.hidden = false;

    const p1 = document.createElement('p');
    p1.textContent = title;
    newBox.append(p1);
    
    const p2 = document.createElement('p');
    p2.textContent = year;
    newBox.append(p2);
    
    const p3 = document.createElement('p');
    p3.textContent = rated;
    newBox.append(p3);

    // right arrow 
const arrow = document.createElement("img");
arrow.src = 'images/right-arrow.png';
arrow.className = "icon A-icon";

arrow.addEventListener("click", (e) => view(title));

newBox.append(arrow);
    
    
    form.movieTBS.value = "";
    return newBox
    };

document.addEventListener('DOMContentLoaded',(e) => {
suggestionBox = document.querySelector('.suggestion-box');
suggestionCon = document.querySelector('.suggestion-con');
myError = document.querySelector('.error')
    //form
    form = document.querySelector('.form');
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        myError.textContent = "";

         fetch(`http://www.omdbapi.com/?t=${e.target.movieTBS.value}&apikey=b2954140`)
         .then((e) => e.json())
          .then((data) => {
              // error settings
            if (data.Response === "False" ) {

                if (e.target.movieTBS.value == false) {
                    myError.textContent = "The search bar is blank";
                } else {
                    myError.textContent = data.Error;
                }
                
            } else {
                form.value = "";
                suggestionCon.append(createBox(data.Title, data.Year, data.Rated))
            }
          })
          
          
          .catch((err) => console.log(err));
          
          
    });

    



    



}); 