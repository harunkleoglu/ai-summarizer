import Header from '@/components/Layout/Header'

export default function HomeLayout({ children }) {
    return (
        <>
            <Header />
            <main className="pt-5"> {children} </main>
        </>
    )
}