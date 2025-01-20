'use client'

import React from 'react'

const SearchReset = () => {
    const reset = () => {
        const form = document.querySelector('.search-form') as HTMLFormElement;
        if (form) form.reset();
    };

    return (
        <button className='reset search-btn text-white' onClick={reset}>
            X
        </button>
    );
};

export default SearchReset;
