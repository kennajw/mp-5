"use client";
import { useState } from "react";
import { Button, FormHelperText, TextField } from "@mui/material";
import { createNewAlias } from "../lib/createNewAlias";
import { AliasProps } from "@/types";

export default function NewUrlAlias({
    append,
}: {
    append: (post: AliasProps) => void;
}) {
    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");
    const [error, setError] = useState("");

    return (
        <div className="flex justify-between text-center">
            <form 
                className="p-10 justify-between m-auto"
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
                    className="w-150 m-2"
                    value={url}
                    label="url"
                    variant="filled"
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                <TextField 
                    className="m-5"
                    placeholder="alias"
                    value={alias}
                    label="alias"
                    onChange={(e) => setAlias(e.target.value)}
                    required
                />

                <FormHelperText>Click to shorten that url!</FormHelperText>

                <div>
                    <Button sx={{bgcolor: "#4E3D42", color: "#E3DBDB"}} type="submit" variant="contained">Shorten It!</Button>
                    {error && (
                        <p>{error}</p>
                    )}
                </div>
            </form>
        </div>
    );
}