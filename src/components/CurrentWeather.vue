<script setup>
import IconSun from "../assets/weather/IconSun.vue"
import IconCloud from "../assets/weather/IconCloud.vue"
import IconRain from "../assets/weather/IconRain.vue"
import { computed } from "vue"

const { weatherData, activeIndex } = defineProps({
	weatherData: {
		type: Object,
		required: true,
	},
	activeIndex: {
		type: Number,
		required: true,
	},
})

const iconCode = computed(
	() => weatherData.forecast.forecastday[activeIndex].day.condition.code
)

console.log("weatherData code:", weatherData)
console.log("Icon code:", iconCode)
</script>
<template>
	<div class="current-weather-card">
		<div class="current-weather-card-header">
			<h2 class="current-weather-card-header-day">
				{{
					new Date(
						weatherData.forecast.forecastday[activeIndex].date
					).toLocaleDateString(undefined, { weekday: "long" })
				}}
			</h2>
			<p class="current-weather-card-header-date">
				{{ weatherData.forecast.forecastday[activeIndex].date }}
			</p>
			<div class="current-weather-card-header-city">
				<img
					class="current-weather-card-header-city__icon"
					src="../assets/location.svg"
					alt="City icon"
				/>{{ weatherData.location.name }}
			</div>
		</div>
		<div class="current-weather-card-temp">
			<IconCloud
				v-if="iconCode <= 1003"
				:size="95"
				:color="'var(--primary-text-color)'"
			/>
			<IconRain
				v-if="iconCode >= 1006 && iconCode <= 1063"
				:size="95"
				:color="'var(--primary-text-color)'"
			/>
			<IconSun
				v-if="iconCode >= 1064"
				:size="95"
				:color="'var(--primary-text-color)'"
			/>
			<p class="current-weather-card-temp-value">
				{{
					Math.round(
						weatherData.forecast.forecastday[activeIndex].day.avgtemp_c
					)
				}}
				°C
			</p>
			<p class="current-weather-card-temp-text">
				{{ weatherData.forecast.forecastday[activeIndex].day.condition.text }}
			</p>
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

p.current-weather-card-temp-value {
	font-size: 50px;
	font-weight: bold;
}

p.current-weather-card-temp-text {
	font-size: 30px;
	font-weight: bold;
}
</style>
