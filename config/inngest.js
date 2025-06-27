import { Inngest } from "inngest";
import connectDB from "./DB"; // ✅ Adjust the path if your DB file is elsewhere

import User from "@/models/User";
import { connect } from "mongoose";

// Create a client to send and receive events
export const inngest = new Inngest({ id: "SULEIMAN'S-ECOMMERCE" });

// inngest Function that save user data to data base 
export const syncUserCreation  = inngest.createFunction(
    {
        id : 'sync-user-from-clerk'
    } , {
        event : 'clerk/user.created'
    }, async ({event}) =>{
        const {id , first_name ,last_name, email_addresses , image_url} = event.data
        const userData = {
            _id : id , 
            email:email_addresses[0].email_address , 
            name:first_name + ' ' + last_name , 
            imageUrl : image_url
        }
        await connectDB()
        await User.create(userData) 
    }
)

//for the update user not creation 
export const syncUserUpdation= inngest.createFunction(
    {
        id : 'update-user-from-clerk'
    }, {event : 'clerk/user.updated'},
    async({event})=> {
        const {id , first_name ,last_name , email_addresses , image_url} = event.data
        const userData = {
            _id : id , 
            email:email_addresses[0].email_address , 
            name:first_name + ' ' + last_name , 
            imageUrl : image_url
        }
        await connectDB()
        await User.findByIdAndUpdate(id,userData)

    }
)
//delete user from DB 
export const syncUserDeletion = inngest.createFunction(
    {
        id : 'delete-user-clerk'
    }  , 
    {event : 'clerk/user.deleted'}, 
    async ({event}) => {
        const {id} = event.data
        await connectDB()
        await User.findByIdAndDelete(id)

    }
)
