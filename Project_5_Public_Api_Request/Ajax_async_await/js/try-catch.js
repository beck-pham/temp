const astrosUrl = 'http://api.open-notify.org/astros.json';
const wikiUrl = 'https://en.wikipedia.org/api/rest_v1/page/summary/';
const peopleList = document.getElementById('people');
const btn = document.querySelector('button');

//Use try catch method
async function getJSON(url) {
  try {
    const response = await fetch(url);
    return await response.json();
  } catch (error) {
    throw error;
  }
}
// Handle all fetch requests
async function getPeopleInSpace(url) {
   //const peopleReponse = await fetch(url); fetch method is using in getJSON function
   //const peopleJSON = await peopleResponse.json();
   const peopleJSON = await getJSON(url);

   const profiles = peopleJSON.people.map (async (person) => {
     const craft = person.craft;
     //const profileResponse = await fetch(wikiUrl + people.name);
     //const profileJSON = await await profileResponse.json();
     const profileJSON = await getJSON(wikiUrl + person.name);
     return {...profileJSON, craft};
   });
   return Promise.all(profiles);
}

// Generate the markup for each profile
function generateHTML(data) {
  data.map( person => {
    const section = document.createElement('section');
    peopleList.appendChild(section);
    section.innerHTML = `
      <img src=${person.thumbnail.source}>
      <span>${person.craft}</span>
      <h2>${person.title}</h2>
      <p>${person.description}</p>
      <p>${person.extract}</p>
    `;
  });
}

btn.addEventListener('click',  (event) => {
  event.target.textContent = "Loading...";

  getPeopleInSpace(astrosUrl)
    .then(generateHTML)
    //adding catch method in event listener
    .catch( error => {
      peopleList.innerHTML = '<h3>Something went wrong!</h3>'
      console.error(error);
    })
    .finally(() => event.target.remove());
});
