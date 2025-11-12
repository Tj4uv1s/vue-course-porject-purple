<script setup>
import Button from "./Button.vue"
</script>
<template>
	<Button>
		<img src="../assets/location.svg" alt="Save Icon" />
		Change city
	</Button>
	<div class="input-container">
		<input
			class="input-container__input"
			placeholder="Input city name"
			type="text"
		/>
		<Button>Save</Button>
	</div>
</template>
<style>
.input-container {
	display: flex;
	align-items: center;
	gap: 10px;
	margin-top: 20px;
	width: 100%;
	max-width: 415px;
}
.input-container__input {
	flex: 1;
	padding: 10px;
	font-size: 16px;
	background-color: #272e37;
	border: none;
	border-radius: 10px;
	color: #fff;
	height: 23px;
}
</style>
