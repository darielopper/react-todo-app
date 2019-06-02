const initClassHandler = () => {
    Array.prototype.toClass = function () {
        return this.join(' ')
    }

    Array.prototype.remove = function (element) {
        const found = this.find(item => item.toString().toLowerCase() === element.toLowerCase())
        if (found) {
            this.splice(this.indexOf(found), 1)
        }

        return this
    }

    Array.prototype.replaceClass = function (old, newOne) {
        this.removeClass(old)
        this.push(newOne)

        return this
    }

    Array.prototype.removeClass = function (className) {
        return this.remove(className)
    }

    String.prototype.ucFirst = function () {
        return this.substr(0,1).toUpperCase() + this.substr(1)
    }

    String.prototype.ucWords = function () {
        const separator = this.indexOf(' ') > 0 ? ' ' : '_'
        return this.split(separator).map(part => part.ucFirst()).join(' ')
    }
}

const timeAgoValue = (start) => {
    return Math.ceil((new Date().getTime() - start.getTime()) / 60000) - 1
}

export { initClassHandler, timeAgoValue }