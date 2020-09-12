import React, { useState } from "react";

const App = () => {
  const [tarefa, setTarefa] = useState("");
  const [tarefas, setTarefas] = useState([]);
  const [modoEditar, setModoEditar] = useState(false);
  const [idTarefa, setIdTarefa] = useState("");
  const [error, setError] = useState(null);

  const inputTarefa = (e) => {
    setTarefa(e.target.value);
  };

  const addTarefa = (e) => {
    e.preventDefault();
    if (!tarefa.trim()) {
      setError("Não pode ficar vazio!");
      return;
    }

    setTarefas([{ id: Date.now(), tarefa }, ...tarefas]);
    setTarefa("");
    setError(null);
  };

  const excluirTarefa = (id) => {
    const excluirFilter = tarefas.filter((item) => item.id !== id);
    setTarefas(excluirFilter);
  };

  const editarConfig = (item) => {
    setModoEditar(true);
    setTarefa(item.tarefa);
    setIdTarefa(item.id);
  };

  const editarTarefa = (e) => {
    e.preventDefault();
    if (!tarefa.trim()) {
      setError("Não pode ficar vazio!");
      return;
    }

    const editarMap = tarefas.map((item) =>
      item.id === idTarefa ? { id: idTarefa, tarefa } : item
    );

    setTarefas(editarMap);
    setModoEditar(false);
    setTarefa("");
    setIdTarefa("");
    setError(null);
  };

  return (
    <div className="container">
      <h1 className="text-center mt-4">CRUD simples.</h1>

      <hr />

      <div className="row">
        <div className="col-6">
          <h3 className="text-center">Suas tarefas.</h3>

          <ul className="list-group">
            {tarefas.length === 0 ? (
              <li className="list-group-item">Você não tem tarefa.</li>
            ) : (
              tarefas.map((item) => (
                <li
                  className="list-group-item d-flex justify-content-between align-items-center"
                  key={item.id}
                >
                  {item.tarefa}
                  <div>
                    <button
                      className="btn btn-info btn-sm mr-2"
                      onClick={() => editarConfig(item)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => excluirTarefa(item.id)}
                    >
                      Excluir
                    </button>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
        <div className="col-6">
          <h3 className="text-center">
            {modoEditar ? "Editar tarefa" : "Adicionar tarefa."}
          </h3>
          <form
            className="form-group"
            onSubmit={modoEditar ? editarTarefa : addTarefa}
          >
            {error && (
              <div className="alert alert-danger" role="alert">
                {error}
              </div>
            )}

            <input
              type="text"
              className="form-control"
              placeholder="Digite sua tarefa aqui..."
              onChange={inputTarefa}
              value={tarefa}
            />

            <button
              className={
                modoEditar
                  ? "btn btn-warning btn-block mt-2"
                  : "btn btn-primary btn-block mt-2"
              }
              type="submit"
            >
              {modoEditar ? "Editar tarefa" : "Adicionar tarefa."}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
