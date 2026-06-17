const GRAPHLY_BASE_PATH = (() => {
    const pathname = window.location.pathname.replace(/\\/g, '/');

    if (pathname.includes('/src/lectures_pages/')) return '../../';
    if (pathname.includes('/src/')) return '../';
    return './';
})();

function toSiteUrl(target) {
    if (!target || /^(?:[a-z]+:)?\/\//i.test(target) || target.startsWith('#') || target.startsWith('mailto:')) {
        return target;
    }

    return `${GRAPHLY_BASE_PATH}${target}`;
}

function renderSiteHeader() {
    return `
        <header class="header">
            <nav class="nav container">
                <div class="nav__data">
                    <a href="${toSiteUrl('index.html')}" class="nav__logo">
                        <i class="ri-organization-chart"></i> Graphly
                    </a>
                    <div class="nav__toggle" id="nav-toggle" role="button" tabindex="0" aria-label="Відкрити меню" aria-expanded="false">
                        <i class="ri-menu-line nav__burger"></i>
                        <i class="ri-close-line nav__close"></i>
                    </div>
                </div>
                <div class="nav__menu" id="nav-menu">
                    <ul class="nav__list">
                        <li><a href="${toSiteUrl('index.html')}" class="nav__link">Головна</a></li>
                        <li class="dropdown__item">
                            <div class="nav__link">Матеріали <i class="ri-arrow-down-s-line dropdown__arrow"></i></div>
                            <ul class="dropdown__menu">
                                <li><a href="${toSiteUrl('src/lectures.html')}" class="dropdown__link"><i class="ri-book-open-line"></i> Лекції</a></li>
                                <li><a href="${toSiteUrl('src/practical_work_new.html')}" class="dropdown__link"><i class="ri-file-list-3-line"></i> Практичні роботи</a></li>
                                <li><a href="${toSiteUrl('src/assignments.html')}" class="dropdown__link"><i class="ri-file-code-line"></i> Завдання</a></li>
                                <li><a href="${toSiteUrl('src/independent_work.html')}" class="dropdown__link"><i class="ri-user-line"></i> Самостійні роботи</a></li>
                            </ul>
                        </li>
                        <li class="dropdown__item">
                            <div class="nav__link">Інструменти <i class="ri-arrow-down-s-line dropdown__arrow"></i></div>
                            <ul class="dropdown__menu">
                                <li><a href="${toSiteUrl('src/graph_editor.html')}" class="dropdown__link"><i class="ri-pencil-ruler-line"></i> Редактор графів</a></li>
                                <li><a href="${toSiteUrl('src/algorithms.html')}" class="dropdown__link"><i class="ri-search-line"></i> Алгоритми</a></li>
                                <li><a href="${toSiteUrl('src/graph_visualization.html')}" class="dropdown__link"><i class="ri-eye-line"></i> Візуалізація графів</a></li>
                                <li><a href="${toSiteUrl('src/graph_analysis.html')}" class="dropdown__link"><i class="ri-bar-chart-box-line"></i> Аналіз графів</a></li>
                            </ul>
                        </li>
                        <li class="dropdown__item">
                            <div class="nav__link">Тестування знань <i class="ri-arrow-down-s-line dropdown__arrow"></i></div>
                            <ul class="dropdown__menu">
                                <li><a href="${toSiteUrl('src/quiz.html')}" class="dropdown__link"><i class="ri-question-line"></i> Перевірка знань</a></li>
                                <li><a href="${toSiteUrl('src/assessment.html')}" class="dropdown__link"><i class="ri-award-line"></i> Оцінювання</a></li>
                            </ul>
                        </li>
                        <li><a href="${toSiteUrl('src/support.html')}" class="nav__link">Підтримка</a></li>
                    </ul>
                </div>
            </nav>
        </header>`;
}

function renderThemeToggle() {
    return `
        <button id="theme-toggle" class="theme-switcher theme-float" type="button" aria-label="Увімкнути темну тему">
            <i class="ri-moon-line"></i>
        </button>`;
}

function renderSiteFooter() {
    return `
        <footer class="footer-modern">
            <div class="container footer-inner">
                <div class="footer-brand">
                    <a href="${toSiteUrl('index.html')}" class="nav__logo"><i class="ri-organization-chart"></i> Graphly</a>
                    <p class="footer-copy">Єдина навігація для лекцій, практичних робіт, тестів та інструментів.</p>
                </div>
                <div class="footer-links">
                    <a class="footer-link" href="${toSiteUrl('src/lectures.html')}">Лекції</a>
                    <a class="footer-link" href="${toSiteUrl('src/practical_work_new.html')}">Практичні роботи</a>
                    <a class="footer-link" href="${toSiteUrl('src/quiz.html')}">Перевірка знань</a>
                </div>
            </div>
        </footer>`;
}

function renderSiteShell() {
    const body = document.body;
    if (!body) return;

    const header = document.querySelector('header.header');
    if (header) {
        header.outerHTML = renderSiteHeader();
    } else {
        body.insertAdjacentHTML('afterbegin', renderSiteHeader());
    }

    document.querySelectorAll('#theme-toggle').forEach((toggle) => toggle.remove());

    const currentHeader = document.querySelector('header.header');
    if (currentHeader) {
        currentHeader.insertAdjacentHTML('afterend', renderThemeToggle());
    } else {
        body.insertAdjacentHTML('afterbegin', renderThemeToggle());
    }

    const footer = document.querySelector('footer.footer-modern');
    if (footer) {
        footer.outerHTML = renderSiteFooter();
    } else {
        body.insertAdjacentHTML('beforeend', renderSiteFooter());
    }
}

function closeNavMenu(nav, toggle) {
    if (!nav || !toggle) return;
    nav.classList.remove('show-menu');
    toggle.classList.remove('show-icon');
    toggle.setAttribute('aria-expanded', 'false');
}

function initNavMenu() {
    const toggle = document.getElementById('nav-toggle');
    const nav = document.getElementById('nav-menu');

    if (!toggle || !nav) return;

    const syncDropdownState = () => {
        if (window.innerWidth >= 1118) {
            nav.querySelectorAll('.dropdown__item.dropdown-open').forEach((item) => item.classList.remove('dropdown-open'));
        }
    };

    toggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('show-menu');
        toggle.classList.toggle('show-icon', isOpen);
        toggle.setAttribute('aria-expanded', String(isOpen));
    });

    toggle.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            toggle.click();
        }
    });

    document.addEventListener('click', (event) => {
        const dropdownTrigger = event.target.closest('#nav-menu .dropdown__item > .nav__link');
        if (dropdownTrigger && window.innerWidth < 1118) {
            event.preventDefault();
            dropdownTrigger.parentElement.classList.toggle('dropdown-open');
            return;
        }

        const navLink = event.target.closest('#nav-menu a.nav__link, #nav-menu .dropdown__link');
        if (navLink) {
            closeNavMenu(nav, toggle);
        }
    });

    window.addEventListener('resize', () => {
        syncDropdownState();
        if (window.innerWidth >= 992) {
            closeNavMenu(nav, toggle);
        }
    });
}

/*=============== PAGE TRANSITION ===============*/
function initPageTransition() {
    const pageContainer = document.querySelector('main.page-enter') || document.querySelector('main') || document.body;
    pageContainer.classList.add('page-enter');
    window.addEventListener('load', () => {
        pageContainer.classList.add('page-loaded');
        pageContainer.classList.remove('page-enter');
    });
    document.querySelectorAll('a[href$=".html"]').forEach((link) => {
        if (link.target || link.dataset.noTransition) return;
        link.addEventListener('click', (event) => {
            const href = link.getAttribute('href');
            if (!href || href.startsWith('http') || href.startsWith('#')) return;
            event.preventDefault();
            pageContainer.classList.remove('page-loaded');
            pageContainer.classList.add('page-enter');
            setTimeout(() => window.location.assign(href), 220);
        });
    });
}

/*=============== KEYBOARD SHORTCUTS ===============*/
function initKeyboardShortcuts() {
    window.addEventListener('keydown', (event) => {
        const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0;
        const modKey = event.ctrlKey || event.metaKey;
        if (!modKey) return;

        if (event.key.toLowerCase() === 'z') {
            event.preventDefault();
            if (typeof window.undoAction === 'function') {
                window.undoAction();
            } else {
                showToast('Undo недоступний на цій сторінці.', 'warning');
            }
        }
        if (event.key.toLowerCase() === 'y' || (isMac && event.shiftKey && event.key.toLowerCase() === 'z')) {
            event.preventDefault();
            if (typeof window.redoAction === 'function') {
                window.redoAction();
            } else {
                showToast('Redo недоступний на цій сторінці.', 'warning');
            }
        }
        if (event.key.toLowerCase() === 's') {
            event.preventDefault();
            if (typeof window.exportGraph === 'function') {
                window.exportGraph();
                showToast('Граф збережено.', 'success');
            } else {
                showToast('Збереження доступне у редакторі графів.', 'default');
            }
        }
    });
}

function initShellSkeleton() {
    document.documentElement.classList.add('has-skeleton');
    window.addEventListener('load', () => {
        document.documentElement.classList.remove('has-skeleton');
    });
}

window.addEventListener('DOMContentLoaded', () => {
    renderSiteShell();
    initNavMenu();
    initShellSkeleton();
    initPageTransition();
    initKeyboardShortcuts();
});
