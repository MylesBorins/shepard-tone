const content = document.getElementById('content');

let count = 0;

function createParagraph(content) {
  const p = document.createElement('p');
  const node = document.createTextNode(content);
  p.appendChild(node);
  return p;
}

function step(i, maxWidth = 50) {
  const halfWidth = Math.floor((maxWidth / 2));
  const j = i % maxWidth;
  const k = i % halfWidth;
  if (j === k) {
    return (new Array(k)).fill('-').join('');
  }
  else {
    return (new Array(halfWidth - k)).fill('-').join('');
  }
}

function stepScroll () {
  const text = `\<${step(count)}\>`;
  content.append(createParagraph(text));
  count++;
}

function initScroll () {
  for (let i = 0; i <= 50; i ++) {
    stepScroll();
  }
}

export {
  initScroll,
  stepScroll
}