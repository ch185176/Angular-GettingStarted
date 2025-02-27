import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [ProductService]
})

export class ProductListComponent implements OnInit, OnDestroy{
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    errorMessage = "";
    
    private _listFilter: string = '';
    get listFilter(): string{
        return this._listFilter;
    }
    set listFilter(value: string) {
        this._listFilter = value;
        console.log('In Setter:', value)
        this.filteredProducts = this.performFilter(this.listFilter);
    }

    filteredProducts: IProduct[] = [];
    products: IProduct[] = [];
    sub!: Subscription;

    constructor (private productService: ProductService){};

    performFilter(filterBy: string): IProduct[] {
        filterBy = filterBy.toLocaleLowerCase();
        return this.products.filter((product: IProduct) => 
        product.productName.toLocaleLowerCase().includes(filterBy))
    }

    toggleImage() : void
    {
        this.showImage = !this.showImage;
    }

    ngOnInit(): void {
        this.listFilter = '';
        this.sub = this.productService.getProducts().subscribe({
            next: products => { 
                this.products = products;
                this.filteredProducts = this.products;
            },
            error: err => this.errorMessage = err,
        });
    }

    ngOnDestroy() {
        this.sub.unsubscribe();
    }

    onRatingClicked(message: string): void {
        this.pageTitle = `Product List: ${message}`;
    }
}