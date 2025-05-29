const renderModalOptions = ({ vectorOptions, type, $PROFESSIONAL_CONTAINER }: { vectorOptions: string[], type:string, $PROFESSIONAL_CONTAINER: HTMLDivElement | null }): HTMLDivElement | null => {
    
    if(!$PROFESSIONAL_CONTAINER) return null;
    
    $PROFESSIONAL_CONTAINER!.innerHTML = ''; //LIMIPIAR ANTES
    const $FRAGMENT: DocumentFragment = document.createDocumentFragment();
    vectorOptions.forEach((el, index) => {
        const $DIV_SERVICE: HTMLDivElement = document.createElement('div');
        const $INPUT_CHECK: HTMLInputElement = document.createElement('input');
        const $LABEL_CHECK: HTMLLabelElement = document.createElement('label');

        $DIV_SERVICE.classList.add(`${type}`);

        $INPUT_CHECK.type = 'checkbox';
        $INPUT_CHECK.name = `${type}${index + 1}`;
        $INPUT_CHECK.classList.add(`${type}__input`);

        $LABEL_CHECK.classList.add(`${type}__label`);
        $LABEL_CHECK.textContent = el;

        $DIV_SERVICE.append($INPUT_CHECK, $LABEL_CHECK);
        $FRAGMENT.appendChild($DIV_SERVICE);
    });

    $PROFESSIONAL_CONTAINER?.append($FRAGMENT);

    return $PROFESSIONAL_CONTAINER;
}

export default renderModalOptions;