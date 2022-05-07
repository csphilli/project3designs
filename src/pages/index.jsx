import React from "react";
import HeadPageLayout from "../components/HeadPageLayout";
import LearnMore from "../components/LearnMore";

export default function Home() {
    const buttonData = {
        text: "Learn More",
        link: "learn-more",
    };
    return (
        <div>
            <HeadPageLayout pageId="home">
                <LearnMore />
            </HeadPageLayout>
        </div>
    );
}
