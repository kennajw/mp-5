"use client";
import { AliasProps } from "@/types";
import { useState } from "react";
import NewUrlAlias from "./NewUrlAlias";
import NewShortened from "./NewShortened";

export default function NewUrl() {
    const [newUrl, setNewUrl] = useState<AliasProps | null>(null);

    function append(post: AliasProps) {
        setNewUrl(post);
    }

    return (
        <div>
            <NewUrlAlias append={append}/>
            {newUrl && <NewShortened key={newUrl.id} post={newUrl}/>}
        </div>
    );
}