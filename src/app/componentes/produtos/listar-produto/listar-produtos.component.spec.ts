import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListarProdutoComponent } from './listar-produtos.component';

describe('ProdutosComponent', () => {
  let component: ListarProdutoComponent;
  let fixture: ComponentFixture<ListarProdutoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListarProdutoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListarProdutoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
