import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ToastAviso } from './components/toast-aviso/toast-aviso';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ToastAviso],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'PPAI_Front_End';
}
