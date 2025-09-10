function toggleMenu() {
  const menuBtn = document.querySelector('.menu-btn'); // the hamburger button
  const menu = document.getElementById('menu');        // the dropdown menu

  menuBtn.classList.toggle('active');
  menu.classList.toggle('active');
}
