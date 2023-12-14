import { Component, OnInit } from '@angular/core';
import { ProdutoService } from '../produtos/produto.service';
import { Location } from '@angular/common';
import { filter } from 'rxjs';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-cabecalho',
  templateUrl: './cabecalho.component.html',
  styleUrls: ['./cabecalho.component.css']
})
export class CabecalhoComponent implements OnInit {

  path: string = '';
  userId: number = 0;

  constructor(
    private service: ProdutoService,
    private location: Location,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.router.events.pipe(filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.path = this.location.path();
      this.userId = parseInt(this.path.split('/')[2])
    });
  }

}
 