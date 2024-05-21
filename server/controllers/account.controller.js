import Account from "../models/account.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';


export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    const userExist = await Account.findOne({email});
    if(userExist) {
       return res.status(400).json("User already exist")
    }

    const hashedpassword = bcryptjs.hashSync(password, 10);
    const generateNumber = Math.floor(Math.random()*1000000);
    const accountNumber  = "0000" + generateNumber;

    const newAccount = new Account(
        {
            username,
            email,
            password: hashedpassword,
            accountNumber,
            balance: 0
        }
    );

    try {
        await newAccount.save();
        res.status(200).json("Account is successfully created !")

    } catch (error) {
        console.log(error)
    }
};



export const signin = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password
        || email === "" || password === "")
     {
        return res.status(400).json("All Fields are Required")
    }

    try {
        const validAccount = await Account.findOne({email});
        if(!validAccount) {
           return res.status(400).json("User does not exist")
        }
        
        const validPassword = bcryptjs.compareSync(password, validAccount.password);
        if (!validPassword) {
           return res.status(400).json("Invalid Password")
        };

        const token = jwt.sign({ id: validAccount._id }, process.env.JWT_KEY);


        const {password: pass, ...rest} = validAccount._doc;

        res.status(200)
        .cookie('access_token', token, {
            httpOnly: true })
        .json(rest);

    } catch (error) {
        console.log(error)
    }
};

