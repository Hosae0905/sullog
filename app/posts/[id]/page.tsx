// src/app/posts/[id]/page.tsx
"use client";

import React from 'react';
import Link from 'next/link';

// UI 확인을 위한 임시 데이터
const MOCK_POST = {
    id: "1",
    drinkName: "발베니 12년 더블우드",
    drinkNameEn: "Balvenie 12Y Double Wood",
    category: "위스키",
    abv: 40,
    rating: 4.5,
    content: `첫 향에서 느껴지는 달콤한 바닐라와 꿀의 풍미가 아주 매력적입니다. 
            목 넘김이 부드러워 입문자에게 추천하고 싶네요. 
            뒷맛에서 살짝 느껴지는 시나몬의 스파이시함이 지루하지 않게 해줍니다.`,
    imageUrl: "",
    author: "위스키꿈나무",
    createdAt: "2024. 02. 15",
};

export default function PostDetailPage() {
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
                    src={MOCK_POST.imageUrl}
                    alt={MOCK_POST.drinkName}
                    className="w-full h-full object-cover"
                />
            </div>

            {/* 정보 섹션 */}
            <div className="space-y-2 mb-8">
                <div className="flex items-center gap-2">
          <span className="px-2 py-0.5 bg-orange-100 text-orange-600 text-[10px] font-bold uppercase tracking-wider rounded-md">
            {MOCK_POST.category}
          </span>
                    <span className="text-gray-400 text-xs font-medium">{MOCK_POST.abv}% vol</span>
                </div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900">{MOCK_POST.drinkName}</h1>
                <p className="text-sm text-gray-500 font-medium">{MOCK_POST.drinkNameEn}</p>
                <div className="flex items-center gap-1.5 pt-1">
                    <span className="text-orange-400 text-lg">★</span>
                    <span className="font-bold text-lg text-gray-900">{MOCK_POST.rating}</span>
                </div>
            </div>

            {/* 차트 영역 (임시) */}
            <div className="h-64 bg-gray-50 rounded-2xl flex items-center justify-center mb-8 border border-gray-100">
                <p className="text-gray-400 text-sm font-medium">Taste Data Visualization</p>
            </div>

            {/* 본문 시음평 */}
            <div className="space-y-3 px-1">
                <h2 className="text-lg font-bold text-gray-900">시음평</h2>
                <p className="text-[15px] text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {MOCK_POST.content}
                </p>
            </div>
        </div>
    );
}