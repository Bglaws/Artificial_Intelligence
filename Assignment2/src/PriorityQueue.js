export class PriorityQueue {
    constructor() {
        this.elements = []
        this.head = 0
        this.tail = 0
    }

    enqueue(element) {

        for (let i = 0; i < this.elements.length; i++) {
            if (this.elements[i].priority < element.priority) {
                this.elements.splice(i, 0, element)
            }
        }
        if (/** element has the lowest value aka highest priority, put it to the front of the queue*/ true) {

        }
        this.elements[this.tail] = element
        this.tail++
    }

    dequeue() {
        const item = this.elements[this.head]
        delete this.elements[this.head]
        this.head++
        return item
    }

    peek() {
        return this.elements[this.head]
    }

    peekTail() {
        return this.elements[this.tail]
    }

    get length() {
        return this.tail - this.head
    }

    get isEmpty() {
        return this.length === 0
    }
}
