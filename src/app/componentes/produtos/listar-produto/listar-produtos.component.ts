import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { NavigationEnd, Router } from '@angular/router';
import { Location } from '@angular/common';

@Component({
  selector: 'app-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.css']
})
export class ListarProdutoComponent implements OnInit {

  listaProduto: Produto[] = [];
  filtroNome: string = '';
  filtroPreco: string = '';
  listaCategorias: string[] = [];
  categoriaChecker: { [key: string]: boolean } = {};
  path: string = '';
  userId: number = 0;

  constructor(
    private service: ProdutoService,
    private router: Router,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.path = this.location.path();
    this.userId = parseInt(this.path.split('/')[2])
    this.listarProdutos();
  }  
  
  protected listarProdutos() {
    this.service.getProdutos().subscribe((listaProduto) => {
      this.listaProduto = listaProduto;
      this.listarCategorias();
      this.filtrarCategorias()
      this.filtrarPreco();
      this.filtrarNome();
    });
  }

  private listarCategorias() {
    this.listaProduto.forEach(produto => {
      if (!this.listaCategorias.includes(produto.category))
        this.listaCategorias.push(produto.category)
    });
  }

  private filtrarCategorias() {
    let categoriasSelecionadas = Object.keys(this.categoriaChecker).filter(categoria => 
      this.categoriaChecker[categoria]);

    if (categoriasSelecionadas.length > 0) {
        this.listaProduto = this.listaProduto.filter(produto =>
          categoriasSelecionadas.includes(produto.category)
        );
    } 
  }

  private filtrarPreco() {
    if (this.filtroPreco === 'asc') {
        this.listaProduto.sort(function(a,b): number {
          return a.price - b.price;
        })
    }
    else if (this.filtroPreco === 'desc') {
        this.listaProduto.sort(function(a,b): number {
          return b.price - a.price;
        })
    }
  }

  private filtrarNome()   {
    if (this.filtroNome.length > 2) {
      this.listaProduto = this.listaProduto.filter(produto => {
        return produto.title.toLowerCase().includes(this.filtroNome.toLowerCase())
      })
    }
  } 

} 