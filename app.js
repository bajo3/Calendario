       // app.js
       var calendarContainer = document.getElementById('calendar');
       var prevMonthButton = document.getElementById('prevMonth');
       var nextMonthButton = document.getElementById('nextMonth');
       var monthYearHeader = document.getElementById('monthYear');
       var recordatorioContainer = document.getElementById('recordatorioContainer');
       var currentDate = new Date();
       var recordatorios = {}; // Objeto para almacenar los recordatorios por fecha

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

               var recordatorio = recordatorios[currentDateCell.toISOString()];

               if (isCurrentDay && isCurrentMonth) {
                   calendarHTML += '<td class="current-day" data-date="' + currentDateCell.toISOString() + '">' + day + '</td>';
               } else {
                   calendarHTML += isCurrentMonth ? '<td data-date="' + currentDateCell.toISOString() + '">' + day + '</td>' : '<td class="other-month" data-date="' + currentDateCell.toISOString() + '">' + day + '</td>';
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

       // Agrega un evento de clic al contenedor del calendario para manejar los recordatorios
       calendarContainer.addEventListener('click', function (e) {
           var target = e.target;
           if (target.tagName === 'TD' && target.dataset.date) {
               var selectedDate = new Date(target.dataset.date);
               var reminder = prompt('Agrega un recordatorio para el ' + selectedDate.toLocaleDateString() + ':');
               if (reminder) {
                   recordatorios[selectedDate.toISOString()] = reminder;
                   guardarRecordatorios(); // Guardar los recordatorios en el almacenamiento local
                   generarCalendario(currentDate.getFullYear(), currentDate.getMonth());
                   mostrarRecordatorios(); // Mostrar los recordatorios actualizados
               }
           }
       });

       // Función para cargar los recordatorios almacenados en el almacenamiento local
       function cargarRecordatorios() {
           var storedRecordatorios = localStorage.getItem('recordatorios');
           if (storedRecordatorios) {
               recordatorios = JSON.parse(storedRecordatorios);
           }
       }

       // Función para guardar los recordatorios en el almacenamiento local
       function guardarRecordatorios() {
           localStorage.setItem('recordatorios', JSON.stringify(recordatorios));
       }

       // Función para mostrar los recordatorios almacenados
       function mostrarRecordatorios() {
           var recordatorioHTML = '<ul>';
           for (var date in recordatorios) {
               recordatorioHTML += '<li>' + date + ': ' + recordatorios[date] + '</li>';
           }
           recordatorioHTML += '</ul>';
           recordatorioContainer.innerHTML = recordatorioHTML;
       }

       // Cargar los recordatorios y mostrarlos al cargar la página
       cargarRecordatorios();
       mostrarRecordatorios();

       prevMonthButton.addEventListener('click', showPrevMonth);
       nextMonthButton.addEventListener('click', showNextMonth);

       showCurrentMonth();