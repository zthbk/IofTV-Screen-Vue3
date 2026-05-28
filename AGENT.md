# IofTV-Screen-Vue3 项目指南

## 项目概述

大屏数据可视化项目，基于 Vue 3 + Vite 构建，支持自适应缩放、地图可视化、ECharts 图表展示。

## 技术栈

- **框架**: Vue 3 + TypeScript (strict mode) + Composition API (`<script setup lang="ts">`)
- **构建**: Vite 5
- **状态管理**: Pinia（setup 语法风格）
- **路由**: Vue Router（hash 模式，懒加载）
- **UI 库**: Element Plus（自动按需引入）
- **图表**: ECharts 5 + vue-echarts（全局注册为 `<v-chart>`）
- **CSS**: SCSS（scoped）+ Tailwind CSS
- **HTTP**: Axios + MockJS（开发环境模拟数据）
- **工具库**: lodash-es、dayjs、countup.js、@vueuse/core

## 目录结构

```
src/
├── api/              # Axios 实例 + 接口定义（api.ts + modules/）
├── assets/           # 静态资源（css/、img/）
├── components/       # 公共组件（按目录组织，含 index.ts 导出）
│   ├── count-up/
│   ├── datav/        # border-box-13, capsule-chart
│   ├── item-wrap/
│   ├── scale-screen/ # 自适应缩放组件
│   └── seamless-scroll/
├── config/           # 全局常量配置（UtilVar.ts）
├── enums/            # 枚举定义（request-enums, storage-enum）
├── mock/             # Mock 数据模拟
├── plugins/          # ECharts 注册
├── router/           # 路由配置
├── stores/           # Pinia 状态管理
├── utils/            # 工具函数（storage, query-param）
├── views/            # 页面视图
│   ├── index/        # 大屏主面板各区域组件
│   ├── header.vue
│   └── setting.vue
└── main.ts           # 入口文件
```

## 编码规范

### Vue 组件
- 统一使用 `<script setup lang="ts">` + Composition API
- Props 优先用 `defineProps<Type>()`（类型声明），需要默认值则用 `withDefaults`
- Emits 用 `defineEmits<{ (e: string, payload: T): void }>()`
- 响应式：`ref()` 基础类型，`reactive()` 对象，`computed()` 派生状态
- Pinia 中使用 `storeToRefs()` 提取响应式状态
- 组件顺序：`<script setup>` → `<template>` → `<style scoped lang="scss">`

### 命名约定
- 文件名：kebab-case（`item-wrap.vue`、`center-map.vue`、`query-param.ts`）
- 组件导入：PascalCase（`import ItemWrap from "@/components/item-wrap"`）
- TypeScript 接口：PascalCase（`DateDataType`、`MockParams`）
- 目录名：kebab-case

### 导入路径
- 优先使用 `@/` 别名（`@/components/xxx`、`@/stores`、`@/utils`）
- 外部包直接引用包名
- 同目录下兄弟文件用相对路径

### 代码风格
- 无 ESLint/Prettier 配置，保持现有风格即可
- 类型声明目前多用 `any`，新代码尽量使用具体类型
- 不修改已有代码的拼写错误（如 `clearSessioStorage`、`contetn_left`、`parameteUrl`）

### CSS
- 组件内使用 `<style scoped lang="scss">`
- 全局 SCSS 变量定义在 `src/assets/css/variable.scss`，通过 `@use` 全局注入
- 可使用 Tailwind 工具类

## 构建 & 运行

```bash
npm run dev        # 启动开发服务器（端口 8112）
npm run build      # 构建生产版本（输出到 dist/）
npm run preview    # 预览构建结果
npm run type-check # TypeScript 类型检查
```

## 重要提示

1. **Mock 数据**: 在 `src/main.ts` 中无条件启用，需手动注释 `mockXHR()` 调用以关闭
2. **自动导入**: Element Plus 组件和 API 通过 `unplugin-auto-import` + `unplugin-vue-components` 自动按需引入，无需手动 import
3. **SCSS 变量**: `$primary-color: #1890ff` 等全局变量已自动注入所有 scss 文件
4. **类型定义**: 全局类型放 `types/`，局部类型在模块目录下建 `index.d.ts`
5. **自适应**: 使用 `scale-screen` 组件包裹实现 1920x1080 自适应缩放
6. **路径别名**: `@/` → `src/`、`components/` → `src/components/`、`api/` → `src/api/`
