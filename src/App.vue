<script setup>
import Stat from "./components/Stat.vue"
import CitySelect from "./components/CitySelect.vue"
import Error from "./components/Error.vue"
import WeatherCard from "./components/WeatherCard.vue"

import { computed, onMounted, reactive, ref } from "vue"

const errorMessage = ref(null)
const weatherDataDefault = reactive({
	humidity: 0,
	cloudy: 0,
	wind: 0,
})

onMounted(() => {
	getCity("Kiev")
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
	{ label: "Wet", stat: weatherDataDefault.humidity + "%" },
	{ label: "Cloud", stat: weatherDataDefault.cloudy + "%" },
	{ label: "Wind", stat: weatherDataDefault.wind + "m/h" },
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

		weatherDataDefault.humidity = apiData.current.humidity
		weatherDataDefault.cloudy = apiData.current.cloud
		weatherDataDefault.wind = apiData.current.wind_mph
	} catch (error) {
		errorMessage.value = createError("http_400", error.message)
	}
}
</script>

<template>
	<div class="container">
		<div class="main">
			<WeatherCard :weatherData="weatherDataDefault"></WeatherCard>
			<Error @close="closeErr" :message="errorMessage"></Error>
			<Stat v-bind="item" v-for="item in dataModified" :key="item.label"></Stat>
			<CitySelect class="main__city-select" @city-select="getCity"></CitySelect>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	width: 100%;
	padding: 1rem;
	box-sizing: border-box;
}

.main {
	position: relative;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	max-width: 944px;
	width: 100%;
	max-height: 623px;
	height: auto;
	padding: 60px 50px;
	background: var(--card-bg-color);
	border-radius: 25px;
	box-shadow: 0 10px 30px var(--box-shadow-color);
	text-align: center;
}
</style>
