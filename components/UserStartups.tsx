import React from 'react'
import { startup_by_author_id } from '@/sanity/lib/queries'
import { sanityFetch } from '@/sanity/lib/live'
import Cards, { StartupCardType } from './Cards'

const UserStartups = async ({ userID }: { userID: string }) => {

  const userStartups = await sanityFetch({
    query: startup_by_author_id,
    params: { id: userID }
  })
  return (
    <>{userStartups?.data?.length > 0 ?
      (
        userStartups?.data?.map((post: StartupCardType) => (
          <Cards key={post?.slug?.current} post={post} />
        ))
      ) : (
        <p className='no-results'>no startup</p>
      )
    }

    </>

  )
}

export default UserStartups