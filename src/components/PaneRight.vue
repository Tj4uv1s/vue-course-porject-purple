<script setup>
import Stat from "./stat.vue"
import CitySelect from "./CitySelect.vue"
import Error from "./Error.vue"
import WeatherCard from "./WeatherCard.vue"
import { defineModel, computed } from "vue"

const { forecast, getCity, isErrorShow, weatherData } = defineProps({
	forecast: {
		type: [Object, null],
		required: true,
	},
	getCity: {
		type: Function,
		required: true,
	},
	isErrorShow: {
		type: Boolean,
		required: true,
	},
	weatherData: {
		type: Object,
		required: true,
	},
})

const activeIndex = defineModel("activeIndex")

const errorMessage = defineModel("errorMessage")
function closeErr() {
	errorMessage.value = null
}

function changeCard(index) {
	if (activeIndex.value === index) return
	activeIndex.value = index
}

const dataModified = computed(() => [
	{
		label: "Wet",
		stat:
			weatherData.forecast.forecastday[activeIndex.value].day.avghumidity + "%",
	},
	{
		label: "Cloud",
		stat:
			weatherData.forecast.forecastday[activeIndex.value].day
				.daily_chance_of_rain + "%",
	},
	{
		label: "Wind",
		stat:
			weatherData.forecast.forecastday[activeIndex.value].day.maxwind_mph +
			"m/h",
	},
])
</script>
<template>
	<Error @close="closeErr" :message="errorMessage"></Error>
	<div class="main-weather-stat">
		<Stat
			v-if="!isErrorShow"
			v-for="item in dataModified"
			v-bind="item"
			:key="item.label"
		></Stat>
	</div>
	<div class="main-weather-card" v-if="forecast">
		<WeatherCard
			v-if="!isErrorShow"
			v-for="(item, index) in forecast.forecastday"
			:key="item.date"
			:temp="item.day.avgtemp_c"
			:date="new Date(item.date)"
			:weather-code="item.day.condition.code"
			:isActive="activeIndex == index"
			@click="changeCard(index)"
		></WeatherCard>
	</div>
	<CitySelect class="main__city-select" @city-select="getCity"></CitySelect>
</template>

<style scoped>
div.main-weather-stat {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 16px;
}

div.main-weather-card {
	display: flex;
	justify-content: center;
	align-items: center;
	width: 100%;
	gap: 1px;
}
</style>
