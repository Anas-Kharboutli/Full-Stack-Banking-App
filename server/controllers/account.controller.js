import Account from "../models/account.model.js";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

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
        console.log(error);
        res.json(error);
    }
};

export const deposit = async (req, res) => {
    const amount = Number(req.body.deposit); 
    const accountNumber = req.body.accountNumber;

    try {
        const updatedBalance = await Account.findOneAndUpdate(
            { accountNumber: accountNumber }, 
            { $inc: { balance: amount } },
            { returnNewDocument : true } 
        );

        if (!updatedBalance) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json({ message: 'Balance has been updated', account: updatedBalance });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const withdraw = async (req, res) => {
    const amount = Number(req.body.withdraw); 
    const accountNumber = req.body.accountNumber;

    try {
        const updatedBalance = await Account.findOneAndUpdate(
            { accountNumber: accountNumber }, 
            { $inc: { balance: -amount } },
            { returnNewDocument : true } 
        );

        if (!updatedBalance) {
            return res.status(404).json({ message: 'Account not found' });
        }

        res.status(200).json({ message: 'Balance has been updated', account: updatedBalance });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

export const retrieveData = async (req,res) => {
    const { email } = req.query;

    try {
        const accountData = await Account.findOne({email});
       if(!accountData) {
        return res.status(400).json({ message: 'Email cannot be found' })
       }
       
        res.status(200).json(accountData);



    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


/* export const exchangeRates = async (req,res) => {

    const API_KEY = process.env.EXCHANGE_RATE_API; // Replace with your actual API key
    const BASE_URL = 'https://open.er-api.com/v6/latest';

    const { base } = req.params;

    try {
        const response = await axios.get(`${BASE_URL}/${base}`);
        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch exchange rates' });
    }
};

*/

