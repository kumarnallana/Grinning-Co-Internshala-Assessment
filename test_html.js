fetch('http://localhost:3000').then(r => r.text()).then(t => {
  console.log('formula:', t.includes('id="formula"'));
  console.log('header a:', t.includes('<header') && t.includes('<a'));
});
