export function openModal(id: string) {
    const modal = document.getElementById(id) as HTMLDialogElement;

    if (modal) {
      modal.show();
    }
  }

export function closeModal(id: string) {
  const modal = document.getElementById(id) as HTMLDialogElement;

  if (modal) {
    modal.close();
  }
}