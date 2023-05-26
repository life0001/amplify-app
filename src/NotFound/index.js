import React from 'react';

export default function NotFound() {
  document.title = '404 - Not Found'
  return (
    <div style={{padding:"20px"}}>
      <h1>404 - Not Found</h1>
      <p>Sorry, the page you are looking for does not exist.</p>
    </div>
  );
}

