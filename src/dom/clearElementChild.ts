const clearElementChild = ({ elements }:{ elements: HTMLElement[] | HTMLDivElement[] | HTMLSelectElement[] | NodeListOf<HTMLElement | HTMLSelectElement | HTMLDivElement> | null}): void => {
  elements?.forEach(el => {
    el.innerHTML = '';
  });
}

export default clearElementChild;