import Account from "../models/account.model.js";
import bcryptjs from 'bcryptjs';


export const signup = async (req, res) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password
        || username === "" || email === "" || password === "" )
     {
       return res.status(400).json("All Fields are Required")
    }

    const hashedpassword = bcryptjs.hashSync(password, 10);

    const newAccount = new Account(
        {
            username,
            email,
            password: hashedpassword
        }
    );

    try {
        await newAccount.save();
        res.json("Account is successfully created !")

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
           return res.status(400).json("User already exist")
        }
        
        const validPassword = bcryptjs.compareSync(password, validAccount.password);
        if (!validPassword) {
           return res.status(400).json("Invalid Password")
        };

        const {password: pass, ...rest} = validAccount._doc;

        res.status(200).json(rest);

    } catch (error) {
        console.log(error)
    }
};

