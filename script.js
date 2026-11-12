/* Único punto de configuración: reemplaza los [PLACEHOLDERS] por datos reales (ver README). */
const CONFIG = {
  WHATSAPP: "[NÚMERO_WHATSAPP]", // solo dígitos con código de país, p. ej. "51987654321"
  CORREO: "[CORREO_URU]",
  TELEFONO: "[TELÉFONO_URU]",
  DIRECCION: "[DIRECCIÓN_URU]",
  HORARIO: "[HORARIO_ATENCIÓN]",
  RUC: "[RUC_URU]",
  NOMBRE_FABRICANTE: "[NOMBRE_FABRICANTE]",
  COSTO_DELIVERY_MIN: "[COSTO_DELIVERY_MIN]",
  HORA_CORTE: "[HORA_CORTE]",
  COURIER_PROVINCIAS: "[COURIER_PROVINCIAS]",
  PASARELA_PAGO: "[PASARELA_PAGO]",
  COLORES_DISPONIBLES: "[COLORES_DISPONIBLES]",
  TIEMPO_CARGA: "[CONFIRMAR TIEMPO DE CARGA]",
  AUTONOMIA_BAJA: "[CONFIRMAR AUTONOMÍA DE BATERÍA]",
  AUTONOMIA_ALTA: "[CONFIRMAR]",
  USO_DURANTE_CARGA: "[CONFIRMAR USO DURANTE CARGA]",
  // Solo se aplican si empiezan con "http"
  ENLACES: {
    INSTAGRAM: "[ENLACE_INSTAGRAM]",
    TIKTOK: "[ENLACE_TIKTOK]",
    FACEBOOK: "[ENLACE_FACEBOOK]",
    YOUTUBE: "[ENLACE_YOUTUBE]",
    MERCADO_LIBRE: "[ENLACE_MERCADO_LIBRE]",
    WHATSAPP_BUSINESS: "[ENLACE_WHATSAPP_BUSINESS]"
  },
  // Por combo de 1, 2 y 3. Sin link válido → WhatsApp del combo
  PAGOS: ["[ENLACE_PAGO_1]", "[ENLACE_PAGO_2]", "[ENLACE_PAGO_3]"],
  STOCK_LIMITADO: true,
  RESEÑAS: [], // solo reales: { nombre, distrito, texto }
  GA_ID: "[GA_ID]", // sin uso por ahora
  META_PIXEL_ID: "[META_PIXEL_ID]",
  MENSAJES: {
    general: "Hola URU 👋 Quiero el Ventilador Portátil Clip 360° (vi la página uru.pe/ventilador-clip). ¿Me confirman stock y delivery a [mi distrito]?",
    combo1: "Hola URU 👋 Quiero 1 Ventilador Portátil Clip 360° (S/ 45). ¿Me confirman stock y delivery a [mi distrito]?",
    combo2: "Hola URU 👋 Quiero el combo de 2 ventiladores clip (S/ 80, delivery incluido en Lima). ¿Me confirman stock?",
    combo3: "Hola URU 👋 Quiero el combo de 3 ventiladores clip (S/ 105, delivery incluido en Lima). ¿Me confirman stock?"
  }
};

(() => {
  const $$ = (s) => document.querySelectorAll(s);
  const esUrl = (v) => /^https?:\/\//.test(v);
  const wa = (k) => `https://wa.me/${CONFIG.WHATSAPP.replace(/\D/g, "")}?text=${encodeURIComponent(CONFIG.MENSAJES[k] || CONFIG.MENSAJES.general)}`;

  // Textos, WhatsApp, pagos, redes y correo (RF-15, RF-16)
  $$("[data-texto]").forEach((el) => { const v = CONFIG[el.dataset.texto]; if (v) el.textContent = v; });
  $$("[data-wa]").forEach((el) => { el.href = wa(el.dataset.wa); });
  $$("[data-pago]").forEach((el) => {
    const n = el.dataset.pago, url = CONFIG.PAGOS[n - 1];
    el.href = esUrl(url) ? url : wa("combo" + n);
  });
  $$("[data-enlace]").forEach((el) => { const url = CONFIG.ENLACES[el.dataset.enlace]; if (esUrl(url)) el.href = url; });
  if (!CONFIG.CORREO.startsWith("[")) {
    $$("[data-correo]").forEach((el) => { el[el.tagName === "FORM" ? "action" : "href"] = "mailto:" + CONFIG.CORREO; });
  }

  document.documentElement.classList.toggle("sin-stock-limitado", !CONFIG.STOCK_LIMITADO);

  // Reseñas (RF-09): con textContent, nunca innerHTML
  const resenas = document.getElementById("resenas");
  if (resenas && CONFIG.RESEÑAS.length) {
    CONFIG.RESEÑAS.forEach((r) => {
      const li = document.createElement("li"), q = document.createElement("blockquote"), p = document.createElement("p");
      q.textContent = `“${r.texto}”`;
      p.textContent = [r.nombre, r.distrito].filter(Boolean).join(" · ");
      li.append(q, p);
      resenas.querySelector("ul").append(li);
    });
    resenas.hidden = false;
  }

  // Sombra del header (RF-01)
  const header = document.getElementById("header");
  if (header) {
    const sombra = () => header.classList.toggle("is-scrolled", scrollY > 8);
    addEventListener("scroll", sombra, { passive: true });
    sombra();
  }

  if (!("IntersectionObserver" in window)) { $$(".revelar").forEach((el) => el.classList.add("visible")); return; }

  // Barra inferior: visible fuera del hero y antes del footer (RF-14)
  const barra = document.getElementById("barra-inferior"), hero = document.getElementById("hero"), footer = document.getElementById("footer");
  if (barra && hero && footer) {
    const en = { hero: true, footer: false };
    const obs = new IntersectionObserver((es) => {
      es.forEach((e) => { en[e.target === hero ? "hero" : "footer"] = e.isIntersecting; });
      barra.classList.toggle("visible", !en.hero && !en.footer);
    });
    obs.observe(hero);
    obs.observe(footer);
  }

  // Videos: el src se asigna solo al entrar en viewport (RF-02, RF-05)
  const quieto = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const desktop = matchMedia("(min-width: 1024px)");
  const obsVideo = new IntersectionObserver((es) => {
    es.forEach(({ target: v, isIntersecting }) => {
      if (!isIntersecting) { if (v.src) v.pause(); return; }
      if ("soloDesktop" in v.dataset && !desktop.matches) return;
      if (!v.src) { v.src = v.dataset.src; v.load(); }
      if (!quieto && !v.dataset.pausado) v.play().catch(() => {});
      const c = v.parentElement.querySelector(".video-control");
      if (c) c.hidden = false;
    });
  }, { threshold: 0.25 });
  $$("video[data-src]").forEach((v) => obsVideo.observe(v));

  // Pausa del video hero (> 5 s, WCAG 2.2.2)
  $$(".video-control").forEach((b) => {
    const v = b.parentElement.querySelector("video");
    const pintar = () => {
      b.querySelector("span").textContent = v.paused ? "Reproducir video" : "Pausar video";
      b.querySelector("use").setAttribute("href", v.paused ? "#i-play" : "#i-pausa");
    };
    b.addEventListener("click", () => {
      if (v.paused) { delete v.dataset.pausado; v.play().catch(() => {}); } else { v.dataset.pausado = "1"; v.pause(); }
    });
    v.addEventListener("play", pintar);
    v.addEventListener("pause", pintar);
    pintar();
  });

  // Animación .revelar (03-diseno.md)
  const obsRevelar = new IntersectionObserver((es) => {
    es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add("visible"); obsRevelar.unobserve(e.target); } });
  }, { threshold: 0.15 });
  $$(".revelar").forEach((el) => obsRevelar.observe(el));
})();
