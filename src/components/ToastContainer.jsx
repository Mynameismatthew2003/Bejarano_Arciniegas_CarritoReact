import Toast from "./Toast";

export default function ToastContainer({ toasts, onCerrar }) {
  return (
    <div className="toasts" aria-live="polite" aria-atomic="false">
      {toasts.map((toast) => (
        <Toast key={toast.id} toast={toast} onCerrar={onCerrar} />
      ))}
    </div>
  );
}
