import { client } from '@/sanity/lib/client';
import React from 'react';
import Ping from './Ping';
import { write_client } from '@/sanity/lib/client-write';
import { startup_views_by_id } from '@/sanity/lib/queries';
import { after } from 'next/server'
import { sanityFetch } from '@/sanity/lib/live';
const View = async ({ slug }: { slug: string }) => {

    const {data:  totalView } = await sanityFetch({
        query: startup_views_by_id,
        params: { slug }
      })
    after(async () =>
        await write_client
            .patch(totalView._id) 
            .set({ views: totalView.views + 1 })
            .commit()
    )


    return (
        <div className="view-container">
            <div className="absolute -top-2 -right-2">
                <Ping />
            </div>
            <p className="view-text">
                <span className="font-black">Views: {totalView.views + 1}</span>
            </p>
        </div>
    );
};

export default View;
