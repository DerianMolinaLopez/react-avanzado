import { Description, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react'
import { useState } from 'react'
import FormularioEdicionCLiente from './FormularioEdicionCLiente'
import { Form } from 'react-hook-form'

export default function EdicionModal({cliente,modal,setModal}) {
  let [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open dialog</button>
      <Dialog open={isOpen} onClose={() => setIsOpen(false)} className="relative z-50">
        {/* The backdrop, rendered as a fixed sibling to the panel container */}
        <DialogBackdrop className="fixed inset-0 bg-black/30" />

        {/* Full-screen container to center the panel */}
        <div className="fixed inset-0 flex w-screen items-center justify-center p-4">
          {/* The actual dialog panel  */}
          <DialogPanel className="max-w-lg space-y-4 bg-white p-12">
               <div className="flex gap-4">
                <FormularioEdicionCLiente cliente={cliente} />
            
            </div>
          </DialogPanel>
        </div>
      </Dialog>
    </>
  )
}