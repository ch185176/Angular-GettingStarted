import { Component, OnInit } from '@angular/core';
import { IProduct } from './product';
import { ProductService } from './product.service';

@Component({
    selector:'pm-products',
    templateUrl: './product-list.component.html',
    styleUrls: ['./product-list.component.css'],
    providers: [ProductService]
})

export class ProductListComponent implements OnInit{
    pageTitle = 'Product List';
    imageWidth = 50;
    imageMargin = 2;
    showImage = false;
    
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
        this.products = this.productService.getProducts();
        this.filteredProducts = this.products;
    }

    onRatingClicked(message: string): void {
        this.pageTitle = `Product List: ${message}`;
    }
}