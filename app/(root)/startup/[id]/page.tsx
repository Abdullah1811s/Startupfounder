import React from 'react'
import { startup_by_id } from '@/sanity/lib/queries';
import { sanityFetch } from '@/sanity/lib/live';
import { notFound } from 'next/navigation';
import { convertDate } from '@/lib/utils';
import { Suspense } from "react";

import View from "@/components/View";
import Link from 'next/link';
import Cards from '@/components/Cards';
import { getSimilarPost } from '@/sanity/lib/queries'
import { StartupCardType } from '@/components/Cards';
import { Skeleton } from '@/components/Skeleton';
export const experimental_ppr = true;
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const slug = (await (params)).id;
  const { data: startup_detail } = await sanityFetch({
    query: startup_by_id,
    params: { slug }
  })
  if (!startup_detail) notFound();
  const { title, image, description, pitch, category, author, _createdAt  } = startup_detail[0];
   const { _id: authorId, name: authorName, image: authorImage, username: authorUserName } = author ?? {};
  const { data: posts } = await sanityFetch({ query: getSimilarPost, params: { category  , slug} });
  return (
    <>
      <section className='pink_container !min-h[230px]:' >
        <p className='tag'>{convertDate(_createdAt)}</p>
        <h2 className='heading'>{title}</h2>
        <p className='sub-heading !max-w-5xl'>{description}</p>
      </section>
      <section className='flex justify-center items-center mt-5 p-5 '>
        <img src={image} alt="" className='w-full h-auto rounded-xl' />
      </section>
      <section className='section_container'>
        <div className='flex-between '>
          <Link href={`/user/${authorId}`} className="flex" prefetch={true}>
            <img
              src={authorImage}
              alt="author"
              height={48}
              width={48}
              className="rounded-full mr-5"
            />
            <div className="flex flex-col">
              <span className="font-bold text-20-medium">{authorName}</span>
              <span className="text-16-medium"> @{authorUserName}</span>
            </div>
          </Link>
          <p className='category-tag'>{category}</p>
        </div>

        <div className='mt-10'>
          <p className='font-bold text-30-bold'>pitch details</p>
          <p>
            {pitch}
          </p>
        </div>
        <hr className='mt-10 border-6 border-black-200' />
        <div>
          <h2 className='sub_heading text-30-bold mt-5'>Similar Startup:</h2>
          <ul className='card_grid mt-5'>
            {posts?.length > 0 ?
              (
                posts?.map((post: StartupCardType) => (
                  <Cards key={post?.slug?.current} post={post} />
                ))
              ) : (
                <p className='no-results'>No similar startup</p>
              )
            }
          </ul>
        </div>
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <View slug={slug} />
        </Suspense>
      </section>
    </>
  )
}

export default page