<script setup>
import Stat from "./components/Stat.vue"
import CitySelect from "./components/CitySelect.vue"
import { ref, computed } from "vue"

const data = ref({
	humidity: 90,
	rain: 0,
	wind: 23,
})

const dataModified = computed(() => {
	return [
		{ label: "Wet", stat: data.value.humidity + "%" },
		{ label: "Rain", stat: data.value.rain + "%" },
		{ label: "Wind", stat: data.value.wind + "m/h" },
	]
})

let isEdit = ref(false)

const API_ENDPOINT = "https://api.weatherapi.com/v1"

async function getCity(value) {
	console.log(`	City edit: ${value}`)

	const params = new URLSearchParams({
		q: value,
		lang: "en",
		key: "766a040f89c44a559c3145211251311",
		days: 3,
	})

	const response = await fetch(
		`${API_ENDPOINT}/forecast.json?${params.toString()}`
	)
	const data = await response.json()
	console.log(data)
}
</script>

<template>
	<div class="container">
		<div class="main">
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
