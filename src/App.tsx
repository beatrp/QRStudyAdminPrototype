import { useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Bell,
  Check,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  ClipboardCheck,
  Clock3,
  ExternalLink,
  FileText,
  GraduationCap,
  Eye,
  EyeOff,
  KeyRound,
  Link2,
  Menu,
  MoreHorizontal,
  Search,
  ScrollText,
  Settings,
  ShieldCheck,
  SlidersHorizontal,
  UsersRound,
  X,
} from "lucide-react";

type RequestStatus = "Pendente" | "Em análise" | "Aprovado" | "Rejeitado";

type Request = {
  id: number;
  guardian: string;
  initials: string;
  relationship: string;
  student: string;
  grade: string;
  submitted: string;
  waiting: string;
  status: RequestStatus;
  cpf: string;
  birthDate: string;
  email: string;
  phone: string;
  registration: string;
};

const initialRequests: Request[] = [
  {
    id: 1,
    guardian: "Mariana Oliveira",
    initials: "MO",
    relationship: "Mãe",
    student: "Lucas Oliveira",
    grade: "5º ano A",
    submitted: "Hoje, 08:42",
    waiting: "há 2h",
    status: "Em análise",
    cpf: "487.•••.•••-09",
    birthDate: "14/09/1986",
    email: "mariana.oliveira@email.com",
    phone: "(11) 9 8472-••••",
    registration: "2024.0518",
  },
  {
    id: 2,
    guardian: "Ricardo Santos",
    initials: "RS",
    relationship: "Pai",
    student: "Beatriz Santos",
    grade: "3º ano B",
    submitted: "Hoje, 07:18",
    waiting: "há 3h",
    status: "Pendente",
    cpf: "213.•••.•••-41",
    birthDate: "02/03/1983",
    email: "ricardo.santos@email.com",
    phone: "(11) 9 3401-••••",
    registration: "2024.0322",
  },
  {
    id: 3,
    guardian: "Ana Paula Lima",
    initials: "AL",
    relationship: "Responsável legal",
    student: "Gabriel Lima",
    grade: "7º ano C",
    submitted: "Ontem, 16:35",
    waiting: "há 18h",
    status: "Pendente",
    cpf: "504.•••.•••-72",
    birthDate: "28/11/1979",
    email: "ana.lima@email.com",
    phone: "(11) 9 7734-••••",
    registration: "2024.0736",
  },
  {
    id: 4,
    guardian: "Carlos Eduardo",
    initials: "CE",
    relationship: "Avô",
    student: "Sofia Eduardo",
    grade: "2º ano A",
    submitted: "Ontem, 14:10",
    waiting: "há 20h",
    status: "Pendente",
    cpf: "166.•••.•••-25",
    birthDate: "08/06/1962",
    email: "carlos.eduardo@email.com",
    phone: "(11) 9 1267-••••",
    registration: "2024.0209",
  },
];

const navItems = [
  { label: "Validações", icon: ClipboardCheck, count: 12 },
  { label: "Alunos", icon: GraduationCap },
  { label: "Responsáveis", icon: UsersRound },
  { label: "Auditoria", icon: ScrollText },
];

function Logo() {
  return (
    <div className="brand">
      <svg className="brand-mark" viewBox="0 0 64 64" fill="none" aria-hidden="true">
        <path
          d="M32 9C27.7 9 19.6 11.2 15.4 13.4c0 0-2.1 14.7-2.1 23.1 0 8.4 6.3 16.8 18.7 18.9 12.4-2.1 18.7-10.5 18.7-18.9 0-8.4-2.1-23.1-2.1-23.1C44.4 11.2 36.3 9 32 9Z"
          fill="currentColor"
        />
        <path
          d="M32 19.5c-6.4 0-10.7 4.3-10.7 10.7S25.6 41 32 41c3.2 0 5.9-1.6 7.5-3.8l3.2 3.2 2.1-2.1-3.2-3.2a10.3 10.3 0 0 0 1.6-4.8c0-6.4-4.3-10.7-11.2-10.7Zm0 3.2c4.8 0 8 3.2 8 7.5s-3.2 7.5-8 7.5-8-3.2-8-7.5 3.2-7.5 8-7.5Z"
          fill="white"
        />
        <path d="m38.4 34.5-2.1 2.1 4.3 4.3 8.5-8.5-2.1-2.1-6.4 6.4-2.1-2.1Z" fill="#25C7D9" />
      </svg>
      <div>
        <strong>QRStudy</strong>
        <span>Admin</span>
      </div>
    </div>
  );
}

function StatusBadge({ status }: { status: RequestStatus }) {
  const statusIcon =
    status === "Em análise" ? <Clock3 /> : status === "Aprovado" ? <Check /> : status === "Rejeitado" ? <X /> : <AlertCircle />;
  return (
    <span className={`status-badge status-${status.toLowerCase().replace(" ", "-").replace("á", "a")}`}>
      {statusIcon}
      {status}
    </span>
  );
}

function LoginScreen({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [recoverySent, setRecoverySent] = useState(false);

  const handleLogin = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (username.trim().toLowerCase() === "adm" && password === "1234") {
      setError("");
      onLogin();
      return;
    }
    setError("Usuário ou senha incorretos. Use o acesso de teste abaixo.");
  };

  return (
    <main className="login-page">
      <section className="login-shell">
        <div className="login-aside">
          <Logo />
          <div className="login-aside-copy">
            <span>GESTÃO ESCOLAR SEGURA</span>
            <h1>Autorizações simples. Comunidade protegida.</h1>
            <p>Gerencie responsáveis, alunos e vínculos com segurança e agilidade.</p>
          </div>
          <div className="login-trust">
            <ShieldCheck />
            <div>
              <strong>Ambiente administrativo</strong>
              <span>Acesso restrito aos colaboradores autorizados</span>
            </div>
          </div>
        </div>

        <div className="login-content">
          <div className="login-mobile-brand">
            <Logo />
          </div>
          <div className="login-heading">
            <span>QRSTUDY ADMIN</span>
            <h2>Boas-vindas</h2>
            <p>Entre com suas credenciais para acessar o painel.</p>
          </div>

          <form className="login-form" onSubmit={handleLogin}>
            <label htmlFor="username">Usuário</label>
            <div className="login-input">
              <UsersRound />
              <input
                id="username"
                value={username}
                onChange={(event) => {
                  setUsername(event.target.value);
                  setError("");
                }}
                placeholder="Digite seu usuário"
                autoComplete="username"
              />
            </div>

            <div className="password-label">
              <label htmlFor="password">Senha</label>
              <button
                type="button"
                onClick={() => {
                  setRecoverySent(true);
                  setError("");
                }}
              >
                Esqueci a senha
              </button>
            </div>
            <div className="login-input">
              <KeyRound />
              <input
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => {
                  setPassword(event.target.value);
                  setError("");
                }}
                placeholder="Digite sua senha"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="show-password"
                onClick={() => setShowPassword((current) => !current)}
                aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
              >
                {showPassword ? <EyeOff /> : <Eye />}
              </button>
            </div>

            {error && <div className="login-message error-message">{error}</div>}
            {recoverySent && (
              <div className="login-message recovery-message">
                <CheckCircle2 />
                Solicitação registrada. A escola enviará as orientações ao e-mail cadastrado.
              </div>
            )}

            <button className="login-button" type="submit">
              Entrar no painel
              <ArrowRight />
            </button>
          </form>

          <div className="test-access">
            <div>
              <KeyRound />
            </div>
            <span>Acesso para teste</span>
            <dl>
              <div>
                <dt>Usuário</dt>
                <dd>adm</dd>
              </div>
              <div>
                <dt>Senha</dt>
                <dd>1234</dd>
              </div>
            </dl>
          </div>

          <p className="login-footer">© 2026 QRStudy · Colégio Dom Pedro II</p>
        </div>
      </section>
    </main>
  );
}

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [requests, setRequests] = useState(initialRequests);
  const [selectedId, setSelectedId] = useState(1);
  const [activeNav, setActiveNav] = useState("Validações");
  const [query, setQuery] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [detailOpen, setDetailOpen] = useState(false);
  const [toast, setToast] = useState("");
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [rejectionReason, setRejectionReason] = useState("");
  const [rejectionError, setRejectionError] = useState(false);

  const selected = requests.find((request) => request.id === selectedId) ?? requests[0];
  const filteredRequests = useMemo(() => {
    const normalized = query.toLowerCase().trim();
    if (!normalized) return requests;
    return requests.filter(
      (request) =>
        request.guardian.toLowerCase().includes(normalized) ||
        request.student.toLowerCase().includes(normalized) ||
        request.grade.toLowerCase().includes(normalized),
    );
  }, [query, requests]);

  const notify = (message: string) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 3200);
  };

  const updateStatus = (status: RequestStatus) => {
    setRequests((current) =>
      current.map((request) => (request.id === selected.id ? { ...request, status } : request)),
    );
    notify(
      status === "Aprovado"
        ? `Cadastro de ${selected.guardian} aprovado e registrado na auditoria.`
        : `Solicitação de ${selected.guardian} rejeitada.`,
    );
  };

  const confirmRejection = () => {
    if (!rejectionReason.trim()) {
      setRejectionError(true);
      return;
    }
    updateStatus("Rejeitado");
    setRejectModalOpen(false);
    setRejectionReason("");
    setRejectionError(false);
  };

  const selectRequest = (id: number) => {
    setSelectedId(id);
    setDetailOpen(true);
  };

  if (!isAuthenticated) {
    return <LoginScreen onLogin={() => setIsAuthenticated(true)} />;
  }

  return (
    <div className="app-shell">
      <aside className={`sidebar ${sidebarOpen ? "is-open" : ""}`}>
        <div className="sidebar-top">
          <Logo />
          <button className="mobile-close" onClick={() => setSidebarOpen(false)} aria-label="Fechar menu">
            <X />
          </button>
        </div>

        <div className="school-switcher">
          <div className="school-icon">
            <ShieldCheck />
          </div>
          <div>
            <small>Unidade ativa</small>
            <strong>Colégio Dom Pedro II</strong>
          </div>
          <ChevronDown />
        </div>

        <nav className="main-nav" aria-label="Navegação principal">
          <span className="nav-label">GESTÃO</span>
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.label}
                className={activeNav === item.label ? "active" : ""}
                onClick={() => {
                  if (item.label === "Validações") {
                    setActiveNav(item.label);
                  } else {
                    notify(`${item.label}: seção disponível na próxima etapa do módulo.`);
                  }
                  setSidebarOpen(false);
                }}
              >
                <Icon />
                <span>{item.label}</span>
                {item.count && <b>{item.count}</b>}
              </button>
            );
          })}
        </nav>

        <div className="sidebar-bottom">
          <button>
            <Settings />
            <span>Configurações</span>
          </button>
          <div className="admin-card">
            <div className="avatar avatar-admin">AM</div>
            <div>
              <strong>Ana Martins</strong>
              <span>Administradora</span>
            </div>
            <MoreHorizontal />
          </div>
        </div>
      </aside>

      {sidebarOpen && <button className="sidebar-backdrop" onClick={() => setSidebarOpen(false)} aria-label="Fechar menu" />}

      <main className="main-area">
        <header className="topbar">
          <button className="icon-button mobile-menu" onClick={() => setSidebarOpen(true)} aria-label="Abrir menu">
            <Menu />
          </button>
          <div className="breadcrumb">
            <span>QRStudy</span>
            <ChevronRight />
            <strong>{detailOpen ? "Análise do cadastro" : activeNav}</strong>
          </div>
          <div className="topbar-actions">
            <button className="icon-button notification-button" aria-label="Notificações">
              <Bell />
              <span />
            </button>
            <div className="topbar-divider" />
            <div className="topbar-user">
              <div className="avatar avatar-admin">AM</div>
              <div>
                <strong>Ana Martins</strong>
                <span>Administradora</span>
              </div>
              <ChevronDown />
            </div>
          </div>
        </header>

        <div className="page-content">
          {!detailOpen ? (
            <>
              <div className="page-heading">
                <div>
                  <h1>Validações de cadastro</h1>
                  <p>Selecione uma solicitação para fazer a análise individual.</p>
                </div>
                <div className="heading-actions">
                  <span className="pending-summary"><b>12</b> aguardando análise</span>
                  <button className="primary-button" onClick={() => selectRequest(2)}>
                    <ClipboardCheck />
                    Analisar próxima
                  </button>
                </div>
              </div>

              <section className="workspace detail-hidden">
            <div className="request-panel">
              <div className="section-heading">
                <div>
                  <h2>Solicitações</h2>
                  <p>Ordenadas pelo tempo de espera.</p>
                </div>
                <span className="request-count">{filteredRequests.length} resultados</span>
              </div>

              <div className="table-toolbar">
                <div className="inline-search">
                  <Search />
                  <input
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    placeholder="Buscar nesta lista..."
                    aria-label="Buscar solicitações"
                  />
                </div>
                <button className="filter-button">
                  <SlidersHorizontal />
                  Filtros
                  <span>2</span>
                </button>
                <button className="filter-button">
                  Mais recentes
                  <ChevronDown />
                </button>
              </div>

              <div className="request-list">
                <div className="list-header">
                  <span>RESPONSÁVEL</span>
                  <span>ALUNO</span>
                  <span>ENVIO</span>
                  <span>STATUS</span>
                  <span />
                </div>
                {filteredRequests.map((request) => (
                  <button
                    className={`request-row ${selected.id === request.id ? "selected" : ""}`}
                    key={request.id}
                    onClick={() => selectRequest(request.id)}
                  >
                    <span className="person-cell">
                      <span className="avatar">{request.initials}</span>
                      <span>
                        <strong>{request.guardian}</strong>
                        <small>{request.relationship}</small>
                      </span>
                    </span>
                    <span className="student-cell">
                      <strong>{request.student}</strong>
                      <small>{request.grade}</small>
                    </span>
                    <span className="date-cell">
                      <strong>{request.submitted}</strong>
                      <small>{request.waiting}</small>
                    </span>
                    <StatusBadge status={request.status} />
                    <ChevronRight className="row-arrow" />
                  </button>
                ))}
                {filteredRequests.length === 0 && (
                  <div className="empty-state">
                    <Search />
                    <strong>Nenhum resultado encontrado</strong>
                    <span>Tente buscar por outro nome ou turma.</span>
                  </div>
                )}
              </div>
              <div className="table-footer">
                <span>Mostrando {filteredRequests.length} de 12 solicitações</span>
                <div>
                  <button disabled>Anterior</button>
                  <button>Próxima</button>
                </div>
              </div>
            </div>
              </section>
            </>
          ) : (
            <>
              <div className="analysis-heading">
                <button className="back-button" onClick={() => setDetailOpen(false)}>
                  <ArrowLeft />
                  Voltar para validações
                </button>
                <div>
                  <span>SOLICITAÇÃO #QS-{String(selected.id).padStart(4, "0")}</span>
                  <h1>Análise individual do cadastro</h1>
                  <p>Confira os dados e documentos antes de tomar uma decisão.</p>
                </div>
              </div>

              <section className="analysis-page">
                <div className="detail-panel">
                <div className="detail-header">
                  <div>
                    <span>RESPONSÁVEL</span>
                    <h2>{selected.guardian}</h2>
                  </div>
                  <StatusBadge status={selected.status} />
                </div>

                <div className="detail-body">
                  <div className="review-person">
                    <div className="avatar avatar-large">{selected.initials}</div>
                    <div>
                      <strong>{selected.guardian}</strong>
                      <span>Solicitação enviada {selected.waiting}</span>
                    </div>
                  </div>

                  <div className="notice">
                    <ShieldCheck />
                    <div>
                      <strong>Identidade verificada automaticamente</strong>
                      <span>Os dados conferem com os documentos enviados.</span>
                    </div>
                  </div>

                  <section className="detail-section">
                    <div className="detail-section-title">
                      <h3>Dados do responsável</h3>
                      <button>Editar</button>
                    </div>
                    <dl className="info-grid">
                      <div>
                        <dt>CPF</dt>
                        <dd>{selected.cpf}</dd>
                      </div>
                      <div>
                        <dt>Nascimento</dt>
                        <dd>{selected.birthDate}</dd>
                      </div>
                      <div className="wide">
                        <dt>E-mail</dt>
                        <dd>{selected.email}</dd>
                      </div>
                      <div className="wide">
                        <dt>Telefone</dt>
                        <dd>{selected.phone}</dd>
                      </div>
                    </dl>
                  </section>

                  <section className="detail-section">
                    <div className="detail-section-title">
                      <h3>Vínculo solicitado</h3>
                    </div>
                    <div className="student-link-card">
                      <div className="student-icon">
                        <GraduationCap />
                      </div>
                      <div>
                        <strong>{selected.student}</strong>
                        <span>
                          {selected.grade} · Matrícula {selected.registration}
                        </span>
                      </div>
                      <div className="link-pill">
                        <Link2 />
                        {selected.relationship}
                      </div>
                    </div>
                  </section>

                  <section className="detail-section">
                    <div className="detail-section-title">
                      <h3>Documentos enviados</h3>
                      <span className="verified-count">
                        <Check />
                        2 verificados
                      </span>
                    </div>
                    <button className="document-row">
                      <span className="document-icon">
                        <FileText />
                      </span>
                      <span>
                        <strong>Documento de identidade</strong>
                        <small>RG_Mariana.pdf · 1,8 MB</small>
                      </span>
                      <ExternalLink />
                    </button>
                    <button className="document-row">
                      <span className="document-icon">
                        <FileText />
                      </span>
                      <span>
                        <strong>Comprovante de residência</strong>
                        <small>Comprovante_Maio.pdf · 820 KB</small>
                      </span>
                      <ExternalLink />
                    </button>
                  </section>
                </div>

                <div className="detail-actions">
                  <button className="reject-button" onClick={() => setRejectModalOpen(true)}>
                    <X />
                    Rejeitar
                  </button>
                  <button className="approve-button" onClick={() => updateStatus("Aprovado")}>
                    <Check />
                    Aprovar e vincular
                  </button>
                </div>
                </div>
              </section>
            </>
          )}
        </div>
      </main>

      {toast && (
        <div className="toast" role="status">
          <CheckCircle2 />
          <span>{toast}</span>
          <button onClick={() => setToast("")} aria-label="Fechar aviso">
            <X />
          </button>
        </div>
      )}

      {rejectModalOpen && (
        <div className="modal-backdrop" role="presentation">
          <section className="rejection-modal" role="dialog" aria-modal="true" aria-labelledby="rejection-title">
            <div className="modal-header">
              <div className="modal-icon">
                <AlertCircle />
              </div>
              <div>
                <h2 id="rejection-title">Formalizar rejeição</h2>
                <p>O motivo ficará registrado no histórico da solicitação.</p>
              </div>
              <button
                className="icon-button subtle"
                onClick={() => {
                  setRejectModalOpen(false);
                  setRejectionError(false);
                }}
                aria-label="Fechar"
              >
                <X />
              </button>
            </div>

            <div className="modal-body">
              <div className="rejection-context">
                <span>Cadastro</span>
                <strong>{selected.guardian}</strong>
                <small>
                  Vínculo com {selected.student} · {selected.grade}
                </small>
              </div>

              <label htmlFor="rejection-reason">
                Motivo da rejeição <span>*</span>
              </label>
              <textarea
                id="rejection-reason"
                value={rejectionReason}
                onChange={(event) => {
                  setRejectionReason(event.target.value);
                  setRejectionError(false);
                }}
                placeholder="Descreva de forma clara o motivo da rejeição e, se necessário, oriente sobre como regularizar o cadastro."
                rows={5}
                maxLength={500}
                aria-invalid={rejectionError}
              />
              <div className="textarea-meta">
                <span className={rejectionError ? "reason-error" : ""}>
                  {rejectionError ? "Informe o motivo para continuar." : "Esta informação poderá ser enviada ao responsável."}
                </span>
                <span>{rejectionReason.length}/500</span>
              </div>
            </div>

            <div className="modal-actions">
              <button
                className="modal-cancel"
                onClick={() => {
                  setRejectModalOpen(false);
                  setRejectionError(false);
                }}
              >
                Cancelar
              </button>
              <button className="modal-confirm-rejection" onClick={confirmRejection}>
                <X />
                Confirmar rejeição
              </button>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}

export default App;
