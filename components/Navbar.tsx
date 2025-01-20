
import { auth, signIn, signOut } from '@/auth'
import Link from 'next/link'
import React from 'react'

const Navbar = async () => {
    const session = await auth();
    return (
        <header className='bg-white px-5 py-3 shadow-sm font-work-sans'>
            <nav className='flex justify-between items-center text-black'>
                <Link href="/">
                    <img src="/logo.png" alt="" width={200} height={133} />
                </Link>
                <div
                    className='flex items-center gap-4'
                >
                    {session && session?.user ? (
                        <>
                            <Link href={'/startup/create'}>
                                <span
                                    className='text-xl font-bold'
                                >Create</span>
                            </Link>
                            <form action={async () => {
                                'use server'
                                await signOut({ redirectTo: '/' })
                            }}>
                                <button
                                    className='text-xl font-bold text-primary'
                                    type='submit'>
                                    logout
                                </button>
                            </form>
                            <Link href={`/user/${session?.user?.id}`}>
                                <span
                                    className='avatar'
                                >
                                    <img src={session?.user?.image || "https://placeholder.co/48x48"}
                                        alt={"Author"}
                                        width={48}
                                        height={48}
                                        className="rounded-full border-2" />
                                </span>
                            </Link>
                        </>
                    ) : (
                        <>
                            <form action={async () => {
                                'use server'
                                await signIn();
                            }}>
                                <button className='text-2xl' type='submit'>login</button>
                            </form>
                        </>
                    )}
                </div>
            </nav>
        </header>
    )
}

export default Navbar