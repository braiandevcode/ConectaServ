import './Loader.css';
const Loader = () => {
  const length: number = 12;
  const lengthElements: number[] = [...new Array(length)];
  return (
    <div className='loaderContainer position-fixed inset-0 c-flex c-flex-items-center w-min-full'>
      <div className='lds-spinner c-flex centered'>
        {lengthElements.map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
};

export default Loader;
