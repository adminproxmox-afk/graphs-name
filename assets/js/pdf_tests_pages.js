const PDF_TEST_PAGE_IMAGES = {
  t1: [
    'assets/images/pdf-pages/t1/page-1.png',
    'assets/images/pdf-pages/t1/page-2.png',
    'assets/images/pdf-pages/t1/page-3.png',
    'assets/images/pdf-pages/t1/page-4.png',
  ],
  t2: [
    'assets/images/pdf-pages/t2/page-1.png',
    'assets/images/pdf-pages/t2/page-2.png',
    'assets/images/pdf-pages/t2/page-3.png',
    'assets/images/pdf-pages/t2/page-4.png',
    'assets/images/pdf-pages/t2/page-5.png',
    'assets/images/pdf-pages/t2/page-6.png',
  ],
  t3: [
    'assets/images/pdf-pages/t3/page-1.png',
    'assets/images/pdf-pages/t3/page-2.png',
    'assets/images/pdf-pages/t3/page-3.png',
    'assets/images/pdf-pages/t3/page-4.png',
    'assets/images/pdf-pages/t3/page-5.png',
    'assets/images/pdf-pages/t3/page-6.png',
    'assets/images/pdf-pages/t3/page-7.png',
    'assets/images/pdf-pages/t3/page-8.png',
    'assets/images/pdf-pages/t3/page-9.png',
    'assets/images/pdf-pages/t3/page-10.png',
  ],
};

function renderPdfPageGalleries() {
  document.querySelectorAll('[data-pdf-key]').forEach((container) => {
    const key = container.dataset.pdfKey;
    const pages = PDF_TEST_PAGE_IMAGES[key] || [];
    container.innerHTML = pages.map((src, index) => `
      <figure class="pdf-page-frame">
        <img src="../${src}" alt="${key.toUpperCase()} сторінка ${index + 1}" loading="lazy">
        <figcaption class="pdf-page-label">Сторінка ${index + 1}</figcaption>
      </figure>
    `).join('');
  });
}

document.addEventListener('DOMContentLoaded', renderPdfPageGalleries);
