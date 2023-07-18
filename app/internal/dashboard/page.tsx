function Dashboard() {
  return (
    <main className="prose w-full max-w-full">
      <div className="header">
        <h2 className="mt-0">Bem vindo, lucas!</h2>
        <div className="cards flex align-items-center gap-10">
          <div className="card w-56 bg-base-100 shadow-lg">
            <div className="card-body p-6">
              <h2 className="card-title m-0">0</h2>
              <p className="m-0">Cenários praticados</p>
            </div>
          </div>
          <div className="card w-56 bg-base-100 shadow-lg">
            <div className="card-body p-6">
              <h2 className="card-title m-0">0</h2>
              <p className="m-0">Palavras analisadas</p>
            </div>
          </div>
        </div>
      </div>
      <div className="content">
        <h2 className="mt-5">Praticar cenários</h2>
        <div className="scenarios">
          <div className="card w-full bg-base-100 shadow-lg">
            <div className="card-body p-6">
              <h2 className="card-title m-0">Daily standup</h2>
              <p className="m-0">
                Ao se reunir para a standup, relate que teve um diálogo com
                Daniel sobre a falta de recursos disponíveis para a
                implementação de uma nova funcionalidade. Garanta à equipe que,
                no momento, não há obstáculos que estejam impactando o andamento
                do projeto relacionado a essa funcionalidade específica.
              </p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Dashboard;
