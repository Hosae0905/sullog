// src/app/posts/[id]/page.tsx

import db from "@/lib/db-prisma";
import { notFound } from "next/navigation";
import Link from 'next/link';
import TasteChart from "@/components/posts/TasteChart";

export default async function PostDetailPage(props: { params: Promise<{ id: string }> }) {

    const { id } = await props.params;

    console.log('post id = ', id);

    // 1. DB에서 게시글 정보 가져오기
    // 관계된 술 정보와 카테고리까지 한 번에 가져오기
    const post = await db.post.findUnique({
        where: { id },
        include: {
            drink: {
                include: { category: true }
            },
            user: true,
        },
    });

    // 2. 만약 해당 ID의 데이터가 없다면 404 페이지로 이동
    if (!post) {
        notFound();
    }

    const tasteDataRaw = post.tasteData as Record<string, number>;
    const chartData = Object.entries(tasteDataRaw).map(([key, value]) => ({
        subject: key,
        value,
    }));

    return (
        <div className="pb-20 max-w-md mx-auto px-4">
            {/* 상단 네비게이션 */}
            <div className="flex items-center justify-between h-14 mb-4">
                <Link href="/" className="p-2 -ml-2 text-gray-600 hover:text-black">
                    {/* 뒤로가기 아이콘 (SVG) */}
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
                </Link>
                <div className="flex gap-2 text-gray-600">
                    <button className="p-2 hover:text-black">
                        {/* 공유 아이콘 (SVG) */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"/><polyline points="16 6 12 2 8 6"/><line x1="12" x2="12" y1="2" y2="15"/></svg>
                    </button>
                    <button className="p-2 hover:text-red-500">
                        {/* 하트 아이콘 (SVG) */}
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    </button>
                </div>
            </div>

            {/* 히어로 이미지 */}
            <div className="aspect-square w-full overflow-hidden rounded-3xl bg-gray-100 mb-6 shadow-sm">
                <img
                    src={post.images[0] || "/api/placeholder/400/400"}
                    alt={post.drink.nameKo}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 정보 섹션 */}
            <div className="space-y-2 mb-8">
                <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
            {post.drink.category.name}
          </span>
                    <span className="text-gray-400 text-xs font-medium">{post.drink.abv}% vol</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">{post.drink.nameKo}</h1>
                <p className="text-sm text-gray-500 font-medium">{post.drink.nameEn}</p>
                <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-orange-400 text-lg">★</span>
                    <span className="font-bold text-lg text-gray-900">{post.rating}</span>
                </div>
            </div>

            {/* 차트 영역 (임시) */}
            <div className="h-64 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 border border-gray-100">
                <TasteChart data={chartData}></TasteChart>
            </div>

            {/* 본문 시음평 */}
            <div className="space-y-3 px-1">
                <h2 className="text-lg font-bold text-gray-900">시음평</h2>
                <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {post.content}
                </p>
            </div>
        </div>
    );
}