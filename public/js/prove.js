// Funcionalidad de búsqueda por cédula
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.getElementById('search-input');
    const filtrarBtn = document.getElementById('filtrar-btn');
    const limpiarBtn = document.getElementById('limpiar-btn');
    const tableBody = document.querySelector('tbody');
    const allRows = Array.from(tableBody.querySelectorAll('tr'));

    // Función para normalizar cédula (remover espacios, guiones, puntos)
    function normalizeCedula(cedula) {
        return cedula.replace(/[\s\-\.]/g, '').toUpperCase();
    }

    // Función para validar formato de cédula venezolana
    function isValidCedulaFormat(cedula) {
        const normalized = normalizeCedula(cedula);
        // Formatos válidos: V12345678, J123456789, E12345678, P12345678
        const cedulaRegex = /^[VJEP]\d{7,9}$/;
        return cedulaRegex.test(normalized);
    }

    // Función para formatear cédula con guiones
    function formatCedula(cedula) {
        const normalized = normalizeCedula(cedula);
        if (normalized.length >= 8) {
            const letter = normalized.charAt(0);
            const numbers = normalized.slice(1);
            
            if (numbers.length === 8) {
                // Formato V-12345678
                return `${letter}-${numbers}`;
            } else if (numbers.length === 9) {
                // Formato J-12345678-9
                return `${letter}-${numbers.slice(0, 8)}-${numbers.slice(8)}`;
            }
        }
        return cedula;
    }

    // Función de búsqueda
    function searchByCedula(searchTerm) {
        const normalizedSearch = normalizeCedula(searchTerm);
        let visibleRows = 0;

        allRows.forEach(row => {
            // Saltar la fila de "no hay proveedores"
            if (row.cells.length === 1 && row.cells[0].getAttribute('colspan')) {
                return;
            }

            const cedulaCell = row.cells[1]; // La cédula está en la segunda columna
            if (cedulaCell) {
                const cedulaText = normalizeCedula(cedulaCell.textContent);
                
                if (normalizedSearch === '' || cedulaText.includes(normalizedSearch)) {
                    row.style.display = '';
                    visibleRows++;
                    
                    // Animación de aparición
                    row.style.opacity = '0';
                    row.style.transform = 'translateY(10px)';
                    setTimeout(() => {
                        row.style.transition = 'all 0.3s ease';
                        row.style.opacity = '1';
                        row.style.transform = 'translateY(0)';
                    }, 50);
                } else {
                    row.style.display = 'none';
                }
            }
        });

        // Mostrar mensaje si no hay resultados
        showNoResultsMessage(visibleRows === 0 && searchTerm !== '');
    }

    // Función para mostrar mensaje de "no hay resultados"
    function showNoResultsMessage(show) {
        let noResultsRow = document.getElementById('no-results-row');
        
        if (show && !noResultsRow) {
            noResultsRow = document.createElement('tr');
            noResultsRow.id = 'no-results-row';
            noResultsRow.innerHTML = `
                <td colspan="9" class="no-results">
                    <i class="fas fa-search"></i>
                    No se encontraron proveedores con esa cédula
                </td>
            `;
            tableBody.appendChild(noResultsRow);
        } else if (!show && noResultsRow) {
            noResultsRow.remove();
        }
    }

    // Event listeners
    searchInput.addEventListener('input', function(e) {
        const value = e.target.value.trim();
        
        // Formatear automáticamente mientras escribe
        if (value.length > 0 && !value.includes('-')) {
            const formatted = formatCedula(value);
            if (formatted !== value) {
                e.target.value = formatted;
            }
        }
        
        // Búsqueda en tiempo real (opcional)
        // searchByCedula(value);
    });

    // Validación en tiempo real
    searchInput.addEventListener('blur', function(e) {
        const value = e.target.value.trim();
        if (value && !isValidCedulaFormat(value)) {
            e.target.style.borderColor = '#f56565';
            e.target.style.boxShadow = '0 0 0 3px rgba(245, 101, 101, 0.1)';
            
            // Mostrar tooltip de error
            showErrorTooltip(e.target, 'Formato de cédula inválido. Use: V-12345678 o J-12345678-9');
        } else {
            e.target.style.borderColor = '#e2e8f0';
            e.target.style.boxShadow = '';
            hideErrorTooltip();
        }
    });

    // Función para mostrar tooltip de error
    function showErrorTooltip(element, message) {
        hideErrorTooltip(); // Remover tooltip anterior
        
        const tooltip = document.createElement('div');
        tooltip.id = 'error-tooltip';
        tooltip.innerHTML = `
            <i class="fas fa-exclamation-triangle"></i>
            ${message}
        `;
        tooltip.style.cssText = `
            position: absolute;
            background: #f56565;
            color: white;
            padding: 0.5rem 1rem;
            border-radius: 8px;
            font-size: 0.8rem;
            z-index: 1000;
            box-shadow: 0 4px 12px rgba(245, 101, 101, 0.3);
            margin-top: 0.5rem;
            max-width: 250px;
        `;
        
        element.parentNode.style.position = 'relative';
        element.parentNode.appendChild(tooltip);
        
        setTimeout(hideErrorTooltip, 3000);
    }

    // Función para ocultar tooltip de error
    function hideErrorTooltip() {
        const tooltip = document.getElementById('error-tooltip');
        if (tooltip) {
            tooltip.remove();
        }
    }

    // Botón filtrar
    filtrarBtn.addEventListener('click', function() {
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm && !isValidCedulaFormat(searchTerm)) {
            searchInput.focus();
            showErrorTooltip(searchInput, 'Por favor, ingrese una cédula válida');
            return;
        }
        
        // Agregar efecto de loading
        filtrarBtn.classList.add('loading');
        filtrarBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Buscando...';
        
        setTimeout(() => {
            searchByCedula(searchTerm);
            filtrarBtn.classList.remove('loading');
            filtrarBtn.innerHTML = '<i class="fas fa-search"></i> Filtrar';
        }, 500);
    });

    // Botón limpiar
    limpiarBtn.addEventListener('click', function() {
        searchInput.value = '';
        searchInput.style.borderColor = '#e2e8f0';
        searchInput.style.boxShadow = '';
        hideErrorTooltip();
        
        // Mostrar todas las filas
        allRows.forEach(row => {
            row.style.display = '';
            row.style.opacity = '1';
            row.style.transform = 'translateY(0)';
        });
        
        showNoResultsMessage(false);
        searchInput.focus();
    });

    // Búsqueda con Enter
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            filtrarBtn.click();
        }
    });

    // Limpiar con Escape
    searchInput.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            limpiarBtn.click();
        }
    });
});