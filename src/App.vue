<script setup>
import Stat from "./components/Stat.vue"
import CitySelect from "./components/CitySelect.vue"
import Error from "./components/Error.vue"
import WeatherCard from "./components/WeatherCard.vue"
import CurrentWeather from "./components/CurrentWeather.vue"

import { computed, onMounted, reactive, ref } from "vue"

const errorMessage = ref(null)
const activeIndex = ref(0)
const weatherDataDefault = reactive({
	current: {
		humidity: 0,
		cloud: 0,
		wind_mph: 0,
	},
	location: null,
	forecast: null,
})

onMounted(() => {
	getCity("Kyiv")
})

const API_ENDPOINT = "https://api.weatherapi.com/v1"
const API_KEY = "766a040f89c44a559c3145211251311"

function closeErr() {
	errorMessage.value = null
}

function createError(type, message) {
	return {
		type,
		timestamp: new Date().toISOString(),
		userMessage: getUserMessage(type, message),
		message,
	}
}

function getUserMessage(type, message) {
	const messages = {
		network: "Ошибка сети. Проверьте интернет-соединение.",
		http_400: "Неправильный запрос. Проверьте название города.",
		http_401: "Ошибка аутентификации. Свяжитесь с администратором.",
		http_403: "Доступ запрещен.",
		http_404: "Город не найден.",
		http_429: "Слишком много запросов. Попробуйте позже.",
		http_500: "Ошибка сервера. Попробуйте позже.",
		http_503: "Сервис недоступен. Попробуйте позже.",
		timeout: "Запрос занял слишком долго. Попробуйте снова.",
		api_error: `Ошибка API: ${message}`,
		unknown: "Неизвестная ошибка. Попробуйте снова.",
	}
	return messages[type] || messages.unknown
}

const dataModified = computed(() => [
	{ label: "Wet", stat: weatherDataDefault.current.humidity + "%" },
	{ label: "Cloud", stat: weatherDataDefault.current.cloud + "%" },
	{ label: "Wind", stat: weatherDataDefault.current.wind_mph + "m/h" },
])

async function getCity(value) {
	if (!value) {
		errorMessage.value = createError("validation", "City name cannot be empty")
		return
	}
	console.log(`	City edit: ${value}`)

	try {
		const params = new URLSearchParams({
			q: value,
			lang: "en",
			key: API_KEY,
			days: 3,
		})

		const response = await fetch(
			`${API_ENDPOINT}/forecast.json?${params.toString()}`
		)

		errorMessage.value = null

		const apiData = await response.json()

		console.log("Fetched data:", apiData)

		weatherDataDefault.current = apiData.current
		weatherDataDefault.current = apiData.current
		weatherDataDefault.current = apiData.current

		weatherDataDefault.forecast = apiData.forecast
		weatherDataDefault.location = apiData.location
	} catch (error) {
		errorMessage.value = createError("http_400", error.message)
	}
}

console.log(weatherDataDefault)
</script>

<template>
	<div class="container">
		<div class="wrapper">
			<div class="side">
				<CurrentWeather :weatherData="weatherDataDefault"></CurrentWeather>
			</div>
			<div class="main">
				<Error @close="closeErr" :message="errorMessage"></Error>
				<div class="main-weather-stat">
					<Stat
						v-bind="item"
						v-for="item in dataModified"
						:key="item.label"
					></Stat>
				</div>
				<div class="main-weather-card" v-if="weatherDataDefault.forecast">
					<WeatherCard
						v-for="(item, index) in weatherDataDefault.forecast.forecastday"
						:key="item.date"
						:temp="item.day.avgtemp_c"
						:date="new Date(item.date)"
						:weather-code="item.day.condition.code"
						:isActive="activeIndex == index"
					></WeatherCard>
				</div>
				<CitySelect
					class="main__city-select"
					@city-select="getCity"
				></CitySelect>
			</div>
		</div>
	</div>
</template>

<style scoped>
div.container {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	width: 100%;
	padding: 1rem;
	box-sizing: border-box;
}

div.wrapper {
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 1013px;
	width: 100%;
	height: 100%;
}

div.main {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	max-width: 500px;
	width: 100%;
	min-height: 620px;
	padding: 50px 50px 60px 60px;
	background: var(--card-bg-color);
	border-radius: 0 25px 25px 0;
	box-shadow: 0 10px 30px var(--box-shadow-color);
	text-align: center;
	gap: 40px;
}

div.main-weather-stat {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 16px;
}

div.side {
	display: flex;
	justify-content: center;
	align-items: center;
	max-width: 493px;
	width: 100%;
	height: 666px;
	background-image: url(/src/assets/SunDay.jpg);
	border-radius: 30px;
}

div.main-weather-card {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 1px;
}
</style>
