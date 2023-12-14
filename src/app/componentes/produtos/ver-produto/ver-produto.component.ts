import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { ProdutoService } from '../produto.service';
import { ActivatedRoute, NavigationEnd, Route, Router } from '@angular/router';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user';
import { Location } from '@angular/common';

@Component({
  selector: 'app-ver-produto',
  templateUrl: './ver-produto.component.html',
  styleUrls: ['./ver-produto.component.css']
})
export class VerProdutoComponent implements OnInit {

  produto: Produto = {
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

  user: User = {
    id: 0,
    username: '',
    password: '',  
    bag: {
        products: { [0]: 0 }
    }
  } 

  path: string = '';
  userId: number = 0;

  constructor(
    private productService: ProdutoService,
    private userService: UsersService,
    private location: Location,
    private route: ActivatedRoute,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.path = this.location.path();
    this.userId = parseInt(this.path.split('/')[2])
    const id = this.route.snapshot.paramMap.get('id')
    this.productService.buscarPorId(parseInt(id!)).subscribe((produto) => {
      this.produto = produto
    })
  }

  classeDescricao(): string {
    if (this.produto.description.length >= 500) {
      return 'info-right__texto-descricao-g'
    }
    return 'info-right__texto-descricao-p'
  }

  voltar() {
    this.router.navigate([`/user/${this.userId}/listarProduto`])
  }

  addBag() {
    this.userService.buscarPorId(this.userId).subscribe((user) => {
      this.user = user

      this.userService.addToBag(this.user, this.produto.id).subscribe(() => {
        this.router.navigate([`/user/${this.userId}/listarProduto/bag`])
      })
    })
  }

}