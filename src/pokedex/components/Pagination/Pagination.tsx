import React from 'react'

interface Props {
    perPage: number;
    page: number;
    nextPage: () => void;
    prevPage: () => void;
    maxItems: number;
}

export const Pagination = ({
    perPage,
    page,
    nextPage,
    prevPage,
    maxItems
}: Props) => {
    const lastPage = Math.ceil(maxItems / perPage);

  return (
    <div className='w-100 flex gap-4 p-8 mt-2 justify-content-center text-center'>
        <button className='btn btn-primary' disabled={page === 1} onClick={prevPage}>
            &lt;
        </button>
        <span className='btn btn-primary'>{page}</span>
        <button className='btn btn-primary' disabled={page === lastPage} onClick={nextPage}>
            &gt;
        </button>
    </div>
  )
}
