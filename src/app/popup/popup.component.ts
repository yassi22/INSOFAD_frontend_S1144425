import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
  standalone: true,
  imports: [CommonModule] // Zorg ervoor dat CommonModule is geïmporteerd
})
export class PopupComponent {
  @Input() message: string = '';
  @Input() show: boolean = false;
  @Input() type: 'success' | 'warning' | 'danger' | 'info' = 'info';
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
      case 'danger':
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
      case 'danger':
        return 'popup-error';
      case 'info':
        return 'popup-info';
      default:
        return 'popup-info';
    }
  }
}
