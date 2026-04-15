"use server";

import db from "@/lib/db-prisma";
import { revalidatePath } from "next/cache";

export async function createPost(formData: FormData) {
    try {
        const drinkId = formData.get("drinkId") as string;
        const rating = parseFloat(formData.get("rating") as string);
        const content = formData.get("content") as string;
        const tasteDataString = formData.get("tasteData") as string;
        const tasteData = JSON.parse(tasteDataString);

        // 임시: 현재 로그인 기능이 없으므로,
        // DB에 있는 첫 번째 유저의 ID를 가져와서 사용합니다.
        const user = await db.user.findFirst();
        if (!user) throw new Error("유저가 존재하지 않습니다.");

        // DB 저장
        const newPost = await db.post.create({
            data: {
                userId: user.id,
                drinkId: drinkId,
                rating: rating,
                content: content,
                tasteData: tasteData,
                images: [], // 나중에 이미지 업로드 구현 시 추가
            },
        });

        // 메인 페이지 등 관련 페이지 캐시 갱신
        revalidatePath("/");
        revalidatePath(`/posts/${newPost.id}`);

        return { success: true, postId: newPost.id };
    } catch (error) {
        console.error("작성 에러:", error);
        return { success: false, error: String(error) };
    }
}

export async function searchDrinks(query: string) {
    if (!query || query.length < 1) return [];

    try {
        const results = await db.drink.findMany({
            where: {
                nameKo: {
                    contains: query,       // 키워드 포함 여부 확인
                    mode: 'insensitive',  // 대소문자 무시 (한글에선 주로 자음/모음 일치)
                },
            },
            include: {
                category: true, // 카테고리 정보(위스키, 와인 등)도 함께 가져옴
            },
            take: 10, // 성능을 위해 최대 10개만 반환
        });

        return results;
    } catch (error) {
        console.error("검색 중 오류 발생:", error);
        return [];
    }
}