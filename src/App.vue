<script setup>
import Stat from "./components/Stat.vue"
import CitySelect from "./components/CitySelect.vue"
import { reactive, ref, computed } from "vue"

const data = reactive({
	wet: {
		label: "wet",
		stat: "90",
	},
	rain: {
		label: "rain",
		stat: "0",
	},
	wind: {
		label: "wind",
		stat: "3",
	},
})

const computedData = computed(() => {
	return {
		wet: { label: data.wet.label, stat: data.wet.stat + "%" },
		rain: { label: data.rain.label, stat: data.rain.stat + "%" },
		wind: { label: data.wind.label, stat: data.wind.stat + "m/h" },
	}
})

let isEdited = ref(false)

const props = defineProps({
	isEdited: Boolean,
})

const emit = defineEmits(["update:isEdited"])

function getCity(Boolean) {
	isEdited.value = Boolean
	emit("update:isEdited", isEdited.value)
}
</script>

<template>
	<div class="container">
		<div class="main">
			{{ isEdited }}
			<Stat v-bind="computedData.wet" />
			<Stat v-bind="data.rain" />
			<Stat v-bind="data.wind" />
			<CitySelect @city-change="getCity"></CitySelect>
		</div>
	</div>
</template>

<style scoped>
.container {
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
	min-height: 100vh;
	width: 100%;
	padding: 1rem;
	box-sizing: border-box;
}
</style>

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
