<script setup>
import Button from "./components/button.vue"
import Stat from "./components/stat.vue"

const data = {
	wet: {
		label: "ВЛАЖНОСТЬ",
		stat: "90%",
	},
	rain: {
		label: "ОСАДКИ",
		stat: "0%",
	},
	wind: {
		label: "ВЕТЕР",
		stat: "3 м/ч%",
	},
}
</script>

<template>
	<div class="container">
		<div class="main">
			<Stat v-bind="data.wet" />
			<Stat v-bind="data.rain" />
			<Stat v-bind="data.wind" />
			<Button>
				<img src="./assets/location.svg" alt="Save Icon" />
				Изменить город
			</Button>
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
	box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
	text-align: center;
}
</style>
