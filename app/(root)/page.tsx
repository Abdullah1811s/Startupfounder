import '../globals.css'
import SearchFrom from '../../components/SearchFrom';
import Cards, { StartupCardType } from '@/components/Cards';
import { startup_query } from '@/sanity/lib/queries';
import { sanityFetch, SanityLive } from '@/sanity/lib/live';
import { auth } from '@/auth';
export default async function Home({ searchParams }: { searchParams: Promise<{ query: string }> }) {
  const query = (await searchParams).query;
  const params = {search: query || null};
  const {data : posts} = await sanityFetch({query: startup_query , params});
  const session = await auth();
 
  return (
    <>
      <section className='pink_container'>
        <h1 className='heading'>Hello this is the heading</h1>
        <p className='sub-heading'>pitch you'r idea's here</p>
        <SearchFrom initialQuery={query} />
      </section>
      <section className=' section_container'>
        <p className='text-30-semibold'>
          {
            query ? `search result for "${query}"` :
              'All startup'
          }
        </p>
        <ul className='card_grid'>
          {posts?.length > 0 ?
            (
              posts?.map((post: StartupCardType) => (
                <Cards key={post?.slug?.current} post={post} />
              ))
            ) : (
              <p className='no-results'>no startup</p>
            )
          }
        </ul>
      </section>
      <SanityLive/>
    </>
  );
}
