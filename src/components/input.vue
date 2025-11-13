<script setup>
const model = defineModel()
</script>

<template>
	<input class="input" id="input-city" type="text" v-model="model" />
</template>

<style scoped>
input.input {
	flex: 1;
	font-size: 18px;
	padding: 15px;
	min-height: 53px;
	background-color: var(--main-bg-color);
	border: none;
	border-radius: 10px;
	color: var(--primary-color);
}

input.input::placeholder {
	color: var(--placeholder-color);
}
</style>
