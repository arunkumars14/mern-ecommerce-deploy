const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken")
const User = require("../../models/User")

const registerUser = async(req, res) => {
    const {userName, email, password} = req.body;
    try{
        const checkUser = await User.findOne({email})
        if(checkUser) return res.json({
            success: false,
            message : "User already exists with same email"
        })

        const hashPassword = await bcrypt.hash(password, 12)
        const newUser = new User({
            userName, email, password: hashPassword
        })
        await newUser.save()
        res.status(200).json({
            success: true,
            message: "Registration Successful"
        })

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

const loginUser = async(req, res) => {
    const {email, password} = req.body;
    try{
        const checkUser = await User.findOne({email})
        if(!checkUser) return res.json({
            success: false,
            message: "User doesn't exist, Please register with your email"
        })
        const checkPasswordMatch = await bcrypt.compare(password, checkUser.password)
        if(!checkPasswordMatch) return res.json({
            success: false,
            message: "Password is incorrect"
        })
        const token = jwt.sign({
            id: checkUser._id, role: checkUser.role, email: checkUser.email, userName: checkUser.userName
        }, "CLIENT_SECRET_KEY", {expiresIn: "1d"})

        res.cookie("token", token, {
            httpOnly: true,
            secure: true
        }).json({
            success: true,
            message: "Logged in successfully",
            user: {
                email: checkUser.email,
                role: checkUser.role,
                id: checkUser._id,
                userName: checkUser.userName
            }
        })    

    }catch(e){
        console.log(e);
        res.status(500).json({
            success: false,
            message: "Some error occured"
        })
    }
}

const logoutUser = (req, res) => {
    res.clearCookie("token").json({
        success: true,
        message: "Logged Out Successfully"
    })
}

const authMiddleware = async(req, res, next)=>{
    const token = req.cookies.token
    if(!token) return res.status(401).json({
        success: false,
        message: "Unauthorized user"
    })
    try {
        const decoded = jwt.verify(token, "CLIENT_SECRET_KEY");
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({
            success: false,
            message: "Unauthorized user"
        })
    }
}



module.exports = {registerUser, loginUser, logoutUser, authMiddleware, }
