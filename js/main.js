// Definir las secciones del balance hídrico
const secciones = {
    "Entradas": {
        "Agua_potable_producida": ["bases_datos", "metodologia", "papers", "incertidumbre"],
        "Agua_importada": ["bases_datos", "metodologia", "papers", "incertidumbre"],
        "Agua_subterranea": ["bases_datos", "metodologia", "papers", "incertidumbre"]
    },
    "Salidas": {
        "Consumo_autorizado": ["bases_datos", "metodologia", "papers", "incertidumbre"],
        "Perdidas_aparentes": ["bases_datos", "metodologia", "papers", "incertidumbre"],
        "Perdidas_reales": ["bases_datos", "metodologia", "papers", "incertidumbre"]
    }
};

// Crear el gráfico del balance hídrico
function crearBalanceHidrico() {
    const shapes = [];
    const annotations = [];

    let i = 0;
    for (const [seccion, componentes] of Object.entries(secciones)) {
        let j = 0;
        for (const [componente, _] of Object.entries(componentes)) {
            shapes.push({
                type: "rect",
                x0: 0.2 + i * 0.6,
                y0: 0.2 + j * 0.2,
                x1: 0.4 + i * 0.6,
                y1: 0.4 + j * 0.2,
                line: { color: "RoyalBlue" },
                fillcolor: "LightSkyBlue",
            });

            annotations.push({
                x: 0.3 + i * 0.6,
                y: 0.3 + j * 0.2,
                text: componente.replace(/_/g, ' '),
                showarrow: false,
                font: { size: 10 }
            });

            j++;
        }
        i++;
    }

    const layout = {
        shapes: shapes,
        annotations: annotations,
        showlegend: false,
        height: 400,
        margin: { l: 0, r: 0, t: 0, b: 0 }
    };

    Plotly.newPlot("balance-chart", [], layout);

    // Agregar eventos de clic a los rectángulos
    document.getElementById('balance-chart').on('plotly_click', function(data) {
        const x = data.points[0].x;
        const y = data.points[0].y;
        
        // Encontrar el componente correspondiente
        let componenteSeleccionado = null;
        for (const [seccion, componentes] of Object.entries(secciones)) {
            for (const [componente, _] of Object.entries(componentes)) {
                const i = Object.keys(secciones).indexOf(seccion);
                const j = Object.keys(componentes).indexOf(componente);
                if (Math.abs(x - (0.3 + i * 0.6)) < 0.1 && Math.abs(y - (0.3 + j * 0.2)) < 0.1) {
                    componenteSeleccionado = componente;
                    break;
                }
            }
            if (componenteSeleccionado) break;
        }

        if (componenteSeleccionado) {
            showComponentDetails(componenteSeleccionado);
        }
    });
}

// Manejar la interacción con las pestañas
function setupTabs() {
    const tabButtons = document.querySelectorAll('.tab-button');
    const tabPanes = document.querySelectorAll('.tab-pane');

    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            
            // Actualizar botones
            tabButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            
            // Actualizar paneles
            tabPanes.forEach(pane => pane.classList.remove('active'));
            document.getElementById(tabId).classList.add('active');

            // Cargar archivos del directorio correspondiente
            const componente = document.getElementById('component-title').textContent;
            loadFiles(componente, tabId);
        });
    });
}

// Cargar archivos de un directorio
async function loadFiles(componente, tipo) {
    const fileList = document.querySelector(`#${tipo} .file-list`);
    fileList.innerHTML = '<p>Cargando archivos...</p>';

    try {
        // Aquí iría la lógica para obtener los archivos de GitHub
        // Por ahora, mostraremos un mensaje de ejemplo
        const rutaArchivo = `datos/${componente}/${tipo}/README.md`;
        fileList.innerHTML = `
            <div class="file-item">
                <span class="file-name">README.md</span>
                <div class="file-actions">
                    <button onclick="viewFile('${rutaArchivo}')">Ver</button>
                    <button onclick="downloadFile('${rutaArchivo}')">Descargar</button>
                </div>
            </div>
        `;
    } catch (error) {
        fileList.innerHTML = '<p>Error al cargar los archivos</p>';
    }
}

// Ver un archivo
function viewFile(ruta) {
    // Aquí iría la lógica para ver el archivo
    alert(`Viendo archivo: ${ruta}`);
}

// Descargar un archivo
function downloadFile(ruta) {
    // Aquí iría la lógica para descargar el archivo
    alert(`Descargando archivo: ${ruta}`);
}

// Manejar la carga de archivos
async function uploadFile(tipo) {
    const input = document.getElementById(`${tipo}-upload`);
    const file = input.files[0];
    
    if (!file) {
        alert('Por favor selecciona un archivo');
        return;
    }

    const componente = document.getElementById('component-title').textContent;
    const rutaArchivo = `datos/${componente}/${tipo}/${file.name}`;

    // Aquí iría la lógica para subir el archivo a GitHub
    alert(`Archivo ${file.name} subido exitosamente a ${rutaArchivo}`);
    
    // Actualizar la lista de archivos
    loadFiles(componente, tipo);
}

// Mostrar detalles del componente
function showComponentDetails(componente) {
    const detailsDiv = document.getElementById('component-details');
    const titleElement = document.getElementById('component-title');
    
    titleElement.textContent = componente;
    detailsDiv.classList.remove('hidden');

    // Cargar archivos de la primera pestaña
    loadFiles(componente, 'bases-datos');
}

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', () => {
    crearBalanceHidrico();
    setupTabs();
}); 