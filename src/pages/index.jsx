import React from "react";
import HeadPageLayout from "../components/HeadPageLayout";
import LearnMore from "../components/LearnMore";

export default function Home() {
    return (
        <div>
            <HeadPageLayout pageId="home">
                <LearnMore />
            </HeadPageLayout>
        </div>
    );
}
