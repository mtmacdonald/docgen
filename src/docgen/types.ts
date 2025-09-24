export type TCliOptions = {
  input: string; // inputPath
  output: string; // outputPath
  verbose: boolean;
  pdf: boolean; // whether to generate PDF
  setVersion: boolean;
  setReleaseDate: boolean;
  pageToc: boolean;
  redirect: boolean;
};

export type TInputParameters = {
  title: string;
  name: string;
  version: string;
  date: string;
  organization: {
    name: string;
    url: string;
  };
  author: {
    name: string;
    url: string;
  };
  owner: {
    name: string;
    url: string;
  };
  contributors: [
    {
      name: string;
      url: string;
    },
  ];
  website: {
    name: string;
    url: string;
  };
  sponsorLink?: {
    name: string;
    url: string;
    logo: string;
  };
  backlink?: {
    name: string;
    url: string;
  };
  module?: string;
  id?: string;
  summary: string;
  marking?: string;
  legalese?: string;
  logoPath?: string;
};

export type TParameters = TInputParameters & {
  attribution: string;
  year: string;
};

export type TContentEntry = {
  heading: string;
  column: number;
  pages: {
    title: string;
    source: string;
  }[];
};

export type TInputConfig = {
  contents?: TContentEntry[];
  rawParameters?: TParameters | null;
};

export type TSection = {
  heading: string;
  column: 1 | 2 | 3 | 4 | 5;
  pages: { title: string; source: string }[];
  [key: string]: any;
};

export type TSortedPages = {
  1: TSection[];
  2: TSection[];
  3: TSection[];
  4: TSection[];
  5: TSection[];
};
