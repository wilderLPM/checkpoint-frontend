import { useQuery } from "@apollo/client";
import { queryCountry } from "../api/queryCountry";
import { useParams } from "react-router-dom";

export function CountryDetail() {
    const { code } = useParams<{ code: string }>();
    const { data, loading } = useQuery(queryCountry, {
        variables: { code: code },
    });

    if (loading) return <p>Loading...</p>;
    if (!data?.country) return <p>Pays introuvable.</p>;

    const c = data.country;

    return (
        <div>
            <h2>{c.name} {c.emoji}</h2>
            <p>Code : {c.code}</p>
            <p>Continent : {c.continent.name}</p>
        </div>
    );
}