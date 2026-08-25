# MGBC Website

موقع MGBC العربي باتجاه RTL، مبني باستخدام Astro ويُنتج صفحات static لخدمات الاستشارات المالية والزكوية والضريبية ودراسات الجدوى في السوق السعودي.

## التشغيل والتحقق

```bash
npm install
npm run dev
```

أوامر الجودة الأساسية:

```bash
npm run check
npm run build
npm test
```

`npm test` يبني الموقع ثم يتحقق من عقود الخرج الأساسية: عناوين H1، محتوى صفحات النماذج، fallback الآمن للنماذج، الروابط الداخلية، وملفات robots/sitemap.

## بنية المشروع

- `src/content/pages/`: صفحات Markdown ومعلوماتها الوصفية؛ هذا هو مصدر metadata للصفحات.
- `src/data/home.json`: view model لأقسام الصفحة الرئيسية البصرية فقط.
- `src/data/site.ts`: ثوابت الموقع والتنقل العام.
- `src/components/`: مكونات Astro العامة ومكونات الصفحة الرئيسية والنماذج.
- `src/styles/`: tokens وCSS العام وتنسيقات الصفحة الرئيسية.
- `tests/build-contract.test.mjs`: اختبارات الخرج بعد البناء.

المشروع عربي RTL ويحافظ على الهوية البصرية corporate/editorial/cinematic باستخدام IBM Plex Sans Arabic وIBM Plex Sans، مع احترام تفضيل تقليل الحركة.

## التطوير والنشر

التطوير الحالي على فرع `phase3/astro-assembly`. لا يتم تعديل أو نشر `main`/production ضمن العمل المحلي إلا بتفويض صريح.
