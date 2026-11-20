# CPS SPORTS

**Professional sports equipment storefront / 专业体育装备电商平台**

以大型产品主视觉、运动品类导航、高清独立商品图为核心的体育装备商店。支持八大运动品类、24 件初始商品、商品筛选与搜索、详情和规格、收藏、购物车、测试订单与账户订单记录。

## 一键在本机运行（macOS）

解压完整项目，双击 `START_LOCAL.command`。也可运行：

```bash
cd CPS-SPORTS
python3 -m http.server 4173
```

然后访问 <http://localhost:4173>。纯静态构建无 `npm install`，无需 API 密钥即可运行所有前台交互。

## 开发命令

需要 Node.js 22+：

```bash
npm run check    # JavaScript 语法检查
npm test         # 8 个业务与路由测试
npm run build    # 打包到 dist/
```

Cloudflare Pages：将仓库连接至 Cloudflare Pages，Build command 为 `npm run build`，Output directory 为 `dist`。`_redirects` 负责 SPA 深链接回退。图片已经本地打包，不依赖第三方图片服务器。

## 页面与功能

| 页面 | URL | 说明 |
| --- | --- | --- |
| 首页 | `/` | 大型轮播 Hero / Mega Menu / 八大分类 / 精选 / 专题 |
| 全部商品 | `/shop` | 分类、价格、库存筛选、搜索与排序 |
| 运动分类 | `/sports/:slug` | 八个运动专区 |
| 商品详情 | `/products/:slug` | 图片、规格、颜色、数量、收藏与购买 |
| 收藏 | `/wishlist` | 本地收藏 |
| 购物车 | `/cart` | 增减、删除、优惠代码、金额计算 |
| 结算 | `/checkout` | 资料校验、测试下单 |
| 我的账户 | `/account` | 本地测试订单历史 |
| 资讯 | `/journal` | 品牌运动资讯展示 |
| 品牌 / 帮助 | `/about`, `/support` | 信息与 FAQ |

## 环境范围（重要）

这是可运行的 **storefront v0.1**，目前产品数据属于初始样品数据；购物车、收藏、订单记录保存在浏览器 `localStorage`。**支付、真实库存、认证、管理后台、邮件、物流以及服务器端订单存储均尚未连接**，目前结算只创建明确标注的测试订单，不会扣费或安排发货。

正式营业前需实现 Supabase Auth / PostgreSQL、服务端价格与库存校验、Stripe 支付、Webhook 订单状态同步、商品 CMS、税费与运费规则、政策及商户资料。参见 [`docs/PRODUCTION_ROADMAP.md`](docs/PRODUCTION_ROADMAP.md) 和 [`docs/schema.sql`](docs/schema.sql)。不能把样品数据和测试订单当作真实商业交易。

## 图片素材

- 首页：本地 `assets/hero-badminton.webp`（1774×887 源图优化输出）。
- 商品：透明背景 PNG 独立输出，实际分辨率 900×720；部分来自较低像素的原创合成效果图，属于当前**初期样品素材**，并不等于原生 2K 摄影。
- 分类：透明 PNG，小尺寸展示适配；原生高分辨率的商业商品包图需在正式上架前替换。
- 全部图像均为本项目生成的原创概念视觉；正式上线时需要审核商品真实性、规格、商标和素材权利。

图片尺寸与抠图质量目标参见 [`docs/DESIGN_SYSTEM.md`](docs/DESIGN_SYSTEM.md)。

## 技术选择

独立 HTML + CSS + 现代 ES Modules。当前版本无框架依赖，部署故障面小，特别适合以展示为主的站点。后期如需复杂后台可迁移至 Astro + React，而无需复制当前页面逻辑中的测试订单模型。

## Git 开发方式

保存了真实的 feature 分支提交、非 fast-forward 合并和发布标记；不会改写提交日期。远程仓库创建 / 发布方式见 [`docs/GITHUB_WORKFLOW.md`](docs/GITHUB_WORKFLOW.md)。
