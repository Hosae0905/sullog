import db from "@/lib/db-prisma";
import PostCard from "@/components/posts/PostCard";
import Link from 'next/link';

export default async function Home() {
  // 1. DB에서 시음기(Post) 목록 가져오기 (술 정보 포함)
  const posts = await db.post.findMany({
    include: {
      drink: { include: { category: true } },
      user: true,
    },
    orderBy: { createdAt: 'desc' } // 최신순
  });

    return (
        <main className="max-w-md mx-auto p-4 pb-24">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-2xl font-bold text-gray-900">술로그</h1>
                <Link
                    href="/posts/write"
                    className="bg-orange-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-md active:scale-95 transition-transform"
                >
                    + 글쓰기
                </Link>
            </div>

            {/* 2. 게시글 리스트 렌더링 */}
            <div className="grid gap-6">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <PostCard key={post.id} post={post} />
                    ))
                ) : (
                    <div className="text-center py-20 text-gray-400">
                        아직 작성된 시음기가 없어요. <br/>
                        첫 번째 주인공이 되어보세요!
                    </div>
                )}
            </div>

            {/* 하단 탭바 (나중에 컴포넌트화) */}
            <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/80 backdrop-blur-md border-t flex justify-around p-4">
                {/* 홈, 검색, 마이페이지 버튼들... */}
            </nav>
        </main>
    );
}
