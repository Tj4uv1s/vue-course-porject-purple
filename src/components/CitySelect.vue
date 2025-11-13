<script setup>
import Button from "./Button.vue"
import Input from "./input.vue"
import { onMounted, ref } from "vue"

const emit = defineEmits({
	"city-select"(payload) {
		return typeof payload === "string"
	},
})

let city = ref("")

onMounted(() => {
	emit("city-select", city.value)
})

let isEdited = ref(false)

function select() {
	isEdited.value = false
	emit("city-select", city.value)
}

function edit() {
	isEdited.value = true
}
</script>
<template>
	<div class="input-container">
		<Button class="change-city-btn" @click="edit" v-show="!isEdited">
			<img src="../assets/location.svg" alt="Save Icon" />
			Change city
		</Button>
		<div v-show="isEdited" class="input-container">
			<Input v-model="city" placeholder="Enter the city" />
			<Button class="save-btn" @click="select" v-show="isEdited">Save</Button>
		</div>
	</div>
</template>
<style>
.input-container {
	display: flex;
	align-items: center;
	gap: 12px;
	margin-top: 14px;
	width: 100%;
	max-width: 415px;
}

button.save-btn {
	max-width: 140px;
}

button.change-city-btn {
	max-width: 415px;
}
</style>
