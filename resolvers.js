//to preprocess the queries
//query->to retrieve the data(exactly what data to fetch)
//mutation->to update the data
const { Query } = require('mongoose');
const User=require('./model/userSchema');
//define resolvers to execute
const resolvers = {
    Query:{
        
        getUsers:async(_,{id})=>{
            return await User.findById(id);
        },
        
    },
    Mutation:{
        createUser: async (_,{input})=>{
            
            try{
                const {name,email,password}=input;
                if(!name || !email || !password){
                    throw new Error("please enter all feilds");
                }
                const newUser=new User({name,email,password})
                 return await newUser.save();
            }catch(err){throw Error (`Error Creating User : ${err}`)}
            
        },
        changePass:async(_,{id,password})=>{
            try{
                const userNew=await User.findByIdAndUpdate(id,{password:password},{new:true});
                if(!userNew){
                   throw new Error ('USER not found');
                }
            }
            catch(err){
                throw Error(err)

            }
        },
       
},
    User:{
        email:(parent)=> parent.email || '',
        name:(parent)=>parent.name || '',
        password:(parent)=>parent.name || '',


    }
};
module.exports=resolvers;