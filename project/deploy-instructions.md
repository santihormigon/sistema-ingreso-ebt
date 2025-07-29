# 🚀 Instrucciones para desplegar Sistema EBT

## ⚠️ IMPORTANTE
Este proyecto necesita estar desplegado online para que funcionen las conexiones con Google Sheets.

## 📋 Pasos para desplegar:

### 1. Subir código a GitHub
Como Git no funciona en este entorno, necesitas:

**Opción A - GitHub Web (RECOMENDADO):**
1. Ve a: https://github.com/santihormigon/sistema-ingreso-ebt
2. Haz clic en "uploading an existing file"
3. Descarga este proyecto desde Bolt (botón Download)
4. Arrastra TODOS los archivos del ZIP a GitHub
5. Commit changes

**Opción B - Git local:**
```bash
# En tu computadora, con el proyecto descargado:
git init
git add .
git commit -m "Sistema EBT completo con Google Sheets"
git branch -M main
git remote add origin https://github.com/santihormigon/sistema-ingreso-ebt.git
git push -u origin main
```

### 2. Configurar Render
Una vez que GitHub tenga los archivos:

- **Environment**: Static Site
- **Build Command**: `npm ci && npm run build`
- **Start Command**: `npm start`
- **Publish Directory**: `dist`

### 3. URLs de Google Sheets configuradas
✅ Ya están configuradas en el código:
- CSV de usuarios: Para login
- 9 Excel sheets: Para descargas por categoría

### 4. Funcionalidades que necesitan estar online:
- ✅ Verificación de usuarios con Google Sheets
- ✅ Descarga automática de listas de precios
- ✅ Redirección por categorías
- ✅ Actualización automática de datos

## 🔗 Después del despliegue:
Tu sitio estará en: `https://sistema-ingreso-ebt.onrender.com`
Y funcionará completamente con Google Sheets.