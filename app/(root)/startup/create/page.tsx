import React from 'react'
import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import Form from "@/components/Form"
const page = async() => {
  const session = await auth();
  if(!session) redirect('/');
  return (
    <>
      <section className='pink_container !min-h[230px]'>
        <h1 className='heading'>Submit you'r pitch</h1>
      </section>

      <Form/>
    </>
  )
}

export default page