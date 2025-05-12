import { useMutation } from "@apollo/client";
import { useState } from "react";
import { mutationAddCountry } from "../api/mutationAddCountry";
import "./AddCountry.css"
import { queryCountries } from "../api/queryCountries";

export default function AddCountry() {
    const [name, setName] = useState("");
    const [emoji, setEmoji] = useState("");
    const [code, setCode] = useState("");

    const [error, setError] = useState<Record<string, string[]>>({});
    const [addCountry] = useMutation(mutationAddCountry, {
        refetchQueries: [{ query: queryCountries }]
    });

    const validateName = (name: string): string[] => {
        const errors: string[] = [];
        if (name.length < 2) {
            errors.push("Name must be at least 2 characters long.");
        }
        if (name.length > 50) {
            errors.push("Name must be at most 50 characters long.");
        }
        return errors;
    };

    const validateEmoji = (emoji: string): string[] => {
        const errors: string[] = [];
        if (emoji.length < 2) {
            errors.push("Emoji must be at least 2 characters long.");
        }
        if (emoji.length > 4) {
            errors.push("Emoji must be at most 4 characters long.");
        }
        return errors;
    };

    const validateCode = (code: string): string[] => {
        const errors: string[] = [];
        if (code.length < 2) {
            errors.push("Code must be at least 2 characters long.");
        }
        if (code.length > 3) {
            errors.push("Code must be at most 3 characters long.");
        }
        return errors;
    };

    const formatErrors = (errors: string[]) => {
        if (errors.length === 0) return "";
        if (errors.length === 1) return errors[0];
        const lastError = errors.pop();
        return `${errors.join(", ")} et ${lastError}.`;
    };

    const validateCreateForm = (): boolean => {
        const nameErrors = validateName(name);
        const emojiErrors = validateEmoji(emoji);
        const codeErrors = validateCode(code);

        setError({
            name: nameErrors,
            emoji: emojiErrors,
            code: codeErrors,
        });

        // Retourne true si TOUT est valide
        return [nameErrors, emojiErrors, codeErrors].every((errors) => errors.length === 0);
    };

    async function doSubmit() {
        if (!validateCreateForm()) {
            console.error("Validation failed");
            return;
        }
        try {
            await addCountry({
                variables: {
                    data: {
                        name: name,
                        emoji: emoji,
                        code: code
                    },
                },
            });
        } catch (error) {
            console.error("Error adding country:", error);
        } finally {
            setName("");
            setEmoji("");
            setCode("");
        }
    }

    return (
        <form id="countryForm" onSubmit={(e) => {
            e.preventDefault();
            doSubmit();
        }}>
            <div>
                <label htmlFor="name">Name</label>
                <input type="text" name="name" id="name" value={name} onChange={(e) => setName(e.target.value)} />
                {error.name && (
                    <p className="error">{formatErrors(error.name)}</p>
                )}
            </div>
            <div>
                <label htmlFor="emoji">Emoji</label>
                <input type="text" name="emoji" id="emoji" value={emoji} onChange={(e) => setEmoji(e.target.value)} />
                {error.emoji && (
                    <p className="error">{formatErrors(error.emoji)}</p>
                )}
            </div>
            <div>
                <label htmlFor="code">Code</label>
                <input type="text" name="code" id="code" value={code} onChange={(e) => setCode(e.target.value)} />
                {error.code && (
                    <p className="error">{formatErrors(error.code)}</p>
                )}
            </div>
            <button type="submit">Add</button>
        </form>
    );
}