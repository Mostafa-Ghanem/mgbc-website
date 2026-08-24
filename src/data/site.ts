export const site = {
  name: 'MGBC',
  legalName: 'MGBC',
  url: 'https://mgbc.sa',
  locale: 'ar-SA',
  lang: 'ar',
  direction: 'rtl' as const,
  email: 'info@mgbc.sa',
  positioning: 'Saudi Financial & Tax Advisory Firm',
  primaryCta: { label: 'Ø§Ø¨Ø¯Ø£ Ø§ÙØªÙÙÙÙ Ø§ÙØ£ÙÙÙ', href: '/consultation/' },
  secondaryCta: { label: 'Ø§Ø³ØªÙØ´Ù Ø®Ø¯ÙØ§ØªÙØ§', href: '/services/' },
};

export const navigation = [
  { label: 'Ø§ÙØ±Ø¦ÙØ³ÙØ©', href: '/' },
  { label: 'ÙÙ ÙØ­Ù', href: '/about/' },
  { label: 'Ø§ÙØ®Ø¯ÙØ§Øª', href: '/services/' },
  { label: 'Ø§ÙÙØ¹Ø±ÙØ©', href: '/insights/' },
  { label: 'ØªÙØ§ØµÙ ÙØ¹ÙØ§', href: '/contact/' },
];


export const footerCompanyLinks = [
  { label: 'من نحن', href: '/about/' },
  { label: 'المعرفة', href: '/insights/' },
  { label: 'تواصل معنا', href: '/contact/' },
];

export const footerServiceLinks = [
  { label: 'الاستشارات المالية', href: '/services/financial-advisory/' },
  { label: 'الزكاة والضرائب', href: '/services/tax-zakat-advisory/' },
  { label: 'دراسات الجدوى', href: '/services/feasibility-studies/' },
];

export const footerLegalLinks = [
  { label: 'سياسة الخصوصية', href: '/privacy/' },
  { label: 'الشروط والأحكام', href: '/terms/' },
];
