import React, {useEffect} from 'react';
import Document, { Html, Head, Main, NextScript, DocumentContext} from 'next/document';
import {CssBaseline} from '@nextui-org/react';

class MyDocument extends Document {
    static async getInitialProps(ctx: DocumentContext) {
        const initialProps = await Document.getInitialProps(ctx);
        return {
            ...initialProps,
            styles: React.Children.toArray([initialProps.styles])
        };
    }

    render() {

        console.info(`
            ------------------\n
            Do not use our Firebase URLs in developing your RPC app!\n
            They can change at any time and break your app.\n\n
            Use the RPC API instead if Cider is running locally.\n
            https://cider.sh/docs/rpc\n
            \n
            If you insist on using Connect (Firebase URLs), you can use this URL to access it.\n
            https://${document.location.host}/api/[instanceId]
            ------------------\n
            `)


        return (
            <Html lang="en">
                <Head>{CssBaseline.flush()}</Head>
                <body>
                <Main />
                <NextScript />
                </body>
            </Html>
        );
    }
}

export default MyDocument;