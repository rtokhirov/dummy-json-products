import { Request, Response } from "express";
import productModel from "../models/product.model";

const  columns= { _id:0, __v:0, createdAt:0, updatedAt:0,}

export const getProducts= async (req: Request, res: Response) =>{
    try {
        let {search,price,title,discountPercentage,rating,}=req.query;
        let limit: any= req.query.limit?req.query.limit:20 ;
        let skip: any= req.query.skip?req.query.skip:0;
        let sorts: any={price,rating,title,discountPercentage,}
        let queryOBJ:Object={}
        let sort:any={}

        Object.keys(sorts).forEach(key => {
            console.log(key,": ",sorts[key]);
            if(sorts[`${key}`]==1){
                sort[`${key}`]=1
            }else if(sorts[`${key}`]==-1){
                sort[`${key}`]=-1
            }
        })
        console.log(sort);
        if (limit > 0 && skip>=0) {
            if (typeof search=="string") {
                queryOBJ ={
                    $or: [
                        {brand: { $regex: search, $options:'i'}},
                        {description: { $regex: search, $options:'i'}},
                        {title: { $regex: search, $options:'i'}},
                        {category: { $regex: search, $options:'i'}},
                    ]
                }
            }
                           
            // main mongoose query
            const products: any= await productModel.find(queryOBJ,columns,{
                limit,
                skip,
                sort
            })

            // total count of products
            const total:String= await productModel.find(queryOBJ).countDocuments()+""

            // final response
            res.status(200).send({products,total,limit:limit>total?total:limit,skip})
        }else{
            // limit or skip is not specified
            res.status(400).send({message:"Bad Request"})
        }
    } catch (error:any) {
        res.status(400).send({ 
            message:error.message,
        })
        console.log(error);
    }
}