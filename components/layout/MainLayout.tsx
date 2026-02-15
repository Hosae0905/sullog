import Header from "./Header";

export default function MainLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="min-h-screen bg-gray-50">
            <Header />
            <main className="max-w-screen-md mx-auto px-4 py-8">
                {children}
            </main>
        </div>
    );
}