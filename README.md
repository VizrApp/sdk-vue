# @vizr/vue

> Vue 3 composables and plugin for [Vizr](https://vizr.app) product analytics.

## Install

```bash
npm install @vizr/vue @vizr/browser
```

## Quick Start

```ts
// main.ts
import { createApp } from 'vue';
import { VizrPlugin } from '@vizr/vue';
import App from './App.vue';

createApp(App)
  .use(VizrPlugin, { siteId: 'vzr_your_site_id' })
  .mount('#app');
```

```vue
<!-- AnyComponent.vue -->
<script setup lang="ts">
import { useVizr } from '@vizr/vue';
const { track } = useVizr();
</script>

<template>
  <button @click="track('upgrade_clicked', { plan: 'pro' })">Upgrade</button>
</template>
```

## API

### `VizrPlugin`
Vue plugin — install with `app.use(VizrPlugin, { siteId: 'vzr_xxx' })`.

### `useVizr()`
Returns `{ track, identify, page, reset }`.

### `usePageView(route?, properties?)`
Tracks a page view on component mount. Pass `useRoute()` for automatic path tracking.

### `useTrackMount(eventName, properties?)`
Tracks an event on component mount.

## License
MIT — [vizr.app](https://vizr.app)
