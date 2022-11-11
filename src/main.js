const axios = require("../utils/axios");
const BASE_URL = "http://localhost:5000";


function isValid({ id, name, meaning, quadrant, starsWithPlanets }) {
  return id && name && meaning && quadrant && starsWithPlanets;
}

async function update(constellation) {
  try {
    const id = constellation.id;
    const url = `${BASE_URL}/constellations/${id}`;
    const result = await axios.put(url, constellation);
    return result;
  } catch (error) {
    return `Updating constellation (id: ${constellation.id}) failed.`;
  }
}
 
async function bulkImport(constellations) {
  try {
  //step-1: check the input is ar array
  if(!Array.isArray(constellations)) {
    throw "Inputted argument must be an array.";
  }
  //check that all of the constellations are valid
  if(constellations.every((constellation) => isValid(constellation))) {
    return await Promise.allSettled(
      //if valid then update the constellations
      constellations.map((constellation) => update(constellation))
    );
  } else {
    throw "All constellations must include relevant fields.";
  }
} catch(error){
  console.log(error);
}
}

//function for mock interview
function getData() {
  const url = `${BASE_URL}/constellations`;
  return axios.get(url)
   .then(response => response.data)
   .catch(err => console.log(err))
}

//getData using async await
async function getData() { 
  try{
    const url = `${BASE_URL}/constellations`;
    const response = await axios.get(url);
    return response.data;
  } catch(error) {
    console.log(error);
  }
}


module.exports = { bulkImport, update };
