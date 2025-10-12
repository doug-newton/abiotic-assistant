export type ItemData = {
    item: string
    quantity: number
}

export type ItemTransform = {
    input: ItemData[],
    transform: string,
    output: ItemData[]
}
