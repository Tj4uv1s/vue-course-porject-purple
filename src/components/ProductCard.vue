<script setup>
import Button from "./Button.vue"

const { name, price, category, inStock } = defineProps({
	name: {
		type: String,
		required: true,
	},
	price: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
	inStock: {
		type: Boolean,
		required: true,
	},
})

const emit = defineEmits(["add-to-cart"])

const addToCart = () => {
	if (!inStock) return

	emit("add-to-cart", {
		name: name,
		price: price,
		category: category,
		inStock: inStock,
	})
}
</script>

<template>
	<div class="product-card">
		<h1>{{ name }}</h1>
		<p>{{ price }} руб.</p>
		<p>{{ category }}</p>
		<Button :disabled="!inStock" @click="addToCart">Добавить в корзину</Button>
	</div>
</template>

<style scoped>
.product-card {
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
