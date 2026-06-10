import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const UserSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:[true, 'Email already exists']
    },
    password:{
        type:String,
        required:true,
    },

},{timestamps:true})

UserSchema.pre('save', async function(){
    if(!this.isModified('password')){
        return ;
    }
    this.password= await bcrypt.hash(this.password,10)
})

UserSchema.methods.comparePassword=async function(password){
    return await bcrypt.compare(password,this.password);
}

const User =mongoose.model('user',UserSchema);

export default User; 