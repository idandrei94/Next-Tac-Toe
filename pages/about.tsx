import { GetStaticProps } from 'next';
import React from 'react';

const About = () => {
  return (
    <React.Fragment>
      <p>Made with Nextjs</p>
      <p>Multiplayer and chat implemented using Socket.io</p>
      <p>Animations and graphics made entirely through css</p>
    </React.Fragment>
  );
};

export default About;

export const getStaticProps: GetStaticProps = async (context) => {
  return {
    props: {}
  };
};
