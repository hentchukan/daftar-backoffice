<script>
import ArticlesGrid from '../components/articles/ArticlesGrid.vue';

export default {
	name: 'Home',
	components: {
    ArticlesGrid
},
};
</script>

<template>
	<div class="container mx-auto">
		<!-- Articles -->
		<ArticlesGrid />
	</div>
</template>

<style scoped></style>
