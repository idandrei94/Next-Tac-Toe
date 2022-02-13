import Link from 'next/link';
import React, { useState } from 'react';
import styles from '@/styles/Nav.module.css';
import { useDispatch, useSelector } from 'react-redux';
import { boardActions } from 'redux-conf/boardSlice';
import { useRouter } from 'next/router';
import { AppRootState } from 'redux-conf/store';
import { roomActions } from 'redux-conf/roomSlice';
import { generateName, generatePassword } from 'utils/valueGenerators';

import * as cryptojs from 'crypto-js';
import { joinRoom, leaveRoom } from 'client/api';
import { encryptMessage } from 'common/encryption';
const Nav = () => {
  const [pwd, setPwd] = useState('');

  const dispatch = useDispatch();
  const resetBoard = () => {
    dispatch(boardActions.reset());
  };
  const router = useRouter();

  const uiState = useSelector((state: AppRootState) => state.ui);
  const { password, player } = useSelector((state: AppRootState) => state.room);
  const createRoomHandler = () => {
    setPwd('');
    joinRoomHandler();
  };

  const joinRoomHandler = () => {
    const newName = generateName();
    const password = pwd || generatePassword(16);
    dispatch(
      roomActions.joinRoom({
        name: newName,
        password: password
      })
    );
    joinRoom(encryptMessage(newName, password));
  };

  const leaveRoomHandler = () => {
    dispatch(roomActions.leaveRoom());
    leaveRoom(encryptMessage(player!, pwd));
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
                Reset Game
              </button>
            </li>
            {!password && (
              <React.Fragment>
                <li>
                  <button
                    className={styles.navButton}
                    onClick={createRoomHandler}
                  >
                    Create Room
                  </button>
                </li>
                <li>
                  <input
                    className={styles.navInput}
                    value={pwd}
                    placeholder="Room Code"
                    onChange={(e) => setPwd(e.target.value)}
                  />
                  <button
                    className={styles.navButton}
                    onClick={joinRoomHandler}
                    disabled={!pwd || pwd.length != 16}
                  >
                    Join Room
                  </button>
                </li>
              </React.Fragment>
            )}
            {!!password && (
              <React.Fragment>
                <li>
                  <button
                    className={styles.navButton}
                    onClick={() => {
                      navigator.clipboard.writeText(password);
                    }}
                  >
                    Room code: {password}
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
      </ul>
    </nav>
  );
};

export default Nav;
