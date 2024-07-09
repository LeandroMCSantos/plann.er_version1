import React, { FormEvent, useState } from 'react';
import { MapPin, Calendar, ArrowRight, UserRoundPlus, Settings2, X, AtSign, Plus } from 'lucide-react';

function App() {
  const [isGuestsInputOpen, setIsGuestsInputOpen] = useState(false);
  const [isGuestsModalOpen, setIsGuestsModalOpen] = useState(false);
  const [emailsToInvite, setEmailsToInvite] = useState([
    'leandro@rocketseat.com.br'
  ]);
  const [newEmail, setNewEmail] = useState('');

  function openGuestsInput() {
    setIsGuestsInputOpen(true);
  }

  function closeGuestsInput() {
    setIsGuestsInputOpen(false);
  }

  function openGuestsModal() {
    setIsGuestsModalOpen(true);
  }

  function closeGuestsModal() {
    setIsGuestsModalOpen(false);
  }

  function addNewEmailToInvite(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const email = data.get('email')?.toString();

    if (!email) {
      return;
    }

    setEmailsToInvite([
      ...emailsToInvite,
      email
    ]);
    setNewEmail(''); 
  }

  function removeEmail(email: string) {
    setEmailsToInvite(emailsToInvite.filter(e => e !== email));
  }

  return (
    <div className="h-screen flex items-center justify-center bg-pattern bg-no-repeat bg-center">
      <div className="max-w-3xl w-full px-6 text-center space-y-10">
        <div className='flex flex-col items-center gap-3'>
          <img src="/logo.svg" alt="plann.er" />
          <p className="text-zinc-300 text-lg">Convide seus amigos e planeje sua próxima viagem!</p>
        </div>

        <div className="space-y-4">
          <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
            <div className="flex items-center gap-2 flex-1">
              <MapPin className="h-5 w-5 text-zinc-400" />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Para onde você vai?" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none" />
            </div>

            <div className="flex items-center gap-2 flex-1">
              <Calendar className="h-5 w-5 text-zinc-400" />
              <input disabled={isGuestsInputOpen} type="text" placeholder="Quando?" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none" />
            </div>

            <div className='w-px h-6 bg-zinc-800'></div>

            <div className="flex-shrink-0">
              {isGuestsInputOpen ? (
                <button onClick={closeGuestsInput} className="bg-zinc-800 text-zinc-200 rounded-lg px-4 py-2 font-medium flex items-center gap-2 hover:bg-zinc-700">
                  <Settings2 className='h-5 w-5'/>
                  Alterar local/data
                </button>
              ) : (
                <button onClick={openGuestsInput} className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                  Continuar
                  <ArrowRight className='h-5 w-5'/>
                </button>
              )}
            </div>
          </div>

          {isGuestsInputOpen && (
            <div className="h-16 bg-zinc-900 px-4 rounded-xl flex items-center shadow-shape gap-3">
              <button type="button" onClick={openGuestsModal} className="flex items-center gap-2 flex-1">
                <UserRoundPlus className="h-5 w-5 text-zinc-400" />
                <span className='text-zinc-400 text-lg flex-1
                text-left'>Quem estará na viagem?</span>
                <input type='text' placeholder="" className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none"/>
              </button>

              <div className='w-px h-6 bg-zinc-800'></div>

              <div className="flex-shrink-0">
                <button className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                  Confirmar viagem
                  <ArrowRight className='h-5 w-5'/>
                </button>
              </div>
            </div>
          )}
        </div>

        <p className="text-sm text-zinc-500">
          Ao planejar sua viagem pelo planner você automaticamente concorda <br />
          <a className="text-zinc-300 underline" href="#">
            com os nossos termos de uso
          </a>{' '}
          e
          <a className="text-zinc-300 underline" href="#">
            política de privacidade.
          </a>
        </p>
      </div>

      {isGuestsModalOpen && (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
          <div className='w-[640px] rounded-xl py-5 px-6 shadow-shape bg-zinc-900 space-y-5'>
            <div className='space-y-2'>
              <div className='flex justify-between items-center'>
                <h2 className='text-lg font-semibold text-zinc-400'>Selecionar convidados</h2>
                <button onClick={closeGuestsModal} className='text-zinc-400'>
                  <X className='h-5 w-5'/>
                </button>
              </div>
              <p className='text-sm text-zinc-400 mt-4'>
                Os convidados irão receber e-mails para confirmar a participação na viagem.
              </p>
            </div>
            <div className='flex flex-wrap gap-2'>
              {emailsToInvite.map(email => (
                <div key={email} className='py-1.5 px-2.5 rounded-md bg-zinc-800 flex items-center gap-2'>
                  <span className='text-zinc-300'>{email}</span>
                  <button type='button' onClick={() => removeEmail(email)}>
                    <X className='h-4 w-4 text-zinc-400' />
                  </button>
                </div>
              ))}
            </div>
            <div className='flex flex-wrap gap-2'>
              <form onSubmit={addNewEmailToInvite} className='flex items-center p-2.5 bg-zinc-950 border border-zinc-800 rounded-lg w-full'>
                <AtSign className='text-zinc-400 size-5' />
                <input 
                  type="email" 
                  name='email' 
                  placeholder="Digite o e-mail do convidado" 
                  className="bg-transparent text-lg placeholder-zinc-400 flex-1 outline-none ml-2" 
                  value={newEmail} 
                  onChange={(e) => setNewEmail(e.target.value)} 
                />
                <button type='submit' className="bg-lime-300 text-lime-950 rounded-lg px-5 py-2 font-medium flex items-center gap-2 hover:bg-lime-400">
                  Convidar
                  <Plus className='h-5 w-5' />
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
