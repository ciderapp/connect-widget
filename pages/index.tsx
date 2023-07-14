export async function getServerSideProps() {
        return {
            redirect: {
                destination: 'https://connect.cidercollective.dev/widget',
                permanent: true,
            },
        }
}
export default function Home() {
    return (
    <div>
        <h1>Redirecting...</h1>
    </div>)
}
