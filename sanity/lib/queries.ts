import { defineQuery } from "next-sanity";

export const startup_query = defineQuery(`*[_type=="startup" && defined(slug.current) && !defined($search) || title match $search || author->name match $search || category match $search]
{
  _createdAt,
  views,
  slug,
    author->
    {
    _id,
      name,
      image
    },
  description,
  image,
    category,
    title,
    pitch
}`)

export const startup_by_id = defineQuery(`*[_type == "startup" && slug.current == $slug]{
  _createdAt,
  views,
  slug,
  author-> {
  _id,
    name,
    username,
    image
  },
  description,
  image,
  category,
  title,
  pitch
}
`)
export const getSimilarPost = defineQuery(`*[_type == "startup" && category == $category && slug.current != $slug]{
  _createdAt,
  views,
  slug,
  author-> {
    name,
    username,
    image
  },
  description,
  image,
  category,
  title,
  pitch
}
`)

export const startup_views_by_id = defineQuery(`*[_type == "startup" && slug.current == $slug][0]{
  views,
  _id
}`)



export const author_by_github_id = defineQuery(`*[_type == "author" && id == $id][0]{
    _id,
    id,
    name,
    image,
    email,
    bio,
    username
  }
`)

export const author_by_id = defineQuery(`*[_type == "author" && _id == $id][0]{
  _id,
  id,
  name,
  image,
  email,
  bio,
  username
}
`)


export const startup_by_author_id = defineQuery(`*[_type == "startup" && author._ref == $id]{
  _createdAt,
  views,
  slug,
  author-> {
    name,
    username,
    image
  },
  description,
  image,
  category,
  title,
  pitch
}

`)