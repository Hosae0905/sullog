import Link from "next/link";

interface PostCardProps {
    post: {
        drinkName: string;
        category: string;
        rating: number;
        content: string;
        imageUrl: string;
    };
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <Link href={`/posts/${post.drinkName}`} className="block">
            <div className="group overflow-hidden rounded-xl border bg-white transition-all hover:shadow-md">
                {/* 이미지 영역 */}
                <div className="aspect-square bg-gray-200 overflow-hidden">
                    <img
                        src={post.imageUrl || "/api/placeholder/400/400"}
                        alt={post.drinkName}
                        className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    />
                </div>

                {/* 정보 영역 */}
                <div className="p-4">
                    <div className="flex items-center justify-between mb-1">
          <span className="text-xs font-semibold text-orange-500 uppercase tracking-wider">
            {post.category}
          </span>
                        <span className="text-sm font-bold">⭐ {post.rating.toFixed(1)}</span>
                    </div>
                    <h3 className="font-bold text-lg mb-2">{post.drinkName}</h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                        {post.content}
                    </p>
                </div>
            </div>
        </Link>
    );
}