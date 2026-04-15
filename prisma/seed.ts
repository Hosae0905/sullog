// TODO: 데이터 시딩이 정상적으로 동작하지 않아서 추후 해결할 예정

import db from "../lib/db-prisma"

async function main() {
    // 1. 카테고리 생성
    const whisky = await db.category.upsert({
        where: { name: '위스키' },
        update: {},
        create: { name: '위스키' },
    });

    // 2. 테스트용 술 데이터 대량 삽입
    const drinks = [
        { nameKo: '발베니 12년 더블우드', abv: 40, categoryId: whisky.id },
        { nameKo: '발베니 14년 캐리비안 캐스크', abv: 43, categoryId: whisky.id },
        { nameKo: '맥캘란 12년 쉐리 오크', abv: 40, categoryId: whisky.id },
        { nameKo: '글렌피딕 15년', abv: 40, categoryId: whisky.id },
        { nameKo: '조니워커 블루 라벨', abv: 40, categoryId: whisky.id },
        { nameKo: '라가불린 16년', abv: 43, categoryId: whisky.id },
    ];

    for (const drink of drinks) {
        await db.drink.create({ data: drink });
    }

    console.log("data seeding success")
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await db.$disconnect());
