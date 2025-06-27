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
        
//форма сооб

document.getElementById('telegramForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    const form = e.target;
    const submitBtn = form.querySelector('button[type="submit"]');
    const submitText = submitBtn.querySelector('.submit-text');
    const spinner = submitBtn.querySelector('.spinner-border');
    const resultDiv = document.getElementById('form-result');
    
    // Показываем спиннер
    submitText.classList.add('d-none');
    spinner.classList.remove('d-none');
    submitBtn.disabled = true;
    
    // Собираем данные формы
    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        message: formData.get('message'),
        date: new Date().toLocaleString()
    };
    
    // ID вашего чата в Telegram (можно получить через @userinfobot)
    const chatId = '-1002509349913';
    // Токен вашего бота
    const botToken = '7592544299:AAFS1n-QMZRcgi8ymW5qcAmsMhfkVF8caxU';
    
    // Формируем сообщение
    const text = `📌 Новая заявка с сайта:\n\n👤 Имя: ${data.name}\n📞 Телефон: ${data.phone}\n✉ Сообщение: ${data.message || 'не указано'}\n⏰ ${data.date}`;
    
    // Отправляем в Telegram
    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            chat_id: chatId,
            text: text,
            parse_mode: 'HTML'
        })
    })
    .then(response => response.json())
    .then(data => {
        if (data.ok) {
            resultDiv.innerHTML = '<div class="alert alert-success">Заявка отправлена! Мы скоро с вами свяжемся.</div>';
            form.reset();
        } else {
            throw new Error(data.description || 'Ошибка отправки');
        }
    })
    .catch(error => {
        console.error('Error:', error);
        resultDiv.innerHTML = `<div class="alert alert-danger">Ошибка: ${error.message}</div>`;
    })
    .finally(() => {
        submitText.classList.remove('d-none');
        spinner.classList.add('d-none');
        submitBtn.disabled = false;
    });
});
