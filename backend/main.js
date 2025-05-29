import express from "express";
import dotenv from "dotenv";
import condb from "./atlasConnection/dbconnection.js";
import { User } from "./models/userModel.js";
import cors from "cors";
import bcrypt from "bcrypt";
import JWT from "jsonwebtoken";
import mongoose from "mongoose";
import ProductModel from "./models/productModel.js";
import nodemailer from "nodemailer";
import { OTP } from "./models/otpscema.js";

const port = 3000;
const app = express();
app.use(express.json());
app.use(cors());
dotenv.config();

condb();

app.get("/", (req, res) => {
  // console.log(process.env.MONGO_ATLAS_URL)
  res.send("i am / request");
});

app.post("/signup", async (req, res) => {
  let { username, email, password, otp } = req.body;
  // console.log(req.body)
  let usertocheck = await User.findOne({
    $or: [{ username }, { email }],
  });
  console.log(usertocheck);
  if (usertocheck) {
    if (usertocheck.username == username) {
      res.status(402).json({ message: "Username already registered" });
    } else if (usertocheck.email == email) {
      res.status(403).json({ message: "email already registered" });
    }
  } else {
    let hashedpas = await bcrypt.hash(password, 10);
    console.log(hashedpas);
    let otpobj = await OTP.findOne({ email });
    if (!otpobj || otpobj.otp != otp) {
      res.status(401).send({ message: "incorrect credentials !" });
      return;
    }
    let user = await User({ username, email, hashedpas });
    user.save();
    res.status(201).json({ message: "Signup success" });
  }
});

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PASS,
  },
});

app.post("/getotp", async (req, res) => {
  let otp = Math.floor(1000 + Math.random() * 9000);
  let { email } = req.body;
  if (!email) {
    res.status(400).send({ message: "email is required!" });
    return;
  }

  const mailOptions = {
    from: process.env.EMAIL,
    to: email,
    subject: "One Time Password (OTP)",
    html: `<p>Please use <strong>OTP : ${otp}</strong> to verify your Shopz account.</p>
         <p>If you're facing any problem, just reply to this email.</p>
         <p>Thank you,<br><strong>Sourab Kansal</strong></p>`,
  };
  let otpp = await OTP.findOneAndUpdate(
    { email },
    { email, otp },
    { upsert: true, new: true }
  );
  console.log(otpp);
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      res.status(401).send({ message: " Enter valid Email" });
      console.error("Error sending email:", error); 
    } else {
      res.status(200).send({ message: "otp send to email succeessfulllyyyy....." });
      console.log("Email sent:", info.response);
    }
  });
});

app.post("/login", async (req, res) => {
  console.log(req.body);
  let { email, password } = req.body;
  let user = await User.findOne({ email });
  let matched = await bcrypt.compare(password, user.hashedpas);
  if (!matched) {
    res.status(401).send({ message: "wront password!" });
  }
  let token = JWT.sign({ Id: user._id }, "asdfg", { expiresIn: "1h" });
  res.status(200).send({ message: "login successfully", user, token });
  //   console.log(user.email);
  //   console.log(user.hashedpas);
  //  res.status(200).json({message:" sucess get data"})
});
app.get("/products", async (req, res) => {
  let data = await ProductModel.find({});
  console.log(data);
  res.send(data);
});

app.delete("/products/:id",async (req , res)=>{
        let {id} = req.params;
        try{
          const product = await ProductModel.findById(id);
              if(!product){
                   return res.status(404).json({message:"Product not found "})
              }   
              await product.deleteOne();
              return res.status(200).json({message:" Deleted sucess "})
        }catch (error) {
          console.error("Error deleting product:", error);
          res.status(500).json({ message: "Server error while deleting product" });
        }
})
app.post("/adddata" , async (req,res)=>{

const { image , price , name , main_category , subcategory, type, description } = req.body 
       console.log(image , price , name , main_category , subcategory,  type, description)
       let product = await ProductModel({image , price , name , main_category , subcategory, type, description})
       product.save();
       res.status(200).json({message:"sucessfully recived "})
})


app.listen(port, () => {
  console.log(`server run on ${port}`);
});
