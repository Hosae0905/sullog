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