import React from 'react';

export default function IndividualDetails(props) {
  console.log(props);
  const { detailsData } = props;

  return (
    <div>
      <div
        className="modal fade "
        id="staticBackdrop"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
        tabindex="-1"
        aria-labelledby="staticBackdropLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="staticBackdropLabel">
                Individual Data Details
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-dialog modal-dialog-scrollable">
              <div className="card" style={{ width: '18rem' }}>
                {console.log(detailsData.image)}
                <img
                  src={`http://localhost:5000/uploads/${detailsData.image}`}
                  className="card-img-top"
                  alt="..."
                />
                <div className="card-body">
                  <h5 className="card-title">{detailsData.name}</h5>
                  <h6 className="card-title">{detailsData.email}</h6>
                  <p className="card-text">{detailsData.number}</p>
                </div>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
