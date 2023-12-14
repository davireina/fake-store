import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { User } from '../user';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  formulario!: FormGroup;
  listaUsers: User[] = [];
  userId: number = 0;

  constructor(
    private service: UsersService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.service.getUsers().subscribe((listaUsers) => {
      this.listaUsers = listaUsers})

    this.formulario = this.formBuilder.group({
      username: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/)
      ])],
      password: ['', Validators.compose([
        Validators.required,
        Validators.pattern(/(.|\s)*\S(.|\s)*/),
      ])]
    })
  }

  validarUser() {
    const usernameDigitado = this.formulario.get('username')?.value
    const senhaDigitada = this.formulario.get('password')?.value

    if (this.formulario.valid) {
      let findUser = this.listaUsers.find(function(user) {
        return (user.username === usernameDigitado && user.password === senhaDigitada)
      })
      if (findUser) {
        this.userId = findUser.id
        return true
      }
    }
    return false
  }

  habilitarBotao() {
    if (this.validarUser()) 
      return 'login-valid'
    else 
      return 'login-invalid'
  }

}