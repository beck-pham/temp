const select = document.getElementById('breeds');
const card = document.querySelector('.card'); 
const form = document.querySelector('form');

// ------------------------------------------
//  FETCH FUNCTIONS
// ------------------------------------------

function fetchData(url) {
    return fetch(url)
            .then (checkStatus)
            .then(response => response.json())
            .catch(error => console.log('Look like there was a problem!', error));
}


//Promise method
Promise.all([
    fetchData('https://dog.ceo/api/breeds/list'),
    fetchData('https://dog.ceo/api/breeds/image/random')
])
.then(data => {
    const breedList = data[0].message;
    const randomImage = data[1].message;

    generateOptions(breedList);
    generateImage(randomImage);
})

// //regular fetch method
// fetchData('https://dog.ceo/api/breeds/list')
//     .then(data => generateOptions(data.message))
    
// fetchData('https://dog.ceo/api/breeds/image/random')
//     .then(data => generateImage(data.message))
// ------------------------------------------
//  HELPER FUNCTIONS
// ------------------------------------------

function checkStatus(response) {
    if(response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

//create function generateImage
function generateOptions(data) {
    const options = data.map(item => `
    <option value='${item}'>${item}</option>
    `).join('');//join to remove comma in option select, check by view element in <div> by devtool console
    select.innerHTML = options;
}


function generateImage(data) {
    const html = `
    <img src='${data}' alt>
    <p>Click to view images of ${select.value}s</p>
    `;
    card.innerHTML = html; 
}

function fetchBreedImage() {
    const breed = select.value;
    const img = card.querySelector('img');
    const p = card.querySelector('p');

    fetchData(`https://dog.ceo/api/breed/${breed}/images/random`)
        .then(data => {
            img.src = data.message;
            img.alt = breed;
            p.textContent = `Click to view more ${breed}s`;
        })
}
// ------------------------------------------
//  EVENT LISTENERS
// ------------------------------------------
select.addEventListener('change', fetchBreedImage);
card.addEventListener('click', fetchBreedImage);
form.addEventListener('submit', postData);


// ------------------------------------------
//  POST DATA
// ------------------------------------------

function postData(event) {
    event.preventDefault();
    const name = document.getElementById('name').value;
    const comment = document.getElementById('comment').value;
    
    //second parameter of fetch method
    config = {
        method: 'POST', //indicates type of HTTP request
        headers: {      // contains an object, media type of JSON
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({name, comment}) // contains values are sent to the server
    };
    /**
     * fetch method accepts a second parameter as a configuration object that lets you control
     * a number of different setting that apply to the request
     */
    fetch('https://jsonplaceholder.typicode.com/comments', config)
    .then(checkStatus)
    .then(response => response.json())
    .then(data => console.log(data));
}