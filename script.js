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
