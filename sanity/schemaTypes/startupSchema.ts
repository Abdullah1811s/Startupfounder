import { UserIcon } from "lucide-react";
import { title } from "process";
import { defineConfig, defineField, defineType } from "sanity";

export const startupSchema = defineType({
    name:"startup",
    title:"Startup",
    type:"document",
    fields:[
        defineField({
            name:"title",
            type:"string"
        }),
        defineField({
            name:"slug",
            type:"slug",
            options:{
                source:"title"
            }
        }),
        defineField({
            name:"author",
            type:"reference",
            to:{
                type:"author"
            }
        }),
        defineField({
            name:"views",
            type:"number"
        }),
        defineField({
            name:"description",
            type:"string"
        }),
        defineField({
            name:"category",
            type:"string" 
        }),
        defineField({
            name:"pitch",
            type:"markdown"
        }),
        defineField({
            name:"image",
            type:"url"
        }),
    ],
   
})