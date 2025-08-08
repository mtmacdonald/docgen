/*
 SVG Injector
 Instantiate svg injector to show SVG icons
*/
const injectSVG = () => {
  const dgIcons = document.querySelectorAll(' .dgIcon');
  dgIcons.forEach((icon) => {
    const { name } = icon.dataset;
    icon.innerHTML = w_icons[name];
  });
};

/*
  Document Ready
*/
document.addEventListener('DOMContentLoaded', function () {
  injectSVG();
});
