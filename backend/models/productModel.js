import mongoose from "mongoose"
const productScema = mongoose.Schema({
    id: {type:Number  },
    name:  {type : String , required : true},
    main_category:  {type : String , required : true},
    subcategory:  {type : String  },
    type: {type : String },
    image: {type : String , required : true},
    rating: {type:Number },
    price: {type:Number , required : true },
    description: {type : String },
    })
  export default mongoose.model("productdata", productScema , "productdata")   