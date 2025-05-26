# Balance Hídrico IWA

Este proyecto implementa una interfaz web para gestionar y visualizar el balance hídrico según la metodología IWA (International Water Association) utilizando GitHub Pages.

## Características

- Visualización interactiva del balance hídrico usando Plotly.js
- Gestión de bases de datos para cada componente
- Documentación de metodologías matemáticas
- Gestión de papers científicos
- Cálculo y documentación de incertidumbres
- Almacenamiento de archivos en GitHub

## Estructura del Proyecto

```
Balance-hidrico/
├── index.html          # Página principal
├── css/
│   └── styles.css      # Estilos de la aplicación
├── js/
│   └── main.js         # Lógica de la aplicación
└── datos/             # Directorio para archivos (en GitHub)
    ├── Entradas/      # Datos de componentes de entrada
    └── Salidas/       # Datos de componentes de salida
```

## Configuración de GitHub Pages

1. Crea un nuevo repositorio en GitHub
2. Sube los archivos del proyecto al repositorio
3. Ve a la configuración del repositorio (Settings)
4. En la sección "GitHub Pages":
   - Selecciona la rama "main" como fuente
   - Guarda los cambios
5. Tu sitio estará disponible en `https://[tu-usuario].github.io/[nombre-repositorio]`

## Uso

1. Clona el repositorio:
```bash
git clone [URL_DEL_REPOSITORIO]
cd Balance-hidrico
```

2. Abre `index.html` en tu navegador o visita la URL de GitHub Pages

## Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo LICENSE para más detalles. 