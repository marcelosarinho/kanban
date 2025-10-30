import Button from "@components/button/Button";
import Modal from "@components/modal/Modal";
import ModalBody from "@components/modal/ModalBody";
import ModalClose from "@components/modal/ModalClose";
import ModalFooter from "@components/modal/ModalFooter";
import ModalHeader from "@components/modal/ModalHeader";
import ModalTitle from "@components/modal/ModalTitle";
import Textarea from "@components/Textarea";
import { ChatCenteredTextIcon, CheckCircleIcon, EnvelopeIcon, HouseIcon, ShieldIcon, CheckIcon, XIcon, SmileyIcon, SmileyMehIcon, SmileySadIcon } from "@phosphor-icons/react";
import { closeModal, openModal } from "@utils/modal";
import { useNavigate } from "react-router";

export default function Goodbye() {
  const navigate = useNavigate();

  return (
    <>
      <Modal id="goodbye">
        <ModalHeader>
          <ModalTitle>Feedback</ModalTitle>
          <ModalClose onClick={() => closeModal('goodbye')} />
        </ModalHeader>
        <ModalBody>
          <form className="mt-3">
            <fieldset className="flex flex-col gap-4">
              <div>
                <p>Qual foi sua experiência ao utilizar o Kanban?</p>
                <div className="flex mt-2 gap-3">
                  <div className="dark:bg-slate-600 bg-slate-200 group hover:bg-success/50 hover:cursor-pointer transition-colors p-1 rounded-full">
                    <SmileyIcon className="text-3xl" />
                  </div>
                  <div className="dark:bg-slate-600 bg-slate-200 group hover:bg-warning/50 hover:cursor-pointer transition-colors p-1 rounded-full">
                    <SmileyMehIcon className="text-3xl" />
                  </div>
                  <div className="dark:bg-slate-600 bg-slate-200 group hover:bg-danger/50 hover:cursor-pointer transition-colors p-1 rounded-full">
                    <SmileySadIcon className="text-3xl" />
                  </div>
                </div>
              </div>

              <div>
                <p>Qual nota você daria para o Kanban? <span className="text-xs text-gray-500">(opcional)</span></p>
                <div className="flex mt-2 gap-3">
                  {Array.from({ length: 5 }, (_, index) => index + 1).map((index) => (
                    <div key={index} className="dark:bg-slate-600 bg-slate-200 text-lg size-9 rounded-full flex items-center justify-center hover:bg-primary/50 hover:cursor-pointer transition-colors">
                      {index}
                    </div>
                  ))}
                </div>
              </div>

              <label htmlFor="feedback" className="w-fit">Feedback <span className="text-xs text-gray-500">(opcional)</span></label>
              <Textarea id="feedback" placeholder="Gostaria de sugerir alguma funcionalidade ou correção?" rows={5} />
            </fieldset>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button onClick={() => closeModal('goodbye')} variant="primary" icon={CheckIcon} iconClassName="text-lg">
            Enviar
          </Button>
          <Button onClick={() => closeModal('goodbye')} variant="outline-primary" icon={XIcon} iconClassName="text-lg">
            Cancelar
          </Button>
        </ModalFooter>
      </Modal>

      <main className="h-full sm:h-screen flex flex-col items-center justify-center">
        <header className="mb-6 flex flex-col justify-center items-center w-full xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm max-w-sm mt-3 md:mt-0">
          <div className="mt-auto bg-success/20 rounded-full p-2.5 w-fit">
            <CheckCircleIcon className="text-4xl text-success" />
          </div>
          <h1 className="text-center text-4xl font-bold mt-6 dark:text-gray-200">Sua conta foi apagada</h1>
          <h6 className="text-center text-lg text-gray-500 mt-2 dark:text-gray-400">
            Lamentamos sua saída. Sua conta e todos os dados associados foram permanentemente removidos de nossos sistemas.
          </h6>
        </header>
        
        <section className="border border-gray-300 rounded-xl bg-neutral-50 p-6 dark:border-slate-600 dark:bg-slate-900 w-full xl:max-w-xl lg:max-w-lg md:max-w-md sm:max-w-sm max-w-sm shadow-lg">
          <div className="flex mb-5 gap-3">
            <div className="bg-success/20 h-fit p-2 rounded-xl">
              <ShieldIcon className="text-2xl text-success" />
            </div>
            <div>
              <h3 className="font-medium text-lg dark:text-gray-200">Seus dados estão seguros</h3>
              <p className="text-gray-600 dark:text-gray-500">Todas as suas informações pessoais, preferências, projetos e tarefas foram removidos de nosso sistema.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <div className="bg-success/20 h-fit p-2 rounded-xl">
              <EnvelopeIcon className="text-2xl text-success" />
            </div>
            <div>
              <h3 className="font-medium text-lg dark:text-gray-200">Você pode retornar em qualquer momento</h3>
              <p className="text-gray-600 dark:text-gray-500">Se você mudou de ideia ou simplesmente decidiu parar de usar o Kanban, não se preocupe! Você pode retornar em qualquer momento.</p>
            </div>
          </div>

          <hr className="mt-6 text-gray-300 dark:text-slate-600"/>

          <p className="mt-3 text-sm text-gray-600 dark:text-gray-500">Gostaria de dar sua avaliação? Envie-nos um feedback para ajudar a melhorar o Kanban!</p>

          <div className="flex gap-3 mt-3 justify-center">
            <Button
              onClick={() => navigate('/')}
              icon={HouseIcon}
              iconClassName="text-xl"
            >
              Voltar para página inicial
            </Button>

            <Button
              variant="outline-primary"
              onClick={() => openModal('goodbye')}
              icon={ChatCenteredTextIcon}
              iconClassName="text-xl"
            >
              Dar feedback
            </Button>
          </div>
        </section>

        <footer className="text-center mt-6 mb-3 text-sm text-gray-600 dark:text-gray-500 md:mb-0">Obrigado por usar o Kanban!</footer>
      </main>
    </>
  )
}