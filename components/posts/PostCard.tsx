import Link from "next/link";

interface PostCardProps {
    post: {
        id: string;
        rating: number;
        content: string | null;
        images: string[];
        drink: {
            nameKo: string;
            category: {
                name: string;
            };
        };
        user: {
            nickname: string | null;
        };
    };
}

export default function PostCard({ post }: PostCardProps) {
    return (
        <Link href={`/posts/${post.id}`} className="block">
            <div className="border rounded-xl overflow-hidden bg-white shadow-sm">
                {/* 이미지 처리: 배열의 첫 번째 이미지를 사용하거나 없으면 플레이스홀더 */}
                <div className="aspect-video bg-gray-100 relative">
                    <img
                        src={post.images[0] || "/api/placeholder/400/300"}
                        alt={post.drink.nameKo}
                        className="w-full h-full object-cover"
                    />
                </div>

                <div className="p-4">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-[10px] font-bold text-orange-600 bg-orange-50 px-1.5 py-0.5 rounded">
                        {post.drink.category.name}
                      </span>
                    </div>
                <h3 className="font-bold text-lg">{post.drink.nameKo}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 mt-1">{post.content}</p>

                <div className="flex justify-between items-center mt-4">
                    <span className="text-orange-400 font-bold">★ {post.rating}</span>
                    <span className="text-xs text-gray-400">by {post.user.nickname}</span>
                </div>
                </div>
            </div>
        </Link>
    );
}