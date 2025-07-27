const defaultWords = [
  { word: 'pani', image: 'images/pani.png' },
  { word: 'khana', image: 'images/khana.png' },
  { word: 'dedo', image: 'images/dedo.png' },
  { word: 'papa', image: 'images/papa.png' },
  { word: 'mumma', image: 'images/mumma.png' },
  { word: 'dadi', image: 'images/dadi.png' },
  { word: 'bhai', image: 'images/bhai.png' },
  { word: 'chalo', image: 'images/chalo.png' },
  { word: 'baitho', image: 'images/baitho.png' },
];

function loadWords() {
  let words = JSON.parse(localStorage.getItem('speechWords'));
  if (!words) {
    words = defaultWords;
    localStorage.setItem('speechWords', JSON.stringify(words));
  }
  renderBoard(words);
}

function renderBoard(words) {
  const board = document.getElementById('board');
  board.innerHTML = '';
  words.forEach(({ word, image }) => {
    const card = document.createElement('div');
    card.className = 'card';
    card.title = word;

    const img = document.createElement('img');
    img.src = image;
    img.alt = word;

    const p = document.createElement('p');
    p.textContent = word;

    card.appendChild(img);
    card.appendChild(p);

    card.addEventListener('click', () => speakWord(word));

    board.appendChild(card);
  });
}

function speakWord(word) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(word);
    utterance.lang = 'hi-IN'; // Hindi
    window.speechSynthesis.speak(utterance);
  } else {
    alert('Sorry, your browser does not support text-to-speech.');
  }
}

function addWord(newWord) {
  let words = JSON.parse(localStorage.getItem('speechWords')) || [];
  words.push(newWord);
  localStorage.setItem('speechWords', JSON.stringify(words));
}
