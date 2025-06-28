// Ana Menüye Dön butonunu sayfa tamamen yüklendikten sonra ata
window.onload = function () {
  const anaMenuBtn = document.getElementById("ana-menu-btn");
  if (anaMenuBtn) {
    anaMenuBtn.onclick = () => {
      window.location.href = "index.html";
    };
  }
};

// ayarla.html seçme işlemleri
let sahaSecildi = null;
let saatSecildi = null;

if (window.location.pathname.includes("ayarla.html")) {
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
        sessionStorage.setItem('saha', sahaSecildi);
        sessionStorage.setItem('saat', saatSecildi);
        window.location.href = 'takim.html';
      };
    }
  }
}

// takim.html işlemleri
if (window.location.pathname.includes("takim.html")) {
  document.getElementById('saha-bilgi').textContent = "Saha: " + (sessionStorage.getItem('saha') || "YOK");
  document.getElementById('saat-bilgi').textContent = "Saat: " + (sessionStorage.getItem('saat') || "YOK");

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

  window.oyuncuEkle = oyuncuEkle;

  function devamEt() {
    const aOyuncular = [...document.querySelectorAll('#a-listesi li')].map(li => li.textContent);
    const bOyuncular = [...document.querySelectorAll('#b-listesi li')].map(li => li.textContent);

    sessionStorage.setItem('a_takimi', JSON.stringify(aOyuncular));
    sessionStorage.setItem('b_takimi', JSON.stringify(bOyuncular));

    window.location.href = "ozet.html";
  }

  window.devamEt = devamEt;
}

// ozet.html ve iptal.html işlemleri
if (
  window.location.pathname.includes("ozet.html") ||
  window.location.pathname.includes("iptal.html")
) {
  const saha = sessionStorage.getItem("saha") || "YOK";
  const saat = sessionStorage.getItem("saat") || "YOK";
  const aOyuncular = JSON.parse(sessionStorage.getItem("a_takimi") || "[]");
  const bOyuncular = JSON.parse(sessionStorage.getItem("b_takimi") || "[]");

  document.getElementById("saha-bilgi").textContent = "Saha: " + saha;
  document.getElementById("saat-bilgi").textContent = "Saat: " + saat;

  const aList = document.getElementById("a-listesi");
  const bList = document.getElementById("b-listesi");

  aList.innerHTML = "";
  bList.innerHTML = "";

  aOyuncular.forEach((isim) => {
    const li = document.createElement("li");
    li.textContent = isim;
    aList.appendChild(li);
  });

  bOyuncular.forEach((isim) => {
    const li = document.createElement("li");
    li.textContent = isim;
    bList.appendChild(li);
  });

  if (window.location.pathname.includes("ozet.html")) {
    const tabsContainer = document.getElementById("match-tabs");
    tabsContainer.innerHTML = "";

    const matches = [
      {
        saha,
        saat,
        label: `${saha} - ${saat}`,
      },
    ];

    matches.forEach((mac, i) => {
      const tab = document.createElement("div");
      tab.className = "match-tab" + (i === 0 ? " active" : "");
      tab.textContent = mac.label;
      tabsContainer.appendChild(tab);
    });
  }
}

// iptal etme fonksiyonu
function iptalEt() {
  const onay = confirm("Rezervasyonu iptal etmek istediğinize emin misiniz?");
  if (onay) {
    sessionStorage.clear();
    window.location.href = "index.html";
  }
}
window.iptalEt = iptalEt;
