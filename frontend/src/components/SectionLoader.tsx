import './SectionLoader.css'; // Mantenemos el mismo archivo CSS

const SectionLoader = () => {
  const length: number = 12;
  const lengthElements: number[] = [...new Array(length)];

  return (
    <div className='sectionLoaderContainer c-flex c-flex-items-center c-flex-justify-center'> 
      <div className='lds-spinner c-flex centered'>
        {lengthElements.map((_, index) => (
          <div key={index}></div>
        ))}
      </div>
    </div>
  );
};

export default SectionLoader;