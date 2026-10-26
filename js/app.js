(() => {
  const views = [...document.querySelectorAll('.view[data-page]')];
  const navLinks = [...document.querySelectorAll('[data-view]')];
  const menuButton = document.querySelector('.mobile-menu');

  function showView(name, updateHash = true) {
    const target = views.find(view => view.dataset.page === name) || views[0];
    views.forEach(view => {
      const active = view === target;
      view.classList.toggle('active', active);
      view.hidden = !active;
      if (active) view.setAttribute('aria-current', 'page');
      else view.removeAttribute('aria-current');
    });
    document.querySelectorAll('.side-nav .nav-link').forEach(link => {
      const active = link.dataset.view === target.dataset.page;
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page');
      else link.removeAttribute('aria-current');
    });
    if (updateHash && location.hash !== `#${target.id}`) history.pushState(null, '', `#${target.id}`);
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  navLinks.forEach(link => link.addEventListener('click', event => {
    const name = link.dataset.view;
    if (!name) return;
    event.preventDefault();
    showView(name);
  }));

  window.addEventListener('popstate', () => showView(location.hash.slice(1) || 'inicio', false));
  menuButton?.addEventListener('click', () => {
    const opened = document.body.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(opened));
    menuButton.setAttribute('aria-label', opened ? 'Cerrar navegación' : 'Abrir navegación');
    menuButton.innerHTML = opened ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });

  document.querySelectorAll('.filter-button').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach(item => item.classList.toggle('selected', item === button));
    const filter = button.dataset.filter;
    let visible = 0;
    document.querySelectorAll('.project-card').forEach(card => {
      const matches = filter === 'todos' || card.dataset.category.split(' ').includes(filter);
      card.hidden = !matches;
      if (matches) visible++;
    });
    const count = document.querySelector('.project-count');
    if (count) count.textContent = `${visible} ${visible === 1 ? 'proyecto' : 'proyectos'}`;
  }));

  const initial = location.hash.slice(1);
  showView(views.some(view => view.dataset.page === initial) ? initial : 'inicio', false);
})();
