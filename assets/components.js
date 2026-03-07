// ──────────────────────────────────────────────
//  Shelly Beach Villa 3.0 — Shared Components
// ──────────────────────────────────────────────

const NAV_LINKS = [
  { href: "index.html", label: "ホーム" },
  { href: "about.html", label: "コンセプト" },
  { href: "rooms.html", label: "お部屋" },
  { href: "facilities.html", label: "設備" },
  { href: "contact.html", label: "お問い合わせ" },
];

function buildHeader() {
  const links = NAV_LINKS.map(
    (l) =>
      `<a class="text-base font-semibold text-slate-600 hover:text-primary transition-colors" href="${l.href}">${l.label}</a>`,
  ).join("");
  const mobileLinks = NAV_LINKS.map(
    (l) =>
      `<a class="text-lg font-semibold text-slate-700 hover:text-primary transition-colors py-2" href="${l.href}">${l.label}</a>`,
  ).join("");

  return `
  <header class="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-stone-200/60 px-6 py-4 lg:px-20 transition-shadow" id="mainHeader">
    <nav class="max-w-7xl mx-auto flex items-center justify-between">
      <a href="index.html" class="flex items-center gap-2 hover:opacity-80 transition-opacity">
        <span class="material-symbols-outlined text-primary text-3xl">home_pin</span>
        <span class="text-xl font-bold tracking-tight text-slate-900">Shelly Beach Villa</span>
      </a>
      <div class="hidden md:flex items-center gap-8">${links}</div>
      <div class="flex items-center gap-4">
        <a href="contact.html" class="hidden md:inline-block bg-primary text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-blue-700 transition-all shadow-lg shadow-primary/20">
          予約する
        </a>
        <button id="mobileMenuBtn" class="md:hidden text-slate-700 p-1">
          <span class="material-symbols-outlined text-3xl" id="menuIcon">menu</span>
        </button>
      </div>
    </nav>
    <!-- Mobile menu -->
    <div id="mobileMenu" class="hidden md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-stone-200 shadow-xl px-8 py-6 flex flex-col gap-2">
      ${mobileLinks}
      <a href="contact.html" class="mt-4 bg-primary text-white text-center px-6 py-3 rounded-full text-sm font-bold hover:bg-blue-700 transition-all">予約する</a>
    </div>
  </header>`;
}

function buildFooter() {
  return `
  <footer class="bg-slate-900 text-slate-400 pt-20 pb-10 px-6 lg:px-20 border-t border-white">
    <div class="max-w-7xl mx-auto">
      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
        <div class="sm:col-span-2 lg:col-span-1">
          <a href="index.html" class="flex items-center gap-2 mb-4">
            <span class="material-symbols-outlined text-white text-2xl">home_pin</span>
            <span class="text-white font-bold tracking-tight text-lg">Shelly Beach Villa</span>
          </a>
          <p class="text-sm leading-relaxed">ニュージーランド・オークランドの日本人向けプレミアム・シェアハウス。</p>
          <p class="text-xs mt-3">Saint Marys Bay, Auckland</p>
        </div>
        <div>
          <h4 class="text-white text-xs font-bold uppercase tracking-widest mb-5">Navigation</h4>
          <ul class="space-y-3 text-sm">
            <li><a href="index.html" class="hover:text-white transition-colors">ホーム</a></li>
            <li><a href="about.html" class="hover:text-white transition-colors">コンセプト</a></li>
            <li><a href="rooms.html" class="hover:text-white transition-colors">お部屋</a></li>
            <li><a href="facilities.html" class="hover:text-white transition-colors">設備</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white text-xs font-bold uppercase tracking-widest mb-5">Support</h4>
          <ul class="space-y-3 text-sm">
            <li><a href="contact.html" class="hover:text-white transition-colors">お問い合わせ</a></li>
            <li><a href="contact.html#faq" class="hover:text-white transition-colors">よくある質問</a></li>
          </ul>
        </div>
        <div>
          <h4 class="text-white text-xs font-bold uppercase tracking-widest mb-5">Contact</h4>
          <ul class="space-y-3 text-sm">
            <li><a href="mailto:kiaora@shellybeachvilla.com" class="hover:text-white transition-colors">kiaora@shellybeachvilla.com</a></li>
            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-base">call</span> +64 27 668 3669</li>
            <li class="flex items-center gap-2"><span class="material-symbols-outlined text-base">location_on</span> 30 Shelly Beach Road, St Marys Bay, Auckland 1011.</li>
          </ul>
        </div>
      </div>
      <div class="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
        <p>© 2026 Shelly Beach Villa. Auckland Premium Living.</p>
        <p>Designed By
          <a href="https://www.moihanatech.com/" class="hover:text-white transition-colors"
            target="_blank" rel="noopener noreferrer">MoiHanaTech
          </a>.
        </p>

      </div>
    </div>
  </footer>`;
}

document.addEventListener("DOMContentLoaded", () => {
  // Inject favicon
  const favicon = document.createElement("link");
  favicon.rel = "icon";
  favicon.type = "image/svg+xml";
  favicon.href = "./assets/favicon-abstract.svg";
  document.head.appendChild(favicon);

  // Inject header
  const hSlot = document.getElementById("header-placeholder");
  if (hSlot) hSlot.outerHTML = buildHeader();
  else document.body.insertAdjacentHTML("afterbegin", buildHeader());

  // Inject footer
  const fSlot = document.getElementById("footer-placeholder");
  if (fSlot) fSlot.outerHTML = buildFooter();
  else document.body.insertAdjacentHTML("beforeend", buildFooter());

  // Re-query after injection
  const header = document.getElementById("mainHeader");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const menuIcon = document.getElementById("menuIcon");

  // Mobile toggle
  mobileMenuBtn?.addEventListener("click", () => {
    const open = !mobileMenu.classList.contains("hidden");
    mobileMenu.classList.toggle("hidden", open);
    if (menuIcon) menuIcon.textContent = open ? "menu" : "close";
  });

  // Header scroll style
  window.addEventListener(
    "scroll",
    () => {
      if (!header) return;
      if (window.scrollY > 60) {
        header.classList.add("shadow-md");
        header.classList.remove("bg-white/90");
        header.classList.add("bg-white/98");
      } else {
        header.classList.remove("shadow-md", "bg-white/98");
        header.classList.add("bg-white/90");
      }
    },
    { passive: true },
  );

  // Highlight current page link
  const currentPage = window.location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll("#mainHeader a[href]").forEach((a) => {
    if (a.getAttribute("href") === currentPage) {
      a.classList.add("text-primary", "font-bold");
      a.classList.remove("text-slate-600");
    }
  });
});
