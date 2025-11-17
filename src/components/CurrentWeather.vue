<script setup>
import IconSun from "../assets/weather/IconSun.vue"
import { defineProps } from "vue"

const props = defineProps({
	weatherData: {
		type: Object,
		required: true,
	},
})

console.log("props.weatherData" + JSON.stringify(props.weatherData))
</script>
<template>
	<div class="current-weather-card">
		<div class="current-weather-card-header">
			<h2 class="current-weather-card-header-day">Thursday</h2>
			<p class="current-weather-card-header-date">20 jul 2025</p>
			<div class="current-weather-card-header-city">
				<img
					class="current-weather-card-header-city__icon"
					src="../assets/location.svg"
					alt="City icon"
				/>Kyiv
			</div>
		</div>
		<div class="current-weather-card-temp">
			<IconSun :size="95" :color="'var(--primary-text-color)'" />
			<p class="current-weather-card-temp-value">32 °C</p>
			<p class="current-weather-card-temp-text">Sunny</p>
		</div>
	</div>
</template>
<style scoped>
div.current-weather-card {
	display: flex;
	flex-direction: column;
	justify-content: space-between;
	height: 100%;
	width: 100%;
	padding: 48px 32px 80px 32px;
}

div.current-weather-card-header {
	display: flex;
	flex-direction: column;
	gap: 10px;
}

h2.current-weather-card-header-day {
	font-size: 37px;
	font-weight: bold;
}

p.current-weather-card-header-date {
	font-size: 22px;
}

div.current-weather-card-header-city {
	display: flex;
	align-items: center;
	gap: 8px;
	font-size: 20px;
	font-weight: semi-bold;
}

img.current-weather-card-header-city__icon {
	scale: 0.8;
}

div.current-weather-card-temp {
}

p.current-weather-card-temp-value {
	font-size: 50px;
	font-weight: bold;
}

p.current-weather-card-temp-text {
	font-size: 30px;
	font-weight: bold;
}
</style>
