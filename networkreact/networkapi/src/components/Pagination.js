import React from 'react'
import styled from 'styled-components'

const PaginationContainer = styled.div`
display: flex;
align-items: center;
padding: 10px;
`;

const PaginationList = styled.ul`
display: flex;
align - items: center;
justify - content: center;
list - style: none;
padding: 0;
margin: 0;
`;

const PaginationItem = styled.li`
display: flex;
align-items: center;
justify-content: center;
padding: 0;
margin: 0;
border-radius: 0;
background: #f5f5f5;
${props => props.active ? 'background: #f5f5f5;' : 'background: #f5f5f5;'}
`;

const enabled = `
cursor: pointer;
background-color: #333;
transition: background-color 0.2s ease-in-out;`

const disabled = `
background-color: #fff;
`;

const PaginationButton = styled.button`
display: flex;
align - items: center;
outline: none;
border: none;
border - radius: 50px;
&:hover {
  background-color: #333;
  color: #fff;
}
`;


export const Pagination = ({ postsPerPage, totalPosts, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <PaginationContainer>
      <PaginationList>{pageNumbers.map(number => (
        <PaginationItem key={number}>
          <PaginationButton onClick={() => paginate(number)}>{number}</PaginationButton>
        </PaginationItem>
      ))}
      </PaginationList>
    </PaginationContainer>
  )
}

export default Pagination;