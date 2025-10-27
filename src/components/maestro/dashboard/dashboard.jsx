import { useState } from "react";
import { Users } from "lucide-react";

export default function Dashboard() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [openChat, setOpenChat] = useState(false);

  const handleSend = () => {
    if (!input.trim()) return;

    const userMessage = { sender: "usuario", text: input };
    const botMessage = {
      sender: "bot",
      text: "Hola, soy tu asistente.  😊"
    };

    setMessages([...messages, userMessage, botMessage]);
    setInput("");
  };

  return (
    <div className="p-8 bg-gray-100 min-h-screen relative">
      {/* Dashboard principal */}
      <h1 className="text-3xl font-extrabold text-blue-900 mb-2">
        Panel del Maestro
      </h1>
      <p className="text-gray-700 mb-8">
        Aquí puedes registrar calificaciones, revisar tus materias asignadas y comunicarte con tus alumnos.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-blue-100 p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-blue-800">5 Materias</h2>
          <p className="text-gray-600 mt-1">Asignadas este ciclo</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-blue-800">3 Reportes</h2>
          <p className="text-gray-600 mt-1">Pendientes de revisión</p>
        </div>
        <div className="bg-blue-100 p-6 rounded-2xl shadow-md text-center">
          <h2 className="text-2xl font-bold text-blue-800">20 Alumnos</h2>
          <p className="text-gray-600 mt-1">Registrados en total</p>
        </div>
      </div>

      {/* Botón flotante del asistente */}
      <button
        onClick={() => setOpenChat(!openChat)}
        className="fixed bottom-8 right-8 bg-blue-700 hover:bg-blue-800 text-white p-4 rounded-full shadow-lg transition-all flex items-center justify-center"
      >
        <Users size={24} />
      </button>

      {/* Ventana de chat flotante */}
      {openChat && (
        <div className="fixed bottom-20 right-8 w-72 bg-white rounded-2xl shadow-lg border border-gray-200 flex flex-col overflow-hidden">
          <div className="bg-blue-700 text-white p-3 font-bold flex justify-between items-center">
            Asistente
            <button onClick={() => setOpenChat(false)} className="ml-2 font-normal">✕</button>
          </div>
          <div className="flex-1 p-3 overflow-y-auto space-y-2 h-64">
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg text-sm max-w-[80%] break-words ${
                  msg.sender === "usuario"
                    ? "bg-blue-100 self-end ml-auto"
                    : "bg-gray-200 self-start"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>
          <div className="p-3 flex gap-2 border-t border-gray-200">
            <input
              type="text"
              placeholder="Escribe un mensaje..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
            />
            <button
              onClick={handleSend}
              className="bg-blue-700 hover:bg-blue-800 text-white px-4 py-2 rounded-lg text-sm font-semibold"
            >
              Enviar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
