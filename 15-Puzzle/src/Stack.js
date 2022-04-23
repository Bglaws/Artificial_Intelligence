export class Stack {
    constructor() {
        this.elements = []
        this.head = 0
    }

    push(element) {
        this.elements[this.head] = element
        this.head++
    }

    pop() {
        const item = this.elements[this.head-1]
        delete this.elements[this.head-1]
        this.head--
        return item
    }

    peek() {
        return this.elements[this.head-1]
    }

    get height() {
        return this.head
    }

    get isEmpty() {
        return this.length === 0
    }
}
