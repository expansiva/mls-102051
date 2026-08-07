/// <mls fileReference="_102051_/l2/cafeFlow/messagesAside.ts" enhancement="_blank" />
// collab-messages mounted in the SPA shell aside (clientShell.regions.aside
// profile "messages" in l5/config.json). Ported from the mls-102048 trial
// ("msg on app", 06/jul). The messages backend ("msg" pm2 app) is not on the
// VM yet, so the widget renders and its API calls fail gracefully — the /msg
// same-origin path is where an nginx proxy to the msg app will land.

import { LitElement, html } from 'lit';
import { setEnvironment, type CollabProgramMenu, type CollabProgramMenuItem } from '/_102036_/l2/environmentContract.js';
import type { MasterFrontendBootConfig } from '/_102033_/l2/shared/contracts/bootstrap.js';
import '/_102025_/l2/collabMessages.js';

// The apps menu comes from the shared runtime module (monitor.appsMenu.load
// with resolved navigations for ALL apps, incl. monitor/audit/mdm; falls back
// to the composed config, then to the boot module).
async function buildProgramMenu(): Promise<CollabProgramMenu[]> {
  const { buildProgramMenu: buildShared } = await import('/_102033_/l2/cbe/runtimeMessagesEnvironment.js');
  const menus = await buildShared();
  if (menus.length > 0) return menus;
  const boot = window.collabBoot;
  if (!boot?.navigation?.length) return [];
  const menu: CollabProgramMenuItem[] = boot.navigation
    .filter((nav) => nav.href)
    .map((nav) => ({ title: nav.label ?? nav.id ?? nav.href ?? '', icon: '', url: nav.href ?? '', pageName: nav.id ?? nav.href ?? '' }));
  return [{ name: boot.moduleId ?? boot.pageTitle ?? 'app', icon: '', project: Number(boot.projectId) || 0, path: boot.basePath ?? '/', menu }];
}

setEnvironment({
  config: {
    // The nav3 toolbar (serviceRuntimeMessages tabs) replaces the internal
    // collab-messages toolbar — same as the studio ('custom' hides it).
    getMenuMode: () => 'custom',
    getApiUrl: () => `${window.location.origin}/msg`,
    // Direct (proxy-less cbe) path: the msg backend authenticates via the
    // cauth/crefresh/loginMsg cookies, so they must flow with each call —
    // 'omit' is only for the central cbe-proxy path.
    getApiCredentials: () => 'same-origin',
    getDefaultUserName: () => 'Cafe Flow',
  },
  apps: {
    getProgramMenu: () => buildProgramMenu(),
    openProgram: async (item) => {
      // Shared unified navigation: in-app pages go SPA-style; other apps
      // (monitor, audit...) open as a nav3 content tab with an iframe — no
      // full-page reload/flicker, each app keeps its own design system.
      const { openProgramUnified } = await import('/_102033_/l2/cbe/runtimeMessagesEnvironment.js');
      await openProgramUnified(item);
    },
  },
  tasks: {
    // Unified-nav3 parity with the studio: task details open in a "Detail"
    // content tab (collabRuntimeNav3) instead of inside the aside chat. The
    // chat suppresses its local fallback only when it finds a
    // 'service-detail-100554' host in the DOM (hasStudioTaskDetailHost), so the
    // tab panel wraps the info element in one. CAVEAT: if the real studio
    // serviceDetail module ever defines that element on this page, the wrapper
    // upgrades and the tab must be reopened — acceptable until the
    // environment contract grows an explicit "handled" flag.
    openTaskDetails: async (messageId, _taskId, task, message) => {
      const nav3 = window.collabRuntimeNav3;
      if (!nav3) return { openLocal: false, element: undefined };
      await import('/_102025_/l2/collabMessagesTaskInfo.js');
      const info = document.createElement('collab-messages-task-info-102025') as HTMLElement & {
        task?: unknown; message?: unknown;
      };
      info.setAttribute('messageId', messageId);
      info.task = task;
      info.message = message;
      const host = document.createElement('service-detail-100554');
      host.style.display = 'block';
      host.style.height = '100%';
      host.appendChild(info);
      nav3.openTab({ id: 'detail', title: 'Detail', element: host });
      return { openLocal: false, element: undefined };
    },
  },
});

export class CafeFlowMessagesAside extends LitElement {
  static properties = {
    bootConfig: { attribute: false },
  };

  declare bootConfig?: MasterFrontendBootConfig;

  createRenderRoot() {
    return this;
  }

  render() {
    return html`
      <link rel="stylesheet" href="/_102051_/l2/cafeFlow/messagesAside.css" />
      <aside class="h-full w-full overflow-hidden border-r border-slate-200 bg-white">
        <collab-messages-102025
          class="block h-full w-full"
          style="--collab-messages-width: 100%;"
        ></collab-messages-102025>
      </aside>
    `;
  }
}

customElements.define('cafe-flow-messages-aside-102051', CafeFlowMessagesAside);
