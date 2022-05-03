import React from "react";
import HeadPageLayout from "../components/HeadPageLayout";
import Button from "../components/Button";

export default function Home() {
    return (
        <div>
            <HeadPageLayout pageId="home">
                <main>
                    <Button />
                </main>
            </HeadPageLayout>
        </div>
    );
}
