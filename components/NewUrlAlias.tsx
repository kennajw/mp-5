"use client";
import { useState } from "react";
import { Textarea } from "@mui/joy";
import { Button, FormHelperText, TextField } from "@mui/material";
import { createNewAlias } from "../lib/createNewAlias";

export default function NewUrlAlias() {
    const [alias, setAlias] = useState("");
    const [url, setUrl] = useState("");
    const [short, setShort] = useState("");
    const [error, setError] = useState("");

    return (
        <div>
            <form 
                onSubmit={async (e) => {
                    e.preventDefault();

                    const res = await createNewAlias(url, alias);
                    if (res.response === "false") {
                        setError("Oh no! Something didn't work!");
                    }
                }}
            >
                <TextField 
                    placeholder="url"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    required
                />
                <TextField 
                    placeholder="alias"
                    value={alias}
                    onChange={(e) => setAlias(e.target.value)}
                    required
                />

                <div>
                    <Button>shorten it!</Button>
                    {error && (
                        <p>{error}</p>
                    )}
                </div>
            </form>
        </div>
    );
}