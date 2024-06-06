import { Component } from '@angular/core';
import {NgForOf} from "@angular/common";
import {ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'app-update-variant-option',
  standalone: true,
    imports: [
        NgForOf,
        ReactiveFormsModule
    ],
  templateUrl: './update-variant-option.component.html',
  styleUrl: './update-variant-option.component.scss'
})
export class UpdateVariantOptionComponent {

}
