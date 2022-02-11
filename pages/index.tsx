import Board from '@/components/game/board';
import type { NextPage } from 'next';
import React from 'react';

const Home: NextPage = () => {
  return (
    <div className="centerContainer">
      <Board />
    </div>
  );
};

export default Home;
