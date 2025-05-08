// تهيئة التطبيق
class App {
    constructor() {
        this.initLoadingScreen();
        this.initMobileMenu();
        this.initScrollEvents();
        this.initAnimations();
        this.initServiceWorker();
        this.initFloatingButtons();
        this.initForms();
        this.initLazyLoading();
        console.log('تم تحميل التطبيق بنجاح');
    }

    // شاشة التحميل
    initLoadingScreen() {
        window.addEventListener('load', () => {
            const loadingScreen = document.querySelector('.loading-screen');
            setTimeout(() => {
                loadingScreen.classList.add('fade-out');
                setTimeout(() => loadingScreen.remove(), 500);
            }, 1000);
        });
    }

    // القائمة المتنقلة
    initMobileMenu() {
        const toggle = document.querySelector('.mobile-menu-toggle');
        const nav = document.querySelector('.main-nav');
        
        if (toggle && nav) {
            toggle.addEventListener('click', () => {
                toggle.classList.toggle('active');
                nav.classList.toggle('active');
                document.body.classList.toggle('no-scroll');
            });
        }
    }

    // أحداث التمرير
    initScrollEvents() {
        // تأثير الهيدر عند التمرير
        window.addEventListener('scroll', () => {
            const header = document.querySelector('.main-header');
            header.classList.toggle('scrolled', window.scrollY > 50);
        });

        // التمرير السلس للروابط
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function(e) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                if (targetId === '#') return;
                
                const target = document.querySelector(targetId);
                if (target) {
                    const headerHeight = document.querySelector('.main-header').offsetHeight;
                    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                    
                    window.scrollTo({
                        top: targetPosition,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    // تأثيرات الحركة
    initAnimations() {
        const animateOnScroll = () => {
            const elements = document.querySelectorAll('.animate-on-scroll');
            
            const observer = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('animated');
                        observer.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1
            });
            
            elements.forEach(el => observer.observe(el));
        };

        animateOnScroll();
    }

    // Service Worker للتطبيق التقدمي
    initServiceWorker() {
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/sw.js')
                    .then(registration => {
                        console.log('ServiceWorker registered:', registration.scope);
                    })
                    .catch(err => {
                        console.log('ServiceWorker registration failed:', err);
                    });
            });
        }
    }

    // الأزرار العائمة
    initFloatingButtons() {
        // زر الواتساب
        const whatsappBtn = document.querySelector('.whatsapp-btn');
        if (whatsappBtn) {
            whatsappBtn.addEventListener('click', () => {
                // يمكنك إضافة تحليلات هنا
                console.log('WhatsApp button clicked');
            });
        }

        // زر الانتقال للأعلى
        const scrollTopBtn = document.querySelector('.scroll-top');
        if (scrollTopBtn) {
            window.addEventListener('scroll', () => {
                scrollTopBtn.classList.toggle('show', window.scrollY > 300);
            });

            scrollTopBtn.addEventListener('click', () => {
                window.scrollTo({
                    top: 0,
                    behavior: 'smooth'
                });
            });
        }
    }

    // إدارة النماذج
    initForms() {
        document.querySelectorAll('form').forEach(form => {
            form.addEventListener('submit', async (e) => {
                e.preventDefault();
                
                const formData = new FormData(form);
                const submitBtn = form.querySelector('button[type="submit"]');
                const originalText = submitBtn.innerHTML;
                
                try {
                    // تعطيل الزر أثناء الإرسال
                    submitBtn.disabled = true;
                    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري الإرسال...';
                    
                    // هنا يمكنك إضافة كود الإرسال الفعلي باستخدام Fetch API
                    const response = await fetch(form.action || '#', {
                        method: form.method,
                        body: formData
                    });
                    
                    if (!response.ok) throw new Error('Network response was not ok');
                    
                    // عرض رسالة النجاح
                    form.innerHTML = `
                        <div class="form-success">
                            <i class="fas fa-check-circle"></i>
                            <h3>تم الإرسال بنجاح!</h3>
                            <p>سنقوم بالتواصل معك في أقرب وقت</p>
                        </div>
                    `;
                    
                } catch (error) {
                    console.error('Error:', error);
                    alert('حدث خطأ أثناء الإرسال، يرجى المحاولة مرة أخرى');
                } finally {
                    submitBtn.disabled = false;
                    submitBtn.innerHTML = originalText;
                }
            });
        });
    }

    // تحميل متقطع للصور
    initLazyLoading() {
        const lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
        
        if ('IntersectionObserver' in window) {
            const lazyImageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const lazyImage = entry.target;
                        lazyImage.src = lazyImage.dataset.src;
                        lazyImage.classList.remove('lazy');
                        lazyImageObserver.unobserve(lazyImage);
                    }
                });
            });

            lazyImages.forEach(lazyImage => {
                lazyImageObserver.observe(lazyImage);
            });
        }
    }
}

// بدء التطبيق
document.addEventListener('DOMContentLoaded', () => {
    new App();
});
