export const nodeObserver = new IntersectionObserver(entries => {
  //console.log(entries);
  entries.forEach(entry => {
    entry.target.classList.toggle('animate-in', entry.isIntersecting);
    if (entry.isIntersecting) nodeObserver.unobserve(entry.target);
  }, {
    threshold: 1
  });
});