import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from 'redux-conf/store';
import styles from '@/styles/EndGameBanner.module.css';
import { boardActions } from 'redux-conf/boardSlice';

const EndGameBanner = () => {
  const winner = useSelector((state: AppRootState) => state.board.winner);
  const dispatch = useDispatch();
  const resetBoard = () => {
    dispatch(boardActions.reset());
  };
  return (
    <h3 className={styles.banner}>
      {winner ? (
        <span>
          <span className={styles.winner}>{winner}</span> has won!
        </span>
      ) : (
        <span>
          It&apos;s a <span className={styles.winner}>draw!</span>
        </span>
      )}
      <p>
        <button className={styles.replayButton} onClick={resetBoard}>
          Play again!
        </button>
      </p>
    </h3>
  );
};

export default EndGameBanner;
