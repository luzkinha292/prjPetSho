document.addEventListener('DOMContentLoaded', function() {
    let selectedService = '';
    let selectedDate = null;
    let selectedTime = '';
    
    const serviceButtons = document.querySelectorAll('.service-button');
    serviceButtons.forEach(button => {
    button.addEventListener('click', function() {
    serviceButtons.forEach(btn => btn.classList.remove('selected'));
    this.classList.add('selected');
    selectedService = this.getAttribute('data-service');

  });
});
    
    const calendarDays = document.getElementById('calendar-days');
    const monthYearElement = document.getElementById('currentMonth');
    const prevMonthBtn = document.getElementById('prevMonth');
    const nextMonthBtn = document.getElementById('nextMonth');
    
    let currentDate = new Date();
    let currentMonth = currentDate.getMonth();
    let currentYear = currentDate.getFullYear();
    
    const monthNames = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
    
    function renderCalendar() {
    const firstDayOfMonth = new Date(currentYear, currentMonth, 1);
    const lastDayOfMonth = new Date(currentYear, currentMonth + 1, 0);
    const daysInMonth = lastDayOfMonth.getDate();
    const startDayOfWeek = firstDayOfMonth.getDay();
      
    monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
      
    calendarDays.innerHTML = '';
      
    const today = new Date();
    today.setHours(0, 0, 0, 0);
      
    const prevMonthLastDay = new Date(currentYear, currentMonth, 0).getDate();
    for (let i = startDayOfWeek - 1; i >= 0; i--) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('calendar-day', 'other-month');
    dayElement.textContent = prevMonthLastDay - i;
    calendarDays.appendChild(dayElement);

  }
  
    for (let day = 1; day <= daysInMonth; day++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('calendar-day');
    dayElement.textContent = day;
        
    const dateToCheck = new Date(currentYear, currentMonth, day);
    dateToCheck.setHours(0, 0, 0, 0);
        
    if (dateToCheck.getDate() === today.getDate() && 
    dateToCheck.getMonth() === today.getMonth() && 
    dateToCheck.getFullYear() === today.getFullYear()) {
    dayElement.classList.add('today');

  }
        
    if (dateToCheck < today) {
    dayElement.classList.add('disabled');
    } else {
    dayElement.addEventListener('click', function() {
    document.querySelectorAll('.calendar-day').forEach(day => {
    day.classList.remove('selected');

  });
            
    this.classList.add('selected');
    selectedDate = new Date(currentYear, currentMonth, day);

  });
  }
        
    if (selectedDate && 
    day === selectedDate.getDate() && 
    currentMonth === selectedDate.getMonth() && 
    currentYear === selectedDate.getFullYear()) {
    dayElement.classList.add('selected');
  }
        
    calendarDays.appendChild(dayElement);

  }
   
    const totalDaysAdded = startDayOfWeek + daysInMonth;
    const daysToAdd = totalDaysAdded % 7 === 0 ? 0 : 7 - (totalDaysAdded % 7);
      
    for (let day = 1; day <= daysToAdd; day++) {
    const dayElement = document.createElement('div');
    dayElement.classList.add('calendar-day', 'other-month');
    dayElement.textContent = day;
    calendarDays.appendChild(dayElement);

    }
  }
    
    prevMonthBtn.addEventListener('click', function() {
    currentMonth--;
    if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
    renderCalendar();
  });
    
    nextMonthBtn.addEventListener('click', function() {
    currentMonth++;
    if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
    renderCalendar();
  });
    
    const timeSlotButtons = document.querySelectorAll('.time-slot-btn');
    timeSlotButtons.forEach(button => {
    button.addEventListener('click', function() {
    timeSlotButtons.forEach(btn => btn.classList.remove('selected'));
    this.classList.add('selected');
    selectedTime = this.textContent;
  });
  });
    
    const toast = document.getElementById('toast');
    const toastMessage = document.getElementById('toast-message');
    
    function showToast(message, isError = false) {
    toastMessage.textContent = message;
    toast.classList.add('show');
      
    if (isError) {
    toast.style.backgroundColor = '#fed7d7';
    toast.style.color = '#c53030';
    } else {
    toast.style.backgroundColor = '#c6f6d5';
    toast.style.color = '#2f855a';
    }
      
    setTimeout(() => {
    toast.classList.remove('show');
    }, 4000);
    }
    
    const confirmBtn = document.getElementById('confirm-btn');
    confirmBtn.addEventListener('click', function() {
    if (!selectedService || !selectedDate || !selectedTime) {
    showToast('Por favor, selecione um serviço, data e horário.', true);
    return;
    }
      
    const serviceLabels = {
      'banho-tosa': 'Banho e Tosa',
      'saude-bem-estar': 'Saúde e Bem-Estar',
      'hotel-pet': 'Hotel Pet',
      'adestramento': 'Adestramento',
      'veterinario': 'Veterinário',
      'hospedagem': 'Hospedagem'
    };
      
    const serviceName = serviceLabels[selectedService];
    const formattedDate = selectedDate.toLocaleDateString('pt-BR');
      
    showToast(`Agendamento confirmado! Serviço: ${serviceName}, Data: ${formattedDate}, Hora: ${selectedTime}`);
      
    selectedService = '';
    selectedDate = null;
    selectedTime = '';
      
    serviceButtons.forEach(btn => btn.classList.remove('selected'));
    document.querySelectorAll('.calendar-day').forEach(day => {
    day.classList.remove('selected');
    });
    timeSlotButtons.forEach(btn => btn.classList.remove('selected'));
    });
    
    renderCalendar();
    
  });