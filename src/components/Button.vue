<script setup></script>

<template>
	<button class="button">
		<div><slot name="icon" /></div>
		<slot />
	</button>
</template>

<style scoped>
button.button {
	display: flex;
	align-items: center;
	justify-content: center;
	gap: 10px;
	padding: 10px 20px;
	font-size: 20px;
	font-weight: semi-bold;
	max-width: 415px;
	width: 100%;
	color: var(--primary-color);
	background: var(--gradient-bg);
	border: none;
	border-radius: 10px;
	cursor: pointer;
	transition: background 0.3s ease;
}

button.button:hover {
	background: var(--gradient-bg-inverted);
}
</style>
