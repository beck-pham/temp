/**********************************
    GET AND DISPLAY 12 RANDOM USERS
 **********************************/


//build fetchData function
const fetchData = url => {
    return fetch(url)
            .then(checkStatus)
            .then(response => response.json())
            .catch(error => console.log('Something went wrong!', error));
}

//build helper function
const checkStatus = response => {
    if(response.ok) {
        //Using Promise object which includes 2 property: resolve & reject
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
}

//calling fetch method
const url = 'https://randomuser.me/api/';
fetchData(url)
    .then(data => console.log(data))
    //.then(generateHTML)

//generate the markup for each profile
// const generateHTML = data => {
//     // const cardDiv = document.createElement('div');
//     // cardDiv.classList.add ='card';
//     // gallery.appendChild(cardDiv);

//     // const cardImgDiv = document.createElement('div');
//     // cardImgDiv.classList.add = 'card-img-container';
//     // cardDiv.appendChild(cardImgDiv);

//     // const cardInfoDiv = document.createElement('div');
//     // cardInfoDiv.classList.add = 'card-info-container';
//     // cardDiv.appendChild(cardInfoDiv);
//     const section = document.createElement('section');
//     gallery.appendChild(section);
//     section.innerHTML = `
//         <img class="card-img" src=${data.thumbnail.source}>
//         <h3 id="name" class="card-name cap">${data.name}</h3>
//         <p>${data.email}</p>
//         <p>${data.city, data.state}</p>
//     `;
// }
