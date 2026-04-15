"use client";

import { useState } from "react";
import { createPost, searchDrinks } from "./action";
import { useRouter } from "next/navigation";

const TASTE_CATEGORIES = ["단맛", "산미", "바디감", "피트", "여운"];

interface SearchDrink {
    id: string;
    nameKo: string;
    category: {
        name: string;
    };
}

export default function WritePostPage() {
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 1. 술 검색 관련 상태
    const [searchTerm, setSearchTerm] = useState("");
    const [searchResults, setSearchResults] = useState<SearchDrink[]>([]);
    const [selectedDrink, setSelectedDrink] = useState<SearchDrink | null>(null);

    // 맛 데이터 상태 관리 (기본값 3)
    const [tasteData, setTasteData] = useState<Record<string, number>>(
        TASTE_CATEGORIES.reduce((acc, cat) => ({ ...acc, [cat]: 3 }), {})
    );

    // 술 검색 핸들러
    const handleSearchChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchTerm(value);

        if (value.trim().length > 0) {
            const results = await searchDrinks(value);
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    };

    const handleTasteChange = (category: string, value: number) => {
        setTasteData((prev) => ({ ...prev, [category]: value }));
    };

    return (
        <div className="max-w-md mx-auto p-6 pb-24">
            <h1 className="text-2xl font-bold mb-8">새 시음기 작성</h1>

            <form
                action={async (formData) => {
                    if (!selectedDrink) {
                        alert("술을 먼저 선택해주세요!");
                        return;
                    }
                    setIsSubmitting(true);

                    // 폼 데이터 보강
                    formData.append("drinkId", selectedDrink.id);
                    formData.append("tasteData", JSON.stringify(tasteData));

                    const result = await createPost(formData);

                    if (result.success) {
                        router.push(`/posts/${result.postId}`);
                    } else {
                        alert("저장에 실패했습니다: " + result.error);
                        setIsSubmitting(false);
                    }
                }}
                className="space-y-10"
            >
                {/* --- 섹션 1: 술 검색 및 선택 --- */}
                <section className="space-y-3 relative">
                    <label className="text-sm font-bold text-gray-700">어떤 술을 마셨나요?</label>

                    {selectedDrink ? (
                        // 선택된 술 표시 (Chip)
                        <div className="flex justify-between items-center p-4 bg-orange-50 border border-orange-200 rounded-2xl shadow-sm">
                            <div>
                                <p className="text-[10px] font-bold text-orange-600 uppercase tracking-wider">
                                    {selectedDrink.category.name}
                                </p>
                                <p className="font-bold text-gray-900">{selectedDrink.nameKo}</p>
                            </div>
                            <button
                                type="button"
                                onClick={() => {
                                    setSelectedDrink(null);
                                    setSearchTerm("");
                                }}
                                className="text-xs text-orange-500 font-medium hover:underline"
                            >
                                변경하기
                            </button>
                        </div>
                    ) : (
                        // 검색창
                        <>
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={handleSearchChange}
                                placeholder="이름을 입력하세요 (예: 발베니)"
                                className="w-full p-4 border rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none transition-all"
                            />
                            {searchResults.length > 0 && (
                                <ul className="absolute z-20 w-full mt-2 bg-white border rounded-2xl shadow-2xl max-h-60 overflow-y-auto">
                                    {searchResults.map((drink) => (
                                        <li
                                            key={drink.id}
                                            onClick={() => {
                                                setSelectedDrink(drink);
                                                setSearchResults([]);
                                            }}
                                            className="p-4 hover:bg-orange-50 cursor-pointer flex justify-between items-center border-b last:border-none"
                                        >
                                            <span className="font-medium">{drink.nameKo}</span>
                                            <span className="text-[10px] bg-gray-100 px-2 py-1 rounded text-gray-500">
                        {drink.category.name}
                      </span>
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </>
                    )}
                </section>

                {/* --- 섹션 2: 평점 --- */}
                <section className="space-y-3">
                    <label className="text-sm font-bold text-gray-700">평점</label>
                    <div className="flex items-center gap-4">
                        <input
                            type="range"
                            name="rating"
                            min="1"
                            max="5"
                            step="0.5"
                            defaultValue="4.0"
                            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                        />
                    </div>
                </section>

                {/* --- 섹션 3: 맛 지표 슬라이더 --- */}
                <section className="space-y-6 bg-gray-50 p-5 rounded-3xl border border-gray-100">
                    <h3 className="font-bold text-sm text-gray-600">맛 디테일</h3>
                    {TASTE_CATEGORIES.map((cat) => (
                        <div key={cat} className="space-y-3">
                            <div className="flex justify-between text-xs font-medium">
                                <span className="text-gray-500">{cat}</span>
                                <span className="text-orange-600 font-bold">{tasteData[cat]}</span>
                            </div>
                            <input
                                type="range"
                                min="1"
                                max="5"
                                value={tasteData[cat]}
                                onChange={(e) => handleTasteChange(cat, parseInt(e.target.value))}
                                className="w-full h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-orange-500"
                            />
                        </div>
                    ))}
                </section>

                {/* --- 섹션 4: 시음평 본문 --- */}
                <section className="space-y-3">
                    <label className="text-sm font-bold text-gray-700">리뷰</label>
                    <textarea
                        name="content"
                        rows={4}
                        placeholder="향과 맛, 피니시는 어땠나요?"
                        className="w-full p-4 border rounded-2xl focus:ring-2 focus:ring-orange-500 outline-none resize-none"
                        required
                    />
                </section>

                {/* --- 제출 버튼 --- */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-orange-500 text-white rounded-2xl font-bold shadow-xl shadow-orange-100 active:scale-[0.98] transition-all disabled:bg-gray-300"
                >
                    {isSubmitting ? "저장 중..." : "시음기 등록 완료"}
                </button>
            </form>
        </div>
    );
}