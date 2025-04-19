"use client";
import { useState } from "react";
import { Textarea } from "@mui/joy";
import { Button, FormHelperText, TextField } from "@mui/material";
import { createNewAlias } from "../lib/createNewAlias";
import { AliasProps } from "@/types";
import { create } from "domain";

export default function NewUrlAlias({
    append,
}: {
    append: (post: AliasProps) => void;
}) {
    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");

    return (
        <div>
            <form 
                onSubmit={async (e) => {
                    e.preventDefault();
                    setError("");

                    const res = await createNewAlias(url, alias)

                    if (!res.success) {
                        setError(res.error || "Uh oh! Something has gone wrong!");
                        return;
                    }

                    if (res.result) {
                        append(res.result);
                    }
                }}
            >
                <TextField 
                    value={url}
                    label="url"
                    variant="filled"
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                <TextField 
                    placeholder="alias"
                    value={alias}
                    label="alias"
                    onChange={(e) => setAlias(e.target.value)}
                    required
                />

                <FormHelperText>Click to shorten that url!</FormHelperText>

                <div>
                    <Button type="submit" variant="contained">Shorten It!</Button>
                    {error && (
                        <p>{error}</p>
                    )}
                </div>
            </form>
        </div>
    );
}