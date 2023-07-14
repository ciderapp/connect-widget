import { useDatabase, useDatabaseObjectData } from 'reactfire';
import {ref, onValue, off, set} from 'firebase/database';
import { useEffect, useState } from 'react';
import { Card, Loading, Progress } from '@nextui-org/react';
import { useRouter } from 'next/router'
import {DynamicIsland} from "@/components/DynamicIsland";

export default function Widget() {

    const router = useRouter();
    const { instanceId } = router.query;

    useEffect(() => {
        console.log(router.query);
    }, [router])

    useEffect(() => {
        console.log(instanceId);
    }, [instanceId])

    const database = useDatabase();
    const dbRef = ref(database, `instances/${instanceId}`);
    const ptRef = ref(database, `instances/${instanceId}/state/playbackTime`);

    const [data, setData] = useState({
        track: {
            title: null,
            artist: null,
            album: null,
        },
        isEnabled: true,
        link: '',
        currentPlaybackDuration: 0.0,
        currentPlaybackTime: 0.0,
        hideplaybackbar: false,
        hidelogo: false,
        color: '#1b1d20',
    });

    const { dbstatus, data: instance } = useDatabaseObjectData(dbRef);

    useEffect(() => {
        const remoteRef = ref(database, `instances/${instanceId}/remote/online`);
        set(remoteRef, true);
    })


    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        setData((prevData) => ({
            ...prevData,
            hideplaybackbar: params.get('hideplaybackbar') === 'true',
            hidelogo: params.get('hidelogo') === 'true',
            color: `#${params.get('color')}` || '#ff2561',
        }));
    }, []);

    useEffect(() => {
        if (instance) {
            setData((prevData) => ({
                ...prevData,
                track: {
                    title: instance?.nowPlaying?.title,
                    artist: instance?.nowPlaying?.artist,
                    album: instance?.nowPlaying?.album,
                    artwork: instance?.nowPlaying?.artworkURL.replace('{w}x{h}bb.jpg', '200x200bb.jpg'),
                },
                isEnabled: true,
                link: instance?.link,
                currentPlaybackDuration: instance.nowPlaying?.duration,
                currentPlaybackTime: instance.state?.playbackTime.currentPlaybackTime,
            }));
        }

        document.body.style.backgroundColor = 'transparent';
        document.documentElement.style.backgroundColor = 'transparent';
        const App = document.getElementsByClassName('App');
        document.body.style.display = 'flex';
        document.body.style.justifyContent = 'center';


        document.getElementById("listenTogetherName")?.style.setProperty(
            'font-size',
        instance?.nowPlaying?.title.length > 16 ? 'smaller' : '20px');

        console.log(instance);
    }, [instance]);

    const [playbackTime, setPlaybackTime] = useState(0);
    const [trackDuration, setTrackDuration] = useState(0);
    useEffect(() => {
        setTrackDuration(instance?.nowPlaying?.duration);

        setInterval(() => {
            setPlaybackTime(instance?.state?.playbackTime.currentPlaybackTime);
        }, 1000);

    }, [instance]);

    if (dbstatus === 'loading') {
        return <Loading color="white" type="gradient" size="sm" />;
    }

    return (
       <DynamicIsland props={{
           open: false,
           nP: data,
       }} />
    );
}
