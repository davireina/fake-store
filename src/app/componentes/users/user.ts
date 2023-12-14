export interface User {
    id: number
    username: string
    password: string  
    bag: {
        products: { [id: number ]: number }
    }
}