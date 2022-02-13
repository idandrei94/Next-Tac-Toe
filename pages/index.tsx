import type { GetServerSideProps, NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from 'redux-conf/store';
import styles from '@/styles/Home.module.css';
import Board from '@/components/game/board';
import ChatWindow from '@/components/ui/chatWindow';
import { useEffect, useState } from 'react';
import { uiActions } from 'redux-conf/uiSlice';
import pusher from 'pusher-js';
import bindEventHandlers from 'client/messageHandler';
import { roomActions } from 'redux-conf/roomSlice';
import { generateName, generatePassword } from 'utils/valueGenerators';

interface Props {
  channelName: string;
  appKey: string;
  cluster: string;
}

const Home: NextPage<Props> = ({ channelName, appKey, cluster }) => {
  const isOnline = useSelector((state: AppRootState) => state.room.isOnline);
  const dispatch = useDispatch();

  const [pusherChannel] = useState(
    new pusher(appKey, {
      cluster: cluster
    })
  );

  useEffect(() => {
    dispatch(uiActions.setChannelName(channelName));
    bindEventHandlers(dispatch, pusherChannel.subscribe(channelName));
    dispatch(
      roomActions.joinRoom({
        name: generateName(),
        password: generatePassword()
      })
    );
  }, [dispatch, channelName, pusherChannel]);

  return (
    <div className={styles.mainContainer}>
      <div />
      <Board />
      {isOnline && <ChatWindow />}
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    props: {
      channelName: process.env.CHANNEL_NAME,
      appKey: process.env.KEY,
      cluster: process.env.CLUSTER
    }
  };
};

export default Home;
