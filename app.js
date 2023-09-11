// app.js
var calendarContainer = document.getElementById('calendar');
var prevMonthButton = document.getElementById('prevMonth');
var nextMonthButton = document.getElementById('nextMonth');
var monthYearHeader = document.getElementById('monthYear');
var currentDate = new Date();

function generarCalendario(year, month) {
    var date = new Date(year, month, 1);
    var daysInMonth = new Date(year, month + 1, 0).getDate();
    var calendarHTML = '<table><tr><th>Domingo</th><th>Lunes</th><th>Martes</th><th>Miércoles</th><th>Jueves</th><th>Viernes</th><th>Sábado</th></tr><tr>';
    var currentMonth = date.getMonth();
    var currentYear = date.getFullYear();

    monthYearHeader.textContent = obtenerNombreMes(currentMonth) + ' ' + currentYear;

    for (var i = 0; i < date.getDay(); i++) {
        calendarHTML += '<td></td>';
    }

    for (var day = 1; day <= daysInMonth; day++) {
        var currentDateCell = new Date(year, month, day);
        var isCurrentDay = currentDateCell.getDate() === currentDate.getDate() && currentDateCell.getMonth() === currentDate.getMonth() && currentDateCell.getFullYear() === currentDate.getFullYear();
        var isCurrentMonth = currentDateCell.getMonth() === currentMonth && currentDateCell.getFullYear() === currentYear;
    
        if (isCurrentDay && isCurrentMonth) {
            calendarHTML += '<td class="current-day">' + day + '</td>';
        } else {
            calendarHTML += isCurrentMonth ? '<td>' + day + '</td>' : '<td class="other-month">' + day + '</td>';
        }
    
        if (date.getDay() === 6) {
            calendarHTML += '</tr><tr>';
        }
        date.setDate(date.getDate() + 1);
    }

    calendarHTML += '</tr></table>';
    calendarContainer.innerHTML = calendarHTML;
}

function obtenerNombreMes(month) {
    const nombresMeses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return nombresMeses[month];
}

function showCurrentMonth() {
    currentDate = new Date();
    generarCalendario(currentDate.getFullYear(), currentDate.getMonth());
}

function showNextMonth() {
    currentDate.setMonth(currentDate.getMonth() + 1);
    generarCalendario(currentDate.getFullYear(), currentDate.getMonth());
}

function showPrevMonth() {
    currentDate.setMonth(currentDate.getMonth() - 1);
    generarCalendario(currentDate.getFullYear(), currentDate.getMonth());
}

prevMonthButton.addEventListener('click', showPrevMonth);
nextMonthButton.addEventListener('click', showNextMonth);

showCurrentMonth();
