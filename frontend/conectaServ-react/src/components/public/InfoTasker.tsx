import "./InfoTasker.css";

export default function InfoTasker(){
    return(
        
        <main className="profile">

    <div className="profile__header">
      <div className="profile__info">
        <div className="profile__avatar">
            <img src="../images/profile-pic.jpg" alt="avatar"/>
        </div>
        <div>
          <h2>Nombre</h2>
          <div className="profile__rating">★★★★☆</div>
        </div>
      </div>
      <button className="btn">Enviar Mensaje</button>
    </div>

    <section className="profile__section">
      <h3>Plomería - Gas - Electricidad</h3>
      <p className="profile__price">Costo de visita para presupuesto: $3.000</p>
    </section>

    <section className="profile__section">
      <h3>Descripción</h3>
      <p className="profile__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut.</p>
      <p className="profile__text">Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis. Aliquam erat volutpat.</p>
    </section>

    <section className="profile__section">
      <h3>Fotos</h3>
      <div className="gallery">
        <div className="gallery__item">
            <img src="" alt=""/>
        </div>
        <div className="gallery__item">
            <img src="" alt=""/>
        </div>
      </div>
    </section>

    <section className="profile__section">
      <h3>Valoraciones</h3>
      <div className="review">
        <h4 className="review__user">Julia</h4>
        <div className="review__rating">★★★★☆</div>
        <p className="review__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla vitae elit libero, a pharetra augue.</p>
      </div>
      <div className="review">
        <h4 className="review__user">Pepe</h4>
        <div className="review__rating">★★★★☆</div>
        <p className="review__text">Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
      </div>
    </section>
    
  </main>
    )
}