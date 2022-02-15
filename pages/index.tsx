import type { GetServerSideProps, NextPage } from 'next';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootState } from 'redux-conf/store';
import styles from '@/styles/Home.module.css';
import Board from '@/components/game/board';
import ChatWindow from '@/components/ui/chatWindow';
import { useEffect, useState } from 'react';
import pusher from 'pusher-js';
import bindEventHandlers from 'client/messageHandler';
import { joinRoom, leaveRoom } from 'client/api';
import { encryptMessage } from 'common/encryption';

interface Props {
  channelName: string;
  appKey: string;
  cluster: string;
}

const Home: NextPage<Props> = ({ appKey, cluster }) => {
  const dispatch = useDispatch();
  const { isOnline, roomCode, player, password } = useSelector(
    (state: AppRootState) => state.room
  );

  const [pusherChannel] = useState(
    new pusher(appKey, {
      cluster: cluster
    })
  );

  useEffect(() => {
    const channels = pusherChannel.channels.all().map((c) => c.name);
    for (let channel of channels.filter((c) => c !== roomCode)) {
      pusherChannel.unsubscribe(channel);
      if (player) {
        leaveRoom(encryptMessage(player, password), password);
      }
    }
    if (player && roomCode && !channels.find((c) => c === roomCode)) {
      bindEventHandlers(pusherChannel.subscribe(roomCode));
      joinRoom(
        JSON.stringify({
          message: encryptMessage(player, roomCode)
        }),
        roomCode
      );
    }
  }, [pusherChannel, roomCode, dispatch, player, password]);

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
