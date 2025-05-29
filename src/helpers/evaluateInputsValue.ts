const allInputsFilled = ({ inputs }: { inputs: NodeListOf<HTMLInputElement> }): boolean=>{
    return Array.from(inputs).every(input => input.value !== '');
}

export default allInputsFilled;