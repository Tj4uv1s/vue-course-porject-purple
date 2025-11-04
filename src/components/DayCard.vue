<script setup>
// Simple wrapper component for daily item content
</script>

<template>
	<article class="day-card">
		<slot />
	</article>
</template>

<style scoped>
.day-card{
	padding: 0.75rem;
	border-radius: 10px;
	background: #fff;
	box-shadow: 0 6px 18px rgba(0,0,0,0.06);
}
</style>
