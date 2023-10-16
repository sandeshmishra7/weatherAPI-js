var button = document.querySelector('.submit-inp');
var inputValue = document.querySelector('.city-inp');
var main = document.querySelector('.name');
var desc = document.querySelector('.desc');
var temp = document.querySelector('.temp');
var body = document.body;

button.addEventListener('click', fetchData);

function fetchData(e) {
    e.preventDefault();

    var xhr = new XMLHttpRequest();

    xhr.open('GET', 'https://api.openweathermap.org/data/2.5/weather?q=' + inputValue.value + '&appid=04fe7510bf43427f7ccf508c4b270f74', true);

    xhr.onload = function () {

        if (this.status === 200) {
            var data = JSON.parse(this.response);
            var tempValue = (data['main']['temp'] - 273.15).toFixed(2);
            var nameValue = data['name'];
            var descValue = data['weather'][0]['description'];

            main.innerHTML = nameValue;
            desc.innerHTML = "Description: " + descValue + '</br>';
            temp.innerHTML = "Temperature: " + tempValue + ' Degree Celsius';
            inputValue.value = "";
            if (descValue === 'haze') {
                body.classList.add('haze');
            }
            else if (descValue === 'light rain') {
                body.classList.add('rain');
            }
            else if (descValue === 'scattered clouds') {
                body.classList.add('clouds');
            }
        }
        else {
            alert('Nothing To Show.');
        }
    }
    xhr.send();
}