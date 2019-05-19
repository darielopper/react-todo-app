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
}

export { initClassHandler }