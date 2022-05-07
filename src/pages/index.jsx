import React from "react";
import HeadPageLayout from "../components/HeadPageLayout";
import Button from "../components/Button";

export default function Home() {
    const buttonData = {
        text: "Learn More",
        link: "learn-more",
    };
    return (
        <div>
            <HeadPageLayout pageId="home">
                <main>
                    <Button data={buttonData} />
                </main>
            </HeadPageLayout>
        </div>
    );
}
