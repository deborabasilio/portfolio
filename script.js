// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Menu scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Animações de rolagem
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    // Muda o cabeçalho ao rolar a página
    const header = document.querySelector('header');
    let isScrolling = false;

    window.addEventListener('scroll', () => {
        if (!isScrolling) {
            window.requestAnimationFrame(() => {
                if (window.scrollY > 50) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
                isScrolling = false;
            });
            isScrolling = true;
        }
    });

    // Copiar contato para a área de transferência
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function () {
            const textToCopy = this.getAttribute('data-copy');

            navigator.clipboard.writeText(textToCopy).then(() => {
                this.classList.add('bounce');
                this.classList.add('copied');

                const msgSpan = this.querySelector('.copy-msg');
                msgSpan.textContent = 'Copiado!';

                setTimeout(() => {
                    this.classList.remove('bounce');
                }, 400);

                setTimeout(() => {
                    this.classList.remove('copied');
                    msgSpan.textContent = 'Copiar';
                }, 2000);
            }).catch(err => {
                console.error('Falha ao copiar: ', err);
            });
        });
    });

    // Atualiza o ano no rodapé
    const yearElement = document.getElementById('current-year');
    if (yearElement) {
        yearElement.textContent = new Date().getFullYear();
    }

    // Toggle menu hambúrguer
    const hamburger = document.querySelector('.hamburger');
    const navbar = document.querySelector('.navbar');

    if (hamburger && navbar) {
        hamburger.addEventListener('click', () => {
            navbar.classList.toggle('active');
            const icon = hamburger.querySelector('i');
            if (navbar.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });

        // Fechar o menu ao clicar em um link
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }

    // Acordeão de Habilidades
    document.querySelectorAll('.accordion-header').forEach(headerEl => {
        headerEl.addEventListener('click', () => {
            const contentId = headerEl.getAttribute('data-target');
            const content = document.getElementById(contentId);
            const item = headerEl.parentElement;

            item.classList.toggle('active');

            if (content) {
                content.classList.toggle('open');
            }
        });
    });
});

