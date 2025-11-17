<script setup>
import { defineProps } from "vue"
import IconCloud from "../assets/weather/IconCloud.vue"
import IconRain from "../assets/weather/IconRain.vue"
import IconSun from "../assets/weather/IconSun.vue"
const { weatherCode, temp, date } = defineProps({
	"weather-code": Number,
	temp: Number,
	date: Object,
	isActive: {
		type: Boolean,
		default: false,
	},
	required: true,
})
</script>
<template>
	<button :class="['weather-card', { 'weather-card--active': isActive }]">
		<IconCloud
			:color="
				isActive
					? 'var(--primary-text-color-inverted)'
					: 'var(--primary-text-color)'
			"
			v-if="weatherCode <= 1003"
		/>
		<IconRain
			:color="
				isActive
					? 'var(--primary-text-color-inverted)'
					: 'var(--primary-text-color)'
			"
			v-if="weatherCode >= 1006 && weatherCode <= 1063"
		/>
		<IconSun
			:color="
				isActive
					? 'var(--primary-text-color-inverted)'
					: 'var(--primary-text-color)'
			"
			v-if="weatherCode >= 1064"
		/>
		<p :class="['weather-card-day', { 'weather-card-day--active': isActive }]">
			{{ new Date(date).toLocaleDateString("en-US", { weekday: "short" }) }}
		</p>
		<p
			:class="['weather-card-temp', { 'weather-card-temp--active': isActive }]"
		>
			{{ Math.round(temp) }} °C
		</p>
	</button>
</template>
<style scoped>
button.weather-card {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	padding: 22px;
	width: 100%;
	gap: 15px;
	background-color: var(--card-bg-color);
	border-radius: 10px;
	box-shadow: 0 4px 8px var(--box-shadow-color);
	border: none;
}
button.weather-card:hover {
	background: var(--card-bg-hover-color);
	transform: translateY(-2px);
	transition: all 0.3s ease;
	cursor: pointer;
}

button.weather-card--active {
	background: var(--card-bg-inverted-color);
	color: var(--primary-text-color-inverted);
	box-shadow: 0 4px 12px var(--box-shadow-color);
	color: var(--primary-text-color-inverted);
}

button.weather-card--active:hover {
	background: var(--card-bg-inverted-color);
}

p.weather-card-day {
	font-size: 20px;
	font-weight: 400;
	color: var(--primary-text-color);
	margin: 8px 0 4px 0;
}

p.weather-card-day--active {
	color: var(--primary-text-color-inverted);
}

p.weather-card-temp {
	font-size: 20px;
	font-weight: 600;
	color: var(--primary-text-color);
	margin: 0;
}

p.weather-card-temp--active {
	color: var(--primary-text-color-inverted);
}
</style>
