import React, { Suspense } from 'react'
import { auth } from '@/auth'
import { author_by_id } from '@/sanity/lib/queries'
import { write_client } from '@/sanity/lib/client-write';
import { sanityFetch } from '@/sanity/lib/live';

import { notFound } from 'next/navigation';
import UserStartups from '@/components/UserStartups';
const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await (params)).id;
  const session = await auth();
  const user = await sanityFetch({
    query: author_by_id,
    params: { id }
  });
  if (!user) notFound();
  return (
    <>
      <section className="profile_container">
        <div className="profile_card">
          <div className="profile_title">
            <h3 className="text-24-black uppercase text-center line-clamp-1">
              {user?.data?.name}
            </h3>
          </div>

          <img
            src={user?.data.image}
            alt={user?.data?.name}
            width={220}
            height={220}
            className="profile_image"
          />

          <p className="text-30-extrabold mt-7 text-center">
            @{user?.data?.username}
          </p>
          <p className="mt-1 text-center text-14-normal">{user?.data?.bio}</p>
        </div>

        <div className="flex-1 flex flex-col gap-5 lg:-mt-5">
          <p className="text-30-bold">
            {session?.user?.id === id ? "Your" : "All"} Startups
          </p>
          <UserStartups userID={id} />
          {/* <ul className="card_grid-sm">
            <Suspense fallback={<StartupCardSkeleton />}>
              <UserStartups id={id} />
            </Suspense>
          </ul> */}
        </div>
      </section>
    </>
  );
};

export default page;
