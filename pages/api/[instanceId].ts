import type { NextApiRequest, NextApiResponse } from 'next'
import {ref, onValue, set} from 'firebase/database';


import { getDatabase } from "@firebase/database"
import { getFirestore } from "@firebase/firestore"
import { initializeApp } from "firebase/app";


const firebaseConfig = {
    apiKey: "AIzaSyCYhHEBH-bkXBADELuwQX4NsoqaH7460pA",
    authDomain: "cider-collective.firebaseapp.com",
    databaseURL: "https://connect-cidercollective.firebaseio.com",
    projectId: "cider-collective",
    storageBucket: "cider-collective.appspot.com",
    messagingSenderId: "474254121753",
    appId: "1:474254121753:web:a6d9e3568656d192820388",
    measurementId: "G-Q3FL03JLBV",
}
// change the runtime configuration to nodejs
// https://nextjs.org/docs/api-reference/next.config.js/runtime-configuration
export const runtime = 'nodejs'
export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // Use regular Firebase SDK functions to initialize the app
    const app = initializeApp(firebaseConfig);

    // initialize Database and Auth with the normal Firebase SDK functions
    const database = getDatabase(app)
    const firestore = getFirestore(app)


    const { instanceId } = req.query;

    if (!instanceId) {
        res.status(400).json({ message: 'Missing instanceId' })
        return;
    }


    const dbRef = ref(database, `instances/${instanceId}`);



    const remoteRef = ref(database, `instances/${instanceId}/remote/online`);
    await set(remoteRef, true);



    onValue(dbRef, (snapshot) => {
        const data = snapshot.val();

        res.status(200).json({ ...data })
    })


}