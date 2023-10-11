/* eslint-disable indent */
import React, { useState, useEffect } from 'react';

import './Paginacion.scss';

export const Paginacion = ({ load, data }) => {
  const [pages, setPages] = useState(
    Math.ceil(data.totalRows / data.rowsPerPage)
  );

  useEffect(() => {
    setPages(Math.ceil(data.totalRows / data.rowsPerPage));
  }, [data.totalRows, data.rowsPerPage]);

  const createPages = () => {
    let buttons = [];
    if (pages < 6) {
      for (let i = 1; i <= pages; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => 
load({ page: i })}
            className={
              data.selectedPage === i
                ? 'fund-pagination-btn fund-txt-14 fund-bold'
                : 'fund-pagination-btn fund-txt-14'
            }
          >
            {i}
          </button>
        );
      }
      return buttons;
    }
    let indexes = [];
    switch (data.selectedPage) {
      case 1:
        indexes = [1, 2, '...', pages];
        break;
      case 2:
        indexes = [1, 2, 3, '...', pages];
        break;
      case pages - 2:
        indexes = [1, '...', pages - 2, pages - 1, pages];
        break;
      case pages - 1:
        indexes = [1, '...', pages - 1, pages];
        break;
      case pages:
        indexes = [1, '...', pages - 1, pages];
        break;
      default:
        indexes = [1, '...', data.selectedPage, '...', pages];
        break;
    }
    indexes.map((index, idx) => {
      buttons = [
        ...buttons,
        <button
          key={idx}
          onClick={() => {
            if (!isNaN(index)) {
              load({ page: index });
            }
          }}
          className={
            data.selectedPage === index
              ? 'fund-pagination-btn fund-txt-14 fund-bold'
              : 'fund-pagination-btn fund-txt-14'
          }
          style={isNaN(index) ? { padding: 0 } : {}}
        >
          {index}
        </button>,
      ];
    });

    return buttons;
  };

  const start = (data.selectedPage - 1) * data.rowsPerPage + 1;
  const end = start + data.rowsPerPage - 1;
  return (
    <footer className="fund-footer-pagination">
      <div className="fund-txt-14">
        {data.totalRows != 0 && (
          <div className="shy-txt-14 shy-mh-16">
            {`Mostrando ${start} a ${
              end > data.totalRows ? data.totalRows : end
            } de ${data.totalRows} datos`}
          </div>
        )}
      </div>
      <div className="fund-flx">
        {pages > 1 && data.totalRows != 0 && (
          <div className="fund-mr-16 fund-flx">
            <span
              disabled={data.selectedPage === 1}
              onClick={() => {
                if (data.selectedPage !== 1) {
                  load({ page: 1 });
                }
              }}
              className="fund-pagination-btn"
            >
              <i className="fas fa-angle-double-left fund-pointer" />
            </span>
            <span
              disabled={data.selectedPage === 1}
              onClick={() => {
                if (data.selectedPage > 1) {
                  load({ page: data.selectedPage - 1 });
                }
              }}
              className="fund-pagination-btn"
            >
              <i className="fas fa-angle-left fund-pointer" />
            </span>
            {createPages()}
            <span
              disabled={data.selectedPage === pages - 1}
              onClick={() => {
                if (data.selectedPage <= pages - 1) {
                  load({ page: data.selectedPage + 1 });
                }
              }}
              className="fund-pagination-btn "
            >
              <i className="fas fa-angle-right fund-pointer" />
            </span>
            <span
              disabled={data.selectedPage === pages - 1}
              onClick={() => 
load({ page: pages })}
              className="fund-pagination-btn2"
            >
              <i className="fas fa-angle-double-right fund-pointer" />
            </span>
          </div>
        )}
      </div>
    </footer>
  );
};
