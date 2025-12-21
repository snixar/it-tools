<script setup lang="ts">
import { useStorage } from '@vueuse/core';
import { useThemeVars } from 'naive-ui';
import { RouterLink, useRoute, useRouter } from 'vue-router';
import MenuIconItem from './MenuIconItem.vue';
import type { Tool, ToolCategory } from '@/tools/tools.types';

const props = withDefaults(defineProps<{ toolsByCategory?: ToolCategory[] }>(), { toolsByCategory: () => [] });
const { toolsByCategory } = toRefs(props);
const route = useRoute();
const router = useRouter();

const handleToolClick = (tool: Tool) => {
  if (route.path === '/') {
    // Already on home page, scroll to tool
    const hash = tool.path.slice(1); // remove leading slash
    window.location.hash = hash;
    // The scroll will be handled by the Home.page.vue's scrollToTool
    // but we can also directly scroll
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    // Navigate to tool page
    router.push(tool.path);
  }
};

const makeLabel = (tool: Tool) => () => h('a', {
  href: 'javascript:void(0)',
  onClick: (e: Event) => {
    e.preventDefault();
    handleToolClick(tool);
  },
}, tool.name);

const makeIcon = (tool: Tool) => () => h(MenuIconItem, { tool });

const collapsedCategories = useStorage<Record<string, boolean>>(
  'menu-tool-option:collapsed-categories',
  {},
  undefined,
  {
    deep: true,
    serializer: {
      read: v => (v ? JSON.parse(v) : null),
      write: v => JSON.stringify(v),
    },
  },
);

function scrollToCategory(categoryName: string) {
  const slug = categoryName.toLowerCase().replace(/\s+/g, '-');
  if (route.path === '/') {
    // scroll to element
    const element = document.getElementById(slug);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  } else {
    // navigate to home with hash
    router.push({ path: '/', hash: `#${slug}` });
  }
}

function toggleCategoryCollapse({ name }: { name: string }) {
  const current = collapsedCategories.value[name];
  // 如果当前是 undefined，则视为 true（折叠），所以切换后应为 false（展开）
  collapsedCategories.value[name] = current === undefined ? false : !current;
  scrollToCategory(name);
}

const menuOptions = computed(() =>
  toolsByCategory.value.map(({ name, components }) => ({
    name,
    isCollapsed: collapsedCategories.value[name] ?? true, // 默认折叠
    tools: components.map(tool => ({
      label: makeLabel(tool),
      icon: makeIcon(tool),
      key: tool.path,
    })),
  })),
);

const themeVars = useThemeVars();
</script>

<template>
  <div class="category-list">
    <div v-for="{ name, tools, isCollapsed } of menuOptions" :key="name" class="category-card">
      <div class="card-header" @click="toggleCategoryCollapse({ name })">
        <span :class="{ 'rotate-0': isCollapsed, 'rotate-90': !isCollapsed }" class="chevron">
          <icon-mdi-chevron-right />
        </span>
        <span class="category-name">{{ name }}</span>
      </div>
      <n-collapse-transition :show="!isCollapsed">
        <div class="card-content">
          <n-menu
            class="menu"
            :value="route.path"
            :collapsed-width="64"
            :collapsed-icon-size="22"
            :options="tools"
            :indent="8"
            :default-expand-all="true"
          />
        </div>
      </n-collapse-transition>
    </div>
  </div>
</template>

<style scoped lang="less">
.category-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 12px;
}

.category-card {
  border-radius: 6px;
  overflow: hidden;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: rgba(v-bind('themeVars.borderColor'), 0.1);
  }
}

.card-header {
  display: flex;
  align-items: center;
  padding: 10px 16px;
  cursor: pointer;
  user-select: none;

  .chevron {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    transition: transform 0.2s ease;
    opacity: 0.7;
    color: v-bind('themeVars.textColor2');
  }

  .category-name {
    margin-left: 8px;
    font-size: 14px;
    font-weight: 500;
    color: v-bind('themeVars.textColor1');
  }
}

.card-content {
  padding: 0 16px 8px;

  .menu {
    ::v-deep(.n-menu-item-content::before) {
      left: 0;
      right: 13px;
    }
  }
}
</style>
