// index.js - This component is the root component and will display the entire app

import Head from 'next/head'
import AppContainer from '@/containers/AppContainer'

export default function Home() {
  return (
    <>
      <Head>
        <title>Jamming</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <AppContainer/>
      </main>
    </>
  );
}
