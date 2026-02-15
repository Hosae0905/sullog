import db from "@/lib/db-prisma";
import PostCard from "@/components/posts/PostCard";

export default async function Home() {
  // 1. DB에서 시음기(Post) 목록 가져오기 (술 정보 포함)
  const posts = await db.post.findMany({
    include: {
      drink: {
        include: { category: true }
      }
    },
    orderBy: { createdAt: 'desc' } // 최신순
  });

  return (
      <div className="space-y-6">
        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-bold tracking-tight">오늘의 술로그</h1>
          <p className="text-gray-500">다른 사람들은 어떤 술을 마셨을까요?</p>
        </div>

        {/* 2. 게시글이 없을 때의 처리 */}
        {posts.length === 0 ? (
            <div className="py-20 text-center border-2 border-dashed rounded-xl">
              <p className="text-gray-400">아직 작성된 시음기가 없습니다.</p>
              <p className="text-gray-400">첫 번째 시음기를 남겨보세요! (준비 중)</p>
            </div>
        ) : (
            /* 3. 게시글 리스트 (그리드 레이아웃) */
            <div className="grid gap-6 sm:grid-cols-2">
              {posts.map((post) => (
                  <PostCard
                      key={post.id}
                      post={{
                        drinkName: post.drink.nameKo,
                        category: post.drink.category.name,
                        rating: post.rating,
                        content: post.content || "",
                        imageUrl: post.images[0] || ""
                      }}
                  />
              ))}
            </div>
        )}
      </div>
  );
}
