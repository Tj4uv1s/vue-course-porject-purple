<script setup>
import CurrentWeather from "./components/CurrentWeather.vue"
import PaneRight from "./components/PaneRight.vue"
import { computed, onMounted, reactive, ref, provide, watch } from "vue"
import { cityProvide, API_ENDPOINT, API_KEY } from "./constants.js"

let city = ref("kyiv")

watch(city, () => {
	getCity(city.value)
})

onMounted(() => {
	getCity(city.value)
})

provide(cityProvide, city)
const errorMessage = ref(null)
const isErrorShow = computed(() => errorMessage.value !== null)
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

function createError(status, message) {
	return {
		timestamp: new Date().toISOString(),
		userMessage: message,
		status: status,
	}
}

async function getCity(value) {
	if (value.trim() === "") {
		errorMessage.value = createError("validation", "City name cannot be empty")
		return
	}
	console.log(`City edit: ${value}`)

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

		const apiData = await response.json()

		if (apiData.error) {
			errorMessage.value = createError("api_error", apiData.error.message)
			return
		}

		if (!response.ok) {
			console.log(response)
			throw new Error(`HTTP error! status: ${response.status}`)
		}

		errorMessage.value = null

		console.log("Fetched data:", apiData)

		weatherDataDefault.current = apiData.current
		weatherDataDefault.forecast = apiData.forecast
		weatherDataDefault.location = apiData.location
	} catch (error) {
		errorMessage.value = createError("http_400", error.message)
	}
}

console.log("Final weather data:", weatherDataDefault)
</script>

<template>
	<div class="container">
		<div class="wrapper">
			<div class="side">
				<CurrentWeather
					v-if="weatherDataDefault.location"
					:activeIndex="activeIndex"
					:weatherData="weatherDataDefault"
				/>
			</div>
			<div class="main">
				<PaneRight
					v-if="weatherDataDefault.forecast != null"
					:weatherData="weatherDataDefault"
					:isErrorShow="isErrorShow"
					v-model:errorMessage="errorMessage"
					v-model:activeIndex="activeIndex"
					:forecast="weatherDataDefault.forecast"
					:errorMessage="errorMessage"
					:getCity="getCity"
				/>
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
	justify-content: flex-end;
	align-items: center;
	max-width: 500px;
	width: 100%;
	min-height: 620px;
	height: 100%;
	padding: 50px 50px 60px 60px;
	background: var(--card-bg-color);
	border-radius: 0 25px 25px 0;
	box-shadow: 0 10px 30px var(--box-shadow-color);
	text-align: center;
	gap: 40px;
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
</style>
