import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ChakraProvider, Box, Flex, Text } from '@chakra-ui/react';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Pilotage from './components/Pilotage';
import Transactions from './components/Transactions';
import Todo from './components/Todo';
import Documents from './components/Documents';
import Accompaniment from './components/Accompaniment';
import Sponsorship from './components/Sponsorship';

function App() {
  return (
    <ChakraProvider>
      <Router>
        <Flex h="100vh">
          <Box minW="200px">
            <Navbar />
          </Box>
          <Box flex="1" p={5}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/pilotage" element={<Pilotage />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/todo" element={<Todo />} />
              <Route path="/documents" element={<Documents />} />
              <Route path="/accompaniment" element={<Accompaniment />} />
              <Route path="/sponsorship" element={<Sponsorship />} />
            </Routes>
          </Box>
        </Flex>
      </Router>
    </ChakraProvider>
  );
}

export default App;
