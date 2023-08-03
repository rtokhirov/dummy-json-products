import productModel from "./models/product.model";
import { products } from "./products";

export const insertProduct = () => {
    products.forEach(product => {
        
        productModel.create(product)
    })
}