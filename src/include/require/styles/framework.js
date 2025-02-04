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
  SideBar Toggle Button
*/
const initSideBar = () => {
  const sideBar = document.getElementById('dgSideBar');
  const sideBarButton = document.getElementById('dgSideBarButton');
  const sideBarIcon = sideBarButton.querySelector('span.dgIcon');
  sideBarButton.addEventListener('click', function () {
    if (sideBar.classList.contains('dgSideBarCollapsed')) {
      sideBar.classList.remove('dgSideBarCollapsed');
      sideBarIcon.setAttribute('data-name', 'x');
      sideBarIcon.innerHTML = w_icons['x'];
    } else {
      sideBar.classList.add('dgSideBarCollapsed');
      sideBarIcon.setAttribute('data-name', 'menu-2');
      sideBarIcon.innerHTML = w_icons['menu-2'];
    }
  });
};

/*
  Document Ready
*/
document.addEventListener('DOMContentLoaded', function () {
  initSideBar();
  injectSVG();
});
