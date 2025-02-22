<script>

import BackOfficeVue from '../components/backoffice/BackOffice.vue';
import feather from 'feather-icons';
import AppHeader from "@/components/shared/AppHeader.vue";

export default {
	name: 'BackDoor',
	components: {
    AppHeader,
		BackOfficeVue
	},
	data: () => {
		return {};
	},
	mounted() {
		feather.replace();
	},
	updated() {
		feather.replace();
	},
	methods: {},
};
</script>

<template>

		<!-- About me -->
		<div class="container mx-auto">
      <!-- App header -->
      <AppHeader />

			<BackOfficeVue />
		</div>

</template>

<style scoped></style>