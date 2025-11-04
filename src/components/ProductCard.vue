<script setup>
import Button from "./button.vue"
</script>

<template>
	<section class="product-card">
		<header><slot name="name"></slot></header>
		<content class="product-card__desc"
			><slot name="description"></slot
		></content>
		<action><Button>Купить</Button></action>
		<slot />
	</section>
</template>

<style scoped>
.product-card {
	display: flex;
	flex-direction: column;
	align-items: start;
	color: #000;
	padding: 1rem;
	border-radius: 12px;
	background: white;
	box-shadow: 0 6px 18px rgba(0, 0, 0, 0.08);
	text-align: center;
}
.product-card__name {
	font-weight: 700;
}
.product-card__role {
	font-weight: 500;
}
.product-card__status {
	font-weight: 400;
}
</style>
