import React from "react";
import HeadPageLayout from "../../components/HeadPageLayout";
import ContentGrid from "../../components/ContentGrid";

function Videos() {
    return (
        <HeadPageLayout pageId="videos">
            <main>
                <ContentGrid pageId="videos" />
            </main>
        </HeadPageLayout>
    );
}

export default Videos;
