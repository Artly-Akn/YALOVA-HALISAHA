let sahaSecildi = null;
let saatSecildi = null;

document.querySelectorAll('#saha-listesi .item:not(.disabled)').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('#saha-listesi .item').forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
    sahaSecildi = item.dataset.name;
    kontrolEt();
  });
});

document.querySelectorAll('#saat-listesi .item:not(.disabled)').forEach(item => {
  item.addEventListener('click', () => {
    document.querySelectorAll('#saat-listesi .item').forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
    saatSecildi = item.dataset.time;
    kontrolEt();
  });
});

function kontrolEt() {
  const btn = document.getElementById('devam-btn');
  if (sahaSecildi && saatSecildi) {
    btn.classList.add('active');
    btn.disabled = false;
    btn.onclick = () => {
      // Seçilen bilgiler sessionStorage'a kaydedilir
      sessionStorage.setItem('saha', sahaSecildi);
      sessionStorage.setItem('saat', saatSecildi);
      window.location.href = 'takim.html';
    };
  }
}
// Sayfa yüklendiğinde saha/saat bilgilerini yaz
if (window.location.pathname.includes("takim.html")) {
  document.getElementById('saha-bilgi').textContent = "Saha: " + (sessionStorage.getItem('saha') || "YOK");
  document.getElementById('saat-bilgi').textContent = "Saat: " + (sessionStorage.getItem('saat') || "YOK");
}

// Oyuncu ekleme fonksiyonu
function oyuncuEkle(takim) {
  const isim = prompt("Oyuncu ismi:");
  if (!isim) return;

  const li = document.createElement('li');
  li.textContent = isim;

  if (takim === 'a') {
    document.getElementById('a-listesi').appendChild(li);
  } else {
    document.getElementById('b-listesi').appendChild(li);
  }
}

// Devam tuşu
function devamEt() {
  // Takım listelerini kaydet
  const aOyuncular = [...document.querySelectorAll('#a-listesi li')].map(li => li.textContent);
  const bOyuncular = [...document.querySelectorAll('#b-listesi li')].map(li => li.textContent);

  sessionStorage.setItem('a_takimi', JSON.stringify(aOyuncular));
  sessionStorage.setItem('b_takimi', JSON.stringify(bOyuncular));

  window.location.href = "ozet.html";
}

// ozet.html sayfasında bilgileri göster
if (window.location.pathname.includes("ozet.html") || window.location.pathname.includes("iptal.html")) {
  document.getElementById('saha-bilgi').textContent = "Saha: " + (sessionStorage.getItem('saha') || "YOK");
  document.getElementById('saat-bilgi').textContent = "Saat: " + (sessionStorage.getItem('saat') || "YOK");

  const aOyuncular = JSON.parse(sessionStorage.getItem('a_takimi') || "[]");
  const bOyuncular = JSON.parse(sessionStorage.getItem('b_takimi') || "[]");

  const aList = document.getElementById('a-listesi');
  const bList = document.getElementById('b-listesi');

  aOyuncular.forEach(isim => {
    const li = document.createElement('li');
    li.textContent = isim;
    aList.appendChild(li);
  });

  bOyuncular.forEach(isim => {
    const li = document.createElement('li');
    li.textContent = isim;
    bList.appendChild(li);
  });
}
