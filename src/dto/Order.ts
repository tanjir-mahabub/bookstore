export interface OrderDTO {
    userId: number,
    cart: { id: number; quantity: number }[], 
    totalPrice: number    
}