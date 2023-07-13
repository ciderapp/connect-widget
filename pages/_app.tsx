// 1. import `NextUIProvider` component
import { NextUIProvider } from '@nextui-org/react';
import FirebaseProvider, {FirebaseComponents} from "@/components/GlobalFirebaseProvider";
function MyApp({ Component, pageProps }) {
  return (
      // 2. Use at the root of your app
      <NextUIProvider>
        <FirebaseProvider>
            <FirebaseComponents>
                <Component {...pageProps} />
            </FirebaseComponents>
        </FirebaseProvider>
      </NextUIProvider>
  );
}

export default MyApp;