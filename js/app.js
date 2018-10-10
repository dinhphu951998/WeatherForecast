(function ($, document, window) {

	var getWeatherInformation = function (city) {
		var apikey = "6241ff73115b58f71d4e6c5f3e488530";
		var url = "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&units=metric" + "&appid=" + apikey;
		$.ajax({
			url: url,
			success: function (result) {
				var weather = result;
				if (weather.cod == 200) {
					$(".forecast-container").empty();
					loadWeatherToday(weather.city, weather.list[0]);
					loadWeatherInfor(weather.city, weather.list);
				} else {
					swal({
						type: 'error',
						title: 'Oops...',
						text: weather.message,
					});
				}
			},
			error: function (err) {
				swal({
					type: 'error',
					title: 'Oops...',	
					text: err.responseJSON.message,
				  });
				console.log(err.responseJSON.message);
			}
		});

	}

	var loadWeatherToday = function (city, firstList) {
		var date = new Date(firstList.dt_txt);
		var icon = "http://openweathermap.org/img/w/" + firstList.weather[0].icon + ".png";
		var content = '<div class="today forecast">' +
			'<div class="forecast-header">' +
			'<div class="day">' + date.toDateString() + '</div>' +
			'<div class="date">' + date.toLocaleTimeString() + '</div>' +
			'</div> ' +
			'<div class="forecast-content">' +
			'<div class="location">' + city.name + ', ' + city.country + '</div>' +
			'<div class="degree">' +
			'<div class="num">' + Math.round(firstList.main.temp_min) + '<sup>o</sup>C</div>' +
			'<div class="forecast-icon">' +
			'<img src="' + icon + '" alt="" width=90>' +
			'</div>	' +
			'</div>' +
			'<span><img src="images/icon-umberella.png" alt="">' + firstList.main.humidity + '%</span>' +
			'<span><img src="images/icon-wind.png" alt="">' + firstList.wind.speed + 'km/h</span>' +
			// '<span><img src="images/icon-compass.png" alt="">East</span>'
			'</div>' +
			'</div>';
		$(".forecast-container").append(content);
	}

	var loadWeatherInfor = function (city, list) {
		for (let i = 1; i < 6; i++) {
			const element = list[i];
			var date = new Date(element.dt_txt);
			var icon = "http://openweathermap.org/img/w/" + element.weather[0].icon + ".png";
			var content = '<div class="forecast">' +
				'<div class="forecast-header">' +
				'<div class="day">' + date.toDateString() + '</div>' +
				'</div>' +
				'<div class="forecast-content">' +
				'<div class="forecast-icon">' +
				'<img src="' + icon + '" alt="" width=48>' +
				'</div>' +
				'<div class="degree">' + Math.round(element.main.temp_min) + '<sup>o</sup>C</div>' +
				'<small>' + date.toLocaleTimeString() + '</small>' +
				'</div>' +
				'</div>';
			$(".forecast-container").append(content);
		}
	}

	$(document).on("submit", ".find-location", function () {
		var location = $("#location").val();
		if (location != null) {
			getWeatherInformation(location);
		}
		return false;
	});


	$(document).ready(function () {

		// Cloning main navigation for mobile menu
		$(".mobile-navigation").append($(".main-navigation .menu").clone());

		// Mobile menu toggle 
		$(".menu-toggle").click(function () {
			$(".mobile-navigation").slideToggle();
		});

		var map = $(".map");
		var latitude = map.data("latitude");
		var longitude = map.data("longitude");
		if (map.length) {

			map.gmap3({
				map: {
					options: {
						center: [latitude, longitude],
						zoom: 15,
						scrollwheel: false
					}
				},
				marker: {
					latLng: [latitude, longitude],
				}
			});

		}
	});

	$(window).load(function () {

	});

})(jQuery, document, window);