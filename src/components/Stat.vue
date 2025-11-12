<script setup>
const { label = "Нет данных", stat = "Нет данных" } = defineProps({
	label: String,
	stat: String,
})
</script>

<template>
	<div class="stat">
		<div class="stat-name">{{ label }}</div>
		<div class="stat-value">{{ stat }}</div>
	</div>
</template>

<style scoped>
.stat {
	display: flex;
	justify-content: space-between;
	align-items: center;
	width: 415px;
	max-width: 100%;
	padding: 0.5rem 1rem;
	border-radius: 8px;
	background: transparent;
}
.stat-name {
	font-weight: 700;
	color: #c8ccd4;
	text-transform: uppercase;
}
.stat-value {
	font-weight: 500;
	color: #b4c2e2;
}
</style>
