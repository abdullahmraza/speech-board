const defaultWords = [
  { word: 'pani', image: 'images/pani.jpg' },
  { word: 'khana', image: 'images/khana.jpg' },
  { word: 'dedo', image: 'images/dedo.jpg' },
  { word: 'papa', image: 'images/papa.jpg' },
  { word: 'mumma', image: 'images/mummy.jpg' },
  { word: 'dadi', image: 'images/dadi.jpg' },
  { word: 'bhai', image: 'images/bhai.jpeg' },
  { word: 'chalo', image: 'images/chalo.jpg' },
  { word: 'baitho', image: 'images/baitho.jpg' },
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

    card.addEventListener('click', () => showPopup(word, image));

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
