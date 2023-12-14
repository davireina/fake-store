import { Component, Input, OnInit } from '@angular/core';
import { Produto } from '../produto';
import { Location } from '@angular/common';
import { UsersService } from '../../users/users.service';
import { User } from '../../users/user';
import { ProdutoService } from '../produto.service';

@Component({
  selector: 'app-bag',
  templateUrl: './bag.component.html',
  styleUrls: ['./bag.component.css']
})
export class BagComponent implements OnInit {

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
  listaProdutos: Produto[] = [];
  quantities: number[] = [];
  price: number = 0;

  constructor(
    private userService: UsersService,
    private productService: ProdutoService,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.path = this.location.path();
    this.userId = parseInt(this.path.split('/')[2])
    this.getUserBag()
  }

  private getUserBag() {
    this.userService.buscarPorId(this.userId).subscribe((user) => {
      this.user = user

      for (const product in this.user.bag.products) {
        this.productService.buscarPorId(parseInt(product)).subscribe((produto) => {
          this.listaProdutos.push(produto)
          this.quantities.push(this.user.bag.products[product])
          this.totalPrice()
        })
      }
    })
  }

  protected updateQuantities(productId: number, index: number) {
    this.user.bag.products[productId] = this.quantities[index]
    if (this.quantities[index] === 0)
      this.removeProduct(productId, index)
    else
      this.userService.updateUser(this.user).subscribe(() => {})
    this.totalPrice()
  }

  protected removeProduct(productId: number, index: number) {

    delete this.user.bag.products[productId]
    this.listaProdutos.splice(index,1)
    this.quantities.splice(index,1)
    this.totalPrice()

    this.userService.updateUser(this.user).subscribe(() => {})
  }

  private totalPrice() {
    this.price = 0;

    this.listaProdutos.forEach((product,index) => {
      this.price += product.price * this.quantities[index]
    })
  } 

  protected finishPurchase() {
      this.listaProdutos.forEach(product => {
        delete this.user.bag.products[product.id]
      })
      this.listaProdutos.splice(0)
      this.quantities.splice(0)
      this.totalPrice()
      
      this.userService.updateUser(this.user).subscribe(() => {})
  
      alert("Your purchase was successfully completed!")
  }

  protected habilitarBotao() {
    if (this.listaProdutos.length > 0) 
      return 'purchase-valid'
    else
      return 'purchase-invalid'
  }

}