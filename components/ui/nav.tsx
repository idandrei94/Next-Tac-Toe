import Link from 'next/link';
import React from 'react';
import styles from '@/styles/Nav.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from 'redux-conf/boardSlice';
import { useRouter } from 'next/router';
import { AppRootState } from 'redux-conf/store';
import { uiActions } from 'redux-conf/uiSlice';

const Nav = () => {
  const dispatch = useDispatch();
  const resetBoard = () => {
    dispatch(boardActions.reset());
  };
  const router = useRouter();

  const uiState = useSelector((state: AppRootState) => state.ui);

  const joinRoomHandler = () => {
    dispatch(uiActions.joinRoom('123456'));
    dispatch(boardActions.reset());
  };
  const leaveRoomHandler = () => {
    dispatch(uiActions.leaveRoom());
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.logo}>
        <Link href={'/'}>
          <a className={styles.logoContents}>
            <div className={styles.textYellow}>Next</div>
            <div className={styles.textRed}>Tic</div>
            <div className={styles.textRed}>Tac</div>
            <div className={styles.textYellow}>Toe</div>
          </a>
        </Link>
      </div>
      <ul>
        {uiState.showNavbuttons && router.route === '/' && (
          <React.Fragment>
            <li>
              <button className={styles.navButton} onClick={resetBoard}>
                New Game
              </button>
            </li>
            {!uiState.roomId && (
              <React.Fragment>
                <li>
                  <button className={styles.navButton}>Hotseat</button>
                </li>
                <li>
                  <button className={styles.navButton}>Vs. AI</button>
                </li>
                <li>
                  <button className={styles.navButton}>Create Room</button>
                </li>
                <li>
                  <button
                    className={styles.navButton}
                    onClick={joinRoomHandler}
                  >
                    Join Room
                  </button>
                </li>
              </React.Fragment>
            )}
            {!!uiState.roomId && (
              <React.Fragment>
                <li>
                  <button className={styles.navButton}>
                    Joined room {uiState.roomId}
                  </button>
                </li>
                <li>
                  <button
                    className={styles.navButton}
                    onClick={leaveRoomHandler}
                  >
                    Leave Room
                  </button>
                </li>
              </React.Fragment>
            )}
          </React.Fragment>
        )}
        {router.route !== '/' && (
          <li>
            <Link href={'/'} passHref>
              <button className={styles.navButton}>Back to Game</button>
            </Link>
          </li>
        )}
        <li>
          <Link href={'/about'} passHref>
            <button className={styles.navButton}>About</button>
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
