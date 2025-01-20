import React from 'react'
import Form from 'next/form'

import SearchReset from '../components/SearchReset'
import { Search } from 'lucide-react'
import { Button } from './ui/button'
const SearchFrom = ({ initialQuery }: {
  initialQuery?: string
}) => {

  return (
    <Form action={'/'} scroll={false} className='search-form'>
      <input
        name='query'
        defaultValue=''
        className='search-input'
        placeholder='Search Startup'
      />
      <div
        className='flex gap-2'
      >
        {initialQuery && (
          <SearchReset />

        )}
        <Button type='submit' className='search-btn text-white'>
          <Search />

        </Button>
      </div>
    </Form>
  )
}

export default SearchFrom