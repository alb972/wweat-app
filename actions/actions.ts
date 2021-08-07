import { Restaurant } from "../components/models/Restaurant";

export function updateRestos(restos: Restaurant[]) {
    return {
        type: "UPDATE",
        value: restos
    };
}