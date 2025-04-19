import getCollection, { SHORT_COLLECTION } from "@/db";
import { redirect, notFound } from "next/navigation";

export default async function ShortUrlPage({params}: {params: {alias: string} }) {
    const collection = await getCollection(SHORT_COLLECTION);
    const {alias} = await params;
    const foundAlias = await collection.findOne({alias});

    if (!foundAlias) {
        notFound();
    }

    redirect(foundAlias.url);

    return null;
}