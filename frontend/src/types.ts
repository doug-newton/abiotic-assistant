export type ItemData = {
    item: string
    imageSrc: string
    quantity: number
}

export type ItemTransform = {
    input: ItemData[],
    transform: string,
    output: ItemData[]
}