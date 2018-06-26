$(function() {

    $('.container').addClass('active');


    let key = '6a1034315efc4265ce0c6bd4e8c7a284';
    let cityIds = {
        SaintPetersburg: 536203,
        Kiev: 703448,
        London: 2643743
    }

    $(document).ajaxStart(function() {
        $('<h1 id="loading">Загрузка...</h1>').appendTo('form').hide().fadeIn(200);
    });

    $('#get-weather').on('click', function(e) {

        e.preventDefault();

        let city = $('#city').val();

        if (city) {

            let selectedCity = $('[value='+city+']').text();
            city = cityIds[city];

            if ($('#weather')) $('#weather').remove();


            let request=`https://api.openweathermap.org/data/2.5/weather?id=${city}&units=metric&lang=ru&cnt=3&appid=${key}`;
                $.ajax({
                        url : request,
                        type : "GET",
                        dataType : "jsonp",
                        success : function(data){
                            $('#loading').remove();

                            let weather = data.weather[0],
                                main    = data.main;
                            let weatherTemplate = `
                                            <div id="weather">
                                                <h1>${selectedCity}</h1>
                                                <div id="weather-wrapper">

                                                    <div id="temp"><span>Текущая температура:</span> ${parseInt(main.temp)} &deg;C</div>
                                                    <div id="humidity"><span>Влажность:</span> ${main.humidity}%</div>
                                                    <div id="cloud">
                                                        <span id="cloudness"><span>Облачность:</span> ${weather.description}</span>
                                                        <img src="https://openweathermap.org/img/w/${weather.icon}.png" alt="${weather.description}" />
                                                    </div>

                                                </div>
                                                <a id="full-forecast" href="https://openweathermap.org/city/${city}" target="_blank">Посмотреть полный прогноз погоды</a>
                                            </div>`;
                            $(weatherTemplate).appendTo('.container');

                        }
                    });
            
        } else {

            $('<div class="required">Выберите город!</div>').appendTo('form');
            setTimeout(() => {
                $('.required').remove();
            }, 3000);

        }

    });
    


});