import React, { useState, useEffect } from 'react';
import 'react-datepicker/dist/react-datepicker.css';

import { Paginacion } from '../../Shared/Paginacion';

import {
  getAnimalesPadrinosCalificacion as get
} from '../../../Service/Aminal';

import {
  createComision 
} from '../../../Service/Comision';

import './Reportes.scss';

import { ReporteComisionConfirmacion } from './ReporteComisionConfirmacion';

export const ReporteComision = ({
    setdataMessage, 
    setError, 
    selectedFundation }) => {

  const [isLoading, setLoading] = useState();
  const [busqueda, setBusqueda] = useState();
  const [animales, setAnimales] = useState();
  const [animalesAll, setAnimalesAll] = useState();
  const [page, setPage] = useState(1);
  const [totalRows, setTotalRows] = useState(0);
  const [total, setTotal] = useState(0);
  const [totalComision, setTotalComision] = useState(0);
  const [isMostarConfirmacion, setMostarConfirmacion] = useState();


  useEffect(() => {   
    getAnimales(1);
    
  }, []);

  useEffect(() => {
    getAnimales(1);
  }, []);

  const filtro = (buscar) => {
    const filtrados= animalesAll.filter(animal => 
      animal.nombre.toUpperCase().includes(buscar.toUpperCase()));   
    setAnimales(filtrados);
    setTotalRows(filtrados.length);
  };

  const getAnimales = (p) => {
    setPage(p);
    setLoading(true);
    get(
      {
        q: '',
        page: p,
      },
      {
        apiUrl: window?.userSigned?.apiUrl,
        token: window?.userSigned?.token,
        fundacionId: selectedFundation.id,
      }
    )
      .then((data) => {
        setLoading(false);
        setAnimales(data.animales);
        setAnimalesAll(data.animales);
        const sumaTotal = data.animales.map(item => 
            item.total).reduce((prev, curr) => 
              prev + curr, 0);
        setTotal(sumaTotal);
        const sumaComision = data.animales.map(item => 
          item.montocomision).reduce((prev, curr) => 
            prev + curr, 0);
        setTotal(sumaTotal);
        setTotalComision(sumaComision);
        setTotalRows(data.animales.length);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message);
      });
  }; 

  const guardar = () => {
    console.log(selectedFundation);
    console.log(animalesAll);
    console.log(totalComision);
    console.log(total);
    const comision={
      fundacionId: selectedFundation.id,
      total_comision: totalComision,
      total_pago: total,      
    };

    createComision(comision, {
      apiUrl: window?.userSigned?.apiUrl,
      token: window?.userSigned?.token,
    })      
    .then(() => {
      setLoading(false);       
      setdataMessage({
        title: 'Comision',
        message: 'Comision Creada exitoso',
      });
    })
    .catch((err) => {
      console.log('Error: ', err);
      setLoading(false);
      setError(err.message || 'Error del servidor');
    });
};

   return (
    <div className="fund-fund-animals-admin-repor1">
      <div className="fund-title fund-flx fund-txt-32">
       
          Reporte de {selectedFundation.nombre}    
          <button
          className="fund-btn"
          onClick={() => {
            setMostarConfirmacion(true);     
          }}
        >
          Generar
        </button>
        </div>
        
      <div className="fund-form-field">
        <div className="fund-title fund-flx fund-txt-24">
          <div className="titulo-vista">
            Total a Transferir $  {total.toFixed(2)}            
          </div>             
        </div>
        <div className="fund-title fund-flx fund-txt-24">
          <div className="titulo-vista">
            Comisión $  {totalComision.toFixed(2)}            
          </div>             
        </div>
      </div>

      <div className="fund-form-field">
        <span className="fund-txt-12">Buscar</span>
        <input
          value={busqueda || ''}
          type="text"
          maxLength={50}
          onChange={(e) => {
            setBusqueda(e.target.value);
            filtro(e.target.value);
          }}
        />
      </div>

      <div className="fund-table-content fund-shadow-1">     
        <div className="fund-table fund-shadow-1">
          <div className="fund-table-row-header">            
          <div className="fund-table-cell txt-12-white">#</div>
            <div className="fund-table-cell txt-12-white">ANIMAL</div>
            <div className="fund-table-cell txt-12-white">ESPECIE</div>
            <div className="fund-table-cell txt-12-white">PADRINO</div>
            <div className="fund-table-cell txt-12-white">MANADA</div>
            <div className="fund-table-cell txt-12-white">MONTO</div>
            <div className="fund-table-cell txt-12-white">COMISION</div>
            <div className="fund-table-cell txt-12-white">SUBTOTAL</div>
            <div className="fund-table-cell txt-12-white">CALIFICACION</div>
            <div className="fund-table-cell txt-12-white">TOTAL A PAGAR</div>
          </div>
          {!isLoading &&
            animales?.map((animal, idx) => {
              return (
                <div key={idx} className="fund-table-row">  
                 <div className="fund-table-cell fund-txt-14">
                    {idx+1}
                  </div>                
                  <div className="fund-table-cell fund-txt-14">
                    {animal.nombre}                    
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {animal.especie}                    
                  </div>
                  <div className="fund-table-cell fund-txt-14">                    
                    {animal.padrinoNombre+' '+animal.padrinoApellido}
                  </div>
                  <div className="fund-table-cell fund-txt-14">
                    {animal.manadaNombre}
                  </div> 
                  <div className="fund-table-cell fund-txt-14">
                    $ {animal.monto}
                  </div>                   
                  <div className="fund-table-cell fund-txt-14">
                    $ {animal.montocomision.toFixed(2)}
                  </div> 
                  <div className="fund-table-cell fund-txt-14">
                    $ {animal.subtotal.toFixed(2)}
                  </div> 
                  <div className="fund-table-cell fund-txt-14">
                     {animal.calificacion}
                  </div> 
                  <div className="fund-table-cell fund-txt-14">
                     $ {animal.total.toFixed(2)}
                  </div>
                </div>
              );
            })}
          {isLoading && (
            <div className="fund-loading">
              <i className="fad fa-spinner fund-spin" />
            </div>
          )}
          {!isLoading && animales?.length == 0 && (
            <div className="fund-empty fund-txt-14 fund-flx">
              <img
                className="fund-img-empty"
                src="https://img.freepik.com/free-vector/no-data-concept-illustration_203587-28.jpg?size=338&amp;ext=jpg"
              />
              No hay Padrinos actualmente disponibles
            </div>
          )}
        </div>
      </div>
      {!isLoading && animales?.length != 0 && (
        <Paginacion
          data={{
            totalRows: totalRows,
            rowsPerPage: 15,
            selectedPage: page,
          }}
        load={({ page: p } ) => 
              getAnimales(p)}
        />
      )} 

      {isMostarConfirmacion &&(
        <ReporteComisionConfirmacion
          onClose={() => {
            setMostarConfirmacion();           
          }}
          guardar={guardar}
        />
      )}      
    </div>
  );
};
