// script.js

document.addEventListener('DOMContentLoaded', () => {
    // Rolagem suave para os links de navegação
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

    // Intersection Observer para animações ao rolar a página
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

    // Selecionar elementos para animar
    const animateElements = document.querySelectorAll('.animate-on-scroll');
    animateElements.forEach(el => observer.observe(el));

    // Efeito de fundo no cabeçalho ao rolar a página
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // Copiar para a área de transferência ao clicar nos itens de contato
    document.querySelectorAll('.contact-item').forEach(item => {
        item.addEventListener('click', function () {
            const textToCopy = this.getAttribute('data-copy');

            // API Clipboard
            navigator.clipboard.writeText(textToCopy).then(() => {
                // Adiciona a animação de sobressalto e classe copiada
                this.classList.add('bounce');
                this.classList.add('copied');

                const msgSpan = this.querySelector('.copy-msg');
                msgSpan.textContent = 'Copiado!';

                // Remove a classe da animação de sobressalto após 400ms
                setTimeout(() => {
                    this.classList.remove('bounce');
                }, 400);

                // Volta ao normal após 2 segundos
                setTimeout(() => {
                    this.classList.remove('copied');
                    msgSpan.textContent = 'Copiar';
                }, 2000);
            }).catch(err => {
                console.error('Falha ao copiar: ', err);
            });
        });
    });

    // Atualizar o ano do copyright automaticamente
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

        // Fechar menu ao clicar num link
        navbar.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navbar.classList.remove('active');
                const icon = hamburger.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            });
        });
    }
});

// Lógica de Abertura do Accordion (Habilidades)
function toggleAccordion(contentId, headerElement) {
    const content = document.getElementById(contentId);
    const item = headerElement.parentElement;

    // Alterna o estado ativo para a rotação do ícone
    item.classList.toggle('active');

    // Alterna a altura máxima para a animação suave de expansão
    if (content.style.maxHeight) {
        content.style.maxHeight = null;
    } else {
        content.style.maxHeight = content.scrollHeight + "px";
    }
}
