import { NavigationEnd, Router } from '@angular/router';
import { Produto } from '../produto';
import { Component, Input, OnInit } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  @Input() produto: Produto = {
    id: 0,
    title: '',
    price: 0,
    description: '',
    category: '',
    image: '',
    rating: {
        rate: 0,
        count: 0
    }
  }
  path: string = '';
  userId: number = 0;

  constructor(
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.path = this.location.path();
    this.userId = parseInt(this.path.split('/')[2])
  }

}