import React, { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    nombre: '',
    clave: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    verificarUsuario(formData.nombre, formData.clave);
  };

  const verificarUsuario = async (nombre: string, clave: string) => {
    try {
      console.log('=== INICIANDO VERIFICACIÓN ===');
      console.log('Nombre ingresado:', `"${nombre}"`);
      console.log('Clave ingresada:', `"${clave}"`);
      
      // URL del CSV de Google Sheets
      const csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRDVofgqLZG2Y0U2L8tpxGD3f3I9cYY33ySLCkdC4ROxT_KC25J7lThO28bOulk3gXUqlQh0j9CjNe/pub?gid=316504673&single=true&output=csv';
      
      console.log('Obteniendo datos del CSV...');
      const response = await fetch(csvUrl);
      
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      
      const csvText = await response.text();
      console.log('=== CSV COMPLETO RECIBIDO ===');
      console.log(csvText);
      console.log('=== FIN CSV ===');
      
      // Dividir en líneas
      const lines = csvText.split('\n');
      console.log(`Total de líneas: ${lines.length}`);
      
      // Mostrar cada línea
      lines.forEach((line, index) => {
        console.log(`Línea ${index}: "${line}"`);
      });
      
      // Filtrar líneas vacías
      const nonEmptyLines = lines.filter(line => line.trim() !== '');
      console.log(`Líneas no vacías: ${nonEmptyLines.length}`);
      
      if (nonEmptyLines.length < 2) {
        alert('Error: No hay suficientes datos en el CSV');
        return;
      }

      // Procesar header
      const headerLine = nonEmptyLines[0];
      console.log('=== PROCESANDO HEADER ===');
      console.log('Header raw:', `"${headerLine}"`);
      
      // Dividir por comas y limpiar
      const headers = headerLine.split(',').map(h => h.replace(/"/g, '').trim());
      console.log('Headers procesados:', headers);
      console.log('Headers con índices:');
      headers.forEach((header, index) => {
        console.log(`  ${index}: "${header}"`);
      });
      
      // Buscar índices de columnas
      const nombreIndex = headers.findIndex(h => 
        h.toLowerCase().includes('nombre') || h.toLowerCase() === 'nombre completo'
      );
      const claveIndex = headers.findIndex(h => 
        h.toLowerCase().includes('clave') || h.toLowerCase() === 'clave'
      );
      const empresaIndex = headers.findIndex(h => 
        h.toLowerCase().includes('empresa')
      );
      
      console.log('=== ÍNDICES ENCONTRADOS ===');
      console.log('nombreIndex:', nombreIndex, nombreIndex >= 0 ? `(${headers[nombreIndex]})` : '(NO ENCONTRADO)');
      console.log('claveIndex:', claveIndex, claveIndex >= 0 ? `(${headers[claveIndex]})` : '(NO ENCONTRADO)');
      console.log('empresaIndex:', empresaIndex, empresaIndex >= 0 ? `(${headers[empresaIndex]})` : '(NO ENCONTRADO)');
      
      if (nombreIndex === -1 || claveIndex === -1 || empresaIndex === -1) {
        alert(`Columnas faltantes:
        
Headers encontrados: ${headers.join(', ')}
        
Necesitamos:
- Columna con "nombre" (encontrado: ${nombreIndex >= 0 ? 'SÍ' : 'NO'})
- Columna con "clave" (encontrado: ${claveIndex >= 0 ? 'SÍ' : 'NO'})  
- Columna con "empresa" (encontrado: ${empresaIndex >= 0 ? 'SÍ' : 'NO'})`);
        return;
      }

      // Procesar datos
      console.log('=== PROCESANDO DATOS ===');
      const nombreBuscado = nombre.toLowerCase().trim();
      const claveBuscada = clave.trim();
      console.log('Nombre buscado (normalizado):', `"${nombreBuscado}"`);
      console.log('Clave buscada:', `"${claveBuscada}"`);
      console.log('Total de filas a procesar:', nonEmptyLines.length - 1);
      
      for (let i = 1; i < nonEmptyLines.length; i++) {
        const line = nonEmptyLines[i];
        console.log(`\n--- PROCESANDO FILA ${i} ---`);
        console.log('Línea raw:', `"${line}"`);
        
        const columns = line.split(',').map(col => col.replace(/"/g, '').trim());
        console.log('Columnas:', columns);
        console.log(`Total columnas: ${columns.length}, Necesarias: ${Math.max(nombreIndex, claveIndex, empresaIndex) + 1}`);
        
        if (columns.length <= Math.max(nombreIndex, claveIndex, empresaIndex)) {
          console.log('❌ Fila saltada: no tiene suficientes columnas');
          continue;
        }

        const nombreCsv = columns[nombreIndex]?.toLowerCase().trim();
        const claveCsv = columns[claveIndex]?.trim();
        const empresaCsv = columns[empresaIndex]?.trim();
        
        console.log('Datos extraídos:');
        console.log(`  - Nombre: "${nombreCsv}" (índice ${nombreIndex})`);
        console.log(`  - Clave: "${claveCsv}" (índice ${claveIndex})`);
        console.log(`  - Empresa: "${empresaCsv}" (índice ${empresaIndex})`);
        
        console.log('Comparaciones:');
        console.log(`  - Nombres: "${nombreBuscado}" === "${nombreCsv}" = ${nombreBuscado === nombreCsv}`);
        console.log(`  - Longitud nombre buscado: ${nombreBuscado.length}`);
        console.log(`  - Longitud nombre CSV: ${nombreCsv ? nombreCsv.length : 'undefined'}`);
        console.log(`  - Caracteres nombre buscado:`, [...nombreBuscado].map(c => c.charCodeAt(0)));
        console.log(`  - Caracteres nombre CSV:`, nombreCsv ? [...nombreCsv].map(c => c.charCodeAt(0)) : 'undefined');
        
        if (nombreBuscado === nombreCsv) {
          console.log('✅ ¡USUARIO ENCONTRADO!');
          console.log(`  - Claves: "${claveBuscada}" === "${claveCsv}" = ${claveBuscada === claveCsv}`);
          console.log(`  - Longitud clave buscada: ${claveBuscada.length}`);
          console.log(`  - Longitud clave CSV: ${claveCsv ? claveCsv.length : 'undefined'}`);
          
          if (claveBuscada === claveCsv) {
            console.log('✅ ¡CLAVE CORRECTA!');
            const empresa = empresaCsv.toLowerCase();
            console.log(`Redirigiendo según empresa: "${empresa}"`);
            
            // Mapear valores de empresa a categorías
            let categoria = '';
            if (empresa.includes('diamante') || empresa === 'ebt media') {
              categoria = 'diamante';
            } else if (empresa.includes('oro') || empresa === 'mts') {
              categoria = 'oro';
            } else if (empresa.includes('plata')) {
              categoria = 'plata';
            }
            
            console.log(`Categoría determinada: "${categoria}"`);
            
            // Guardar el nombre del usuario en localStorage para usarlo en las páginas de destino
            localStorage.setItem('userName', formData.nombre);
            localStorage.setItem('userCategory', categoria);
            
            switch (categoria) {
              case 'oro':
                window.location.href = '/oro.html';
                break;
              case 'plata':
                window.location.href = '/plata.html';
                break;
              case 'diamante':
                window.location.href = '/diamante.html';
                break;
              default:
                alert(`No se pudo determinar la categoría para la empresa: "${empresaCsv}"`);
            }
            return;
          } else {
            console.log('❌ Clave incorrecta');
            alert('Clave incorrecta');
            return;
          }
        } else {
          console.log('❌ Nombre no coincide');
        }
      }

      console.log('❌ Usuario no encontrado después de revisar todas las filas');
      console.log('=== RESUMEN FINAL ===');
      console.log(`Buscando: "${nombreBuscado}" con clave "${claveBuscada}"`);
      console.log(`Filas procesadas: ${nonEmptyLines.length - 1}`);
      alert('Usuario no encontrado');
      
    } catch (error) {
      console.error('ERROR COMPLETO:', error);
      alert(`Error: ${error instanceof Error ? error.message : 'Error desconocido'}`);
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center px-4">
      {/* Logo EBT */}
      <div className="mb-8">
        <img 
          src="https://cdn.shopify.com/s/files/1/0669/4332/0386/files/EBT_TRANSPARENTE.png?v=1753293741" 
          alt="EBT Logo" 
          className="h-20 w-auto"
        />
      </div>

      {/* Título */}
      <h1 className="text-2xl font-semibold text-gray-800 text-center mb-8 max-w-md">
        Ingresa tu usuario para ver el listado de precios
      </h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="w-full max-w-sm space-y-6">
        {/* Campo Nombre Completo */}
        <div>
          <label htmlFor="nombre" className="block text-sm font-medium text-gray-700 mb-2">
            Nombre completo
          </label>
          <input
            type="text"
            id="nombre"
            name="nombre"
            value={formData.nombre}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800"
            placeholder="Ingresa tu nombre completo"
          />
        </div>

        {/* Campo Clave */}
        <div>
          <label htmlFor="clave" className="block text-sm font-medium text-gray-700 mb-2">
            Clave
          </label>
          <input
            type="password"
            id="clave"
            name="clave"
            value={formData.clave}
            onChange={handleInputChange}
            required
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-gray-500 focus:border-transparent outline-none transition-all duration-200 text-gray-800"
            placeholder="Ingresa tu clave"
          />
        </div>

        {/* Botón Ingresar */}
        <button
          type="submit"
          className="w-full bg-black text-white py-3 px-6 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-200 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 outline-none"
        >
          Ingresar
        </button>
      </form>
    </div>
  );
}

export default App;