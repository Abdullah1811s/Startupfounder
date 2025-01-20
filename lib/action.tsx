'use server'

import { auth } from "@/auth";
import { returnServerResponse } from "./utils";
import slugify from "slugify";
import { write_client } from "@/sanity/lib/client-write";
export const createPitch = async (state:any , formdata:FormData , pitch:string)=>
{
    
    const session = await auth();
    if(!session)
        return returnServerResponse({
            error:"User is not signed in",
            status:"ERROR"
        })

    const {title , description , category , link} = Object.fromEntries(
        Array.from(formdata).filter(([key])=> key!="pitch")
    )
    
    const slug = slugify(title as string)
    try{
        const startup={
            title,
            description,
            category,
            image:link,
            slug: {
                _type: slug,
                current: slug,
              },
            author:
            {
                _type:"reference",
                _ref:session?.user?.id
            },
            pitch
        }
        const submit = await write_client.create({_type:"startup" , ...startup});
        return returnServerResponse({
            ...submit,
            error:" ",
            status:"SUCCESS"
        })
    }
    catch(error)
    {
        console.log(error);
        return returnServerResponse({
          error: JSON.stringify(error),
          status: "ERROR",
        });
    }
   


    
}