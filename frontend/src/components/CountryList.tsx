import { useQuery } from "@apollo/client";
import { queryCountries } from "../api/queryCountries";
import CountryCard from "./CountryCard";
import "./CountryList.css";
export default function CountryList() {

    const { data, loading, error } = useQuery(queryCountries);
    return (
        <div id="country-list">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error.message}</p>}
            {data && (
                <ul>
                    {data.countries.map((country) => (
                        <li key={country.id}>
                            <CountryCard country={country} />
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}