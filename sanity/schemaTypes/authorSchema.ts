import { UserIcon } from "lucide-react";
import { title } from "process";
import {  defineField, defineType } from "sanity";

export const authorSchema = defineType({
    name:"author",
    title:"Author",
    type:"document",
    icon:UserIcon,
    fields:[
        defineField({
            name:"id",
            type:"number"
        }),
        defineField({
            name:"name",
            type:"string"
        }),
        defineField({
            name:"username",
            type:"string"
        }),
        defineField({
            name:"email",
            type:"string"
        }),
        defineField({
            name:"image",
            type:"url"
        }),
        defineField({
            name:"bio",
            type:"text"
        }),
    ],
    preview:
    {
        select:{
            title:"name"
        }
    }
})