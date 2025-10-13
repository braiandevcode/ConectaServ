const ComoFunciona = () => {
  return (
    <>
      <section className='how-works'>
        <div className='container'>
          <h2>Cómo funciona</h2>
          <div className='img-pasos__container'>
            <div className='img-container'></div>
            <div className='pasos'>
              <div className='paso'>
                <i className='fas fa-clipboard-list paso__icono'></i>
                <p>Busca a prestadores por categoría</p>
              </div>
              <div className='paso'>
                <i className='fas fa-user-check paso__icono'></i>
                <p>Elige un trabajador de tu preferencia</p>
              </div>
              <div className='paso'>
                <i className='fas fa-comments-dollar paso__icono'></i>
                <p>Chateá y paga</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
export default ComoFunciona;