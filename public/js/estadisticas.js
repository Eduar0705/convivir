document.addEventListener('DOMContentLoaded', function () {
    const pagoForm = document.querySelector('.form-pagos');
    const mesSelect = document.getElementById('mes');
    const fechaInicioInput = document.getElementById('fecha_inicio');
    const fechaFinalInput = document.getElementById('fecha_final');

    // Autocompletar fechas al seleccionar un mes
    mesSelect.addEventListener('change', function () {
        const mesSeleccionado = mesSelect.value;
        if (!mesSeleccionado) return;

        const meses = {
            'Enero': 0,
            'Febrero': 1,
            'Marzo': 2,
            'Abril': 3,
            'Mayo': 4,
            'Junio': 5,
            'Julio': 6,
            'Agosto': 7,
            'Septiembre': 8,
            'Octubre': 9,
            'Noviembre': 10,
            'Diciembre': 11
        };

        const year = new Date().getFullYear();
        const mesIndex = meses[mesSeleccionado];

        // Fecha inicio = primer día del mes
        const fechaInicio = new Date(year, mesIndex, 1);
        // Fecha final = último día del mes
        const fechaFinal = new Date(year, mesIndex + 1, 0);

        // Formato YYYY-MM-DD para los inputs
        const formato = (fecha) => fecha.toISOString().split('T')[0];

        fechaInicioInput.value = formato(fechaInicio);
        fechaFinalInput.value = formato(fechaFinal);
    });

    // Validación del formulario
    pagoForm.addEventListener('submit', function (event) {
        let isValid = true;
        let firstError = null;

        const user = document.getElementById('user').value.trim();
        const pago = document.getElementById('pago').value.trim();
        const mes = mesSelect.value.trim();
        const fechaInicio = fechaInicioInput.value;
        const fechaFinal = fechaFinalInput.value;
        const confirmar = document.getElementById('confirmar').checked;

        if (!user) {
            isValid = false;
            firstError = 'Debe seleccionar un residente.';
        } else if (!pago) {
            isValid = false;
            firstError = 'Debe seleccionar un pago recibido.';
        } else if (!mes) {
            isValid = false;
            firstError = 'Debe seleccionar un mes cancelado.';
        } else if (!fechaInicio || !fechaFinal) {
            isValid = false;
            firstError = 'Debe completar el rango de fechas.';
        } else if (new Date(fechaInicio) > new Date(fechaFinal)) {
            isValid = false;
            firstError = 'La fecha de inicio no puede ser mayor que la fecha final.';
        } else if (!confirmar) {
            isValid = false;
            firstError = 'Debe confirmar el pago marcando la casilla.';
        }

        if (!isValid) {
            event.preventDefault();
            Swal.fire({
                icon: 'error',
                title: 'Error de validación',
                text: firstError,
                confirmButtonColor: '#d32f2f'
            });
        } else {
            Swal.fire({
                icon: 'success',
                title: 'Datos válidos',
                text: 'El formulario se enviará correctamente.',
                timer: 3000,
                showConfirmButton: false
            });
        }
    });
});