<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class CategoriaController extends AbstractController
{
    public function diamante(): Response
    {
        return $this->render('diamante.twig');
    }

    public function oro(): Response
    {
        return $this->render('oro.twig');
    }

    public function plata(): Response
    {
        return $this->render('plata.twig');
    }
}