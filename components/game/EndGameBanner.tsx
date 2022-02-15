import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from 'redux-conf/store';
import styles from '@/styles/EndGameBanner.module.css';
import { boardActions } from 'redux-conf/boardSlice';
import { sendReset } from 'client/api';
import { encryptMessage } from 'common/encryption';

const EndGameBanner = () => {
  const winner = useSelector((state: AppRootState) => state.board.winner);
  const { isOnline, roomCode, password, player } = useSelector(
    (state: AppRootState) => state.room
  );
  const dispatch = useDispatch();
  const resetBoard = () => {
    dispatch(boardActions.reset(isOnline));
    if (isOnline) {
      sendReset(
        JSON.stringify({
          message: encryptMessage(player!, password)
        }),
        roomCode
      );
    }
  };
  return (
    <h3 className={styles.banner}>
      {winner !== 'E' ? (
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
