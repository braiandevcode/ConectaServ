//  RADIOS DE REINSERT
const stepFourReinsertSelected = ({ e }: { e: Event; }) => {
    const target = e.target as HTMLInputElement;

    if (!target.name || target.name !== 'reinsert') return;

    if (!target.checked) return;

    //NO HACER MAS NADA ACA EL VALOR SE GUARDA DESPUES POR saveDataStep
}

export default stepFourReinsertSelected;