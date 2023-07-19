'use client';
import LoadingButton from '@/shared/components/LoadingButton/LoadingButton';
import { useCurrentUser } from '@/shared/hooks/useCurrentUser';
import { helpService } from '@/shared/services/help/HelpService';
import { faComments } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Formik } from 'formik';
import { useState } from 'react';
import { toast } from 'react-toastify';
export default function HelpButton() {
  const [loading, setLoading] = useState<boolean>(false);
  const { name, email, _id } = useCurrentUser();

  function dismissModal() {
    // @ts-ignore
    window.my_modal_5.close();
  }

  function handleShowModal() {
    // @ts-ignore
    window.my_modal_5.showModal();
  }

  function handleSendMessage(message: string) {
    setLoading(true);
    helpService
      .sendMessage(name, message, email, _id)
      .then(() =>
        toast.success('Mensagem enviada, entraremos em contato em breve.', {
          className: 'text-sm',
        })
      )
      .catch(() =>
        toast.error('Ocorreu um erro, por favor tente novamente.', {
          className: 'text-sm',
        })
      )
      .finally(() => {
        dismissModal();
        setLoading(false);
      });
  }

  return (
    <>
      <button
        className={
          'btn btn-primary btn-circle absolute z-50 bottom-5 right-5  md:bottom-8 md:right-8 lg:bottom-10 lg:right-10 xl:btn-lg'
        }
        // @ts-ignore
        onClick={handleShowModal}
      >
        <FontAwesomeIcon icon={faComments} />
      </button>

      <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
        <form method="dialog" className="modal-box prose">
          <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
            ✕
          </button>

          <h2 className="text-center mt-4">Suporte</h2>
          <p>
            Gostaria de enviar um ticket para o suporte? escreva sua mensagem
            abaixo:
          </p>

          <Formik
            initialValues={{ message: '' }}
            onSubmit={({ message }) => handleSendMessage(message)}
          >
            {({ values, handleChange, handleBlur, handleSubmit }) => (
              <>
                <textarea
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.message}
                  name="message"
                  className="resize-none textarea textarea-bordered w-full md:textarea-md h-44"
                  placeholder="Digite sua mensagem aqui"
                ></textarea>
                <div className="modal-action">
                  <LoadingButton
                    loading={loading}
                    className="btn btn-primary"
                    type="button"
                    onClick={handleSubmit}
                  >
                    Enviar mensagem
                  </LoadingButton>
                </div>
              </>
            )}
          </Formik>
        </form>
        <form method="dialog" className="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
}
