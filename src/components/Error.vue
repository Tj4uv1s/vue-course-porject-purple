<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue"

const props = defineProps({
	message: {
		type: Object,
		default: null, // ✅ default: null вместо required: true
	},
	autoClose: {
		type: Boolean,
		default: true,
	},
	duration: {
		type: Number,
		default: 5000,
	},
})

const emit = defineEmits(["close"])

const isHovering = ref(false)
let timerId = null

function close() {
	emit("close")
}

function startAutoClose() {
	if (!props.autoClose || !props.message || isHovering.value) return

	timerId = setTimeout(() => {
		close()
	}, props.duration)
}

function clearAutoClose() {
	if (timerId) clearTimeout(timerId)
}

onMounted(() => {
	startAutoClose()
})

onBeforeUnmount(() => {
	clearAutoClose()
})

const handleMouseEnter = () => {
	isHovering.value = true
	clearAutoClose()
}

const handleMouseLeave = () => {
	isHovering.value = false
	startAutoClose()
}
</script>
<template>
	<div
		v-if="message"
		class="error"
		@mouseenter="handleMouseEnter"
		@mouseleave="handleMouseLeave"
	>
		<p>{{ message.userMessage || message.message }}</p>
		<button class @click="close">X</button>
	</div>
</template>
<style scoped>
div.error {
	gap: 8px;
	position: absolute;
	display: flex;
	justify-content: center;
	align-items: center;
	padding: 12px;
	border-radius: 0 0 25px 25px;
	top: 0;

	background-color: var(--error-message-bg-color);
	color: var(--error-message-color);
	font-size: 18px;
	font-weight: normal;
}

button {
	padding: 8px;
	background: transparent;
	color: var(--primary-text-color);
	border: none;
	cursor: pointer;
}

button:hover {
	background: #d32f2f;
}
</style>
