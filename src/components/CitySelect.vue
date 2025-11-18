<script setup>
import { cityProvide } from "../constants"
import Button from "./Button.vue"
import Input from "./input.vue"
import { ref, inject } from "vue"

let isEdited = ref(false)
const city = inject(cityProvide)
const inputValue = ref(city.value)

const emit = defineEmits({
	"city-select"(cityName) {
		return typeof cityName === "string"
	},
})
function select() {
	isEdited.value = false
	city.value = inputValue.value
}

function edit() {
	isEdited.value = true
}
</script>
<template>
	<div class="city-select-container">
		<Button class="change-city-btn" @click="edit" v-if="!isEdited">
			<img src="../assets/location.svg" alt="Save Icon" />
			Change city
		</Button>
		<div v-if="isEdited" class="input-container">
			<Input
				v-model="inputValue"
				v-focus
				placeholder="Enter the city"
				@keyup.enter="select"
			/>
			<Button class="save-btn" @click="select" v-if="isEdited">Save</Button>
		</div>
	</div>
</template>
<style>
.city-select-container {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	margin-top: 14px;
	gap: 12px;
	width: 100%;
}
.input-container {
	display: flex;
	align-items: center;
	gap: 12px;
	width: 100%;
}

button.save-btn {
	max-width: 140px;
}
</style>
