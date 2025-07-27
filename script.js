const defaultWords = [
  { word: 'pani', image: 'images/pani.jpg' },
  { word: 'khana', image: 'images/khana.jpg' },
  { word: 'dedo', image: 'images/dedo.jpg' },
  { word: 'papa', image: 'images/papa.jpg' },
  { word: 'mumma', image: 'images/mummy.jpeg' },
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

    const img = document.createElement('img');
    img.src = image;
    img.alt = word;

    const p = document.createElement('p');
    p.textContent = word;

    card.appendChild(img);
    card.appendChild(p);

    // On click, show popup and speak
    card.addEventListener('click', () => {
      showPopup(image, word);
    });

    board.appendChild(card);
  });
}

function speak(text) {
  if ('speechSynthesis' in window) {
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'hi-IN';
    speechSynthesis.cancel(); // Cancel ongoing speech
    speechSynthesis.speak(utterance);
  } else {
    alert('Speech synthesis not supported');
  }
}

function showPopup(imageSrc, word) {
  const popup = document.getElementById('popup');
  const popupImage = document.getElementById('popup-image');
  const popupText = document.getElementById('popup-text');

  popupImage.src = imageSrc;
  popupText.textContent = word;

  popup.style.display = 'flex';

  speak(word);
}

function closePopup() {
  document.getElementById('popup').style.display = 'none';
}

// Close popup on Esc key
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') {
    closePopup();
  }
});

function addWord(newWord) {
  let words = JSON.parse(localStorage.getItem('speechWords')) || [];
  words.push(newWord);
  localStorage.setItem('speechWords', JSON.stringify(words));
  renderBoard(words); // Re-render after adding
}
