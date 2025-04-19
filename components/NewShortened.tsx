import { AliasProps } from "@/types";

export default function NewShortened({post}: {post: AliasProps}) {
    return (
        <div className="flex flex-col text-center m-auto font-semibold text-[#4E3D42]">
            <h2>Here is your shortened url: </h2>

            <div>
                <p>{post.short}</p>
            </div>
        </div>
    )
}