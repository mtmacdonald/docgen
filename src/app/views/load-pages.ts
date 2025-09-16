declare const __DOCGEN_PAGES__: Record<string, any[]>;

export const loadPages = async () => {
  const pages: Record<string, string> = {};

  // Flatten all pages into a list of source filenames
  const sources = Object.values(__DOCGEN_PAGES__).flatMap((columns) =>
    columns.flatMap((section) => section.pages.map((p: any) => p.source)),
  );

  await Promise.all(
    sources.map(async (filename) => {
      try {
        const res = await fetch(`/${filename}`);
        if (res.ok) {
          pages[filename] = await res.text();
        } else {
          pages[filename] = `Error loading ${filename}`;
        }
      } catch (err) {
        pages[filename] = `Error loading ${filename}: ${err}`;
      }
    }),
  );

  return pages;
};
