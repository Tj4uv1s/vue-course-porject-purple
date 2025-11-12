<script setup>
const props = defineProps({
	name: String,
	email: String,
	age: Number,
	isActive: Boolean,
})
</script>

<template>
	<div class="user-card">
		<h1>{{ name }}</h1>
		<p>{{ email }}</p>
		<p>Возраст: {{ age }} лет</p>
		<p>{{ isActive ? "Активен" : "Неактивен" }}</p>
	</div>
</template>

<style scoped>
.user-card {
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
