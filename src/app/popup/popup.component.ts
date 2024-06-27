import { Component, Input, Output, EventEmitter} from '@angular/core';
import {NgClass, CommonModule} from "@angular/common";

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  standalone: true,
  imports: [
    NgClass,CommonModule
  ],
  styleUrls: ['./popup.component.scss']
})
export class PopupComponent {
  @Input() message: string = '';
  @Input() show: boolean = false;
  @Input() type: 'success' | 'warning' | 'error' | 'info' = 'info';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }

  get icon(): string {
    switch (this.type) {
      case 'success':
        return 'fa-check-circle';
      case 'warning':
        return 'fa-exclamation-triangle';
      case 'error':
        return 'fa-times-circle';
      case 'info':
        return 'fa-info-circle';
      default:
        return 'fa-info-circle';
    }
  }

  get popupClass(): string {
    switch (this.type) {
      case 'success':
        return 'popup-success';
      case 'warning':
        return 'popup-warning';
      case 'error':
        return 'popup-error';
      case 'info':
        return 'popup-info';
      default:
        return 'popup-info';
    }
  }
}
