"use client";

import { useState } from "react";
import { createPost } from "./action";
import { useRouter } from "next/navigation";

const TASTE_CATEGORIES = ["단맛", "산미", "바디감", "피트", "여운"];

export default function WritePostPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 맛 데이터 상태 관리 (기본값 3)
    const [tasteData, setTasteData] = useState<Record<string, number>>(
        TASTE_CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: 3 }), {})
    );

    const handleTasteChange = (category: string, value: number) => {
        setTasteData((prev) => ({ ...prev, [category]: value }));
    };

    return (
        <div className="max-w-md mx-auto p-6 pb-20">
            <h1 className="text-2xl font-bold mb-8">새 시음기 작성</h1>

            <form action={async (formData) => {
                setIsSubmitting(true);
                // 맛 데이터를 JSON 문자열로 변환하여 추가
                formData.append("tasteData", JSON.stringify(tasteData));
                const result = await createPost(formData);

                if (result.success) {
                    router.push(`/posts/${result.postId}`);
                } else {
                    alert("저장에 실패했습니다: " + result.error);
                    setIsSubmitting(false);
                }
            }} className="space-y-8">

                {/* 1. 술 선택 (현재는 간단히 ID 직접 입력 또는 하드코딩된 선택지) */}
                <section className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">술 선택 (Drink ID)</label>
                    <input
                        name="drinkId"
                        placeholder="Prisma Studio에서 복사한 Drink ID 입력"
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none"
                        required
                    />
                    <p className="text-xs text-gray-400">* 실제 서비스에선 검색 기능을 넣을 예정입니다.</p>
                </section>

                {/* 2. 평점 */}
                <section className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">전체 평점 (1~5)</label>
                    <input
                        type="number"
                        name="rating"
                        step="0.5"
                        min="1"
                        max="5"
                        defaultValue="4.0"
                        className="w-full p-3 border rounded-xl outline-none"
                    />
                </section>

                {/* 3. 맛 지표 (슬라이더) */}
                <section className="space-y-6 bg-gray-50 p-4 rounded-2xl border border-gray-100">
                    <h3 className="font-bold text-sm text-gray-600">맛 디테일 설정</h3>
                    {TASTE_CATEGORIES.map((cat) => (
                        <div key={cat} className="space-y-2">
                            <div className="flex justify-between text-xs">
                                <span>{cat}</span>
                                <span className="font-bold text-orange-600">{tasteData[cat]}</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={tasteData[cat]}
                                onChange={(e) => handleTasteChange(cat, parseInt(e.target.value))}
                                className="w-full accent-orange-500"
                            />
                        </div>
                    ))}
                </section>

                {/* 4. 본문 */}
                <section className="space-y-2">
                    <label className="text-sm font-bold text-gray-700">시음평</label>
                    <textarea
                        name="content"
                        rows={5}
                        placeholder="맛과 향은 어땠나요? 자유롭게 적어주세요."
                        className="w-full p-3 border rounded-xl focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                        required
                    />
                </section>

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-4 bg-orange-500 text-white rounded-2xl font-bold shadow-lg shadow-orange-200 active:scale-95 transition-all disabled:bg-gray-300"
                >
                    {isSubmitting ? "저장 중..." : "시음기 등록하기"}
                </button>
            </form>
        </div>
    );
}