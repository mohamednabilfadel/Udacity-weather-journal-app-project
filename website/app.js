/* Global Variables */
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
const apiKey = "&appid=4b9484541a79837ec9df4e68b95b751e&units=metric";
const zipInputField = document.querySelector("#zip");
const feelingField = document.querySelector("#feelings");
const generateButton = document.querySelector("#generate");
const recentEntryDivs = document.querySelectorAll("#entryHolder div");

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth()+'.'+ d.getDate()+'.'+ d.getFullYear();

// on bage load get the value of last generated data
const onLoad = async (url = "") => {
    const request = await fetch(url);
    try{
      const allData = await request.json();
      recentEntryDivs[0].innerHTML = allData.date;
      recentEntryDivs[1].innerHTML = allData.temp;
      recentEntryDivs[2].innerHTML = allData.feeling;
  
    }catch(error){
      console.log("error", error);
    }
  }

function onBageLoad(){
    onLoad("/onLoad");
}
onBageLoad();

// Adding listiner to the generate button
generateButton.addEventListener("click", doAction =>{
    // getting the weather from api using the user zip input
    getWeather(baseURL, zipInputField.value, apiKey)

    // then after the data acquired from the api, posting it to the server including the addetional info from DOM
    .then(function(data){
        postData("/all", {date: `Date: ${newDate}`, temp: `Temprature: ${data.main.temp} C`, feeling: `Your feeling: ${feelingField.value}`});
    })

    // then requesting the full data again from the server and updating the DOM
    .then(function(){
        updateUI("/updateUI");
    })
    
});

// getting weather from api function
const getWeather = async (baseURL, zip, key) =>{
    const response = await fetch(baseURL+zip+key)

    try{
        const data = await response.json();
        return data;
    }catch(error){
        console.log("error", error);
    }
}

// posting full data to server
const postData = async (url = "", data = {}) =>{
    const response = await fetch(url, {
        method: "POST",
        credentials: "same-origin",
        headers: {
            "Content-Type" : "application/json",
        },
        body: JSON.stringify(data),
    })

    try{
        const newData = await response.json;
        return newData;
    }catch(error){
        console.log("error", error);
    }
}

// requesting the full data from server and updating the user interface (DOM)
const updateUI = async (url = "") => {
    const request = await fetch(url);
    try{
      const allData = await request.json();
      recentEntryDivs[0].innerHTML = allData.date;
      recentEntryDivs[1].innerHTML = allData.temp;
      recentEntryDivs[2].innerHTML = allData.feeling;
  
    }catch(error){
      console.log("error", error);
    }
  }
