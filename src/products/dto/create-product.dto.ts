import { Type } from "class-transformer";
import { IsNumber, IsString } from "class-validator";

export class CreateProductDto {


    @IsString()
    public name: String ;
    @IsNumber()
    @Type(()=>Number)
    public price: String 
}
