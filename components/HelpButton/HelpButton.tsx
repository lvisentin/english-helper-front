import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faComments, faXmark, faCircleInfo} from '@fortawesome/free-solid-svg-icons'

const initial = [ 'opacity-100', 'scale-100', 'translate-y-0', 'ease-out', 'duration-300']
const final = [ 'opacity-0', 'scale-95', 'translate-y-2', 'pointer-events-none', 'ease-in', 'duration-200']
const ALERT_ID = "#alert-01"
export default function HelpButton() {
  function handleDismissAlert() {

    const alertClassList = document.querySelector(ALERT_ID)?.classList

    initial.forEach(cl => alertClassList?.remove(cl))
    final.forEach(cl => alertClassList?.add(cl))
  }
  function showAlert() {
    const alertClassList = document.querySelector(ALERT_ID)?.classList

    final.forEach(cl => alertClassList?.remove(cl))
    initial.forEach(cl => alertClassList?.add(cl))

    setTimeout(() => handleDismissAlert(), 5000)
  }
  function handleShowModal() {
    // @ts-ignore
    window.my_modal_5.showModal()
  }
  function handleSendMessage() {
    showAlert()
  }

  return (
    <>
      <button
        className={'btn btn-primary btn-circle absolute z-50 bottom-5 right-5  md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 xl:btn-lg'}
        // @ts-ignore
        onClick={handleShowModal}>
        <FontAwesomeIcon icon={faComments}/>
      </button>

      {/* Open the modal using ID.showModal() method */}
      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box prose">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>

          <h2 className="text-center mt-4">Suporte</h2>
          <p >Gostaria de enviar um ticket para o suporte? escreva sua mensagem abaixo:</p>

          <textarea className="resize-none textarea textarea-bordered w-full md:textarea-md h-44" placeholder="Digite sua mensagem aqui"></textarea>

          <div className="modal-action">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-primary" onClick={handleSendMessage}>Enviar mensagem</button>
          </div>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>

      <div
        id={"alert-01"}
        className="transition transform fixed z-100 bottom-0 inset-x-0 pb-2 sm:pb-5 opacity-0 scale-95 translate-y-2 pointer-events-none ease-in duration-200">
        <div className="max-w-screen-xl mx-auto px-2 sm:px-4">
          <div className="alert bg-green-300">
            <FontAwesomeIcon icon={faCircleInfo} size={'lg'}/>
            <div>
              <h3 className="font-bold">Mensagem enviada</h3>
              <div className="text-xs">Entraremos em contato em breve.</div>
            </div>
            <button className={'btn btn-ghost'} onClick={handleDismissAlert}>
              <FontAwesomeIcon icon={faXmark} size={'lg'}/>
            </button>
          </div>
        </div>
      </div>
    </>
  );

}
