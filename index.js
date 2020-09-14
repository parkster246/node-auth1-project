const express = require('express')

const PORT = process.env.PORT || 5000;
const server = require('./server')

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}...`);
  }); 