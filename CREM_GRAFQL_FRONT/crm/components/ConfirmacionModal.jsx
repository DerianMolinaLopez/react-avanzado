"use client";
import { useState } from 'react';
import { Button, Dialog, DialogPanel, DialogTitle, DialogDescription } from '@headlessui/react';
import ContraseñaForm from './contraseñaForm';
import { toast } from 'react-toastify';
import { confirmarPassword, eliminarCliente, obtenerClientesUsuario } from '@/queries';
import { useMutation } from '@apollo/client';

export default function ConfirmacionModal({ modal, setModal, cliente }) {
  const [confirmar] = useMutation(confirmarPassword);
  const [eliminar] = useMutation(eliminarCliente, {
    update(cache, { data: { eliminarCliente } }) {
      try {
        const { obtenerClientesVendedor } = cache.readQuery({ query: obtenerClientesUsuario }) || {};
        if (obtenerClientesVendedor) {
          cache.writeQuery({
            query: obtenerClientesUsuario,
            data: {
              obtenerClientesVendedor: obtenerClientesVendedor.filter(c => c.id !== eliminarCliente)
            }
          });
        }
      } catch (error) {
        console.error("Error updating cache:", error);
      }
    },
    refetchQueries: [{ query: obtenerClientesUsuario }]
  });

  const open = () => setModal(true);
  const close = () => setModal(false);
  const [password, setPassword] = useState('');

  const handleEnviar = async () => {
    console.log(password);
    if (password.trim() === '') {
      toast.error('No se puede enviar un campo vacío');
      return;
    }
    try {
      const { data: confirmData } = await confirmar({ variables: { password } });
      const { confirmarPassword } = confirmData;
      console.log(confirmarPassword);
      if (confirmarPassword) {
        // Mutación de eliminación
        const { data: eliminarData } = await eliminar({ variables: { id: cliente } });
        toast.success('Cliente eliminado correctamente');
        close();
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <>
      <button
        onClick={open}
        className="bg-red-700 p-1 hover:bg-red-500 transition-colors duration-150 text-white flex justify-center items-center"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="size-6">
          <path strokeLinecap="round" strokeLinejoin="round" d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0" />
        </svg>
        Eliminar
      </button>
      <Dialog
        open={modal}
        onClose={close}
        className="z-10 bg-black/60 fixed inset-0 flex w-screen items-center justify-center p-4 transition duration-300 ease-out data-[closed]:opacity-0"
      >
        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel */}
          <DialogPanel className="max-w-lg space-y-4 bg-white p-12">
            <DialogTitle className="text-3xl font-semibold">Para continuar ingresa tu contraseña</DialogTitle>
            <div className="flex flex-col">
              <ContraseñaForm password={password} setPassword={setPassword} />
              <div className="flex justify-between">
                <button onClick={close} className="bg-emerald-600 hover:bg-emerald-700 text-white p-1 font-semibold rounded-lg">Regresar</button>
                <button
                  onClick={handleEnviar}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white p-1 font-semibold rounded-lg"
                >
                  Enviar
                </button>
              </div>
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  );
}