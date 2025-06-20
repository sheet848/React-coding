import React, { useMemo, useState } from 'react'

const generateData = (count) => 
    Array.from({ length: count }, (_, i) => `Item ${i + 1}`);

const items = generateData(100);
const ITEMS_PER_PAGE = 10;

const Pagination = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = Math.ceil(items.length/ITEMS_PER_PAGE);

    //memoize sliced data for performance
    const currentItems = useMemo(() => {
        const start = (currentPage - 1) * ITEMS_PER_PAGE;
        return items.slice(start, start + ITEMS_PER_PAGE);
    }, [currentPage]);

    const goToPage = (page) => {
        if(page < 1 || page > totalPages) return;
        setCurrentPage(page);
    };

  return (
    <>
    <div>
        <h2>Paginated List</h2>

        <ul>
            {
                currentItems.map((item, index) => (
                    <li key={item}>{item}</li>
                ))
            }
        </ul>

        <nav>
            <button 
            onClick={() => goToPage(currentPage - 1)}
            disabled={currentPage === 1}>Prev</button>
            {
                [...Array(totalPages)].map((_, i) => {
                    const page = i + 1;
                    return (
                        <button onClick={() => goToPage(page)}>{page}</button>
                    )
                })
            }
            <button
            onClick={() => goToPage(currentPage + 1)}
            disabled={currentPage === totalPages}>Next</button>
        </nav>
    </div>
    </>
  )
}

export default Pagination