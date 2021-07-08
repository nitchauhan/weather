// console.log("hi")
// 9c65e9af7d92a703256d412de16f508f
const submitBtn = document.getElementById('submitBtn');
const cityName = document.getElementById('cityName');
const city_name = document.getElementById('city_name');
// const temp = document.getElementById('temp');
const tempid = document.getElementById('tempid');
const temp_status = document.getElementById('temp_status');
const hidee = document.querySelector('.middle_layer');

const getInfo = async(event) => {
    event.preventDefault();
    let city_val = cityName.value;


    if (city_val === "") {
        city_name.innerText = `Please Write the name Before Search`;
        hidee.classList.add('hidee');
    } else {
        try {
            let url = `http://api.openweathermap.org/data/2.5/weather?q=${city_val}&units=metric&appid=9c65e9af7d92a703256d412de16f508f`
            const response = await fetch(url);
            const data = await response.json()
            console.log(data)

            const arrdata = [data]
            city_name.innerText = `${arrdata[0].name}, ${arrdata[0].sys.country}`;
            tempid.innerText = arrdata[0].main.temp;
            // temp_status.innerText = arrdata[0].weather[0].main;
            const tempMood = arrdata[0].weather[0].main;

            // condition to check sunny or cloudy

            if (tempMood == "Clear") {
                temp_status.innerHTML = "<i class='fas fa-sun' style='color: #eccc68;'></i>"
            } else if (tempMood == "Cloud") {
                temp_status.innerHTML = "<i class='fas fa-cloud'></i> style='color: #f1f2f6;'></i>"
            } else if (tempMood == "Rain") {
                temp_status.innerHTML = "<i class='fas fa-rain' style='color: #a4b0bef6;'></i>"
            } else {
                temp_status.innerHTML = "<i class='fas fa-cloud' style='color: #f1f2f6;'></i>"
            }
            hidee.classList.remove('hidee');
        } catch {
            city_name.innerText = `Please Enter The City Name Properly serch`;
            hidee.classList.add('hidee');
        }
    }
}

submitBtn.addEventListener('click', getInfo)