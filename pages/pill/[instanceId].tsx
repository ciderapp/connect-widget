import { useDatabase, useDatabaseObjectData } from 'reactfire';
import {ref, onValue, off, set} from 'firebase/database';
import { useEffect, useState } from 'react';
import { Card, Loading, Progress } from '@nextui-org/react';
import { useRouter } from 'next/router'

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
        track: '',
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
            color: `#${params.get('color')}` || '#1b1d20',
        }));
    }, []);

    useEffect(() => {
        if (instance) {
            setData((prevData) => ({
                ...prevData,
                track: instance?.nowPlaying?.attributes,
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
        <Card
            style={{
                width: 350,
                backgroundColor: data.color,
                borderRadius: 15,
            }}
        >
            {data.hidelogo ? null : (
                <img
                    style={{
                        width: 20,
                        position: 'absolute',
                        top: '10px',
                        right: '10px',
                        zIndex: 69420,
                    }}
                    src="https://raw.githubusercontent.com/ciderapp/cider.sh/main/assets/img/Cider-Logo.png"
                    alt="icon"
                />
            )}
            <div
                style={{
                    width: 70,
                    height: 70,
                }}
            >
                <img
                    style={{
                        width: 50,
                        height: 50,
                        position: 'absolute',
                        left: 10,
                        top: 10,
                        borderRadius: 10,
                    }}
                    src={
                        instance?.nowPlaying?.artworkURL
                            ? instance?.nowPlaying?.artworkURL.replace('{w}x{h}bb.jpg', '200x200bb.jpg')
                            : 'https://raw.githubusercontent.com/ciderapp/cider.sh/main/assets/img/Cider-Logo.png'
                    }
                    alt="icon"
                />
            </div>
            <div
                style={{
                    position: 'absolute',
                    paddingLeft: 80,
                    paddingTop: 10,
                    height: 70,
                    width: '100%',
                    maxWidth: 350,
                    overflow: 'hidden',
                    display: 'flex',
                    flexDirection: 'column',
                    flexWrap: 'nowrap',
                    justifyContent: 'center',
                    alignItems: 'flex-start',
                }}
            >
                <h2 id="listenTogetherName" style={{ margin: 'unset', color: "white" }} className={'text-white'}>
                    {instance?.nowPlaying?.title
                        ? instance?.nowPlaying?.title
                        : 'Not Listening to Anything'}
                </h2>
                {instance?.nowPlaying?.artist ? (
                    <h4
                        style={{
                            fontSize: 16,
                            color: '#ff2654',
                            textTransform: 'uppercase',
                            fontWeight: 600,
                        }}
                    >
                        {instance?.nowPlaying?.artist}
                    </h4>
                ) : null}
            </div>

            {data.hideplaybackbar ? null : (
                <div style={{ top: '10', color: 'white' }}>
                    <Progress
                        color={'white'}
                        status={'white'}
                        style={{
                            color: 'white',
                            backgroundColor: 'rgba(255, 38, 84, 0.5)',
                            marginLeft: '0px !important',
                            height: '5px',
                            bottom: 0,
                            zIndex: 100,
                        }}
                        value={playbackTime}
                        max={trackDuration}
                    ></Progress>
                </div>
            )}

            {instance?.link ? (
                <div
                    style={{
                        background: '#0f1012',
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <h5 style={{ fontSize: 10, margin: 5 }}>
                        Listen Along at {String(instance?.link).replace('https://', '')}
                    </h5>
                </div>
            ) : null}
        </Card>
    );
}
