"use server";
import { AliasProps } from "@/types";
import getCollection, { SHORT_COLLECTION } from "@/db";

function validUrl(url: string) {
    try {
        new URL(url);
        return  true;
    } catch (err) {
        return false;
    }
}
export async function createNewAlias(url: string, alias: string): Promise<AliasProps> {
    if (validUrl(url)) {
        const entry = {
            alias: alias,
            url: url,
            response: "true",
        };

        const collection = await getCollection(SHORT_COLLECTION);
        const res = await collection.insertOne({...entry});

        if (!res.acknowledged) {
            throw new Error("DB insert failed");
        }

        return { ...entry, alias: res.insertedId.toHexString() };
    } else {
        const entry = {
            response: "false",
        };

        return { ...entry }
    }
}