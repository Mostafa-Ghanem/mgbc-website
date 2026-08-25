/**
 * PageHero owns the rendered H1 for content pages.
 * Keep the authored Markdown heading as the source text, but remove its
 * duplicate from the compiled body so each page has one semantic H1.
 */
export default function removeLeadingHeading() {
  return function removeHeadingFromTree(tree) {
    const leadingHeadingIndex = tree.children?.findIndex(
      (node) => node.type === 'heading' && node.depth === 1,
    );

    if (leadingHeadingIndex >= 0) {
      tree.children.splice(leadingHeadingIndex, 1);
    }
  };
}
