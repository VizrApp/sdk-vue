import { inject, onMounted, App, Plugin } from 'vue';
import * as vizrBrowser from '@vizr/browser';
import type { VizrConfig, EventProperties, UserTraits } from '@vizr/browser';

export type { VizrConfig, EventProperties, UserTraits };

const VIZR_KEY = Symbol('vizr');

export interface VizrPluginOptions extends VizrConfig {}

/**
 * Vizr Vue 3 plugin.
 *
 * @example
 * // main.ts
 * import { createApp } from 'vue';
 * import { VizrPlugin } from '@vizr/vue';
 *
 * createApp(App)
 *   .use(VizrPlugin, { siteId: 'vzr_your_site_id' })
 *   .mount('#app');
 */
export const VizrPlugin: Plugin = {
  install(app: App, options: VizrPluginOptions) {
    vizrBrowser.init(options);

    const api = {
      track: vizrBrowser.track,
      identify: vizrBrowser.identify,
      page: vizrBrowser.page,
      reset: vizrBrowser.reset,
    };

    app.provide(VIZR_KEY, api);
    app.config.globalProperties.$vizr = api;
  },
};

export interface VizrInstance {
  track: (event: string, properties?: EventProperties) => void;
  identify: (userId: string, traits?: UserTraits) => void;
  page: (properties?: EventProperties) => void;
  reset: () => void;
}

/**
 * Access Vizr inside any component.
 *
 * @example
 * const { track } = useVizr();
 * track('feature_used', { name: 'export' });
 */
export function useVizr(): VizrInstance {
  const instance = inject<VizrInstance>(VIZR_KEY);
  if (!instance) throw new Error('useVizr() requires VizrPlugin to be installed');
  return instance;
}

/**
 * Track a page view on component mount. Pass a Vue Router route for automatic path tracking.
 *
 * @example
 * // In App.vue:
 * import { useRoute } from 'vue-router';
 * usePageView(useRoute());
 */
export function usePageView(route?: { path: string; fullPath?: string }, properties?: EventProperties): void {
  onMounted(() => {
    vizrBrowser.page({
      path: route?.path ?? (typeof window !== 'undefined' ? window.location.pathname : undefined),
      ...properties,
    });
  });
}

/**
 * Track a custom event on component mount.
 */
export function useTrackMount(eventName: string, properties?: EventProperties): void {
  onMounted(() => {
    vizrBrowser.track(eventName, properties);
  });
}
