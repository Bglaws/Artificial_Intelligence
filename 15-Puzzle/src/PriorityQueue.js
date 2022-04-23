export class PriorityQueue {
    
    constructor() {
        this.elements = []
    }

    enqueue(element) {

        for (let i = 0; i < this.elements.length; i++) {
            // if current element in queue is less than element to be inserted, then 
            if (element.priority > this.elements[i].priority) {
                this.elements.splice(i, 0, element)
                return
            }
        }
        // if element.priority is not greater than any elements in the queue, add it to the end
        this.elements.push(element)
    }

    dequeue() {
        const item = this.elements.pop()
        return item
    }

    get length() {
        return this.elements.length
    }

    get isEmpty() {
        return this.elements.length === 0
    }
}
