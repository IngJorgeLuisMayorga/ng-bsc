import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-footer-default',
  templateUrl: './footer-default.component.html',
  styleUrls: ['./footer-default.component.less']
})
export class FooterDefaultComponent implements OnInit {

  menus = [
    {
      title: 'PRODUCTOS',
      items: [
        {
          name: 'Limpiadores aceitosos',
          link: ''
        },
        {
          name: 'Limpiadores acuosos',
          link: ''
        },
        {
          name: 'Exfoliantes',
          link: ''
        },
        {
          name: 'Tónicos',
          link: ''
        },
        {
          name: 'Mascarillas',
          link: ''
        },
        {
          name: 'Esencias',
          link: ''
        },
        {
          name: 'Sérums',
          link: ''
        },
        {
          name: 'Contornos de ojos',
          link: ''
        },
        {
          name: 'Hidratantes',
          link: ''
        },
        {
          name: 'Protectores Solares',
          link: ''
        },
        {
          name: 'Kits',
          link: ''
        },
        {
          name: 'Otros',
          link: ''
        },
      ]
    },
    {
      title: 'RUTINA',
      items: [
        {
          name: 'Básica',
          link: ''
        },
        {
          name: 'Intermedia',
          link: ''
        },
        {
          name: 'Experta',
          link: ''
        }
      ]
    },
    {
      title: 'TIPO DE PIEL',
      items: [
        {
          name: 'Seca',
          link: ''
        },
        {
          name: 'Mixta',
          link: ''
        },
        {
          name: 'Grasa',
          link: ''
        },
        {
          name: 'Acneica',
          link: ''
        },
        {
          name: 'Sensible',
          link: ''
        },
        {
          name: 'Madura',
          link: ''
        }
      ]
    },
    {
      title: 'MARCAS',
      css:{
        css_class: 'marcas'
      },
      items: [
        { name: '9 Wishes', link: '' },
        { name: 'Amill', link: '' },
        { name: 'A’Pieu', link: '' },
        { name: 'Banila Co', link: '' },
        { name: 'Benton', link: '' },
        { name: 'Cosrx', link: '' },
        { name: 'Dr. Jart', link: '' },
        { name: 'Elizavecca', link: '' },
        { name: 'Esfolio', link: '' },
        { name: 'Etude House', link: '' },
        { name: 'G9 Skin', link: '' },
        { name: 'Heimish', link: '' },
        { name: 'Holika Holika', link: '' },
        { name: 'I’m From', link: '' },
        { name: 'It’s Skin', link: '' },
        { name: 'Isntree', link: '' },
        { name: 'Iunik', link: '' },
        { name: 'Jumiso', link: '' },
        { name: 'Laneige', link: '' },
        { name: 'MediFlower', link: '' },
        { name: 'Missha', link: '' },
        { name: 'Nature Republic', link: '' },
        { name: 'Neogen', link: '' },
        { name: 'Petitfée', link: '' },
        { name: 'PrettySkin', link: '' },
        { name: 'Purito', link: '' },
        { name: 'Secret Key', link: '' },
        { name: 'Skin Food', link: '' },
        { name: 'Skin&Lab', link: '' },
        { name: 'Some By Mi', link: '' },
        { name: 'The Face Shop', link: '' },
        { name: 'The Plant Base', link: '' },
        { name: 'Tia’m', link: '' },
        { name: 'Tonymoly', link: '' },
      ]
    }, {
      title: 'PERFIL',
      items: [
        {
          name: 'Cuenta',
          link: ''
        },
        {
          name: 'Puntos BSC',
          link: ''
        },
        {
          name: 'Favoritos',
          link: ''
        },
        {
          name: 'Pedidos',
          link: ''
        },
        {
          name: 'Soporte',
          link: ''
        },
        {
          name: 'Cerras Sesión',
          link: ''
        }
      ]
    },
  ]

  constructor() { }

  ngOnInit(): void {
  }

  getMenuCssClass(menu: any){
    return (menu.css && menu.css.css_class) ? menu.css.css_class : '';
    //return '';
  } 

}
