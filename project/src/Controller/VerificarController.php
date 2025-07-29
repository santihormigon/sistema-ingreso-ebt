<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\RedirectResponse;
use Symfony\Component\Routing\Annotation\Route;

class VerificarController extends AbstractController
{
    #[Route('/verificar', name: 'verificar', methods: ['POST'])]
    public function verificar(Request $request): Response
    {
        $nombre = $request->request->get('nombre');
        $clave = $request->request->get('clave');

        if (empty($nombre) || empty($clave)) {
            return new Response('Todos los campos son obligatorios', 400);
        }

        $csvUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTRDVofgqLZG2Y0U2L8tpxGD3f3I9cYY33ySLCkdC4ROxT_KC25J7lThO28bOulk3gXUqlQh0j9CjNe/pub?gid=316504673&single=true&output=csv';

        try {
            $csvData = file($csvUrl, FILE_IGNORE_NEW_LINES | FILE_SKIP_EMPTY_LINES);
            if ($csvData === false) {
                return new Response('Error al acceder a la base de datos de usuarios', 500);
            }

            $headers = str_getcsv($csvData[0]);

            // Revisar encabezados con sensibilidad baja
            $headers = array_map('trim', $headers);
            $headers = array_map('strtolower', $headers);

            $nombreIndex = array_search('Nombre Completo', $headers);
            $claveIndex = array_search('Clave', $headers);
            $categoriaIndex = array_search('Categoría', $headers);

            if ($nombreIndex === false || $claveIndex === false || $categoriaIndex === false) {
                return new Response('Encabezados incorrectos en el CSV', 500);
            }

            $nombreNormalizado = strtolower(trim($nombre));
            $claveNormalizada = trim($clave);

            for ($i = 1; $i < count($csvData); $i++) {
                $row = str_getcsv($csvData[$i]);
                if (count($row) <= max($nombreIndex, $claveIndex, $categoriaIndex)) {
                    continue;
                }

                $nombreCsv = strtolower(trim($row[$nombreIndex]));
                $claveCsv = trim($row[$claveIndex]);
                $categoria = strtolower(trim($row[$categoriaIndex]));

                if ($nombreCsv === $nombreNormalizado && $claveCsv === $claveNormalizada) {
                    switch ($categoria) {
                        case 'oro':
                            return new RedirectResponse('/oro');
                        case 'plata':
                            return new RedirectResponse('/plata');
                        case 'diamante':
                            return new RedirectResponse('/diamante');
                        default:
                            return new Response('Categoría no válida', 400);
                    }
                }
            }

            return new Response('Usuario no encontrado', 400);

        } catch (\Exception $e) {
            return new Response('Error interno del servidor', 500);
        }
    }
}
