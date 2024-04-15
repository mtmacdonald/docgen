document.addEventListener('DOMContentLoaded', function () {
  // Mathematical expressions using katex
  const elements = document.querySelectorAll('.dg-katexMath');
  elements.forEach((element) => {
    const tex = element.textContent.trim();

    const displayStyle = element.tagName === 'DIV' ? '\\displaystyle' : '';
    const preparedTex = `${displayStyle} ${tex}`;
    try {
      katex.render(preparedTex, element);
    } catch (err) {
      element.innerHTML = "<span class='err'>" + err;
    }
  });
});
