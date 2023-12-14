import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-criar-conta',
  templateUrl: './criar-conta.component.html',
  styleUrls: ['./criar-conta.component.css']
})
export class CriarContaComponent implements OnInit {

  formulario!: FormGroup;

  constructor(
    private service: UsersService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.formulario = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
        Validators.minLength(3)
      ])],
      confirmPassword: [''],
      bag: { 
        products: {}
      }
    })  
  }

  criarConta() {
    if (this.formulario.valid && this.validarSenha())  {
      this.service.registrarUser(this.formulario.value).subscribe(() => {
        this.router.navigate(['/login'])
      })
    }
  }

  validarSenha() {
    const password = this.formulario.get('password')?.value;
    const confirmPassword = this.formulario.get('confirmPassword')?.value;
    return password === confirmPassword
  }

  habilitarBotao() {
    if (this.formulario.valid && this.validarSenha()) 
      return 'criar-conta-valid'
    else 
      return 'criar-conta-invalid'
  }

}