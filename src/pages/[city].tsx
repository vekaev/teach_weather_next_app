import Head from 'next/head';
import React from 'react';
import Link from 'next/link';

import { useAppSelector } from '~redux';

const CityPage = () => {
  const userData = useAppSelector(state => state.user.userData);

  return (
    <div>
      <Head>
        <title>City</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/public/favicon.ico" />
      </Head>
      {JSON.stringify(userData)}
      <main>Email: {userData?.email}</main>
      <Link href="/">back</Link>
    </div>
  );
};

export default CityPage;