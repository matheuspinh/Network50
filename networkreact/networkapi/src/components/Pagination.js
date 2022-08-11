import React from 'react'
import styled from 'styled-components'

const PaginationContainer = styled.div`
display: flex;
align-items: center;
padding: 10px;
`;

const PrevNextButton = styled.button`
display: flex;
align-items: center;
outline: none;
border: none;
&:hover {
  background-color: #333;
  color: #fff;
}
`;



export const Pagination = ({ postsPerPage, totalPosts, nextPage, prevPage, currentPage }) => {

  const pages = Math.ceil(totalPosts / postsPerPage);

  return (
    <PaginationContainer>
      {currentPage === 1 ? <div></div> : <PrevNextButton onClick={() => prevPage()}>Previous</PrevNextButton>}
      {currentPage === pages ? <div></div> : <PrevNextButton onClick={() => nextPage()}>Next</PrevNextButton>}
    </PaginationContainer >
  )
}

export default Pagination;