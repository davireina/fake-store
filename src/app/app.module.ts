import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabecalhoComponent } from './componentes/cabecalho/cabecalho.component';
import { ProdutoComponent } from './componentes/produtos/produto/produto.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListarProdutoComponent } from './componentes/produtos/listar-produto/listar-produtos.component';
import { VerProdutoComponent } from './componentes/produtos/ver-produto/ver-produto.component';
import { CriarContaComponent } from './componentes/users/criar-conta/criar-conta.component';
import { LoginComponent } from './componentes/users/login/login.component';
import { BagComponent } from './componentes/produtos/bag/bag.component';

@NgModule({
  declarations: [
    AppComponent,
    CabecalhoComponent,
    ListarProdutoComponent,
    ProdutoComponent,
    VerProdutoComponent,
    CriarContaComponent,
    LoginComponent,
    BagComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }