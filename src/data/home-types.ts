export interface HomeItem {
  title: string;
  body: string[];
  bullets: string[];
}

export interface HomeSection {
  title: string;
  intro: string[];
  bullets: string[];
  items: HomeItem[];
}

export interface HomeData {
  h1: string;
  preamble: string[];
  authority: HomeSection;
  problems: HomeSection;
  services: HomeSection;
  why: HomeSection;
  saudi: HomeSection;
  proof: HomeSection;
  method: HomeSection;
  audience: HomeSection;
  regulatory: HomeSection;
  insights: HomeSection;
  faq: HomeSection;
  final: HomeSection;
}
