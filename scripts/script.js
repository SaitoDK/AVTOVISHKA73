 // Мобильное меню
        document.addEventListener('DOMContentLoaded', function() {
            const burger = document.querySelector('.burger');
            const navMenu = document.querySelector('.nav-menu');
            
            burger.addEventListener('click', function() {
                burger.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
            
            // Закрытие меню при клике на пункт
            document.querySelectorAll('.nav-menu a').forEach(item => {
                item.addEventListener('click', () => {
                    burger.classList.remove('active');
                    navMenu.classList.remove('active');
                });
            });
            
            // Плавная прокрутка
            document.querySelectorAll('a[href^="#"]').forEach(anchor => {
                anchor.addEventListener('click', function(e) {
                    e.preventDefault();
                    
                    const targetId = this.getAttribute('href');
                    const targetElement = document.querySelector(targetId);
                    
                    if (targetElement) {
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                });
            });
            
            // Инициализация карты
            if (document.getElementById('map')) {
                
                // Здесь должен быть код для Яндекс Карт
                // Для работы нужно получить API-ключ
                document.getElementById('map').innerHTML = `
                    <div style="height:100%; display:flex; align-items:center; justify-content:center; background:var(--light-gray); color:var(--gray);">
                        <div style="text-align:center; padding:20px;">
                            <i class="fas fa-map-marked-alt" style="font-size:3rem; color:var(--primary); margin-bottom:15px;"></i>
                           
                        </div>
                    </div>
                `;
            }
            
            // Калькулятор
      window.calculate = function() {
    const modelPrice = parseFloat(document.getElementById('model').value);
    const hours = parseInt(document.getElementById('hours').value);
    
    if (hours < 2) {
        alert('Минимальный заказ - 2 часа');
        return;
    }
    
    let total = modelPrice * hours;
    
    const resultElement = document.getElementById('result');
    resultElement.innerHTML = `
        <strong>Итого:</strong> ${total.toFixed(2)} ₽
        <small style="display:block; margin-top:5px; color:var(--gray);">(Минимальный заказ 2 часа)</small>
    `;
    resultElement.style.display = 'block';
}
            // Отправка формы
            document.getElementById('contactForm').addEventListener('submit', function(e) {
                e.preventDefault();
                
                // Здесь можно добавить AJAX-отправку формы
                alert('Заявка отправлена! Мы свяжемся с вами в ближайшее время.');
                this.reset();
                
                // Показываем уведомление
                const notification = document.createElement('div');
                notification.style.position = 'fixed';
                notification.style.bottom = '20px';
                notification.style.right = '20px';
                notification.style.backgroundColor = 'var(--primary)';
                notification.style.color = 'white';
                notification.style.padding = '15px 25px';
                notification.style.borderRadius = '5px';
                notification.style.boxShadow = '0 4px 10px rgba(0,0,0,0.2)';
                notification.style.zIndex = '1000';
                notification.style.animation = 'fadeIn 0.3s ease-in';
                notification.innerHTML = '<i class="fas fa-check-circle" style="margin-right:10px;"></i> Заявка отправлена успешно!';
                
                document.body.appendChild(notification);
                
                setTimeout(() => {
                    notification.style.animation = 'fadeIn 0.3s ease-in reverse';
                    setTimeout(() => {
                        document.body.removeChild(notification);
                    }, 300);
                }, 3000);
            });
        });