<script>
import feather from 'feather-icons';
import AppHeader from './components/shared/AppHeader';
import BackToTop from 'vue-backtotop';
export default {
	components: {
		AppHeader,
    BackToTop,
	},
	data: () => {
		return {
			appTheme: localStorage.getItem('theme'),
		};
	},
	mounted() {
		feather.replace();
	},
	updated() {
		feather.replace();
	},
};
</script>

<template>
	<div :class="appTheme" class="pt-0.5">
		<!-- App header -->
		<AppHeader />

		<!-- Render active component contents with vue transition -->
    <router-view :theme="appTheme" />

		<!-- Scroll to top -->
		<back-to-top visibleoffset="500" right="30px" bottom="20px" class="shadow-lg">
      <i data-feather="chevron-up"></i>
		</back-to-top>
	</div>
</template>

<style>

@keyframes going {
	from {
		transform: translateX(0);
	}

	to {
		transform: translateX(-10px);
		opacity: 0;
	}
}

@keyframes coming {
	from {
		transform: translateX(-10px);
		opacity: 0;
	}

	to {
		transform: translateX(0px);
		opacity: 1;
	}
}
</style>
