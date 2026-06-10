import User from "../models/user.model.js";
import jwt from "jsonwebtoken";
import Blacklist from "../models/Blacklist.model.js";

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }
    
    const user = await User.create({
      username,
      email,
      password,
    });

    const token = jwt.sign(
        {id: user._id, email: user.email},
        process.env.JWT_SECRET,
        {expiresIn: '1h'}
    )
    const cookieMethod={
        httpOnly: true,                      
    secure: false,                       
    sameSite: 'lax',                     
    maxAge: 7 * 24 * 60 * 60 * 1000 
    }
    res.cookie('token', token,cookieMethod)
    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error("Error in register controller:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
        if(!user.comparePassword(password)){
            return res.status(400).json({message: "Invalid credentials"});
        }
        const token= await jwt.sign(
            {id:user._id,username:user.username},
            process.env.JWT_SECRET,
            {expiresIn:"1d"}
        )
         const cookieMethod={
            httpOnly: true,                      
            secure: false,                       
            sameSite: 'lax',                     
            maxAge: 7 * 24 * 60 * 60 * 1000 
        }
        res.cookie('token', token,cookieMethod)
        res.status(200).json({
            message:"Login successful",
            user:{
                id:user._id,
                username:user.username,
                email:user.email,
            }
        });
    } catch (error) {
        console.error("Error in login controller:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const logout = async (req, res) => {
    try {
        const token = req.cookies.token;
        if(token){
            await Blacklist.create({ token });
        }
        res.clearCookie('token');
        res.status(200).json({ message: "Logout successful" });
    } catch (error) {
        console.error("Error in logout controller:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

const getMe= async (req, res) => {
    try {
        const user= await User.findById(req.user.id).select('-password');
        if(!user){
            return res.status(404).json({message:"User not found"});
        }
        res.status(200).json({user});
    } catch (error) {
        console.error("Error in getMe controller:", error);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}
export { register, login, logout, getMe };
