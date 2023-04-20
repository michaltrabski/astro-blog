interface ModalProps {
  openModalText: string;
  openModalIcon: string;
  modalTitle: string;
}
const Modal = (props: ModalProps) => {
  const { openModalText, openModalIcon, modalTitle } = props;

  return (
    <>
      <div>
        <span
          data-bs-toggle="modal"
          data-bs-target="#exampleModal"
          // data-bs-whatever="@mdo"
        >
          {openModalText} <i className={openModalIcon}></i>
        </span>
      </div>

      {/* <button
        type="button"
        className="btn btn-primary"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
        data-bs-whatever="@mdo"
      >
        Open modal for @mdo
      </button> */}

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex={-1}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {modalTitle}
              </h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div className="modal-body text-start">
              <form>
                {/* <div className="mb-3">
                  <label htmlFor="questionId" className="col-form-label">
                   questionId
                  </label>
                  <input type="text" className="form-control" id="questionId" />
                </div> */}
                <div className="mb-3">
                  <label htmlFor="message-text" className="col-form-label">
                    Napisz co się stało:
                  </label>
                  <textarea className="form-control" id="message-text"></textarea>
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                Zamknij
              </button>
              <button type="button" className="btn btn-primary" data-bs-dismiss="modal">
                Wyślij
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Modal;
