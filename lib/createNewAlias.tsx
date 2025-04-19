"use server";
import { AliasProps } from "@/types";
import getCollection, { SHORT_COLLECTION } from "@/db";

function validUrl(url: string) {
    try {
        new URL(url);
        return  true;
    } catch {
        return false;
    }
}
export async function createNewAlias(url: string, alias: string): Promise<{success: boolean; result?: AliasProps; error?: string}> {
    const base = "https://shorten-that-url";
    const short = `${base}/${alias}`;

    if (url.trim() === "" || !url) {
        return {success: false, error: "Uh oh! Need a URL!"};
    }

    if (!validUrl(url)) {
        return {success: false, error: "Uh oh! This url is not valid!"}
    }

    try {
        const new_url = new URL(url);

        if (!["http:", "https:"].includes(new_url.protocol)) {
            return {success: false, error: "Uh oh! Missing http:// or https:// !"};
        }
    } catch {
        return {success: false, error: "Uh oh! The URL format is invalid. Missing http:// https:// !"};
    }

    try {
        const res = await fetch(url, {
            method: "HEAD",
            redirect: "follow",
            headers: {
                "User-Agent": "Mozilla/5.0"
            }
        });

        if (!res.ok) {
            return {
                success: false,
                error: "Uh oh! The site is unreachable!"
            };
        }
    } catch {
        return {
            success: false,
            error: "Uh oh! The domain is unreachable or lacking DNS!"
        }
    };

    const collection = await getCollection(SHORT_COLLECTION);
    const foundAlias = await collection.findOne({alias});

    if (foundAlias) {
        return {success: false, error: "Uh oh! That alias already exists!"}
    }

    const res = await collection.insertOne({url, alias, short});

    if (!res.acknowledged) {
        return {success: false, error: "Uh oh! Unable to add to the database!"};
    }

    return {
        success: true,
        result: { url, alias, short, id: res.insertedId.toHexString() }
    }
}