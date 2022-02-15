import { Board } from '@/models/gameModels';
import React from 'react';
import Cell from './cell';
import styles from '@/styles/Board.module.css';
import { useSelector } from 'react-redux';
import { AppRootState } from 'redux-conf/store';
import EndGameBanner from './EndGameBanner';

const Board = () => {
  const { board } = useSelector((state: AppRootState) => state.board);

  const isGameOver = useSelector((state: AppRootState) => !!state.board.winner);
  return (
    <div className={styles.container}>
      {new Array(9).fill(0).map((__, i) => (
        <Cell index={i} value={board.cells[i]} key={i} />
      ))}
      {isGameOver && <EndGameBanner />}
    </div>
  );
};

export default Board;
