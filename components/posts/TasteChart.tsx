"use client";

import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';

interface TasteChartProps {
    data: {
        subject: string;
        value: number;
    }[];
}

export default function TasteChart({ data }: TasteChartProps) {
    return (
        <div className="w-full h-64">
            <ResponsiveContainer width="100%" height="100%">
                <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
                    <PolarGrid stroke="#e5e7eb" />
                    <PolarAngleAxis
                        dataKey="subject"
                        tick={{ fill: '#6b7280', fontSize: 12, fontWeight: 500 }}
                    />
                    <Radar
                        name="맛"
                        dataKey="value"
                        stroke="#ea580c" // 주황색 포인트
                        fill="#ea580c"
                        fillOpacity={0.5}
                    />
                </RadarChart>
            </ResponsiveContainer>
        </div>
    );
}