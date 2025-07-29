<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class IngresoController extends AbstractController
{
    public function index(): Response
    {
        return $this->render('ingreso.twig');
    }
}