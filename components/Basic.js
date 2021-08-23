import React from 'react';
import Head from 'next/head';
import Header from '../components/Header';

const Basic = ({children}) => {
    return (
        <>
            <Head>
                <title> SendUp </title>
                <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/uikit@3.7.2/dist/css/uikit.min.css" />

                <script src="https://cdn.jsdelivr.net/npm/uikit@3.7.2/dist/js/uikit.min.js"></script>
                <script src="https://cdn.jsdelivr.net/npm/uikit@3.7.2/dist/js/uikit-icons.min.js"></script>
            </Head>
            <Header></Header>
            <div className="uk-container uk-position-center">
                {children}
            </div>
        </>
    );
}

export default Basic;