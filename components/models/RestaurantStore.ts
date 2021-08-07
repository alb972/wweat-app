import { Restaurant } from "./Restaurant";

export default class RestaurantStore {

    public restos: Restaurant[] = [];
    static i: number = 0;

    static increment(): number {
        return this.i++;
    }

    addResto(title: string): void {
        this.restos = [{
            id: RestaurantStore.increment(),
            title: title,
        }, ...this.restos];
    }

    removeResto(todo: Restaurant): void {
        this.restos = this.restos.filter((toCompare: Restaurant) => {
            return toCompare != todo;
        });
    }

    editTitle(resto: Restaurant, title: string): void {
        this.restos = this.restos.map((toCompare: Restaurant) => {
            return (toCompare == resto) ? { ...resto, title } : resto;
        });
    }

    removeAll(): void {
        this.restos = this.restos.filter((toCompare: Restaurant) => {
            return toCompare != null;
        });
    }

}