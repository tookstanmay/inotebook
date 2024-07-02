import React from 'react';

const Favicon = () => {
  const faviconUrl = 'path/to/your/favicon.ico'; // Replace with your path

  return (
    <link rel="icon" href={faviconUrl} type="image/x-icon" />
  );
};

export default Favicon;