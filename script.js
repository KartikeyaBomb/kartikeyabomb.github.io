const sections=[...document.querySelectorAll('[data-section]')];
const links=[...document.querySelectorAll('.section-nav a')];
const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting)links.forEach(link=>link.classList.toggle('active',link.hash===`#${entry.target.id}`))})},{rootMargin:'-35% 0px -55%'});
sections.forEach(section=>observer.observe(section));
