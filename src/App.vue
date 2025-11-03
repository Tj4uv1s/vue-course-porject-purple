<script setup>
import { ref, computed } from "vue"

const name = ref("1984")
const author = ref("Джордж Оруэлл")
const year = ref("1949")
const genre = ref("антиутопия")
const genreClass = computed(() =>
	genre.value === "антиутопия" ? "red" : "yellow"
)
</script>

<template>
	<header class="header">header</header>
	<main>
		<div :class="statusClass">
			<h2>{{ name }}</h2>
			<p>автор: {{ author }}</p>
			<p>Год издания: {{ year }}</p>
			<p :class="genreClass">Жанр: {{ genre }}</p>
		</div>
	</main>
	<footer class="footer">footer</footer>
</template>

<style scoped>
div {
	background-color: #d4edda;
	color: #155724;
	padding: 1rem;
	border-radius: 0.5rem;
}

.statusClass {
	font-weight: bold;
}

.yellow {
	color: yellow;
	background: #000;
}

.red {
	color: red;
	background: #000;
}

header.header {
	background-color: #20bb95;
	color: white;
	padding: 1rem;
	text-align: center;
}

footer.footer {
	background-color: #4913d0;
	color: white;
	padding: 1rem;
	text-align: center;
}
</style>
