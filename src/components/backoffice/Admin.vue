<template>
  <div v-if="isAdmin()">Welcome Admin</div>
  <div v-else>Error 403: Forbidden</div>
</template>

<script>

import {isAdmin} from "@/services/keycloak.ts";

export default { setup() { return { isAdmin }; } };
</script>
