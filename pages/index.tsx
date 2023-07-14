import Image from 'next/image'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export async function getServerSideProps() {
        return {
            redirect: {
                destination: 'https://connect.cidercollective.dev/widget',
                permanent: true,
            },
        }
    }
