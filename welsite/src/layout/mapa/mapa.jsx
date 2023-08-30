import React, { useEffect, useState } from 'react';
import styles from  './stylemap.module.css'; // Importa el archivo de estilos

import Map2 from './countrymap';
// import mapdata from './mapdata.js'; // Importa los datos del mapa
// import countrymap from './countrymap.js'; // Importa los datos específicos del país

function Mapa() {
  



  return (
    <>

    <div className={styles.map}>

      {/* <h1>Mapa Interactivo de Colombia</h1>
      <ComposableMap projection="geoMercator" projectionConfig={{ scale: 100 }}>
        <ZoomableGroup center={[-1763.3399922623557, -1807.0069274388538]} zoom={9}>

          <Geographies geography={colombiaGeoData}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography key={geo.rsmKey} geography={geo} fill="#FF5533"
                />
                
                ))
              }
          </Geographies>
      </ZoomableGroup>
    </ComposableMap> */}
    <Map2/>
    </div>

     
    </>
    
  );
}

export default Mapa;