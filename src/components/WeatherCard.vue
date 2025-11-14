<script setup>
import { defineProps } from "vue"
import IconClaude from "../assets/weather/iconClaude.vue"
import IconRain from "../assets/weather/iconRain.vue"
import IconSun from "../assets/weather/iconSun.vue"
const props = defineProps({
	weatherData: {
		type: Object,
		required: true,
	},
	temp: {
		type: Number,
		required: true,
	},
})
</script>
<template>
	<div class="weather-card">
		<IconClaude :weatherData="weatherData" v-if="weatherData.cloudy > 50" />
		<IconRain :weatherData="weatherData" v-if="weatherData.humidity > 50" />
		<IconSun
			:weatherData="weatherData"
			v-if="weatherData.humidity <= 50 && weatherData.cloudy <= 50"
		/>
		<p>{{ temp }}°C</p>
	</div>
</template>
<style scoped></style>
