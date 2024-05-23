import { Component, Input,    } from '@angular/core';
import { Router, RouterLink } from '@angular/router'; 
import { ActivatedRoute } from '@angular/router'; 
import { Product } from '../../models/product.model'; 
import { ProductsService } from '../../services/products.service'; 
import { ProductVariant } from '../../models/productvariant.model'; 
import { ElementRef } from '@angular/core';

@Component({
  selector: 'app-adminpaneldetail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './adminpaneldetail.component.html',
  styleUrl: './adminpaneldetail.component.scss'
})
export class AdminpaneldetailComponent {  
  private productId: number;  
  private selectedOptionsList:number[] = [];  
  private selectedVariantsList:number[] = []; 

  @Input() public product!: Product;

  constructor(private activatedRoute: ActivatedRoute,  private productsService: ProductsService, private elementRef: ElementRef<HTMLElement>  ){ 

  } 


  ngOnInit() {
    this.activatedRoute.params.subscribe(params => {
      this.productId = params['id'];
    });

    this.productsService
    .getProductByIndex(this.productId)
    .subscribe((product: Product) => {
      this.product = product; 
      this.product.price = product.price;   
  
      console.log(product.price);
    });  
    
   

  }    

  toggleDiv(id:number){   
   let stringid = id.toString();  
     const element = document.getElementById(stringid);  
     console.log(element) 
     const checkBoxes = element?.querySelectorAll("input[type='checkbox']");
     console.log(checkBoxes); 

    checkBoxes?.forEach((checkbox: Node) => {
    
      if(checkbox instanceof HTMLInputElement){ 
        console.log(checkbox.disabled); 
         checkbox.disabled = !checkbox.disabled;   
      }
     
    }) 

    if(this.selectedVariantsList.includes(id)){    

      this.selectedVariantsList = this.selectedVariantsList.filter(setid => setid !== id);  

         
    } else { 
      this.selectedVariantsList.push(id); 
      
      
    }  

    console.log(this.selectedVariantsList); 
 
  } 

  selectedOption(id:number){   

    if(this.selectedOptionsList.includes(id)){    

      this.selectedOptionsList = this.selectedOptionsList.filter(setid => setid !== id); 

      // this.selectedOptionsList.slice(this.selectedOptionsList.indexOf(id), 1);  
        
    } else { 
      this.selectedOptionsList.push(id); 
      
    } 

    console.log(this.selectedOptionsList); 
 
  }
 


} 
 
