import { Component, inject } from '@angular/core';
import { AppIcon } from '../app-icon/app-icon';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'app-toast-aviso',
  imports: [AppIcon],
  templateUrl: './toast-aviso.html',
  styleUrl: './toast-aviso.css',
})
export class ToastAviso {
  protected toastService = inject(ToastService);
}

