import React, { useState, useEffect } from 'react';
import './Pagination.css'
import { MdArrowForwardIos, MdArrowBackIos } from "react-icons/md";

export const Pagination = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  const [currentPage, setCurrentPage] = useState(0);
  const [currentPageRange, setCurrentPageRange] = useState(pageNumbers.slice(0, 4));

  
//   useEffect(() => {
//     setCurrentPageRange(pageNumbers.slice(0, 4));
//   }, []);

  const handleNextClick = () => {
    setCurrentPage(currentPage + 1);
    setCurrentPageRange(pageNumbers.slice((currentPage * 4) +1, (currentPage * 4) + 5));
  }

  const handlePrevClick = () => {
    setCurrentPage(currentPage - 1);
    setCurrentPageRange(pageNumbers.slice((currentPage * 4) - 3, (currentPage * 4) +1));
  }

  return (
    <nav>
      <div className='pagination'>
      <div
       className="page-item"
       onClick={handlePrevClick} disabled={currentPage === 1}
      >
        <MdArrowBackIos />
        </div>
        {currentPageRange.map(number => (
          <div key={number} className='page-item'>
            <button onClick={() => paginate(number)} className='page-link'>
              {number}
            </button>
          </div>
        ))}
   <div
        className='next-button'
        onClick={handleNextClick} disabled={currentPage === Math.ceil(totalItems / itemsPerPage) / 4}
      >
        <MdArrowForwardIos />
      </div>
      </div>
    </nav>
  );
};
