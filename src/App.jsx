import React, { useState, useEffect } from 'react';
import './App.css'

function App() {  
  const [quotes, setQuotes] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [quotesPerPage] = useState(10); 
  const totalPages = Math.ceil(quotes.length / quotesPerPage);
  const indexOfLastQuote = currentPage * quotesPerPage;
  const indexOfFirstQuote = indexOfLastQuote - quotesPerPage;
  const currentQuotes = quotes.slice(indexOfFirstQuote, indexOfLastQuote);

  useEffect(() => {
    fetchQuotes();
  }, []);

  const fetchQuotes = async () => {
    try {
      const response = await fetch('https://api.quotable.io/quotes/random?limit=50');
      const data = await response.json();
      setQuotes(data);
    } catch (error) {
      console.error('Error fetching quotes:', error);
    }
  };

  const goToPreviousPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };
  
  const goToNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };
  
  return (
    <div>
      {currentQuotes.map((quote) => (
        <div key={quote._id}>{quote.content}</div>
      ))}
      <button onClick={goToPreviousPage} disabled={currentPage === 1}>
        Previous
      </button>
      <span>{currentPage}</span> / <span>{totalPages}</span>
      <button onClick={goToNextPage} disabled={currentPage === totalPages}>
        Next
      </button>
    </div>
  );
}

export default App