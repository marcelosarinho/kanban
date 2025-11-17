import { createFeedback } from "@api/feedback";
import Button from "@components/button/Button";
import Modal from "@components/modal/Modal";
import ModalBody from "@components/modal/ModalBody";
import ModalClose from "@components/modal/ModalClose";
import ModalFooter from "@components/modal/ModalFooter";
import ModalHeader from "@components/modal/ModalHeader";
import ModalTitle from "@components/modal/ModalTitle";
import Textarea from "@components/Textarea";
import type { Experience } from "@custom-types/feedback";
import { zodResolver } from "@hookform/resolvers/zod";
import { ChatCenteredTextIcon, CheckCircleIcon, EnvelopeIcon, HouseIcon, ShieldIcon, CheckIcon, XIcon, SmileyIcon, SmileyMehIcon, SmileySadIcon } from "@phosphor-icons/react";
import { feedbackSchema } from "@schemas/feedback";
import { useMutation } from "@tanstack/react-query";
import { closeModal, openModal } from "@utils/modal";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router";
import type z from "zod";

type Inputs = z.infer<typeof feedbackSchema>;

export default function Goodbye() {
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    watch
  } = useForm<Inputs>({
    resolver: zodResolver(feedbackSchema),
  });

  const [experience, rating] = watch(['experience', 'rating']);

  const feedbackMutation = useMutation({
    mutationFn: createFeedback,
    onSuccess: () => {
      closeModal('goodbye-modal');

      toast.success('Obrigado pelo seu feedback! Redirecionando para a página inicial...');

      setTimeout(() => {
        navigate('/');
      }, 3000);
    },
  });

  const handleExperience = (experience: Experience) => {
    setValue('experience', experience);
  }

  const handleRating = (rating: number) => {
    setValue('rating', rating);
  }

  function onSubmit(data: Inputs) {
    feedbackMutation.mutate(data);
  }

  return (
    <>
      <Toaster
        position='bottom-right'
        toastOptions={{
          success: {
            iconTheme: {
              primary: 'var(--color-success)',
              secondary: 'black',
            }
          },
          error: {
            iconTheme: {
              primary: 'var(--color-danger)',
              secondary: 'white',
            }
          },
          className: 'react-hot-toast',
          duration: 3000,
        }}
      />

      <Modal id="goodbye-modal">
        <ModalHeader>
          <ModalTitle>Feedback</ModalTitle>
          <ModalClose onClick={() => closeModal('goodbye-modal')} />
        </ModalHeader>
        <ModalBody>
          <form id="goodbye" onSubmit={handleSubmit(onSubmit)} className="mt-3">
            <fieldset className="flex flex-col gap-4">
              <div>
                <p>Qual foi sua experiência ao utilizar o Kanban?</p>
                <div className="flex mt-2 gap-3">
                  <div
                    onClick={() => handleExperience('positive')}
                    className={`group hover:cursor-pointer transition-colors p-1 rounded-full ${experience === 'positive' ? 'bg-success text-green-900' : 'dark:bg-slate-600 bg-slate-200 hover:bg-success/50'}`}
                  >
                    <SmileyIcon className="text-3xl" />
                  </div>
                  <div
                    onClick={() => handleExperience('neutral')}
                    className={`group hover:cursor-pointer transition-colors p-1 rounded-full ${experience === 'neutral' ? 'bg-warning text-yellow-900' : 'dark:bg-slate-600 bg-slate-200 hover:bg-warning/50'}`}
                  >
                    <SmileyMehIcon className="text-3xl" />
                  </div>
                  <div
                    onClick={() => handleExperience('negative')}
                    className={`group hover:cursor-pointer transition-colors p-1 rounded-full ${experience === 'negative' ? 'bg-danger text-red-900' : 'dark:bg-slate-600 bg-slate-200 hover:bg-danger/50'}`}
                  >
                    <SmileySadIcon className="text-3xl" />
                  </div>
                </div>
                <p className="mt-2 text-sm text-danger">{errors.experience?.message}</p>
              </div>

              <div>
                <p>Qual nota você daria para o Kanban? <span className="text-xs text-gray-500">(opcional)</span></p>
                <div className="flex mt-2 gap-3">
                  {Array.from({ length: 5 }, (_, index) => index + 1).map((index) => (
                    <div
                      onClick={() => handleRating(index)}
                      key={index}
                      className={`text-lg size-9 rounded-full flex items-center justify-center hover:cursor-pointer transition-colors ${rating === index ? 'bg-primary text-white' : 'dark:bg-slate-600 bg-slate-200 hover:bg-primary/50'}`}
                    >
                      {index}
                    </div>
                  ))}
                </div>
              </div>

              <label htmlFor="feedback" className="w-fit">Feedback <span className="text-xs text-gray-500">(opcional)</span></label>
              <Textarea {...register('feedback')} id="feedback" placeholder="Gostaria de sugerir alguma funcionalidade ou correção?" rows={5} />
            </fieldset>
          </form>
        </ModalBody>
        <ModalFooter>
          <Button form="goodbye" type="submit" variant="primary" icon={CheckIcon} iconClassName="text-lg">
            Enviar
          </Button>
          <Button onClick={() => closeModal('goodbye-modal')} variant="outline-primary" icon={XIcon} iconClassName="text-lg">
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
              onClick={() => openModal('goodbye-modal')}
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