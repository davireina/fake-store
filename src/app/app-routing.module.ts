import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VerProdutoComponent } from './componentes/produtos/ver-produto/ver-produto.component';
import { ListarProdutoComponent } from './componentes/produtos/listar-produto/listar-produtos.component';
import { CriarContaComponent } from './componentes/users/criar-conta/criar-conta.component';
import { LoginComponent } from './componentes/users/login/login.component';

const routes: Routes = [
  {
    path:'',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'criarConta',
    component: CriarContaComponent
  },
  {
    path: 'user/:id/listarProduto',
    component: ListarProdutoComponent
  },
  {
    path: 'user/:id/verProduto/:id',
    component: VerProdutoComponent
  },
  {
    path: 'user/:id/listarProduto/bag',
    component: ListarProdutoComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }