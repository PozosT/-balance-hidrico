# Estructura de Datos del Balance Hídrico

Este directorio contiene todos los archivos relacionados con el balance hídrico, organizados por componente y tipo de documento.

## Estructura de Directorios

```
datos/
├── Entradas/
│   ├── Agua_potable_producida/
│   │   ├── bases_datos/         # Archivos CSV, Excel con datos
│   │   ├── metodologia/         # Documentos explicando la metodología
│   │   ├── papers/             # Artículos científicos relacionados
│   │   └── incertidumbre/      # Cálculos y análisis de incertidumbre
│   │
│   ├── Agua_importada/
│   │   ├── bases_datos/
│   │   ├── metodologia/
│   │   ├── papers/
│   │   └── incertidumbre/
│   │
│   └── Agua_subterranea/
│       ├── bases_datos/
│       ├── metodologia/
│       ├── papers/
│       └── incertidumbre/
│
└── Salidas/
    ├── Consumo_autorizado/
    │   ├── bases_datos/
    │   ├── metodologia/
    │   ├── papers/
    │   └── incertidumbre/
    │
    ├── Perdidas_aparentes/
    │   ├── bases_datos/
    │   ├── metodologia/
    │   ├── papers/
    │   └── incertidumbre/
    │
    └── Perdidas_reales/
        ├── bases_datos/
        ├── metodologia/
        ├── papers/
        └── incertidumbre/
```

## Tipos de Archivos

### Bases de Datos
- Archivos CSV con datos de mediciones
- Archivos Excel con cálculos y análisis
- Archivos de texto con datos tabulados

### Metodología
- Documentos PDF explicando los procedimientos
- Archivos Word con descripciones detalladas
- Presentaciones con diagramas de flujo

### Papers
- Artículos científicos en PDF
- Resúmenes y abstracts
- Referencias bibliográficas

### Incertidumbre
- Cálculos de incertidumbre en Excel
- Documentos PDF con análisis estadísticos
- Gráficos y visualizaciones 