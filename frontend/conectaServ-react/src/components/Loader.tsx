const Loader = () => {
  return (
    <div className="loaderContainer  position-fixed inset-0 c-flex c-flex-items-center w-min-full">
      <div className='lds-spinner c-flex centered'>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    </div>
  );
};

export default Loader;
