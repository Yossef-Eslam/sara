document.addEventListener('DOMContentLoaded', function() {
  // تبديل اللغة
  const languageBtn = document.getElementById('languageBtn');
  if (languageBtn) {
    languageBtn.addEventListener('click', function() {
      // هنا يمكنك إضافة وظيفة تبديل اللغة
      alert('سيتم تفعيل وظيفة تبديل اللغة في النسخة النهائية');
    });
  }

  // القائمة المتنقلة للجوّال
  const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
  if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', function() {
      const nav = document.querySelector('.main-nav');
      nav.style.display = nav.style.display === 'block' ? 'none' : 'block';
    });
  }

  // تأثير التمرير السلس
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });

  // إضافة كلاس نشط عند التمرير
  window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.main-nav a');
    
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      
      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) {
        link.classList.add('active');
      }
    });
  });

  // يمكنك إضافة المزيد من الوظائف هنا
});