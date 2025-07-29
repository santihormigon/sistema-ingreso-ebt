# Sistema de Ingreso EBT

Sistema web para gestión de acceso a listas de precios por categorías de clientes.

## 🚀 Características

- **Autenticación segura** con Google Sheets como base de datos
- **Categorías de clientes**: Diamante, Oro, Plata
- **Descargas automáticas** de listas de precios en Excel
- **Interfaz responsive** y moderna
- **Integración directa** con Google Sheets

## 📋 Categorías de Productos

### Por cada categoría de cliente:
- **Lista de precios - Plaza**
- **Lista de precios - Juguetes** 
- **Lista de precios - Industrial**

## 🛠️ Tecnologías

- **Frontend**: React + TypeScript + Tailwind CSS
- **Build Tool**: Vite
- **Base de datos**: Google Sheets
- **Descargas**: Excel (.xlsx)

## 🏃‍♂️ Instalación y uso

```bash
# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Construir para producción
npm run build
```

## 📁 Estructura del proyecto

```
├── src/
│   ├── App.tsx          # Componente principal con login
│   ├── main.tsx         # Punto de entrada
│   └── index.css        # Estilos globales
├── public/
│   ├── diamante.html    # Página cliente Diamante
│   ├── oro.html         # Página cliente Oro
│   └── plata.html       # Página cliente Plata
└── templates/           # Templates Twig (legacy)
```

## 🔧 Configuración

### Google Sheets
1. Crear sheets con columnas: `Nombre Completo`, `Clave`, `Empresa`
2. Publicar en web como CSV
3. Configurar permisos públicos de lectura

### URLs de descarga
Las URLs de los 9 Google Sheets están configuradas en cada archivo HTML.

## 🚀 Despliegue

El proyecto está listo para desplegarse en:
- Netlify
- Vercel
- GitHub Pages
- Cualquier hosting estático

## 📞 Soporte

Sistema desarrollado para EBT - Gestión de listas de precios por categorías.