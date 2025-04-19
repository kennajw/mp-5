import { Button } from "@mui/joy";
import { AliasProps } from "@/types";

export default function NewShortened({post}: {post: AliasProps}) {
    return (
        <div>
            <h2>Here's your shortened url!</h2>

            <div>
                <p>{post.short}</p>
                <a href={`/${post.alias}`}
                target="_blank"
                rel="noopener noreferrer">
                    <Button>Press here!</Button>
                </a>
            </div>
        </div>
    )
}