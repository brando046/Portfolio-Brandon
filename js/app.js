(() => {
  const views = [...document.querySelectorAll('.view[data-page]')];
  const navLinks = [...document.querySelectorAll('[data-view]')];
  const menuButton = document.querySelector('.mobile-menu');
  const projectData = {
    'videoclub': {index:'01',title:'Videoclub',image:'img/videoclub.png',alt:'Interfaz de la aplicación de gestión de videoclub',tags:['Java','MySQL / MariaDB','Swing','JDBC'],description:'Aplicación de escritorio para gestionar un videoclub. Permite administrar películas, clientes y alquileres desde una interfaz gráfica conectada a una base de datos relacional.',features:['Gestión de películas y clientes.','Registro y consulta de alquileres.','Acceso a base de datos mediante JDBC.','Interfaz gráfica de escritorio con Java Swing.','Operaciones de consulta y gestión de registros.'],repo:'https://github.com/brando046/Videoclub-java'},
    'recetas': {index:'02',title:'Recetas',image:'img/recetas.png',alt:'Interfaz de la aplicación de recetas',tags:['Java','Swing','Ficheros'],description:'Aplicación de escritorio para guardar y consultar recetas de cocina. El proyecto trabaja la organización de información y su persistencia mediante ficheros.',features:['Guardar y consultar recetas.','Buscar recetas dentro de la colección.','Interfaz gráfica desarrollada con Swing.','Gestión de datos mediante ficheros.'],repo:'https://github.com/brando046/Recetas'},
    'asistencias': {index:'03',title:'Asistencias',image:'img/Asistencia.png',alt:'Interfaz del sistema de registro de asistencias',tags:['Java','Swing','Ficheros'],description:'Aplicación para registrar entradas y salidas de empleados y consultar el historial de fichajes, con una interfaz de escritorio.',features:['Registro de entradas y salidas.','Consulta del historial de fichajes.','Interfaz gráfica con Java Swing.','Persistencia de información mediante ficheros.'],repo:'https://github.com/brando046/Asistencias'},
    'videojuegos': {index:'04',title:'Registro de videojuegos',image:'img/registro-videojuegos.png',alt:'Interfaz del registro personal de videojuegos',tags:['Java','Swing','CRUD'],description:'Aplicación para mantener una colección personal de videojuegos y gestionar sus registros desde una interfaz gráfica.',features:['Añadir videojuegos a la colección.','Consultar y modificar registros existentes.','Eliminar elementos de la colección.','Operaciones CRUD mediante una interfaz Swing.'],repo:'https://github.com/brando046/Registro-de-videojuegos-personal'},
    'web-esther': {index:'05',title:'Esther Velasco',image:'img/web.png',alt:'Captura del proyecto web Esther Velasco',tags:['HTML','CSS','JavaScript','Responsive'],description:'Diseño y desarrollo de una página web para una clínica ficticia, con contenidos organizados y una presentación visual adaptada a diferentes tamaños de pantalla.',features:['Estructura de página con HTML.','Estilos y composición visual con CSS.','Interactividad con JavaScript.','Diseño responsive para distintos dispositivos.'],repo:'https://bvaz.blog/',repoLabel:'Ver página web'},
    'tienda-online': {index:'06',title:'Tienda online',image:'img/tienda-online.jpg',alt:'Imagen del proyecto de tienda online',tags:['Web','SQL','Diseño'],description:'Proyecto de tienda online centrado en la presentación de productos y en la organización de los datos necesarios para su gestión.',features:['Organización de información de productos.','Diseño de una experiencia de tienda online.','Trabajo con datos y conceptos de SQL.'],repo:'https://github.com/brando046/tienda-online'},
    'tres-en-raya': {index:'07',title:'Tres en raya',image:'img/tres-en-raya.png',alt:'Interfaz del juego tres en raya',tags:['Java','Swing','Juegos'],description:'Juego de escritorio de tres en raya con interfaz gráfica y lógica para desarrollar una partida entre jugadores.',features:['Interfaz gráfica con Java Swing.','Lógica de colocación de fichas y control de la partida.','Opción para iniciar nuevas partidas.','Proyecto orientado a practicar eventos y lógica de aplicación.'],repo:'https://github.com/brando046/tres-en-raya'}
  };

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
      const active = link.dataset.view === target.dataset.page || (target.dataset.page === 'proyecto-detalle' && link.dataset.view === 'proyectos');
      link.classList.toggle('active', active);
      if (active) link.setAttribute('aria-current', 'page'); else link.removeAttribute('aria-current');
    });
    if (updateHash && location.hash !== `#${target.id}`) history.pushState(null, '', `#${target.id}`);
    document.body.classList.remove('menu-open');
    menuButton?.setAttribute('aria-expanded', 'false');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function openProject(id) {
    const project = projectData[id];
    if (!project) return;
    document.getElementById('detail-eyebrow').textContent = `PROYECTO · ${project.index}`;
    document.getElementById('detail-title').textContent = project.title;
    const image = document.getElementById('detail-image');
    image.src = project.image; image.alt = project.alt;
    document.getElementById('detail-image-caption').textContent = `Vista del proyecto · ${project.title}`;
    document.getElementById('detail-description').textContent = project.description;
    const tags = document.getElementById('detail-tags'); tags.replaceChildren();
    project.tags.forEach(tag => { const span = document.createElement('span'); span.textContent = tag; tags.appendChild(span); });
    const features = document.getElementById('detail-features'); features.replaceChildren();
    project.features.forEach(feature => { const li = document.createElement('li'); const icon = document.createElement('i'); icon.className = 'fa-solid fa-circle-check'; const text = document.createElement('span'); text.textContent = feature; li.append(icon, text); features.appendChild(li); });
    const repo = document.getElementById('detail-repo'); repo.href = project.repo; repo.innerHTML = `<i class="${project.repoLabel ? 'fa-solid fa-arrow-up-right-from-square' : 'fa-brands fa-github'}"></i> ${project.repoLabel || 'Ver código en GitHub'}`;
    showView('proyecto-detalle');
  }

  navLinks.forEach(link => link.addEventListener('click', event => {
    const name = link.dataset.view;
    if (!name) return;
    event.preventDefault();
    showView(name);
  }));
  document.querySelectorAll('[data-project-detail]').forEach(button => button.addEventListener('click', () => openProject(button.dataset.projectDetail)));
  window.addEventListener('popstate', () => showView(location.hash.slice(1) || 'inicio', false));
  menuButton?.addEventListener('click', () => {
    const opened = document.body.classList.toggle('menu-open');
    menuButton.setAttribute('aria-expanded', String(opened));
    menuButton.setAttribute('aria-label', opened ? 'Cerrar navegación' : 'Abrir navegación');
    menuButton.innerHTML = opened ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
  });
  document.querySelectorAll('.filter-button').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.filter-button').forEach(item => item.classList.toggle('selected', item === button));
    const filter = button.dataset.filter; let visible = 0;
    document.querySelectorAll('.project-card').forEach(card => { const matches = filter === 'todos' || card.dataset.category.split(' ').includes(filter); card.hidden = !matches; if (matches) visible++; });
    const count = document.querySelector('.project-count'); if (count) count.textContent = `${visible} ${visible === 1 ? 'proyecto' : 'proyectos'}`;
  }));
  const initial = location.hash.slice(1);
  showView(views.some(view => view.dataset.page === initial) ? initial : 'inicio', false);
})();
