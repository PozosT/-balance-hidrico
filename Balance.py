import streamlit as st
import pandas as pd
import numpy as np
from PIL import Image
import plotly.graph_objects as go
import os
from pathlib import Path

# Configuración de la página
st.set_page_config(
    page_title="Balance Hídrico IWA",
    page_icon="💧",
    layout="wide"
)

# Título principal
st.title("Balance Hídrico IWA - Sistema de Gestión de Información")

# Definir las secciones del balance hídrico
secciones = {
    "Entradas": {
        "Agua potable producida": ["bases_datos", "metodologia", "papers", "incertidumbre"],
        "Agua importada": ["bases_datos", "metodologia", "papers", "incertidumbre"],
        "Agua subterránea": ["bases_datos", "metodologia", "papers", "incertidumbre"]
    },
    "Salidas": {
        "Consumo autorizado": ["bases_datos", "metodologia", "papers", "incertidumbre"],
        "Pérdidas aparentes": ["bases_datos", "metodologia", "papers", "incertidumbre"],
        "Pérdidas reales": ["bases_datos", "metodologia", "papers", "incertidumbre"]
    }
}

# Crear directorios para almacenar archivos
def crear_directorios():
    base_path = Path("datos")
    for seccion, componentes in secciones.items():
        for componente in componentes:
            for tipo in ["bases_datos", "metodologia", "papers", "incertidumbre"]:
                (base_path / seccion / componente / tipo).mkdir(parents=True, exist_ok=True)

# Crear el layout del balance hídrico
col1, col2, col3 = st.columns([1,2,1])

with col2:
    # Dibujar el balance hídrico usando Plotly
    fig = go.Figure()
    
    # Agregar rectángulos para cada sección
    for i, (seccion, componentes) in enumerate(secciones.items()):
        for j, (componente, _) in enumerate(componentes.items()):
            fig.add_shape(
                type="rect",
                x0=0.2 + i*0.6,
                y0=0.2 + j*0.2,
                x1=0.4 + i*0.6,
                y1=0.4 + j*0.2,
                line=dict(color="RoyalBlue"),
                fillcolor="LightSkyBlue",
            )
            fig.add_annotation(
                x=0.3 + i*0.6,
                y=0.3 + j*0.2,
                text=componente,
                showarrow=False,
                font=dict(size=10)
            )
    
    fig.update_layout(
        showlegend=False,
        height=400,
        margin=dict(l=0, r=0, t=0, b=0)
    )
    
    st.plotly_chart(fig, use_container_width=True)

# Función para manejar la carga de archivos
def cargar_archivo(tipo_archivo, componente):
    archivo = st.file_uploader(f"Cargar {tipo_archivo} para {componente}", type=['csv', 'xlsx', 'pdf', 'docx'])
    if archivo is not None:
        # Guardar el archivo en el directorio correspondiente
        ruta_archivo = Path("datos") / componente / tipo_archivo / archivo.name
        with open(ruta_archivo, "wb") as f:
            f.write(archivo.getbuffer())
        st.success(f"Archivo {archivo.name} cargado exitosamente!")

# Función para crear las páginas de detalle
def crear_pagina_detalle(componente):
    st.header(f"Detalles de {componente}")
    
    tabs = st.tabs(["Bases de Datos", "Metodología", "Papers", "Incertidumbre"])
    
    with tabs[0]:
        st.subheader("Bases de Datos")
        cargar_archivo("bases_datos", componente)
        # Mostrar archivos existentes
        ruta_bd = Path("datos") / componente / "bases_datos"
        if ruta_bd.exists():
            archivos = list(ruta_bd.glob("*"))
            if archivos:
                st.write("Bases de datos disponibles:")
                for archivo in archivos:
                    st.write(f"- {archivo.name}")
        
    with tabs[1]:
        st.subheader("Metodología")
        cargar_archivo("metodologia", componente)
        # Mostrar documentos metodológicos
        ruta_met = Path("datos") / componente / "metodologia"
        if ruta_met.exists():
            archivos = list(ruta_met.glob("*"))
            if archivos:
                st.write("Documentos metodológicos disponibles:")
                for archivo in archivos:
                    st.write(f"- {archivo.name}")
        
    with tabs[2]:
        st.subheader("Papers")
        cargar_archivo("papers", componente)
        # Mostrar papers
        ruta_papers = Path("datos") / componente / "papers"
        if ruta_papers.exists():
            archivos = list(ruta_papers.glob("*"))
            if archivos:
                st.write("Papers disponibles:")
                for archivo in archivos:
                    st.write(f"- {archivo.name}")
        
    with tabs[3]:
        st.subheader("Cálculo de Incertidumbre")
        cargar_archivo("incertidumbre", componente)
        # Mostrar cálculos de incertidumbre
        ruta_inc = Path("datos") / componente / "incertidumbre"
        if ruta_inc.exists():
            archivos = list(ruta_inc.glob("*"))
            if archivos:
                st.write("Cálculos de incertidumbre disponibles:")
                for archivo in archivos:
                    st.write(f"- {archivo.name}")

# Crear directorios necesarios
crear_directorios()

# Agregar interactividad a los componentes
for seccion, componentes in secciones.items():
    st.subheader(seccion)
    for componente in componentes:
        if st.button(f"Ver detalles de {componente}"):
            crear_pagina_detalle(componente)

# Pie de página
st.markdown("---")
st.markdown("Desarrollado con Streamlit | Balance Hídrico IWA")
