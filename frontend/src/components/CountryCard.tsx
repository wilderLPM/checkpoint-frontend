interface Country {
    name: string;
    emoji: string;
    code: string
}

import { Link } from "react-router-dom";
import "./CountryCard.css"

export default function CountryCard({ country }: { country: Country }) {
    return (
        <Link to={`/country-detail/${country.code}`} state={country}>
            <div className="country-card">
                <p>{country.name}</p>
                <p>{country.emoji}</p>
            </div>
        </Link>
    );
}