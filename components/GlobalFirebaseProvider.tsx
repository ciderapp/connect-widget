import * as React from "react"
import { getDatabase } from "@firebase/database"
import { getFirestore } from "@firebase/firestore"
import {
    DatabaseProvider,
    FirebaseAppProvider, FirestoreProvider,
    useFirebaseApp,
} from "reactfire"

const firebaseConfig = {
    apiKey: "AIzaSyCYhHEBH-bkXBADELuwQX4NsoqaH7460pA",
    authDomain: "cider-collective.firebaseapp.com",
    databaseURL:
        "https://connect-cidercollective.firebaseio.com",
    projectId: "cider-collective",
    storageBucket: "cider-collective.appspot.com",
    messagingSenderId: "474254121753",
    appId: "1:474254121753:web:a6d9e3568656d192820388",
    measurementId: "G-Q3FL03JLBV",
}

export default function FirebaseProvider({children} : any) {
    return (
        <FirebaseAppProvider firebaseConfig={firebaseConfig}>
            <FirebaseComponents>{children}</FirebaseComponents>
        </FirebaseAppProvider>
    )
}

export function FirebaseComponents({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    const app = useFirebaseApp() // a parent component contains a `FirebaseAppProvider`

    // initialize Database and Auth with the normal Firebase SDK functions
    const database = getDatabase(app)
    const firestore = getFirestore(app)

    return (
        <DatabaseProvider sdk={database}>
            <FirestoreProvider sdk={firestore}>{children}</FirestoreProvider>
        </DatabaseProvider>
    )
}
