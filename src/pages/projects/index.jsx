import React from "react";
import HeadPageLayout from "../../components/HeadPageLayout";
import ContentGrid from "../../components/ContentGrid";

function Projects() {
    return (
        <HeadPageLayout pageId="projects">
            <main>
                <ContentGrid pageId="projects" />
            </main>
        </HeadPageLayout>
    );
}

export default Projects;
