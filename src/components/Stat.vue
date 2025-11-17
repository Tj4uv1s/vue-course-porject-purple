<script setup>
const { label = "No data", stat = "No data" } = defineProps({
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
	font-size: 28px;
	width: 100%;
	border-radius: 8px;
	background: transparent;
}
.stat-name {
	font-weight: bold;
	color: #c8ccd4;
	text-transform: uppercase;
}
.stat-value {
	font-weight: medium;
	color: #b4c2e2;
}
</style>
