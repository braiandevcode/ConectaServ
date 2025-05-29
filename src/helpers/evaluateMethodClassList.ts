const evaluateMethodClassList = ({ element, method, newClass, currentClass }: { element: HTMLElement | null, method: string, newClass?: string, currentClass?: string }): void | null => {
    switch (method.toLowerCase()) {
        case 'add': {
            if (element && newClass) {
                element.classList.add(newClass)
                break;
            }
        }
        case 'replace': {
            if (element && currentClass && newClass) {
                element.classList.replace(currentClass, newClass)
                break;
            }
        }
        case 'remove': {
            if (element && currentClass) {
                element.classList.remove(currentClass)
                break;
            }
        }
        case 'toggle': {
            if (element && currentClass) {
                element.classList.toggle(currentClass)
                break;
            }
        }
        default: {
            return null;
        }
    }
}

export default evaluateMethodClassList;