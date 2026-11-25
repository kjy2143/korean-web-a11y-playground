const id = decodeURIComponent(location.pathname.split('/')[2]);

if (import.meta.hot) {
  import.meta.hot.on('playground:demos-changed', (ids) => {
    if (ids.includes(id)) location.reload();
  });
}
