import React, { useState } from "react";

const ContactMeModal = ({ show, onClose, onSubmit }) => {
  const [email, setEmail] = useState("");
  const [text, setText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(email, text);
    setEmail("");
    setText("");
  };

  return (
    <div
      className={`absolute z-10 top-20 right-0 bg-white flex justify-center rounded border-2 border-customColorTertiary ${
        show ? "" : "hidden"
      }`}
    >
      <form className="w-72 p-4" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
            placeholder="Email"
          />
        </div>
        <div>
          <label htmlFor="text">Messagio:</label>
          <textarea
            id="text"
            name="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-200 placeholder-gray-400"
            placeholder="Messaggio"
          />
        </div>
        <div className="mt-2 gap-4">
          <button
            type="submit"
            className="inline-block text-center shadow-md text-sm bg-customColorTertiary text-white rounded-sm px-4 py-1 font-bold hover:bg-customColorQuaternary"
          >
            Invia
          </button>
        </div>
      </form>
    </div>
  );
};

export default ContactMeModal;
