/* Global Variables */
const baseURL = 'http://api.openweathermap.org/data/2.5/weather?';
const apiKey = '&appid=dc73540107e240a2b38254747461f5f0';
// Create a new date instance dynamically with JS
let d = new Date();
//add 1 to month as it starts with zero as January
let month = d.getMonth() + 1;
let newDate = month + '.' + d.getDate() + '.' + d.getFullYear();
//get api and user feelings then post data to endpoint then update UI
let generateData = () => {
  const content = document.getElementById('feelings').value;
  const zipcode = document.getElementById('zip').value;
  //get weather API
  retrieveData(baseURL, zipcode, apiKey).then((data) => {
    console.log(data);
    // post  API and user entered content to our endpoint object "projectData"
    postData('/add', {
      temperature: data.main.temp,
      date: newDate,
      content: content,
    });
    //updates UI
    updateUI();
  });
};

// Async POST
const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    credentials: 'same-origin',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log('error', error);
  }
};

// Async GET
const retrieveData = async (baseURL, zipcode, apiKey) => {
  const request = await fetch(
    `${baseURL}zip=${zipcode},us${apiKey}&units=metric`
  );
  try {
    const data = await request.json();
    return data;
  } catch (error) {
    console.log('error', error);
  }
};

//update UI
const updateUI = async () => {
  const request = await fetch('/all');
  try {
    const allData = await request.json();
    console.log(allData);
    document.getElementById('date').innerHTML = allData.temperature;
    document.getElementById('temp').innerHTML = allData.date;
    document.getElementById('content').innerHTML = allData.content;
  } catch (error) {
    console.log('error', error);
  }
};

//click event
document.getElementById('generate').addEventListener('click', generateData);
