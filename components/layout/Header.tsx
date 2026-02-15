import Link from 'next/link';

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
            <div className="max-w-screen-md mx-auto flex h-16 items-center justify-between px-4">
                <Link href="/" className="text-xl font-bold tracking-tighter text-orange-600">
                    Sullog.
                </Link>

                <div className="flex items-center gap-4">
                    {/* 나중에 검색창으로 바뀔 부분 */}
                    <div className="hidden sm:block w-40 h-9 bg-gray-100 rounded-md animate-pulse" />
                    <button className="text-sm font-medium hover:underline underline-offset-4">
                        로그인
                    </button>
                </div>
            </div>
        </header>
    );
}